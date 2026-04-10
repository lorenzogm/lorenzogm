# Complete Infrastructure Setup - Vercel & GitHub

This document summarizes the complete Terraform infrastructure setup for both Vercel deployment and GitHub repository management.

## Architecture Overview

Your project uses a three-layer Terraform infrastructure:

```
┌─────────────────────────────────────────────────────────────┐
│                  Application Layer                           │
│              (Next.js Blog - src/, content/)                 │
│  ✅ Deployed to Vercel via web-vercel-deploy workflow       │
└─────────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────────┐
│             GitHub Repository Management                     │
│           (infra/github/ - Settings, Labels,           │
│            Branch Protection, Security Features)             │
│  ✅ Managed by github-infra-deploy workflow                 │
└─────────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────────┐
│          Vercel Project & Deployment Infrastructure         │
│        (infra/vercel/web/ - Projects, Domains,              │
│              Environment Variables)                          │
│  ✅ Managed by web-vercel-deploy workflow                   │
└─────────────────────────────────────────────────────────────┘
```

## Quick Reference

### Vercel Infrastructure

**Location:** `infra/vercel/web/`

**Manages:**
- ✅ Vercel projects (development & production)
- ✅ Domain configuration (lorenzogm.com)
- ✅ Deployment environment variables
- ✅ Build settings

**Encryption Key:**
```
b6a408995a85832f96fc842bea915999eead093fc86aac0ceef88e9bcbd2bb15
```

**Trigger:** Changes to `infra/vercel/web/src/` or push to `main`

**Secrets Required:**
- `DOTENV_PRIVATE_KEY` - Decrypts Terraform credentials
- `VERCEL_TOKEN` - Full access API token
- `VERCEL_ORG_ID` - Organization/team ID
- `TERRAFORM_STATE_ENCRYPT_KEY` - Encrypts state file

### GitHub Infrastructure

**Location:** `infra/github/`

**Manages:**
- ✅ Repository settings (visibility, merge strategy, etc.)
- ✅ Branch protection rules (main, terraform-state)
- ✅ Issue labels (bug, enhancement, documentation, etc.)
- ✅ Security features (secret scanning, Dependabot)
- ✅ GitHub Actions secrets and variables

**Encryption Key:**
```
cdf90b77e700269d267259f29b71228fa9c1886ef973b712fb28e120e6cfce7d
```

**Trigger:** Changes to `infra/github/src/` or manual trigger

**Secrets Required:**
- `DOTENV_PRIVATE_KEY` - Decrypts Terraform credentials (shared)
- `GITHUB_TOKEN` - Personal access token (fine-grained recommended)

## File Structure Summary

```
.github/
├── workflows/
│   ├── web-vercel-deploy.yml          # Deploy app to Vercel
│   ├── github-infra-deploy.yml        # Manage GitHub repo
│   ├── pr-checks.yml                  # Code quality checks
│   ├── nextjs.yml                     # (Disabled)
│   └── linkedin-post.yml              # Social media posting

infra/
├── vercel/web/                        # Vercel infrastructure
│   ├── src/
│   │   ├── providers.tf               # Vercel provider config
│   │   ├── variables.tf               # Input variables
│   │   ├── main.tf                    # Project resources
│   │   ├── config.json    # Dev config
│   │   └── config.json     # Prod config
│   ├── .env                           # Encrypted credentials
│   ├── .env.example                   # Template
│   └── .gitignore                     # Git ignore rules
│
└── github/                       # GitHub infrastructure
    ├── src/
    │   ├── providers.tf               # GitHub provider config
    │   ├── variables.tf               # Input variables
    │   ├── main.tf                    # Repository resources
    │   ├── config.json    # Dev config
    │   └── config.json     # Prod config
    ├── .env                           # Encrypted credentials
    ├── .env.example                   # Template
    ├── .gitignore                     # Git ignore rules
    ├── import.sh                      # Import helper script
    └── README.md                      # Detailed documentation

docs/
├── infra-setup-guide.md               # Vercel infra documentation
├── github-infra-setup-guide.md        # GitHub infra documentation
└── (other documentation)

package.json                           # Includes @dotenvx/dotenvx
```

## Encryption & Security

### Encryption Method: dotenvx

Both infrastructure setups use **dotenvx** for symmetric encryption:

**How it works:**
1. .env file contains sensitive credentials
2. `npx dotenvx encrypt` encrypts the file in-place
3. `.env.keys` contains the private decryption key (NOT committed)
4. In CI/CD: `DOTENV_PRIVATE_KEY` secret in GitHub Actions decrypts on demand
5. Credentials are never logged or exposed

