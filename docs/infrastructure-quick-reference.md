# Infrastructure Quick Reference

## Main Paths
- Vercel infra: `infra/vercel/web/src/`
- GitHub infra: `infra/github/src/`
- Workflows: `.github/workflows/`

## Common Commands
```bash
# Vercel
cd infra/vercel/web/src
dotenvx run -- terraform plan -var-file="config.development.json"

# GitHub
cd infra/github/src
dotenvx run -- terraform plan -var-file="config.json"
```

## Workflow Triggers
- `web-vercel-deploy.yml`: app + Vercel infra deployment flow.
- `github-infra-deploy.yml`: GitHub repository infra changes.

## Minimal Checklist
1. Configure required GitHub secrets.
2. Run Terraform plan before apply.
3. Keep `.env.keys` out of git.
