# Infrastructure Setup Guide - Vercel Deployment

This guide documents the complete setup for secure Vercel deployment with dotenvx encryption.

## Overview

The deployment pipeline uses:
- **Terraform** for infrastructure management (Vercel projects)
- **dotenvx** for encrypting sensitive credentials
- **GitHub Actions** for CI/CD workflow automation
- **Vercel CLI** for building and deploying applications

## Files and Structure

```
infra/vercel/web/
├── .env                      # Encrypted Vercel credentials (committed to git)
├── .env.keys                 # PRIVATE - Keep locally, ignore in .gitignore
├── .env.example              # Template showing required variables
├── .gitignore                # Configured to ignore .env.keys only
└── src/
    ├── main.tf               # Vercel project resource definitions
    ├── variables.tf          # Input variables including VERCEL_TOKEN
    ├── providers.tf          # Terraform provider configuration
    ├── config.development.json  # Development environment variables
    └── config.production.json   # Production environment variables
```

## Setup Instructions

### 1. Local Development Setup

#### Generate Encryption Keys

If starting fresh (already done for this project):

```bash
cd infra/vercel/web
npx dotenvx encrypt
```

This creates:
- `.env` - Encrypted credentials file (can be committed)
- `.env.keys` - Private decryption key (MUST NOT be committed)

#### Load Environment Variables Locally

For local Terraform commands:

```bash
cd infra/vercel/web
dotenvx run -- terraform init
dotenvx run -- terraform plan -var-file="config.development.json"
```

### 2. GitHub Actions Secret Configuration

You MUST set up the following secrets in your GitHub repository:

**Go to:** Settings → Secrets and variables → Actions → New repository secret

#### Required Secrets:

1. **DOTENV_PRIVATE_KEY**
   - Value: Contents of `infra/vercel/web/.env.keys`
   - Extract: `grep DOTENV_PRIVATE_KEY infra/vercel/web/.env.keys | cut -d= -f2`
   - Purpose: Decrypt Terraform environment variables in CI/CD

2. **VERCEL_TOKEN** (for deploy-preview and deploy-production jobs)
   - Value: Your Vercel API token (full access)
   - Get from: https://vercel.com/account/tokens
   - Purpose: Deploy to Vercel in preview and production

3. **VERCEL_ORG_ID** (for deploy-preview and deploy-production jobs)
   - Value: Your Vercel organization/team ID
   - Get from: https://vercel.com/account/settings
   - Purpose: Associate deployment with your team

4. **TERRAFORM_STATE_ENCRYPT_KEY** (for state file encryption)
   - Value: A secure random string (generate: `openssl rand -hex 32`)
   - Purpose: Encrypt Terraform state file before committing to terraform-state branch

### 3. GitHub Actions Environment Configuration

The workflow uses GitHub environments for production/development gate control.

**Development Environment:**
- Location: Settings → Environments → New environment → "development"
- Configure deployment branches (optional)

**Production Environment:**
- Location: Settings → Environments → New environment → "production"  
- Add required reviewers before deployment (recommended)

### 4. Enable Terraform State Branch

The workflow creates a `terraform-state` branch to store encrypted Terraform state files.

This is created automatically on the first deployment run. No manual setup needed.

## Deployment Workflow

### Automatic Deployment (on push to main)

Triggers on any push to `main` branch:

```yaml
on:
  push:
    branches: [main]
```

**Flow:**
1. **Check Changes** - Determine if infra or app changed
2. **Infra Deploy** (if infra changed)
   - Decrypt .env file using DOTENV_PRIVATE_KEY
   - Import existing Vercel project if state doesn't exist
   - Run Terraform plan and apply
   - Export project ID to repository variables
   - Encrypt state and commit to terraform-state branch
3. **Deploy Preview** (if app changed)
   - Build and deploy to Vercel preview
   - Generate preview URL
4. **E2E Tests** (if preview deploy succeeds)
   - Run Playwright tests against preview URL
5. **Deploy Production** (if e2e tests pass)
   - Deploy to production (only if changes detected)

### Manual Deployment (workflow_dispatch)

**Trigger manually:**

