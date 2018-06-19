import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {  View
} from 'react-native';

import AddEntry from './components/AddEntry';
import History from './components/History';
import { gray } from './utils/colors';

export default class App extends React.Component {
  handlePress = () => {
    alert('hello');
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Provider store = {createStore(reducer)}>
      <View style={{flex:1}}>
        <View style={{height:20}}/>
        <History/>
      </View>
      </Provider>
    );
  }
}

