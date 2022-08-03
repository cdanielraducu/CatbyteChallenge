import React from 'react';
import {NavigationComponentProps} from 'react-native-navigation';
import {Provider} from 'react-redux';
import Home from './src/Home';
import {store} from './src/store';

const App: React.FC<NavigationComponentProps> = props => {
  return (
    <Provider store={store}>
      <Home componentId={props.componentId} />
    </Provider>
  );
};

export default App;
