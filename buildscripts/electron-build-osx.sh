#!/bin/bash
### Build script for Agama application for MacOS platform.
### Created by mmaxian, 3/2017; updated by David Dawes 5/2018; updated by Asher Dawes 7/2018

electron-packager . --platform=darwin \
  --arch=x64 \
  --icon=assets/icons/agama_app_icon.icns \
  --out=build/  \
  --ignore=Verus* \
  --ignore=assets/bin/win64 \
  --ignore=assets/bin/linux64 \
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
