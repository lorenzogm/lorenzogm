terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "6.12.0"
    }
  }
}

provider "github" {
  token = var.GITHUB_TOKEN
  owner = var.GITHUB_OWNER
}
