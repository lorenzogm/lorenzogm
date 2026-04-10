# GitHub Repository Infrastructure - Complete Setup Guide

## Overview

The GitHub repository is now managed through Terraform, allowing you to:
- Define and enforce branch protection rules
- Manage issue labels programmatically
- Configure security and analysis features
- Store GitHub Actions secrets and variables
- Version control all repository settings

This guide explains how to set up and use the GitHub infrastructure.

## Project Structure

```
infra/github/
├── .env                          # Encrypted GitHub credentials
├── .env.example                  # Template for credentials
├── .env.keys                     # Local decryption key (NOT committed)
├── .gitignore                    # Git ignore rules
├── README.md                     # Detailed GitHub infra docs
├── import.sh                     # Helper script for initial import
└── src/
    ├── providers.tf              # GitHub Terraform provider
    ├── variables.tf              # Input variable definitions
    ├── main.tf                   # Repository resources
    ├── config.json   # Development configuration
    └── config.json    # Production configuration (stricter rules)
```

## Quick Start

### 1. Create GitHub Personal Access Token

Go to: https://github.com/settings/tokens/new (fine-grained tokens)

**Configuration:**
- **Token name:** `terraform-github-repo`
- **Expiration:** 90 days (renewable)
- **Repository access:** Only "lorenzogm"
- **Permissions needed:**
  - ✅ Administration (read & write)
  - ✅ Actions (read & write)  
  - ✅ Contents (read only)
  - ✅ Issues (read & write)
  - ✅ Workflows (read & write)

