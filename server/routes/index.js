module.exports = [
  {
    method: 'GET',
    path: '/credentials',
    handler: 'google.getCredentials',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/credentials/add',
    handler: 'google.createCredentials',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/init',
    handler: 'google.initLogin',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/user-profile',
    handler: 'google.getUserProfile',
    config: {
      auth: false,
      policies: [],
    },
  }
];
