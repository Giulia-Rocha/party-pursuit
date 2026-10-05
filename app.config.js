const appJson = require('./app.json');

module.exports = {
  expo: {
    ...appJson.expo,
    owner: 'giulia-rocha',
    extra: {
      ...appJson.expo.extra,
      eas: {
        ...appJson.expo.extra?.eas,
        projectId: '5c9ace5a-1f56-42d9-aab2-0a9898832cdc',
      },
    },
    android: {
      ...appJson.expo.android,
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        },
      },
    },
  },
};