**Copy the token** (you won't see it again)

### 2. Encrypt GitHub Credentials

```bash
cd infra/github

# Create .env with your token
cat > .env << 'EOF'
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=lorenzogm
EOF

# Encrypt with dotenvx
npx dotenvx encrypt

# Verify encryption
cat .env
# Should show: GITHUB_TOKEN="encrypted:..."
```

### 3. Import Existing Repository

```bash
./import.sh
```

Or manually:

```bash
cd src

# Initialize Terraform
dotenvx run -- terraform init

# Import the existing repository into state
dotenvx run -- terraform import -var-file="config.json" \
  github_repository.main lorenzogm
```

### 4. Plan and Review Changes

```bash
cd infra/github/src

# See what Terraform will change
dotenvx run -- terraform plan -var-file="config.json"
```

Review the output carefully. First-time plan will show:
- Creating branch protection rules
- Creating issue labels
- Configuring security settings
- Updating repository settings to match desired config

### 5. Apply Configuration

```bash
# Apply the configuration
dotenvx run -- terraform apply -var-file="config.json"
```

Terraform will now enforce the configuration in GitHub.

## Configuration Files

### config.json

Used for development/default deployments:
- Repository is public
- Auto-merge enabled
- 0 required reviews (for personal projects)
- No web_commit_signoff requirement

### config.json

Used for production deployments (stricter):
- Repository is public
- Auto-merge disabled
- 1 required code owner review
- 1 required approval on main branch
- Requires signed commits (web_commit_signoff)

## Customizing Configuration

### Adding/Modifying Branch Protection Rules

Edit `config.[environment].json`:

```json
"branch_protections": [
  {
    "branch_name": "main",
    "require_status_checks": true,
    "require_code_owner_reviews": true,
    "require_pull_request_reviews": true,
    "dismiss_stale_reviews": true,
    "required_review_count": 1,
    "require_linear_history": true
  }
]
```

Apply changes:
```bash
cd src
dotenvx run -- terraform apply -var-file="config.json"
```

### Adding Issue Labels

Add to the `labels` array:

```json
"labels": [
  {
    "name": "my-custom-label",
    "description": "Description of the label",
    "color": "ff0000"  // Hex color code
  }
]
```

### Adding Secrets to GitHub Actions

```json
"secrets": {
  "MY_SECRET_NAME": "secret-value"
}
```

Apply:
```bash
dotenvx run -- terraform apply -var-file="config.json"
```

### Adding Variables to GitHub Actions

Non-sensitive values visible in logs:

```json
"variables": {
  "DEPLOY_REGION": "us-east-1"
}
```

## CI/CD Integration

Two GitHub Actions workflows manage infrastructure:

### 1. Web [Vercel] Deploy
- **File:** `.github/workflows/web-vercel-deploy.yml`
- **Purpose:** Deploy application to Vercel
- **Trigger:** Push to main, manual trigger
- **Manages:** Vercel projects, SSL certificates, domains

### 2. GitHub Infrastructure Deploy
- **File:** `.github/workflows/github-infra-deploy.yml`
- **Purpose:** Manage GitHub repository configuration
- **Trigger:** Changes to `infra/github/src/`, manual trigger
- **Manages:** Repository settings, branch protection, labels, security

### Three-Layer Infrastructure

```
┌─────────────────────────────────────────────────┐
│  Application Code (src/, content/, public/)     │  Deploy to Vercel
│  Triggered: Push to main                        │
├─────────────────────────────────────────────────┤
│  GitHub Infrastructure (infra/github/)     │  Manage Repository
│  Triggered: Changes to infra/github/src/   │
├─────────────────────────────────────────────────┤
│  Vercel Infrastructure (infra/vercel/web/)      │  Manage Deployment
│  Triggered: Changes to infra/vercel/web/src/    │
└─────────────────────────────────────────────────┘
```

## Security Settings

Automatically enabled:
- ✅ **Secret Scanning** - Detects exposed credentials
- ✅ **Secret Scanning Push Protection** - Prevents secrets from being pushed
- ✅ **Dependabot Alerts** - Notifies about vulnerable dependencies
- ✅ **Dependabot Security Updates** - Auto-upgrades vulnerable packages

These settings are enforced universally and cannot be environment-specific.

## Managing GitHub Secrets in Workflow

### Setting Secrets via Terraform

```json
{
  "secrets": {
    "DEPLOY_KEY": "private-key-content",
    "API_TOKEN": "secret-token"
  }
}
```

After applying Terraform:
- Secrets appear in Settings → Secrets and variables → Actions
- Can be used in workflows with `${{ secrets.DEPLOY_KEY }}`

### Workflow Example

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: echo "Deploying..."
```

## Updating GitHub Token

### If Token Expires

1. Generate new token at https://github.com/settings/tokens
2. Update .env file:
   ```bash
   cd infra/github
   # Edit .env with new token
   GITHUB_TOKEN=ghp_new_token_here
   
   # Re-encrypt
   npx dotenvx encrypt --overwrite
   
   # Commit
   git add .env
   git commit -m "chore: rotate GitHub token"
   ```

### If Token is Compromised

⚠️ **Immediate Action Required**

1. Delete the compromised token at https://github.com/settings/tokens
2. Generate a new token
3. Update and encrypt .env file
4. Commit changes to rotate the key

## Troubleshooting

### "Repository Not Found"

```
Error: Repository not found (404)
```

**Causes:**
- Token doesn't have correct permissions
- Repository name is wrong
- Token is expired
- You don't have access to the repository with this token

**Fix:**
```bash
# Test token validity
cd infra/github
dotenvx run -- bash -c \
  'curl -H "Authorization: Bearer $GITHUB_TOKEN" \
   https://api.github.com/repos/$GITHUB_OWNER/lorenzogm'

# Should return repository information
```

### "Authentication Failed"

```
Error: Failed to authenticate
```

**Fix:**
1. Verify token has `repo` scope
2. Check token hasn't expired
3. Verify .env.keys exists and is readable
4. Re-run with debug: `TF_LOG=debug dotenvx run -- terraform apply`

### State File Out of Sync

If someone makes changes directly in GitHub (bypassing Terraform):

```bash
# Refresh the state
dotenvx run -- terraform refresh -var-file="config.json"

# Show current state
dotenvx run -- terraform state show

# Plan shows what Terraform wants to change (reconcile with GitHub)
dotenvx run -- terraform plan -var-file="config.json"
```

### Import Fails with "Already Managed"

If the resource is already in Terraform state:

```bash
# Remove it from state
dotenvx run -- terraform state rm github_repository.main

# Re-import
dotenvx run -- terraform import -var-file="config.json" \
  github_repository.main lorenzogm
```

## Best Practices

### 1. **Code Review for Infrastructure Changes**

Even though it's code, infrastructure changes should be reviewed:
- Create PR when modifying configuration files
- Have someone review branch protection/security changes
- Use `terraform plan` output in PR comments for visibility

### 2. **Test in Development First**

```bash
# Plan in development
dotenvx run -- terraform plan -var-file="config.json"

# Review changes, then apply in development
dotenvx run -- terraform apply -var-file="config.json"

# Later, apply to production
dotenvx run -- terraform apply -var-file="config.json"
```

### 3. **Rotate Tokens Regularly**

- Set a calendar reminder every 90 days
- Rotate tokens proactively
- Keep track of token expiration dates

### 4. **Monitor Audit Logs**

Repository → Settings → Audit log

Check for unexpected changes:
- Branch protection modifications
- Webhook additions
- Collaborator permission changes

### 5. **Backup Sensitive Configurations**

Before making major changes:
```bash
# Export current state
dotenvx run -- terraform show > backup.txt

# Keep in safe location (locally, not in git)
```

## Integration with Other Tools

### External CI/CD Systems

If you use external CI/CD (GitHub Actions, CircleCI, etc.):

```json
"secrets": {
  "EXTERNAL_CI_TOKEN": "token-for-external-system"
}
```

### Webhooks

To add webhooks, extend `main.tf`:

```hcl
resource "github_repository_webhook" "deployment" {
  repository = var.repository.name
  
  events = ["push", "pull_request"]
  
  configuration {
    url          = "https://example.com/webhook"
    content_type = "json"
    secret       = var.webhook_secret
  }
}
```

## Full Workflow Example

1. **Make a change to configuration:**
   ```bash
   # Edit the desired settings
   vim infra/github/src/config.json
   ```

2. **Commit and push:**
   ```bash
   git add infra/github/src/config.json
   git commit -m "feat(infra): add new branch protection rule"
   git push
   ```

3. **GitHub Actions automatically runs:**
   - Detects change in `infra/github/`
   - Triggers `github-infra-deploy` workflow
   - Decrypts credentials
   - Applies configuration
   - Updates GitHub repository settings

4. **Verify changes in GitHub:**
   - Go to Settings → Branches → Branch protection rules
   - See your new rule applied by Terraform

## References

- [Terraform GitHub Provider Docs](https://registry.terraform.io/providers/integrations/github/latest/docs)
- [GitHub Personal Access Tokens](https://github.com/settings/tokens)
- [GitHub Repository Settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

## Checklist: GitHub Infrastructure Setup

- [ ] Personal access token created with correct permissions
- [ ] `.env` file created with `GITHUB_TOKEN` and `GITHUB_OWNER`
- [ ] `.env` encrypted with `npx dotenvx encrypt`
- [ ] `.env.keys` exists locally and is in `.gitignore`
- [ ] Repository imported with `./import.sh` or manual import
- [ ] `terraform plan` reviewed and shows expected changes
- [ ] `terraform apply` executed
- [ ] Branch protection rules visible in GitHub Settings
- [ ] Issue labels created in GitHub
- [ ] Security settings enabled (Dependabot, secret scanning)
- [ ] Workflow file `.github/workflows/github-infra-deploy.yml` present
- [ ] Secrets added to GitHub Actions if needed

## Next Steps

1. ✅ Create GitHub Personal Access Token
2. ✅ Set up and encrypt `.env` file
3. ✅ Import existing repository
4. ✅ Review and apply configuration
5. Monitor repository changes in GitHub
6. Update configuration as needs change
7. Rotate tokens every 90 days

---

**Documentation created:** April 10, 2026
**Terraform Version:** 1.10.5
**GitHub Provider Version:** 6.2.1
