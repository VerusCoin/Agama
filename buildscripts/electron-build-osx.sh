#!/bin/bash
### Build script for Agama application for MacOS platform.
### Created by mmaxian, 3/2017; updated by David Dawes 5/2018

[ -z $AGAMA_VERSION ] && echo "AGAMA_VERSION variable is not set." && exit 0
[ ! -d build ] && mkdir build

echo
echo "Build script for Agama application for MacOS platform."
echo "Preparing electron package $AGAMA_VERSION"

electron-packager . --platform=darwin --arch=x64 \
  --icon=assets/icons/agama_app_icon.icns \
  --out=build/ --buildVersion=$AGAMA_VERSION \
  --ignore=assets/bin/win64 \
  --ignore=assets/bin/linux64 \
  --ignore=react/node_modules \
  --ignore=react/src \
  --ignore=react/www \
  --overwrite
