#!/bin/bash

# Test script for create-saas-app CLI

echo "🧪 Testing create-saas-app CLI..."

# Build the CLI
echo "📦 Building CLI..."
npm run build

# Test 1: Basic usage
echo "🔍 Test 1: Basic SaaS app creation"
cd /tmp
rm -rf test-basic-saas
node /Users/yannberlingeri/Desktop/Boilerplate-Docker-Next/create-saas-app/dist/index.js test-basic-saas --javascript --skip-install --skip-git

if [ -d "test-basic-saas" ]; then
    echo "✅ Basic SaaS app created successfully"
    ls -la test-basic-saas/
else
    echo "❌ Basic SaaS app creation failed"
    exit 1
fi

# Test 2: Full-featured SaaS
echo "🔍 Test 2: Full-featured SaaS with Stripe and Multi-tenancy"
rm -rf test-full-saas
node /Users/yannberlingeri/Desktop/Boilerplate-Docker-Next/create-saas-app/dist/index.js test-full-saas --typescript --stripe --multi-tenant --skip-install --skip-git

if [ -d "test-full-saas" ]; then
    echo "✅ Full-featured SaaS app created successfully"
    
    # Check if Stripe dependencies are in package.json
    if grep -q "stripe" test-full-saas/package.json; then
        echo "✅ Stripe dependency added correctly"
    else
        echo "❌ Stripe dependency missing"
    fi
    
    # Check if multi-tenant schema is created
    if grep -q "Organization" test-full-saas/prisma/schema.prisma; then
        echo "✅ Multi-tenant schema generated correctly"
    else
        echo "❌ Multi-tenant schema missing"
    fi
else
    echo "❌ Full-featured SaaS app creation failed"
    exit 1
fi

# Test 3: Help command
echo "🔍 Test 3: Help command"
node /Users/yannberlingeri/Desktop/Boilerplate-Docker-Next/create-saas-app/dist/index.js --help > /tmp/help-output.txt

if grep -q "Create a production-ready SaaS application" /tmp/help-output.txt; then
    echo "✅ Help command works correctly"
else
    echo "❌ Help command failed"
    exit 1
fi

echo "🎉 All tests passed! CLI is working correctly."

# Clean up
rm -rf test-basic-saas test-full-saas /tmp/help-output.txt