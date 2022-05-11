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
  },
  {
    method: 'GET',
    path: '/me',
    handler: 'google.getUserDetails',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/update-password',
    handler: 'google.updatePassword',
    config: {
      auth: false,
      policies: [],
    },
  },
];
