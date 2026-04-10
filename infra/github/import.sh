#!/bin/bash

# GitHub Repository Import Helper Script
# This script helps import the existing GitHub repository into Terraform state

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/src"

echo "🔧 GitHub Repository Terraform Import Helper"
echo "==========================================="
echo ""

# Check if .env exists and ask about encryption
if ! command -v npx &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Navigate up to check for parent .env
cd ..

if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found in infra/github/"
    echo ""
    echo "To set up the GitHub token:"
    echo "1. Create a Personal Access Token at https://github.com/settings/tokens/new"
    echo "2. Copy this template to .env:"
    echo ""
    echo "GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    echo "GITHUB_OWNER=lorenzogm"
    echo ""
    echo "3. Run: npx dotenvx encrypt"
    echo "4. Re-run this script"
    exit 1
fi

if [ ! -f ".env.keys" ]; then
    echo "⚠️  .env.keys file not found"
    echo "Encrypting .env file..."
    npx dotenvx encrypt
fi

echo "✅ Environment configuration found"
echo ""

# Step 1: Initialize Terraform
echo "📦 Step 1: Initializing Terraform..."
npx dotenvx run -- bash -c 'export TF_VAR_GITHUB_TOKEN="${GH_PAT_TOKEN:-$GITHUB_TOKEN}"; export TF_VAR_GITHUB_OWNER="$GITHUB_OWNER"; cd src && terraform init'
echo "✅ Terraform initialized"
echo ""

# Step 2: Decrypt environment and verify connection
echo "🔐 Step 2: Verifying GitHub connection..."
TOKEN_CHECK=$(npx dotenvx run -- bash -c 'TOKEN="${GH_PAT_TOKEN:-$GITHUB_TOKEN}"; curl -s -H "Authorization: Bearer $TOKEN" https://api.github.com/user | grep -o "\"login\"" || echo "FAILED"')

if [ "$TOKEN_CHECK" = "FAILED" ]; then
    echo "❌ GitHub authentication failed"
    echo "Please check GH_PAT_TOKEN or GITHUB_TOKEN in .env"
    exit 1
fi

echo "✅ GitHub authentication successful"
echo ""

# Step 3: Import the repository
echo "📥 Step 3: Importing existing repository into Terraform state..."
echo "This will:"
echo "  - Fetch the current 'lorenzogm' repository from GitHub"
echo "  - Store its current state in Terraform"
echo "  - Allow management via configuration files"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

# Import the repository (for development)
echo ""
echo "Importing repository state..."
npx dotenvx run -- bash -c 'export TF_VAR_GITHUB_TOKEN="${GH_PAT_TOKEN:-$GITHUB_TOKEN}"; export TF_VAR_GITHUB_OWNER="$GITHUB_OWNER"; cd src && terraform import -var-file="config.json" github_repository.main lorenzogm'

if [ $? -eq 0 ]; then
    echo "✅ Repository imported successfully"
else
    echo "⚠️  Import may have failed. Check the error message above."
    echo "This could happen if:"
    echo "  - Repository name is different"
    echo "  - Token doesn't have permission to access the repository"
    echo "  - Repository belongs to an organization (not personal account)"
fi

echo ""
echo "📋 Step 4: Reviewing configuration..."
echo ""
echo "Run this command to see proposed changes:"
echo ""
echo "    cd infra/github/src"
echo "    dotenvx run -- terraform plan -var-file='config.json'"
echo ""
echo "Then apply changes with:"
echo ""
echo "    dotenvx run -- terraform apply -var-file='config.json'"
echo ""
echo "✅ Import helper completed!"
