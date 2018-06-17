import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Platform} from 'react-native';
import {FontAwesome,Entypo} from '@expo/vector-icons';
import {white,purple,gray} from '../utils/colors';
export default function UdaciStepper (
    {
      max, 
      unit, 
      step, 
      value,
      onIncrement,
      onDecrement
    }
  )
  {
    
  const viewStyle = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={onDecrement} 
            style={[styles.iosBtn,{borderTopRightRadius:0, borderBottomRightRadius:0}]}
              >
            <FontAwesome name="minus" size={30} color="purple"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onIncrement} 
            style={[styles.iosBtn,{borderTopLeftRadius:0, borderBottomLeftRadius:0}]}
            >
            <FontAwesome name="plus" size={30} color="purple"/>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={onDecrement} 
          style={[styles.androidBtn]}
            >
          <FontAwesome name="minus" size={30} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement} 
          style={[styles.androidBtn]}
          >
          <FontAwesome name="plus" size={30} color="white"/>
        </TouchableOpacity>
      </View>
      );
    }
  } ;
    
  return (
    <View style={[styles.row,{justifyContent:'space-between'}]}>
      {viewStyle()}
      <View style={styles.metricCounter}>
        <Text style={{fontSize:24, textAlign:'center'}}>{value}</Text>
        <Text style={{fontSize:18, color:gray}}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create( {
  row: {
    flexDirection:'row',
    flex:1,
    alignItems: 'center'
  },
  iosBtn : {
    backgroundColor:white,
    borderColor:purple,
    borderWidth:1,
    borderRadius:3,
    padding: 5,
    paddingLeft:25,
    paddingRight:25
  },
  androidBtn : {
    backgroundColor:purple,
    borderRadius:2,
    padding:10,
    margin:10
  },  
  metricCounter : {
    width:85,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
