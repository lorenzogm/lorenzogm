terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "5.3.0"
    }
  }
}
provider "vercel" {
  api_token = var.VERCEL_TOKEN
  team      = var.VERCEL_ORG_ID != "" ? var.VERCEL_ORG_ID : null
}
