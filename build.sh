#!/bin/bash

# Step 0: Install everything
npm i

# Step 1: Run the build command
npm run build

# Step 2: Check if the BUILD_ID file exists in the .next directory
if [ ! -f ".next/BUILD_ID" ]; then
  echo "BUILD_ID file does not exist. Make sure the build process was successful."
  exit 1
fi

# Step 3: Remove old `next-build` branch and create a new one
git branch -D next-build
git checkout --orphan next-build

rm -rf .next/cache

# Step 4: Remove all files in the current branch except for .next
find . -maxdepth 1 ! -name '.next' ! -name '.git' ! -name '.env.production' ! -name 'package.json' -exec rm -rf {} \;

# Step 6: Add all the files and commit
git add .
git commit -m "Build: deploy build to build branch"

# Step 7: Push the branch to GitHub
git push origin next-build

echo "Build pushed to the build branch on GitHub."

# Step 8: Switch back to main
git checkout main

# Step 9: Delete branch (again)
git branch -D next-build
