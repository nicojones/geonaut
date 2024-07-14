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

# Step 3: Create a new branch called build (if it doesn't exist already)
if git show-ref --quiet refs/heads/build; then
  git checkout build
else
  git checkout -b build
fi

# Step 4: Remove all files in the current branch except for .next
find . -maxdepth 1 ! -name '.next' ! -name 'node_modules' ! -name '.' -exec rm -rf {} \;

# Step 5: Move the contents of the .next directory to the root
mv .next/* .

# Step 6: Add all the files and commit
git add .
git commit -m "Build: deploy build to build branch"

# Step 7: Push the branch to GitHub
git push origin build

echo "Build pushed to the build branch on GitHub."

# Step 8: Switch back to main
git checkout main
