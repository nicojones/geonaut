#!/bin/bash

systemctl stop geonaut

git checkout main
git branch -D next-build
git checkout --orphan next-build
git pull origin next-build

rm -rf node_modules
rm -rf __MACOSX

unzip -d . ../node_modules.zip | awk 'BEGIN {ORS=" "} {if(NR%20==0)print "."}'
rm -rf __MACOSX

systemctl start geonaut
