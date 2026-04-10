# Vercel Infra Summary

## What Is Managed
- Vercel project configuration via Terraform in `infra/vercel/web/src/`.
- Environment-specific config in `config.development.json` and `config.production.json`.
- Deployment workflow in `.github/workflows/web-vercel-deploy.yml`.

## Required Secrets
- `DOTENV_PRIVATE_KEY`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `TERRAFORM_STATE_ENCRYPT_KEY`

## Quick Commands
```bash
cd infra/vercel/web/src
dotenvx run -- terraform init
dotenvx run -- terraform plan -var-file="config.development.json"
dotenvx run -- terraform apply -var-file="config.development.json"
```

## Notes
- Keep `.env.keys` private and never commit it.
- The encrypted `.env` file can be committed.
