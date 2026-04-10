locals {
  is_production = lower(var.ENVIRONMENT) == "production"
}

# Data source to fetch the existing repository
data "github_repository" "main" {
  full_name = "${var.GITHUB_OWNER}/${var.repository.name}"
}

# Update repository settings
resource "github_repository" "main" {
  name                  = var.repository.name
  description           = var.repository.description
  visibility            = var.repository.visibility
  has_issues            = var.repository.has_issues
  has_discussions       = var.repository.has_discussions
  has_projects          = var.repository.has_projects
  has_wiki              = var.repository.has_wiki
  is_template           = var.repository.is_template
  default_branch        = var.repository.default_branch
  
  # Merge strategy settings
  allow_auto_merge                    = var.repository.allow_auto_merge
  delete_branch_on_merge              = var.repository.delete_branch_on_merge
  squash_merge_commit_title           = var.repository.squash_merge_commit_title
  squash_merge_commit_message         = var.repository.squash_merge_commit_message
  allow_squash_merge                  = var.repository.allow_squash_merge
  allow_merge_commit                  = var.repository.allow_merge_commit
  allow_rebase_merge                  = var.repository.allow_rebase_merge

  # Advanced settings
  web_commit_signoff_required = local.is_production ? true : false

  lifecycle {
    ignore_changes = [
      # Ignore changes to these fields to avoid fights with direct GitHub edits
      archived,
      topics,
    ]
  }
}

# Branch protection rules
resource "github_branch_protection" "main" {
  for_each = { for bp in var.branch_protections : bp.branch_name => bp }

  repository_id = data.github_repository.main.node_id
  pattern       = each.value.branch_name

  # Status checks
  required_status_checks {
    strict   = lookup(each.value, "require_status_checks_strict", false)
    contexts = local.is_production ? [
      "PR Checks"
    ] : []
  }

  # Pull request reviews
  required_pull_request_reviews {
    require_code_owner_reviews      = each.value.require_code_owner_reviews
    required_approving_review_count = each.value.required_review_count
  }

  # Require linear history (prevent merge commits)
  required_linear_history = each.value.require_linear_history

  # Enforce admins (rules apply to admins too)
  enforce_admins = true

  # Allow force pushes and deletions
  allows_force_pushes       = false
  allows_deletions          = false
  require_conversation_resolution = true
}

# GitHub Actions Secrets
resource "github_actions_secret" "secrets" {
  for_each = nonsensitive(var.secrets)

  repository       = var.repository.name
  secret_name      = each.key
  plaintext_value  = each.value
}

# GitHub Actions Variables (non-secret)
resource "github_actions_variable" "variables" {
  for_each = var.variables

  repository = var.repository.name
  variable_name = each.key
  value = each.value
}

# Issue labels
resource "github_issue_label" "labels" {
  for_each = { for label in var.labels : label.name => label }

  repository = var.repository.name
  name        = each.value.name
  description = each.value.description
  color       = trimprefix(each.value.color, "#")
}

# Repository topics
resource "github_repository_topics" "main" {
  repository = var.repository.name
  topics     = var.topics
}

# Outputs
output "GITHUB_REPOSITORY_ID" {
  description = "The GitHub repository ID"
  value       = data.github_repository.main.node_id
  sensitive   = false
}

output "GITHUB_REPOSITORY_URL" {
  description = "The GitHub repository URL"
  value       = data.github_repository.main.html_url
  sensitive   = false
}

output "GITHUB_REPOSITORY_SSH_CLONE_URL" {
  description = "The GitHub repository SSH clone URL"
  value       = data.github_repository.main.ssh_clone_url
  sensitive   = false
}
