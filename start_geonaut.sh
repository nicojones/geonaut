#!/bin/bash

# TO STOP THE SCRIPT:
# ps aux | grep start_geonaut.sh
# kill -9 <PID>
# then you can start it again

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
