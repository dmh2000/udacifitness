import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addEntry} from '../actions';

import {  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';

import {getMetricMetaInfo,timeToString,getDailyReminderValue} from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import {black} from '../utils/colors';
import {Ionicons} from '@expo/vector-icons';
import TextButton from './TextButton';
import {submitEntry,removeEntry} from '../utils/api';
import {white,purple} from '../utils/colors';

function SubmitBtn ({onPress}) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={Platform.OS === 'ios'
        ? styles.iosSubmitBtn
        : styles.androidSubmitBtn
        }
      >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike:0,
    swim:0,
    sleep:0,
    eat:0
  };

  increment = (metric) => {
    const {max,step} = getMetricMetaInfo(metric);

    this.setState( (state) => {
      const count = state[metric] + step;
      return {
        ...state,
        [metric]:count > max ? max : count
      }
    });
  }

  decrement = (metric) => {
    const {max,step} = getMetricMetaInfo(metric);

    this.setState( (state) => {
      const count = state[metric] - step;
      return {
        ...state,
        [metric]:count < 0 ? 0 : count
      }
    });
  }  

  slide = (metric, value) => {
    this.setState( (state) => {
      return {
        [metric]: value
      }
    })
  }

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    // update redux

    this.props.dispatch(addEntry({
      [key]:entry
    }));

    this.setState(() => 
      ({
        run: 0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0,
      })
    );

    // navigate to home

    // save to 'db'
    submitEntry({key,entry});

    // clear local notification
  }

  reset = () => {
    const key = timeToString();
    
    // update redux
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }));

    // route to home
    

  }
  
  render = () => {
    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
          name={ Platform.OS === 'ios' 
            ? 'ios-happy-outline'
            : 'md-happy'
            }
          size={100}
          />
          <Text type={{padding:10}}>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        {Object.keys(metaInfo).map( (key) => {
          const {getIcon,type,...rest} = metaInfo[key];
          const value = this.state[key];

        return (
          <View key={key} style={styles.row}>
            {getIcon()}
            {type === 'slider'
              ? <UdaciSlider
                  value={value}
                  onChange={(value) => this.slide(key,value)}
                  {...rest}
                />
              : <UdaciStepper
                  value={value}
                  onIncrement={(value) => this.increment(key)}
                  onDecrement={(value) => this.decrement(key)}
                  {...rest}
                />
            }
          </View>
        )
      })}
      <SubmitBtn onPress={this.submit}/>
      </View>
    )
  }
};

const styles = StyleSheet.create( {
  container : {
    flex:1,
    padding:20,
    backgroundColor:white
  },
  row: {
    flexDirection:'row',
    flex:1,
    alignItems: 'center'
  },
  iosSubmitBtn : {
    backgroundColor:purple,
    padding:10,
    borderRadius:7,
    height:45,
    marginLeft:40,
    marginRight:40
  },
  androidSubmitBtn : {
    backgroundColor:purple,
    padding:10,
    paddingLeft:30,
    paddingRight:30,
    borderRadius:2,
    height:45,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center' ,
    marginRight:10
  },
  submitBtnText: {
    color:white,
    fontSize:22,
    textAlign: 'center'
  },
  center: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    marginRight:30,
    marginLeft:30
  }
})

function mapStateToProps(state) {
  const key = timeToString();

  const logged = state[key] && typeof state[key].today == 'undefined';
  if (logged) {
    debugger;
  }
  return {
    alreadyLogged : logged
  }
}

export default connect(mapStateToProps)(AddEntry);