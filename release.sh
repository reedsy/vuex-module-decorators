#!/bin/bash

VERSION="$(node -p "require('./package.json').version")"

git checkout main
git pull
git fetch --tags
VERSION_COUNT=$(git tag --list $VERSION | wc -l)

if [ $VERSION_COUNT -gt 0 ]
then
  echo "Version $VERSION already deployed"
  exit 0
else
  echo "Deploying version $VERSION"
fi

echo '!/dist' >> .gitignore

git tag $VERSION
git push origin refs/tags/$VERSION

npm publish
