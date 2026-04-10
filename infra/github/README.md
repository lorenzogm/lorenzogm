# GitHub Repository Infrastructure

This directory contains Terraform configuration for managing the GitHub repository via Infrastructure as Code.

## Overview

The GitHub repository (`lorenzogm`) is managed through Terraform to ensure consistent configuration across:
- Repository settings and metadata
- Branch protection rules
- Issue labels
- Security and analysis features
- GitHub Actions secrets and variables

## Structure

```
infra/github/
├── .env                      # Encrypted GitHub credentials (committed to git)
├── .env.keys                 # PRIVATE - Keep locally, ignore in .gitignore
├── .env.example              # Template showing required variables
├── .gitignore                # Configured to ignore .env.keys
└── src/
    ├── providers.tf          # GitHub provider configuration
    ├── variables.tf          # Input variables
    ├── main.tf               # Repository resources and configurations
    ├── config.json  # Development environment variables
    └── config.json   # Production environment variables
```

## Initial Setup: Importing Existing Repository

Since the repository already exists and was not created by Terraform, it needs to be imported into the Terraform state.

### Step 1: Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens/new
2. Select token type: **Personal access tokens (fine-grained)**
3. Name: `terraform-github-repo`
4. Expiration: Recommended 90 days, renewable
5. Repository access: **Only select repositories** → Select "lorenzogm"
6. Permissions needed:
   - Repository:
     - ✅ Administration (read & write)
     - ✅ Actions (read & write)
     - ✅ Contents (read only)
     - ✅ Issues (read & write)
     - ✅ Workflows (read & write)
   - Organization:
     - ✅ GitHub App installation (read only)
