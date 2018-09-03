#!/bin/bash
### Build script for Iguana application for Linux x64 platform.
### Created by mmaxian, 3/2017; updated by Asher Dawes 7/2018

electron-packager . --platform=linux --arch=x64 \
  --icon=assets/icons/agama_icons/128x128.png \
  --out=build/ \
  --ignore=assets/bin/win64 \
  --ignore=assets/bin/osx \
  --ignore=react/node_modules \
  --ignore=react/src \
  --ignore=react/www \
  --ignore=buildscripts\
  --ignore=windeps \
  --ignore=.travis.yml \
  --ignore=check_submodule.sh \
  --ignore=.gitlab-ci.yml \
  --ignore=.gitignore \
  --ignore=.gitmodules \
  --ignore=binary_artifacts_win.sh \
  --ignore=Brewfile \
  --ignore=make-deb.js \
  --ignore=make-patch.sh \
  --ignore=make-rpm.js \
  --ignore=README.md  \
  --ignore=version_build \
  --prune=true \
  --overwrite  \
  --buildVersion="$AGAMA_VERSION"-beta \
  --version-string.CompanyName="VerusCoin" \
  --version-string.FileDescription="Agama" \
  --version-string.OriginalFilename="Agama" \
  --version-string.ProductName="Agama" \
  --version-string.InternalName="Agama" \
  --app-copyright="Copyright (C) 2018 VerusCoin. All rights reserved."

