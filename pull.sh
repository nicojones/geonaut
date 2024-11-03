#!/bin/bash

systemctl stop geonaut

git checkout main
git branch -D next-build
git checkout --orphan next-build
git pull origin next-build

rm -rf node_modules
rm -rf __MACOSX

unzip -d . ../node_modules.zip
rm -rf __MACOSX

systemctl start geonaut
