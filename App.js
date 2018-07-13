import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {  View, Platform, StatusBar, Text} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {Constants} from 'expo';

import Live from './components/Live';
import AddEntry from './components/AddEntry';
import History from './components/History';
import { purple,white } from './utils/colors';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import EntryDetail from './components/EntryDetail';
import {setLocalNotification} from './utils/helpers';


function UdaciStatusBar ({backgroundColor,...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createBottomTabNavigator ({
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
      }
    },
    AddEntry : {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
      }
    }, 
    Live : {
      screen: Live,
      navigationOptions: {
        tabBarLabel: 'Live',
        tabBarIcon: ({tintColor}) => <FontAwesome name='ambulance' size={30} color={tintColor}/>
      }
    }
  },
  {
    navigationOptions: {
      header:null
    }
  },
  {
  tabBarOptions : {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width:0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header:null
    }
  },
  EntryDetail : {
    screen:EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor:purple
      }
    }
  }
});

export default class App extends React.Component {

  componentDidMount() {
    console.log('did mount');
    setLocalNotification();
  }

  render() {
    return (
      <Provider store = {createStore(reducer)}>
      <View style={{flex:1}}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <MainNavigator/>
      </View>
      </Provider>
    );
  }
}