Settings → Actions → Web [Vercel] Deploy → Run workflow

**Options:**
- Choose environment: `development` or `production`
- Deploys both infra and app regardless of changes

## Troubleshooting

### DOTENV_PRIVATE_KEY Secret Not Set

**Error:** `DOTENV_PRIVATE_KEY secret is not set in GitHub Actions`

**Fix:** 
1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Add new secret `DOTENV_PRIVATE_KEY`
3. Paste value from: `grep DOTENV_PRIVATE_KEY infra/vercel/web/.env.keys | cut -d= -f2`

### Terraform State Decryption Failed

**Error:** `Failed to decrypt state file`

**Possible causes:**
- Wrong TERRAFORM_STATE_ENCRYPT_KEY
- State file corrupted
- First deployment (no existing state is OK)

**Fix:**
- Regenerate state key: `openssl rand -hex 32`
- Update TERRAFORM_STATE_ENCRYPT_KEY secret
- Delete terraform-state branch to start fresh (if safe)

### Vercel Project Import Failed

**Error:** `No existing project found, proceeding with fresh creation`

**This is normal.** On first deployment, Terraform will create a new Vercel project.
On subsequent deployments, it will be found and imported.

## Updating Credentials

### If Vercel Token Expires

1. Generate new token at https://vercel.com/account/tokens
2. Update GitHub secrets: VERCEL_TOKEN
3. Re-encrypt .env file locally:
   ```bash
   # Edit .env with new token
   nano infra/vercel/web/.env
   
   # Re-encrypt (requires .env.keys locally)
   cd infra/vercel/web
   npx dotenvx encrypt --overwrite
   
   # Commit the new encrypted .env
   git add infra/vercel/web/.env
   git commit -m "chore: rotate Vercel token"
   ```

### If DOTENV_PRIVATE_KEY Compromised

⚠️ **Critical Security Issue**

1. Regenerate keys immediately:
   ```bash
   cd infra/vercel/web
   rm .env.keys .env
   npx dotenvx encrypt  # Re-encrypt with new keys
   ```

2. Update in GitHub:
   - Add new `DOTENV_PRIVATE_KEY` secret
   - Commit new `.env` file
   - The old key becomes useless

## Testing the Setup

### Verify Local Decryption

```bash
cd infra/vercel/web
dotenvx run -- bash -c 'echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"'
```

Should output your organization ID (not "encrypted:...").

### Test Terraform (Development)

```bash
cd infra/vercel/web
dotenvx run -- terraform init
dotenvx run -- terraform plan -var-file="config.development.json"
```

### Trigger Manual Deployment

1. Go to Settings → Actions → Web [Vercel] Deploy
2. Click "Run workflow"
3. Select environment: "development"
4. Monitor the workflow run in Actions tab

## Security Best Practices

1. **Never commit .env.keys**
   - Already in .gitignore
   - Only you should have access locally

2. **Rotate tokens regularly**
   - Consider quarterly rotation
   - Update both locally and in GitHub secrets

3. **Use environment-specific secrets**
   - Separate dev and prod Vercel tokens (if possible)
   - Configure branch protections for production

4. **Monitor state file access**
   - State file stored in terraform-state branch
   - Encrypted with TERRAFORM_STATE_ENCRYPT_KEY
   - Consider branch protection rules

5. **Review GitHub Actions logs**
   - Check Actions tab for any failures
   - No credentials are logged (encrypted .env prevents this)

## References

- [dotenvx Documentation](https://dotenvx.com)
- [Vercel Terraform Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [Terraform Backend State Management](https://www.terraform.io/language/state)

## Next Steps

1. ✅ Add DOTENV_PRIVATE_KEY to GitHub Actions secrets
2. ✅ Add VERCEL_TOKEN to GitHub Actions secrets  
3. ✅ Add VERCEL_ORG_ID to GitHub Actions secrets
4. ✅ Add TERRAFORM_STATE_ENCRYPT_KEY to GitHub Actions secrets
5. Trigger a manual workflow run to test
6. Monitor progress in Actions tab
7. Review deployed Vercel projects in your account
