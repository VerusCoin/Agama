const portscanner = require('portscanner');
const execFile = require('child_process').execFile;

module.exports = (shepherd) => {
  shepherd.quitKomodod = (timeout = 100) => {
    // if komodod is under heavy load it may not respond to cli stop the first time
    // exit komodod gracefully
    let didDaemonQuitInterval = {};
    shepherd.lockDownAddCoin = true;

    for (let key in shepherd.coindInstanceRegistry) {
      let daemonQuit = false;
      let cliStdout;
      let cliStderr;
      let cliError;
      if (shepherd.appConfig.stopNativeDaemonsOnQuit) {
        const chain = key !== 'komodod' ? key : null;
        let _coindQuitCmd = shepherd.komodocliBin;

         // any coind
        if (shepherd.nativeCoindList[key.toLowerCase()]) {
          _coindQuitCmd = `${shepherd.coindRootDir}/${key.toLowerCase()}/${shepherd.nativeCoindList[key.toLowerCase()].bin.toLowerCase()}-cli`;
        }
        if (key === 'CHIPS') {
          _coindQuitCmd = shepherd.chipscliBin;
        }

        const execCliStopSafe = () => {
          let _arg = [];

          if (chain &&
              !shepherd.nativeCoindList[key.toLowerCase()] &&
              key !== 'CHIPS') {
            shepherd.removePubkey(chain.toLowerCase());

            _arg.push(`-ac_name=${chain}`);

            if (shepherd.appConfig.dataDir.length) {
              _arg.push(`-datadir=${shepherd.appConfig.dataDir + (key !== 'komodod' ? '/' + key : '')}`);
            }
          } else if (
            key === 'komodod' &&
            shepherd.appConfig.dataDir.length
          ) {
            _arg.push(`-datadir=${shepherd.appConfig.dataDir}`);
          }

          _arg.push('stop');
          execFile(`${_coindQuitCmd}`, _arg, (error, stdout, stderr) => {
            shepherd.log(`send stop sig to ${key}`);
            shepherd.log(`stdout: ${stdout}`);
            shepherd.log(`stderr: ${stderr}`);
            cliStderr = stderr;
            cliStdout = stdout;
            cliError = error;

            if (error !== null) {
              shepherd.log(`exec error: ${error}`);
            }
          });
        }

        const execCliStopForce = () => {
          shepherd.killRogueProcess(key === 'CHIPS' ? 'chips-cli' : 'komodod');
        }

        const didDaemonQuit = () => {
            // workaround for AGT-65
            const _port = shepherd.assetChainPorts[key];
              portscanner.checkPortStatus(_port, '127.0.0.1', (error, status) => {
                // Status is 'open' if currently in use or 'closed' if available
                if (status === 'closed') {
                  delete shepherd.coindInstanceRegistry[key];
                  daemonQuit = true;
                }
              });
          if(daemonQuit) {
            clearInterval(didDaemonQuitInterval[key]);
          }
        }

        shepherd.log(`trying to safely quit ${key}`);
        execCliStopSafe();
        setTimeout(() => {
          execCliStopSafe();
        }, 30000)
        didDaemonQuitInterval[key] = setInterval(() => {
          didDaemonQuit();
        }, 100);
        /*
        setTimeout(() => {
          if(!daemonQuit){
            shepherd.log(`timeout while trying to safely quit ${key}, force quitting`);
            execCliStopForce();
          }
        }, 120000)
        */
      } else {
        delete shepherd.coindInstanceRegistry[key];
      }
    }
  }

  shepherd.post('/coind/stop', (req, res) => {
    if (shepherd.checkToken(req.body.token)) {
      const _chain = req.body.chain;
      let _coindQuitCmd = shepherd.komodocliBin;
      let _arg = [];


      if (_chain) {
        shepherd.removePubkey(_chain.toLowerCase());

        _arg.push(`-ac_name=${_chain}`);

        if (shepherd.appConfig.dataDir.length) {
          _arg.push(`-datadir=${shepherd.appConfig.dataDir + (_chain ? '/' + _chain : '')}`);
        }
      } else if (!_chain && shepherd.appConfig.dataDir.length) {
        _arg.push(`-datadir=${shepherd.appConfig.dataDir}`);
      }

      _arg.push('stop');
      execFile(`${_coindQuitCmd}`, _arg, (error, stdout, stderr) => {
        shepherd.log(`stdout: ${stdout}`);
        shepherd.log(`stderr: ${stderr}`);
        shepherd.log(`send stop sig to ${_chain ? _chain : 'komodo'}`);

        if (stdout.indexOf('EOF reached') > -1 ||
            stderr.indexOf('EOF reached') > -1 ||
            (error && error.toString().indexOf('Command failed') > -1 && !stderr) || // win "special snowflake" case
            stdout.indexOf('connect to server: unknown (code -1)') > -1 ||
            stderr.indexOf('connect to server: unknown (code -1)') > -1) {
          delete shepherd.coindInstanceRegistry[_chain ? _chain : 'komodod'];

          const obj = {
            msg: 'success',
            result: 'result',
          };

          res.end(JSON.stringify(obj));
        } else {
          if (stdout.indexOf('Komodo server stopping') > -1) {
            delete shepherd.coindInstanceRegistry[_chain ? _chain : 'komodod'];

            const obj = {
              msg: 'success',
              result: 'result',
            };

            res.end(JSON.stringify(obj));
          } else {
            const obj = {
              msg: 'error',
              result: 'result',
            };

            res.end(JSON.stringify(obj));
          }
        }
      });
    } else {
      const errorObj = {
        msg: 'error',
        result: 'unauthorized access',
      };

      res.end(JSON.stringify(errorObj));
    }
  });

  shepherd.post('/coins/remove', (req, res) => {
    if (shepherd.checkToken(req.body.token)) {
      const _chain = req.body.chain;

      if (req.body.mode === 'native') {
        delete shepherd.coindInstanceRegistry[_chain ? _chain : 'komodod'];

        if (_chain) {
          shepherd.removePubkey(_chain.toLowerCase());
        }

        const obj = {
          msg: 'success',
          result: 'result',
        };

        res.end(JSON.stringify(obj));
      } else {
        delete shepherd.electrumCoins[_chain === 'komodo' ? 'KMD' : _chain];

        if (Object.keys(shepherd.electrumCoins).length - 1 === 0) {
          shepherd.electrumCoins.auth = false;
          shepherd.electrumKeys = {};
        }

        const obj = {
          msg: 'success',
          result: 'result',
        };

        res.end(JSON.stringify(obj));
      }
    } else {
      const errorObj = {
        msg: 'error',
        result: 'unauthorized access',
      };

      res.end(JSON.stringify(errorObj));
    }
  });

  return shepherd;
};
