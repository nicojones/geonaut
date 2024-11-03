#!/bin/bash

echo "Stopping geonaut..."
systemctl stop geonaut

echo "Checking out the new build (orphan branch)"
git checkout main
git branch -D next-build
git checkout --orphan next-build
git pull origin next-build

echo "Cleaning up old files..."
rm -rf node_modules
rm -rf __MACOSX

echo "Unzipping node_modules.zip ..."
unzip -d . ../node_modules.zip | awk 'BEGIN {ORS=""} {if(NR%1000==0)print "."}'
rm -rf __MACOSX

echo "Starting geonaut..."
systemctl start geonaut

echo "🎉 Started! https://travel.kupfer.es"
