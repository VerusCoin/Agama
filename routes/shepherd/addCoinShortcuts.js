const electrumServers = require('../electrumjs/electrumServers');

module.exports = (shepherd) => {
  shepherd.startSPV = (coin) => {
    if (coin === 'KMD+REVS+JUMBLR') {
      shepherd.addElectrumCoin('KMD');
      shepherd.addElectrumCoin('REVS');
      shepherd.addElectrumCoin('JUMBLR');
    } else {
      if (process.argv.indexOf('spvcoins=all/add-all') > -1) {
        for (let key in electrumServers) {
          shepherd.addElectrumCoin(electrumServers[key].abbr);
        }
      } else {
        shepherd.addElectrumCoin(coin);
      }
    }
  }

  shepherd.startKMDNative = (selection, isManual) => {
    if (isManual) {
      shepherd.kmdMainPassiveMode = true;
    }

    if (selection === 'KMD') {
      const herdData = {
        'ac_name': 'komodod',
        'ac_options': [
          '-daemon=0',
          '-addnode=78.47.196.146',
        ],
      };

      const options = {
        url: `http://127.0.0.1:${shepherd.appConfig.agamaPort}/shepherd/herd`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          herd: 'komodod',
          options: herdData,
          token: shepherd.appSessionHash,
        }),
      };

      shepherd.request(options, (error, response, body) => {
        if (response &&
            response.statusCode &&
            response.statusCode === 200) {
          //resolve(body);
        } else {
          //resolve(body);
        }
      });
// TODO Add our coin selection here, along with NODE address etc.
    } else if (selection === 'REVS') {
      const herdData = {
        'ac_name': 'REVS',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=REVS`,
          '-addnode=78.47.196.146',
          '-ac_supply=1300000'
        ]
      };

      const options = {
        url: `http://127.0.0.1:${shepherd.appConfig.agamaPort}/shepherd/herd`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          herd: 'komodod',
          options: herdData,
          token: shepherd.appSessionHash,
        }),
      };

      shepherd.request(options, (error, response, body) => {
        if (response &&
            response.statusCode &&
            response.statusCode === 200) {
          //resolve(body);
        } else {
          //resolve(body);
        }
      });
    } else if (selection === 'JUMRLR') {
      const herdData = {
        'ac_name': 'JUMRLR',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=JUMRLR`,
          '-addnode=78.47.196.146',
          '-ac_supply=999999'
        ]
      };

      const options = {
        url: `http://127.0.0.1:${shepherd.appConfig.agamaPort}/shepherd/herd`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          herd: 'komodod',
          options: herdData,
          token: shepherd.appSessionHash,
        }),
      };

      shepherd.request(options, (error, response, body) => {
        if (response &&
            response.statusCode &&
            response.statusCode === 200) {
          //resolve(body);
        } else {
          //resolve(body);
        }
      });
    } else if (selection === 'MNZ') {
      const herdData = {
        'ac_name': 'MNZ',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=MNZ`,
          '-addnode=78.47.196.146',
          '-ac_supply=257142858'
        ]
      };

      const options = {
        url: `http://127.0.0.1:${shepherd.appConfig.agamaPort}/shepherd/herd`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          herd: 'komodod',
          options: herdData,
          token: shepherd.appSessionHash,
        }),
      };

      shepherd.request(options, (error, response, body) => {
        if (response &&
            response.statusCode &&
            response.statusCode === 200) {
          //resolve(body);
        } else {
          //resolve(body);
        }
      });
    } else if (selection === 'BTCH') {
      const herdData = {
        'ac_name': 'BTCH',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=BTCH`,
          '-addnode=78.47.196.146',
          '-ac_supply=20998641'
        ]
      };

      const options = {
        url: `http://127.0.0.1:${shepherd.appConfig.agamaPort}/shepherd/herd`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          herd: 'komodod',
          options: herdData,
          token: shepherd.appSessionHash,
        }),
      };

      shepherd.request(options, (error, response, body) => {
        if (response &&
            response.statusCode &&
            response.statusCode === 200) {
          //resolve(body);
        } else {
          //resolve(body);
        }
      });
    } else if (selection === 'VRSC') {
        const herdData = {
            'ac_name': 'VRSC',
            'ac_options': [
                '-ac_algo=verushash',
                '-ac_cc=1',
                '-ac_supply=0',
                '-ac_eras=3',
                '-ac_reward=0,38400000000,2400000000',
                '-ac_halving=1,43200,1051920',
                '-ac_decay=100000000,0,0',
                '-ac_end=10080,226080,0',
                '-addnode=185.25.48.236',
                '-addnode=185.64.105.111',
                '-ac_timelockgte=19200000000',
                '-ac_timeunlockfrom=129600',
                '-ac_timeunlockto=1180800',
                '-ac_veruspos=50',
                '-gen',
                '-genproclimit=0'
            ]
        };

        const options = {
            url: `http://127.0.0.1:${shepherd.appConfig.agamaPort}/shepherd/herd`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                herd: 'komodod',
                options: herdData,
                token: shepherd.appSessionHash,
            }),
        };

        shepherd.request(options, (error, response, body) => {
            if (response &&
                response.statusCode &&
                response.statusCode === 200) {
                //resolve(body);
            } else {
                //resolve(body);
            }
        });
    }  else if (selection === 'VERUSTEST') {
        const herdData = {
            'ac_name': 'VERUSTEST',
            'ac_options': [
                '-ac_algo=verushash',
                '-ac_cc=1',
                '-ac_supply=0',
                '-ac_veruspos=50',
                '-ac_eras=3',
                '-ac_reward=0,38400000000,2400000000',
                '-ac_halving=1,60,2880',
                '-ac_decay=100000000,0,0',
                '-ac_end=56,356,0',
                '-addnode=185.25.48.236',
                '-addnode=185.64.105.111',
                '-ac_timelockgte=19200000000',
                '-ac_timeunlockfrom=200',
                '-ac_timeunlockto=1000',
                '-gen',
                '-genproclimit=4'
            ]
        };

        const options = {
            url: `http://127.0.0.1:${shepherd.appConfig.agamaPort}/shepherd/herd`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                herd: 'komodod',
                options: herdData,
                token: shepherd.appSessionHash,
            }),
        };

        shepherd.request(options, (error, response, body) => {
            if (response &&
                response.statusCode &&
                response.statusCode === 200) {
                //resolve(body);
            } else {
                //resolve(body);
            }
        });
}
    else {
      const herdData = [{
        'ac_name': 'komodod',
        'ac_options': [
          '-daemon=0',
          '-addnode=78.47.196.146',
        ]
      }, {
        'ac_name': 'REVS',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=REVS`,
          '-addnode=78.47.196.146',
          '-ac_supply=1300000'
        ]
      }, {
        'ac_name': 'JUMBLR',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=JUMBLR`,
          '-addnode=78.47.196.146',
          '-ac_supply=999999'
        ]
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

          shepherd.request(options, (error, response, body) => {
            if (response &&
                response.statusCode &&
                response.statusCode === 200) {
              //resolve(body);
            } else {
              //resolve(body);
            }
          });
        }, 100);
      }
    }
  };

  return shepherd;
};
