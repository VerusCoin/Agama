# Verus Enhanced Agama Desktop App
Desktop Wallet App

## Resources
This project uses [EasyDEX-GUI](https://github.com/VerusCoin/EasyDEX-GUI), a React based Javascript GUI multicoin wallet, and [VerusCoin](https://github.com/VerusCoin/VerusCoin) the Komodo based ZCash wallet and miner.

Check [the VerusCoin github Wiki](https://github.com/VerusCoin/VerusCoin/wiki) for useful information about operating the wallet.
Also [check the Discord commnity](https://discordapp.com/channels/444621794964537354/449633547343495172)
This version adds portable VerusHash support for Linux. It was tested against Ubuntu LTS 16 & 18.
Version 0.5.4 Bug fixes, mining to public key option
Version 0.5.0 Switch to VerusHash2
Version 0.3.13c Integrates the Electrum Server and Verus lite support
Version 0.3.13b fixed balance verification on send.
Version 0.3.13a fixes an error in limiting transactions that can cause the GUI to complain that there are not enough funds to send a transaction when funds are sufficient and 
the list display showing incorrect blocks to maturity in some views.
Version 0.3.13 Introduced the ability to filter through transactions, added the option
to automatically load VRSC on startup, added a blocktype display in transaction info, 
fixed a bug where not all private transactions are shown, optimized the mining button, 
fixed a bug where the send all button would cause failed transactions, and fixed the 
search box
Version 0.3.12a fixes bugs in search function and mining button under Verus 
Version 0.3.12 fixes some portable miner issues
Version 0.3.11 introduced updates for unlocked era
Version 0.3.9 added better Mac integration & was tested against Mac OSX Sierra 10.12.6 and Mac OSX 10.13.5 High Sierra. There are no prerequisites for the Mac now, download the .dmg from the VerusCoin web site, click to mount it, and launch the Agama icon from the mounted drive on your desktop.

#### For Developers
You must have `node.js` and `npm` installed on your machine.

Check versions:
nodejs --version
v8.9.4

Easy-DEX-GUI is quite sensitive to the node version. 9.x fails for me, and older versions do as well. Make sure you're on 8.9.x. Installing nvm is probably a good idea, especially if you already have node installed but it is not a compatible version.

Other essential dependencies:
sudo apt-get install -y build-essential

1) Clone Agama Desktop App with EasyDEX-GUI submodule
```shell
git clone https://github.com/veruscoin/agama --recursive --branch dev --single-branch
```
with this command you git clone agama - but explicitly just the dev branch (therefore --single-branch) which we also use for the release packages. Pull the latest changes in the EasyDEX-GUI subproject next.
```shell
cd gui\EasyDEX-GUI
git pull origin dev
```
2) Get the binary artfacts into place (linux version)
```shell 
cd agama
./binary_artifacts.sh
```
For Mac use ./binary_artifacts_mac.sh.
Note that we do not use the standard downloadable komodo executables, the version in VerusCoin/VerusCoin has to be used and the src/komodod and src/komodo-cli build outputs have to be manually patched into assets/bin/osx.
3) install the electron packager and prebuilt - note the ugly unsafe-perm for the electron-prebuilt.
```shell
sudo npm install electron-packager -g
npm install electron-prebuilt -g --unsafe-perm=true
```
4) get webpack dependencies into place for the react stuff
```shell
npm install
```
5) If you are running in dev mode, get the react back end stuff installed and running
```shell
cd react
npm install
cd src
npm start
```
Brings up the dashboard and loads the react service using localhost:3000. Since that ties this shell up, you'll need to spin up another shell to continue.
6) Go back to the react dir and build things (the EasyDEX-GUI)
```shell
cd agama/gui/EasyDEX-GUI/react
npm run build
```
7) Get the top level stuff set, after the cd you should be in the root agama dir. We also need electron, again with the nasty souding unsafe-perm and allow-root options, otherwise electron post install steps fail. Similarly, we need to get libgconf and webpack too.
```shell
cd ../../..
npm install webpack
npm install
```
8) At this point you can test things by running the wallet directly from electron:
```shell
npm start
```
This is a pretty wrapper around electron. I set the environment to production too.

