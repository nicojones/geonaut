#!/bin/bash

echo "cd to folder"
cd /var/www/geonaut/nextjs

echo "running npm install..."
npm i

echo "generating production build..."
npm run build:prod

echo "starting server"
npm run start