7. Click **"Generate token"**
8. **Copy the token** (you won't see it again)

### Step 2: Create .env File

```bash
cd infra/github

# Create .env with your credentials
cat > .env << EOF
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=lorenzogm
EOF

# Encrypt the .env file
npx dotenvx encrypt

# Verify encryption (delete the plaintext)
# The .env.keys file now contains the decryption key
```

### Step 3: Import Existing Repository into Terraform State

```bash
cd infra/github/src

# First, initialize Terraform
dotenvx run -- terraform init

# Import the existing GitHub repository
# This tells Terraform: "This resource already exists, manage it from now on"
dotenvx run -- terraform import -var-file="config.json" \
  github_repository.main lorenzogm
```

The output will show:
```
githubrepository.main: Importing from ID "lorenzogm"...
githubrepository.main: Import successful!
```

### Step 4: Verify Terraform State

```bash
# Check what Terraform knows about the repository
dotenvx run -- terraform state list

# Should show:
# data.github_repository.main
# github_repository.main
```

### Step 5: Plan Changes

First-time plan will show changes to align the current repository settings with desired configuration:

```bash
dotenvx run -- terraform plan -var-file="config.json"
```

Review the planned changes carefully. You'll likely see some resources being created (labels, branch protection) and some existing settings being updated to match the configuration.

### Step 6: Apply Configuration

```bash
dotenvx run -- terraform apply -var-file="config.json"
```

Terraform will now:
1. Create/update repository settings
2. Create branch protection rules
3. Create issue labels
4. Configure security settings
5. Set up any defined secrets/variables

## Local Development

### Load Environment Variables

All Terraform commands must decrypt credentials first:

```bash
cd infra/github/src

# Option 1: Wrap commands with dotenvx run
dotenvx run -- terraform plan -var-file="config.json"

# Option 2: Export vars and use directly (if .env.keys exists in parent dir)
cd infra/github
eval "$(dotenvx run --env-file=.env -- printenv)"
export GITHUB_TOKEN GITHUB_OWNER

# Now terraform can be run without dotenvx
cd src
terraform plan -var-file="config.json"
```

### Making Changes

1. Update the desired config file:
   ```bash
   # Edit the configuration
   nano src/config.json
   ```

2. Plan the changes:
   ```bash
   dotenvx run -- terraform plan -var-file="config.json" -out=tfplan
   ```

3. Review the plan output carefully

4. Apply changes:
   ```bash
   dotenvx run -- terraform apply tfplan
   ```

## GitHub Actions Secrets and Variables

### Adding Secrets to GitHub Actions

Secrets are sensitive values that should not be visible in logs.

```bash
# Edit the configuration to include a secret
# In config.[environment].json:
"secrets": {
  "MY_SECRET_NAME": "secret-value"
}

# Apply the configuration
dotenvx run -- terraform apply -var-file="config.json"

# Verify in GitHub:
# Settings → Secrets and variables → Actions → Repository secrets
```

### Adding Variables to GitHub Actions

Variables are non-sensitive and visible in logs.

```bash
# In config.[environment].json:
"variables": {
  "MY_PUBLIC_VAR": "public-value"
}

# Apply the configuration
dotenvx run -- terraform apply -var-file="config.json"

# Verify in GitHub:
# Settings → Secrets and variables → Actions → Variables
```

## Branch Protection Rules

The configuration includes protection for the `main` and `terraform-state` branches:

- **main**: 
  - Requires status checks (PR Checks)
  - Requires code owner reviews (production only)
  - Requires pull request reviews
  - Requires linear history (no merge commits)
  - Dismisses stale reviews

- **terraform-state**:
  - Minimal protection (auto-generated branch)
  - Can be force-pushed in production to manage state

### Customize Branch Protection

Edit the `branch_protections` array in config files:

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

## Issue Labels

Custom labels help organize issues and pull requests:

- **bug**: Something isn't working
- **enhancement**: New feature or request
- **documentation**: Documentation improvements
- **chore**: Maintenance tasks
- **infra**: Infrastructure changes
- **content**: Blog content
- **good first issue**: Good for newcomers

Add more labels in the `labels` array in config files.

## Security and Analysis

The configuration enables:
- ✅ Secret scanning (detects exposed credentials)
- ✅ Secret scanning push protection (prevents pushing secrets)
- ✅ Dependabot alerts (security vulnerabilities in dependencies)
- ✅ Dependabot security updates (auto-update vulnerable packages)

These are set globally and cannot be overridden per-environment.

## Updating GitHub Token

If your GitHub token expires or is compromised:

### 1. Generate New Token

1. Go to https://github.com/settings/tokens
2. Delete the old `terraform-github-repo` token
3. Create a new token with the same scopes (steps in "Step 1" above)
4. Copy the new token

### 2. Update .env File

```bash
cd infra/github

# Edit .env with the new token
GITHUB_TOKEN=ghp_new_token_here

# Re-encrypt
npx dotenvx encrypt --overwrite

# Commit the updated encryption
git add .env
git commit -m "chore: rotate GitHub token"
git push
```

## Troubleshooting

### "Repository Not Found"

If you get an error like `Repository not found`, check:
1. Token has correct permissions (at least `repo` scope)
2. Token is not expired
3. Repository name is correct in `GITHUB_OWNER/repository.name`
4. Token can access your personal repositories

### "Authentication Failed"

```bash
# Verify the token works
dotenvx run -- bash -c 'curl -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/user'

# Should return your GitHub user info
```

### State Conflicts

If Terraform detects conflicts between your config and GitHub:

```bash
# Always review the plan first
dotenvx run -- terraform plan -var-file="config.json"

# If you want to keep GitHub's current settings:
# - Edit config.json to match GitHub
# - Re-run plan to verify no changes

# If you want Terraform to enforce your settings:
# - Apply the plan with: terraform apply
# - Terraform will update GitHub to match config
```

## Integration with Deployment Pipeline

The GitHub infrastructure is managed separately from Vercel deployment, but they work together:

1. **Vercel deployment pipeline** pushes to the `main` branch
2. **GitHub branch protection** requires status checks and reviews
3. **GitHub repository configuration** enforces code quality standards
4. **Terraform manages** all of this consistently

## Security Best Practices

1. **Never commit .env.keys**
   - Already in .gitignore for this reason
   - Store safely locally or in secure location

2. **Rotate tokens regularly**
   - Recommended every 90 days
   - Use fine-grained tokens with minimal required permissions

3. **Review GitHub Actions logs**
   - Credentials are never logged (encrypted .env prevents this)
   - Check repository visibility if public

4. **Monitor branch protection changes**
   - Terraform should be the source of truth
   - Manual GitHub changes will be overwritten on next apply

5. **Use GitHub's audit logs**
   - Review recent actions in Settings → Audit log
   - Ensure no unexpected changes

## References

- [Terraform GitHub Provider](https://registry.terraform.io/providers/integrations/github/latest/docs)
- [GitHub Personal Access Tokens](https://github.com/settings/tokens)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

## Files Checklist

- [ ] `.env` created and encrypted
- [ ] `.env.keys` kept locally (in .gitignore)
- [ ] GitHub token created with correct permissions
- [ ] Repository imported into Terraform state
- [ ] First `terraform plan` reviewed
- [ ] Configuration applied with `terraform apply`
- [ ] Branch protection rules verified in GitHub
- [ ] Issue labels created
- [ ] Security settings enabled
