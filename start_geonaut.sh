#!/bin/bash

echo "cd to folder"
cd /var/www/geonaut/nextjs

echo "pull latest changes"
git pull origin main

echo "running npm install..."
/usr/bin/node /usr/bin/npm i

echo "generating production build..."
/usr/bin/node /usr/bin/npm run build:prod -- -d

echo "starting server"
/usr/bin/node /usr/bin/npm run start
