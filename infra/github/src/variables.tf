variable "ENVIRONMENT" {
  type = string
}

variable "GITHUB_TOKEN" {
  type        = string
  description = "GitHub API token with repo and workflow scopes"
}

variable "GITHUB_OWNER" {
  type        = string
  description = "GitHub owner/organization name"
}

variable "repository" {
  type = object({
    name                 = string
    description          = optional(string)
    visibility           = optional(string, "public")
    has_issues           = optional(bool, true)
    has_discussions      = optional(bool, false)
    has_projects         = optional(bool, true)
    has_wiki             = optional(bool, false)
    is_template          = optional(bool, false)
    default_branch       = optional(string, "main")
    allow_auto_merge     = optional(bool, true)
    delete_branch_on_merge = optional(bool, true)
    squash_merge_commit_title = optional(string, "COMMIT_MESSAGE")
    squash_merge_commit_message = optional(string, "COMMIT_BODY")
    allow_squash_merge   = optional(bool, true)
    allow_merge_commit   = optional(bool, false)
    allow_rebase_merge   = optional(bool, false)
  })
  description = "GitHub repository configuration"
}

variable "branch_protections" {
  type = list(object({
    branch_name                  = string
    require_status_checks        = optional(bool, true)
    require_status_checks_strict = optional(bool, false)
    require_code_owner_reviews   = optional(bool, true)
    require_pull_request_reviews = optional(bool, true)
    dismiss_stale_reviews      = optional(bool, true)
    required_review_count      = optional(number, 1)
    require_linear_history     = optional(bool, true)
    restrict_who_can_push      = optional(bool, false)
  }))
  default = []
  description = "Branch protection rules"
}

variable "secrets" {
  type        = map(string)
  default     = {}
  sensitive   = true
  description = "GitHub Actions secrets"
}

variable "variables" {
  type    = map(string)
  default = {}
  description = "GitHub Actions environment variables"
}

variable "labels" {
  type = list(object({
    name        = string
    description = optional(string)
    color       = optional(string, "0366d6")
  }))
  default = []
  description = "Issue labels"
}

variable "topics" {
  type        = list(string)
  default     = []
  description = "Repository topics/tags"
}

variable "enable_security_and_analysis" {
  type = object({
    enable_secret_scanning                 = optional(bool, true)
    enable_secret_scanning_push_protection = optional(bool, true)
    enable_dependabot_alerts               = optional(bool, true)
    enable_dependabot_security_updates     = optional(bool, true)
    enable_private_vulnerability_reporting = optional(bool, true)
  })
  default = {}
  description = "Security and dependency analysis settings"
}
