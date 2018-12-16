#!/bin/bash
cd assets
echo Step: Cloning latest binaries for build
curl "https://artifacts.supernet.org/latest/windows/genkmdconf.bat" -o "bin/win64/genkmdconf.bat"
curl "https://artifacts.supernet.org/latest/windows/libcrypto-1_1.dll" -o "bin/win64/libcrypto-1_1.dll"
curl "https://artifacts.supernet.org/latest/windows/libcurl-4.dll" -o "bin/win64/libcurl-4.dll"
curl "https://artifacts.supernet.org/latest/windows/libcurl.dll" -o "bin/win64/libcurl.dll"
curl "https://artifacts.supernet.org/latest/windows/libgcc_s_sjlj-1.dll" -o "bin/win64/libgcc_s_sjlj-1.dll"
curl "https://artifacts.supernet.org/latest/windows/libnanomsg.dll" -o "bin/win64/libnanomsg.dll"
curl "https://artifacts.supernet.org/latest/windows/libssl-1_1.dll" -o "bin/win64/libssl-1_1.dll"
curl "https://artifacts.supernet.org/latest/windows/libwinpthread-1.dll" -o "bin/win64/libwinpthread-1.dll"
curl "https://artifacts.supernet.org/latest/windows/marketmaker.exe" -o "bin/win64/marketmaker.exe"
curl "https://artifacts.supernet.org/latest/windows/nanomsg.dll" -o "bin/win64/nanomsg.dll"
curl "https://artifacts.supernet.org/latest/windows/pthreadvc2.dll" -o "bin/win64/pthreadvc2.dll"
cd ..