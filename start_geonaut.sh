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

# Check for --stop argument
if [ "$1" == "--stop" ]; then
    stop_script
    exit 0
fi

set -e  # Exit immediately if a command exits with a non-zero status

echo "cd to folder"
cd /var/www/geonaut/nextjs

echo "pull latest changes"
git pull origin main

echo "running npm install..."
/usr/bin/node /usr/bin/npm i

echo "generating production build..."
/usr/bin/node /usr/bin/npm run build:prod -- -d

echo "starting server"
nohup /usr/bin/node /usr/bin/npm run start > /var/log/geonaut.log 2>&1 &
