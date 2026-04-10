# GitHub Infra Summary

## What Is Managed
- Repository settings, branch protections, labels, and security options.
- Terraform config location: `infra/github/src/`.
- Deployment workflow: `.github/workflows/github-infra-deploy.yml`.

## First-Time Setup
1. Create a GitHub PAT with repo administration/workflow permissions.
2. Put it in `infra/github/.env` as `GITHUB_TOKEN`.
3. Encrypt with `npx dotenvx encrypt`.
4. Import the existing repo into Terraform state.

## Import Existing Repo
```bash
cd infra/github/src
dotenvx run -- terraform init
dotenvx run -- terraform import -var-file="config.json" github_repository.main lorenzogm
```

## Required Secret
- `GITHUB_TOKEN` (for the workflow)