9) Check that things work. Choose the Verus coin for a fast check. Check Komodo and BTCH at the same time as well. Note that loading Komodo the first time can take 10+ hours the first time to get the chain.

10) toggle debug options in settings to get som euseful output. You can toggle dev mode, this will switch the Agama wallet to using the dev version of the React service that we just launched at port 3000. Once you set this the Agama wallet will not run without the service manaully started at port 3000 via npm start in the agama/gui/EasyDEX-GUI/react/src directory. To test a production version, turn dev back off, then exit theAgama wallet, then bring the react service down ("q" causes it to quit). Finally restart the Agama app without the dev service and it works normally.
Note the View menu Toggle Developers Tools option. Enabling that brings up the browser console which is useful. Variable examination and break points, console for the error log, and the ability to track network interactions are all useful. Code has been squashed so more work is needed to get breakpoints completely useful.

11) sync komodod and/or asset chains - now that the wallet is running if you choose Komodo native (or eventually Verus) it will load the assect chain. It's taking me 16 hours on a local VM to get it loaded the first time. It only takes 10 or 30 minutes to catch up on startup after that if things are going well.
12) If you modify code under gui/EasyDEX-GUI then you'll need to go to gui/EasyDEX-GUI/react/src and run npm then npm run build again, then relaunch npm start from the agama dir. Changes to agama/routes just require relaunching npm start from the agama dir. If any dependencies change then you'll need to rerun npm install in the appropriate directory.
13) Once you have your changes ready and working you can produce the Linux executable image
### Important dev notes
Coin info for Verus is stored in ~/.komodo/VRSC under Ubuntu

Coin info for Verus is stored under \Users\<username>\AppData\Roaming\Komodo\VRSC for Windows

Coin info is for Verus is stored under ~/Library/Application\ Support/Komodo/VRSC for Mac

#### Sockets.io
In dev mode backend is configured to send/receive messages from/to http://127.0.0.1:3000 address. If you open it as http://localhost:3000 sockets server will reject any messages. In non dev mode the service is launched internally and everything operates normally.

#### **Build the Wallet-App**
Refer to the original [electron-packager](https://github.com/electron-userland/electron-packager) repository for more detailed information.
Fairly useless advice

##### Linux
Change directory to agama and execute the following command to build the Linux app
```shell
cd agama
electron-packager . --platform=linux --arch=x64 --icon=assets/icons/agama_icons/128x128.png --out=build/ --buildVersion=0.11 --ignore=assets/bin/win64 --ignore=assets/bin/osx --overwrite
```

##### OSX
Change directory to agama and execute the following command to build the OSX app
```shell
cd agama
electron-packager . --platform=darwin --arch=x64 --icon=assets/icons/agama_icons/agama_app_icon.icns --out=build/ --buildVersion=0.2 --ignore=assets/bin/win64 --ignore=assets/bin/linux64 --overwrite
```

##### Windows
Change directory to agama and execute the following command to build the Windows app
```shell
cd agama
electron-packager . --platform=win32 --arch=x64 --icon=assets/icons/agama_icons/agama_app_icon.ico --out=build/ --buildVersion=0.2 --ignore=assets/bin/osx --ignore=assets/bin/linux64 --overwrite

# If generating 32bit desktop package
electron-packager . --platform=win32 --arch=ia32 --icon=assets/icons/agama_icons/agama_app_icon.ico --out=build/ --buildVersion=0.3 --ignore=assets/bin/osx --ignore=assets/bin/linux64 --overwrite

# To build both x64 and x86 desktop package
electron-packager . --platform=win32 --arch=all --icon=assets/icons/agama_icons/agama_app_icon.ico --out=build/ --buildVersion=0.3 --ignore=assets/bin/osx --ignore=assets/bin/linux64 --overwrite
```
change architecture build parameter to ```--arch=x64``` for 64 bit build


## Troubleshooting Instructions

### Windows DLL issues
On Windows it's noticed agama.exe complains about `VCRUNTIME140D.DLL` and `ucrtbased.dll` file.

Please see **windeps** directory and README file for instructions to install the required DLL files on Windows, and then try again running Agama App.

## Optional packages to make rpm and deb distros

electron-installer-debian

electron-installer-redhat

refer to ./make-deb.js and ./make-rpm.js