**Advantages:**
- ✅ Simple symmetric encryption (single key)
- ✅ .env file can be safely committed (it's encrypted)
- ✅ No key rotation needed (key is the token itself)
- ✅ Works with any environment variables
- ✅ CI/CD friendly with GitHub Actions secrets

### Two Separate Encryption Keys

| Infrastructure | Key | Location | Purpose |
|---|---|---|---|
| Vercel | `b6a408995a...` | `infra/vercel/web/.env.keys` | Decrypt Vercel token & org ID |
| GitHub | `cdf90b77e...` | `infra/github/.env.keys` | Decrypt GitHub token & owner |

Both keys need to be added as `DOTENV_PRIVATE_KEY` secret in GitHub Actions, but they're used in different workflows.

## Deployment Flow

### 1. Push to main branch

```
git push origin main
         ↓
├─ PR Checks (code quality)
│  ├─ Build application
│  ├─ Run linter
│  └─ Type checking
│
├─ Web [Vercel] Deploy (if app code changed)
│  ├─ Decrypt infra/.env
│  ├─ Deploy to Vercel preview
│  ├─ Run E2E tests
│  └─ Deploy to production (if tests pass)
│
└─ GitHub Infrastructure Deploy (if infra code changed)
   ├─ Decrypt infra/.env
   ├─ Apply Terraform config
   └─ Update GitHub repo settings
```

### 2. Manual deployment (workflow_dispatch)

```
GitHub Actions > Run Workflow > Select Environment
         ↓
Choose: development or production
         ↓
Same as above (but skips change detection)
```

### 3. Direct GitHub changes

⚠️ If you manually change settings in GitHub (Settings panel):
- Terraform will detect the change on next deployment
- `terraform plan` will show what needs to be updated
- Next `terraform apply` will revert to desired config

**Recommendation:** Always use Terraform for infrastructure changes.

## GitHub Actions Secrets Required

Go to: **Settings → Secrets and variables → Actions → New repository secret**

### Shared (Both Workflows)
```
Name: DOTENV_PRIVATE_KEY
Value: (Use the appropriate key for each infrastructure)
```

### Vercel (web-vercel-deploy)
```
Name: VERCEL_TOKEN
Value: (Personal access token from https://vercel.com/account/tokens)

Name: VERCEL_ORG_ID
Value: (Team ID from https://vercel.com/account/settings)

Name: TERRAFORM_STATE_ENCRYPT_KEY
Value: (Generated with: openssl rand -hex 32)
```

### GitHub (github-infra-deploy)
```
Name: GITHUB_TOKEN
Value: (Personal access token from https://github.com/settings/tokens)
```

## Managing Each Infrastructure Locally

### Vercel Infrastructure

```bash
cd infra/vercel/web

# Initialize
dotenvx run -- terraform init

# Plan changes
dotenvx run -- terraform plan -var-file="src/config.json"

# Apply changes
dotenvx run -- terraform apply -var-file="src/config.json"

# Import existing project
dotenvx run -- terraform import -var-file="src/config.json" \
  vercel_project.main <project-id>
```

### GitHub Infrastructure

```bash
cd infra/github

# Run import helper (easier!)
./import.sh

# Or manually:
cd src
dotenvx run -- terraform init
dotenvx run -- terraform import -var-file="config.json" \
  github_repository.main lorenzogm
```

## Configuration Management

### Development Configuration

Used for testing and personal development:

**Vercel** (`infra/vercel/web/src/config.json`):
- Project suffix: `-dev`
- No domain association
- Environment: development

**GitHub** (`infra/github/src/config.json`):
- No auto-merge approval required
- Fewer status checks
- No commit signature requirement

### Production Configuration

Used for live deployment:

**Vercel** (`infra/vercel/web/src/config.json`):
- Project suffix: `-prod`
- Domain: lorenzogm.com (primary) + www redirect
- Environment: production

**GitHub** (`infra/github/src/config.json`):
- Requires code owner reviews
- Requires 1 approval
- Requires signed commits (web_commit_signoff)
- Stricter status checks

## Updating Credentials

### Vercel Token Rotation

```bash
# 1. Generate new token at https://vercel.com/account/tokens

# 2. Update local .env
cd infra/vercel/web
# Edit .env and update VERCEL_TOKEN

# 3. Re-encrypt
npx dotenvx encrypt --overwrite

# 4. Commit
git add .env
git commit -m "chore: rotate Vercel token"
git push
```

### GitHub Token Rotation

```bash
# 1. Generate new token at https://github.com/settings/tokens

# 2. Update local .env
cd infra/github
# Edit .env and update GITHUB_TOKEN

# 3. Re-encrypt
npx dotenvx encrypt --overwrite

# 4. Commit
git add .env
git commit -m "chore: rotate GitHub token"
git push
```

## Troubleshooting

### "DOTENV_PRIVATE_KEY not set"

The secret is missing from GitHub Actions.

**Fix:**
1. Go to Settings → Secrets and variables → Actions
2. Add `DOTENV_PRIVATE_KEY` secret
3. Use the appropriate key for the infrastructure

### "Failed to decrypt"

Wrong encryption key, corrupt .env, or missing .env.keys locally.

**Fix:**
```bash
# Verify .env.keys exists
ls -la infra/*/repo/.env.keys

# Test decryption manually
cd infra/[vercel|github]/repo
npx dotenvx run -- echo "Decrypted!"
```

### Plan shows unexpected changes

Terraform state might be out of sync with GitHub/Vercel.

**Fix:**
```bash
# Refresh state
dotenvx run -- terraform refresh -var-file="config.json"

# Review plan
dotenvx run -- terraform plan -var-file="config.json"

# Investigate specific resource
dotenvx run -- terraform state show [resource.name]
```

### Import fails ("already exists")

Resource might already be in state.

**Fix:**
```bash
# Remove from state
dotenvx run -- terraform state rm [resource.name]

# Re-import
dotenvx run -- terraform import -var-file="config.json" \
  [resource.name] [external-id]
```

## Best Practices

1. **Always plan before apply**
   ```bash
   terraform plan > plan.txt  # Review plan.txt
   terraform apply            # Based on review
   ```

2. **Version control infrastructure code**
   - All .tf and .json files committed
   - .env files encrypted (safe to commit)
   - .env.keys files NEVER committed (in .gitignore)

3. **Separate environments**
   - Use different config files for dev/prod
   - Test changes in development first
   - Review production changes carefully

4. **Rotate tokens regularly**
   - Set calendar reminder (90 days)
   - Keep tokens with minimal necessary scope
   - Use fine-grained tokens when available

5. **Monitor changes**
   - Review GitHub Actions logs
   - Check Vercel and GitHub audit logs
   - Don't make manual changes bypassing Terraform

6. **Back up state**
   - Vercel state: Encrypted in `terraform-state` branch
   - GitHub state: Local only (fetched on each run)
   - Both: Can be exported with `terraform state pull`

## Documentation References

- **Vercel Setup:** [docs/infra-setup-guide.md](./infra-setup-guide.md)
- **GitHub Setup:** [docs/github-infra-setup-guide.md](./github-infra-setup-guide.md)
- **Vercel Infra README:** [infra/vercel/web/README.md](../infra/vercel/web/README.md)
- **GitHub Infra README:** [infra/github/README.md](../infra/github/README.md)

## Project Timeline

```
April 10, 2026
├─ Created Vercel infrastructure setup
├─ Encrypted Vercel credentials with dotenvx
├─ Created Vercel deploy workflow
├─ Created GitHub infrastructure setup
├─ Encrypted GitHub credentials with dotenvx
├─ Created GitHub deploy workflow
├─ Created import helper script
└─ Created comprehensive documentation
```

## Security Checklist

- [ ] All .env.keys files in .gitignore
- [ ] All .env files encrypted (contain "encrypted:" prefix)
- [ ] GitHub Actions secrets configured (4 for Vercel, 1 for GitHub)
- [ ] Personal access tokens have minimal necessary scopes
- [ ] No credentials visible in git history
- [ ] No credentials visible in logs
- [ ] Token rotation schedule set (every 90 days)
- [ ] Audit logs monitored for unexpected changes

## Next Steps

1. ✅ Create GitHub credentials and encrypt
2. ✅ Run import script for GitHub repo
3. ✅ Review terraform plan output
4. ✅ Apply GitHub infrastructure
5. Verify settings in GitHub Settings panel
6. Monitor initial deployments
7. Update documentation as needed
8. Set calendar reminder for token rotation

---

**Last Updated:** April 10, 2026  
**Terraform Version:** 1.10.5  
**Vercel Provider:** 1.11.0  
**GitHub Provider:** 6.2.1  
**dotenvx:** @dotenvx/dotenvx ^1.61.0
