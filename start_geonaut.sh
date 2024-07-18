#!/bin/bash

# Function to stop the script
stop_script() {
    echo "Stopping the script..."
    PID=$(ps aux | grep 'next-server' | awk '{print $2}')
    if [ -z "$PID" ]; then
        echo "No running script found."
    else
        kill -9 $PID
        echo "Script stopped successfully."
    fi
}

check_git_status() {
  # Check if there are any uncommitted changes
  if [[ -n $(git status --porcelain) ]]; then
    echo "There are uncommitted changes. Please commit or stash them."
    return 1
  fi

  # Check if the local branch is up to date with the remote branch
  git fetch

  LOCAL=$(git rev-parse @)
  REMOTE=$(git rev-parse @{u})
  BASE=$(git merge-base @ @{u})

  if [ $LOCAL = $REMOTE ]; then
    echo "Branch is up to date with the remote."
  elif [ $LOCAL = $BASE ]; then
    echo "Branch is behind the remote. Pulling latest changes..."
    git pull
  elif [ $REMOTE = $BASE ]; then
    echo "Branch is ahead of the remote. Push your changes."
    return 1
  else
    echo "Branch has diverged from the remote. Resolve the divergence."
    return 1
  fi

  echo "Workspace is clean and branch is up to date."
  return 0
}

# Check for --stop argument
if [ "$1" == "--stop" ]; then
    stop_script
    exit 0

elif [ "$1" == "--restart" ]; then
    stop_script
    # do not exit
fi

# Exit immediately if a command exits with a non-zero status
set -e

echo "cd to folder..."
cd /var/www/geonaut/nextjs

echo "check if branch is up-to-date..."
check_git_status

echo "running npm install..."
/usr/bin/node /usr/bin/npm i

echo "generating production build..."
/usr/bin/node /usr/bin/npm run build:prod -- -d

echo "starting server"
nohup /usr/bin/node /usr/bin/npm run start > /var/log/geonaut.log 2>&1 &
