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

elif [ "$1" == "--restart" ]; then
    stop_script
    # do not exit
fi

# Exit immediately if a command exits with a non-zero status
set -e

echo "cd to folder..."
cd /var/www/geonaut/nextjs

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Load nvm
nvm use 20 # Use Node 20

echo "starting server"
npm run start
