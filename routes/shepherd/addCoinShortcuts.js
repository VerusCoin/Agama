const electrumServers = require('../electrumjs/electrumServers');
const request = require('request');

// TODO: refactor

module.exports = (shepherd) => {
  shepherd.startSPV = (coin) => {
    if (coin === 'KMD+REVS+JUMBLR') {
      shepherd.addElectrumCoin('KMD');
      shepherd.addElectrumCoin('REVS');
      shepherd.addElectrumCoin('JUMBLR');
    } else {
      if (process.argv.indexOf('spvcoins=all/add-all') > -1) {
        for (let key in electrumServers) {
          shepherd.addElectrumCoin(key.toUpperCase());
        }
      } else {
        shepherd.addElectrumCoin(coin);
      }
    }
  };

  shepherd.startKMDNative = (selection, isManual) => {
    let herdData;
    const acHerdData = {
      REVS: {
        name: 'REVS',
        seedNode: '78.47.196.146',
        supply: 1300000,
      },
      JUMBLR: {
        name: 'JUMBLR',
        seedNode: '78.47.196.146',
        supply: 999999,
      },
      MNZ: {
        name: 'MNZ',
        seedNode: '78.47.196.146',
        supply: 257142858,
      },
      BTCH: {
        name: 'BTCH',
        seedNode: '78.47.196.146',
        supply: 20998641,
      },
      BNTN: {
        name: 'BNTN',
        seedNode: '94.130.169.205',
        supply: 500000000,
      },
    };
    const httpRequest = () => {
      const options = {
        url: `http://127.0.0.1:${shepherd.appConfig.agamaPort}/shepherd/herd`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          herd: herdData.ac_daemon ? herdData.ac_daemon : 'komodod',
          options: herdData,
          token: shepherd.appSessionHash,
        }),
      };

      request(options, (error, response, body) => {
        // resolve(body);
      });
    };

    if (isManual) {
      shepherd.kmdMainPassiveMode = true;
    }

    if (selection === 'KMD') {
      herdData = {
        'ac_name': 'komodod',
        'ac_options': [
          '-daemon=0',
          '-addnode=78.47.196.146',
        ],
      };

      httpRequest();
    } else if (
      selection === 'REVS' ||
      selection === 'JUMRLR' ||
      selection === 'MNZ' ||
      selection === 'BTCH' ||
      selection === 'BNTN'
    ) {
      herdData = {
        'ac_name': acHerdData[selection].name,
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=${acHerdData[selection].name}`,
          `-addnode=${acHerdData[selection].seedNode}`,
          `-ac_supply=${acHerdData[selection].supply}`,
        ],
      };

      httpRequest();
    } else if (selection === 'VRSC') {
        herdData = {
          'ac_name': 'VRSC',
          'ac_daemon': 'verusd',
          'ac_options': [
              '-ac_algo=verushash',
              '-ac_cc=1',
              '-ac_supply=0',
              '-ac_eras=3',
              '-ac_reward=0,38400000000,2400000000',
              '-ac_halving=1,43200,1051920',
              '-ac_decay=100000000,0,0',
              '-ac_end=10080,226080,0',
              '-ac_timelockgte=19200000000',
              '-ac_timeunlockfrom=129600',
              '-ac_timeunlockto=1180800',
              '-ac_veruspos=50',
          ]
        };

        //Checking for VRSC specific config commands 
        if(shepherd.appConfig.autoStakeVRSC) {
          herdData['ac_options'].push('-mint');
          console.log('VRSC Staking set to default');
        }
        if(shepherd.appConfig.stakeGuard.length === 78) {
          herdData['ac_options'].push('-cheatcatcher=' + shepherd.appConfig.stakeGuard);
          console.log('Cheatcatching enabled at address ' + shepherd.appConfig.stakeGuard);
        }
        if(shepherd.appConfig.pubKey && 
          (shepherd.appConfig.pubKey.length > 0)) {
          herdData['ac_options'].push('-pubkey=' + shepherd.appConfig.pubKey);
          console.log('Pubkey mining enabled at address ' + shepherd.appConfig.pubKey);
        }
      

      httpRequest();
    }  else if (selection === 'PIRATE') {
      herdData = {
        'ac_name': 'PIRATE',
        'ac_options': [
            '-ac_supply=0',
            '-ac_reward=25600000000',
            '-ac_halving=77777',
            '-ac_private=1',
        ]
      };

    httpRequest();
  }  else {
      const herdData = [{
        'ac_name': 'komodod',
        'ac_options': [
          '-daemon=0',
          '-addnode=78.47.196.146',
        ],
      }, {
        'ac_name': 'REVS',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=REVS`,
          '-addnode=78.47.196.146',
          '-ac_supply=1300000',
        ],
      }, {
        'ac_name': 'JUMBLR',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=JUMBLR`,
          '-addnode=78.47.196.146',
          '-ac_supply=999999',
        ],
      }];

      for (let i = 0; i < herdData.length; i++) {
        setTimeout(() => {
          const options = {
            url: `http://127.0.0.1:${shepherd.appConfig.agamaPort}/shepherd/herd`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              herd: 'komodod',
              options: herdData[i],
              token: shepherd.appSessionHash,
            }),
          };

          request(options, (error, response, body) => {
            // resolve(body);
          });
        }, 100);
      }
    }
  };

  return shepherd;
};