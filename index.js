import {Navigation} from 'react-native-navigation';
import {AppRegistry} from 'react-native';
import App from './App';
import User from './src/User';
import {name as appName} from './app.json';

Navigation.registerComponent(
  'org.reactjs.native.example.CatbyteChallenge.HomeScreen',
  () => App,
);
Navigation.registerComponent('UserScreen', () => User);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'org.reactjs.native.example.CatbyteChallenge.HomeScreen',
            },
          },
        ],
      },
    },
  });
});

AppRegistry.registerComponent(appName, () => App);
