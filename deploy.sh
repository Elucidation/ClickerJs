#!/bin/sh

# Start from master branch
git checkout master

# Create fresh dist/ folder
rm -rf dist/

# Run build
npm run build

# Move everything to dist/
rsync -r app/public/ dist/

# Switch to gh-pages branch
git checkout gh-pages

# Move everything from dist/ delete everything except dist & excluded
rsync --delete-after --recursive \
      --exclude=node_modules \
      --exclude=.git \
      --exclude=.gitignore \
      dist/ .

# Commit and push
git commit -am "deploy gh-pages"
git push

# Return to master branch
git checkout master
