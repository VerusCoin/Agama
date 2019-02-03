const appConfig = {
  config: { // default config
    host: '127.0.0.1',
    agamaPort: 17776,
    maxDescriptors: {
      darwin: 90000,
      linux: 1000000,
    },
    dev: false,
    debug: false,
    roundValues: false,
    experimentalFeatures: false,
    dataDir: '',
    autoStartVRSC: false,
    autoStakeVRSC: false,
    //darkMode: false,
    stakeGuard: '',
    pubKey: '',
    dex: {
      walletUnlockTimeout: 3600,
    },
    transactionCountPublic: 1000,
    transactionCountPrivate: 1000,
    cliStopTimeout: 1000,
    failedRPCAttemptsThreshold: 10,
    stopNativeDaemonsOnQuit: true,
    lang: 'EN',
    rpc2cli: false,
    fiatRates: false,
    loadCoinsFromStorage: false,
    requirePinToConfirmTx: false,
    spv: {
      maxVinParseLimit: 120,
      cache: false,
      proxy: false,
      socketTimeout: 10000,
      customServers: false,
      syncServerListFromKv: false,
    },
  },
  schema: {
    host: {
      display: true,
      type: 'string',
      displayName: 'Hostname',
      info: 'Application hostname',
    },
    agamaPort: {
      display: true,
      type: 'number',
      displayName: 'Agama Port',
      info: 'Agama HTTP port. Required to run GUI.',
    },
    maxDescriptors: {
      display: false,
      displayName: 'Max Descriptors per Process',
      darwin: {
        display: true,
        displayName: 'MacOS (Darwin)',
        type: 'number',
      },
      linux: {
        display: true,
        displayName: 'Linux',
        type: 'number',
      },
    },
    dev: {
      display: false,
      initDisplay: true,
      displayName: 'Developer mode',
      info: 'Enable developer mode',
      type: 'boolean',
    },
    debug: {
      display: true,
      initDisplay: true,
      displayName: 'Debug',
      info: 'Enable debug output',
      type: 'boolean',
    },
    roundValues: {
      display: true,
      displayName: 'Enable amount rounding',
      info: 'Round \"dust\" amounts to save screen space',
      type: 'boolean',
    },
    experimentalFeatures: {
      display: true,
      initDisplay: true,
      displayName: 'Enable advanced features',
      type: 'boolean',
    },
    autoStartVRSC: {
      display: true,
      initDisplay: true,
      displayName: 'Automatically start VerusCoin on launch in native mode',
      type: 'boolean',
    },
    autoStakeVRSC: {
      display: true,
      initDisplay: true,
      displayName: 'Automatically start staking VerusCoin when it is launched in native mode',
      type: 'boolean',
    },
    /*
    darkMode: {
      display: true,
      initDisplay: true,
      displayName: 'Change UI to dark mode',
      type: 'boolean',
    },
    */
    stakeGuard: {
      display: true,
      info: 'As part of the VerusCoin Something at Stake solution, you can enter a Verus sapling address in this field, and receive awards for finding double-stakers',
      displayName: 'Your VRSC sapling address for StakeGuard',
      type: 'string',
    },
    pubKey: {
      display: true,
      info: 'Your VRSC public key to mine to, not an address',
      displayName: 'Pubkey VRSC mining key',
      type: 'string',
    },
    dataDir: {
      display: true,
      initDisplay: true,
      displayName: 'Komodo data directory',
      info: 'The data directory is the location where Komodo data files are stored, including the wallet data file<br/>It must be an already existing folder e.g. /home/user/komodo_data_dir.',
      type: 'folder',
    },
    dex: {
      display: false,
      displayName: 'dex',
      walletUnlockTimeout: {
        display: true,
        displayName: 'walletUnlockTimeout',
        type: 'number',
      },
    },
    transactionCountPublic: {
      display: true,
      displayName: 'Public Transaction Count',
      info: 'Max number of public transactions to load and display in the native mode gui. Note: This number will be called on an interval, and setting a number too high can cause wallet to be unusable.',
      type: 'number',
    },
    transactionCountPrivate: {
      display: true,
      displayName: 'Private Transaction Count',
      info: 'Max number of private transactions to load and display in the native mode gui. Note: This number will be called on an interval, and setting a number too high can cause wallet to be unusable.',
      type: 'number',
    },
    cliStopTimeout: {
      display: true,
      displayName: 'CLI stop timeout',
      info: 'Timeout between consequent CLI stop commands. Value is in milliseconds.',
      type: 'number',
    },
    stopNativeDaemonsOnQuit: {
      display: true,
      displayName: 'Stop native daemons on app quit',
      info: 'If set to false agama will run in detached coin daemon mode',
      type: 'boolean',
    },
    failedRPCAttemptsThreshold: {
      display: true,
      displayName: 'Failed RPC connect attempts threshold',
      info: 'Number of allowed consequent RPC connect failures before the app marks native coin daemon as not running properly',
      type: 'number',
    },
    lang: {
      display: true,
      displayName: 'Language',
      type: 'select',
      data: [
        { name: 'EN', label: 'English' },
        { name: 'DE', label: 'German' }
      ],
    },
    rpc2cli: {
      display: true,
      displayName: 'Disable RPC',
      info: 'Use CLI instead of RPC JSON server in native mode',
      type: 'boolean',
    },
    fiatRates: {
      display: true,
      displayName: 'Fetch fiat rates',
      info: 'Get coin fiat rates from atomicexplorer.com',
      type: 'boolean',
    },
    loadCoinsFromStorage: {
      display: true,
      displayName: 'Load coins list from file',
      info: 'Add favourite coins on app start from a file',
      type: 'boolean',
    },
    requirePinToConfirmTx: {
      display: true,
      displayName: 'Require PIN to confirm a transaction',
      type: 'boolean',
    },
    spv: {
      display: true,
      displayName: 'Lite mode',
      maxVinParseLimit: {
        display: true,
        displayName: 'Max tx inputs parse limit',
        info: 'Maximum inputs to parse per transaction.<br/>Change to lower values if you have the app freeze constantly or to retrieve transaction history faster but with degraded accuracy.<br/>Change to higher values to get maximum transaction history accuracy.',
        type: 'number',
      },
      cache: {
        display: true,
        displayName: 'Cache transactions data to disk',
        type: 'boolean',
      },
      proxy: {
        display: true,
        displayName: 'Use proxy',
        // info: 'Use remote http proxy to reduce data usage (gzip compression).',
        type: 'boolean',
      },
      socketTimeout: {
        display: true,
        displayName: 'Socket timeout',
        info: 'Max timeout before electrum server connection is dropped. Value is in milliseconds.',
        type: 'number',
      },
      customServers: {
        display: true,
        displayName: 'Custom electrum servers list',
        info: 'Allow electrum servers list changes.',
        type: 'boolean',
      },
      syncServerListFromKv: {
        display: true,
        displayName: 'Sync electrum servers list from KV',
        info: 'Warning, this is highly experimental feature!',
        type: 'boolean',
      },
    },
  },
};

module.exports = appConfig;