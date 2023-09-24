import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import style from '../style';
import Icon from 'react-native-vector-icons/Ionicons';

const Main = ({navigation}) => {
  const {width, height} = Dimensions.get('screen');
  useEffect(() => {
    setTimeout(() => {
      console.log('Login');
    }, 10000);
  }, []);
  return (
    <LinearGradient
      style={{flex: 1, justifyContent: 'space-between'}}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0, 1]}
      colors={[style.colors.secondary, '#fff']}>
      <View
        style={{
          flex: 0.6,
          position: 'relative',
          backgroundColor: style.colors.lightAccent,
          borderBottomRightRadius: width / 3,
          borderBottomLeftRadius: width / 3,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 3.05,
          elevation: 4,
        }}></View>

      {/* ---------Logo--------------- */}
      <View
        style={{
          backgroundColor: style.colors.primary,
          borderRadius: width,
          paddingHorizontal: 10,
          paddingVertical: 5,
          width: width / 4,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: style.colors.primary,
          position: 'absolute',
          top: width / 5,
          left: width / 2.7,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.4,
          shadowRadius: 4.65,

          elevation: 8,
        }}>
        <Image source={require('../../assets/logo.png')} />
      </View>
      {/* ---------Text----------- */}
      <View style={{position: 'absolute', top: width / 2}}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Poppins-Bold',
            textAlign: 'center',
            color: style.colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 2,
            fontWeight: 'bold',
            textShadowColor: '#000000',
            textShadowRadius: 12,
          }}>
          Panchayatraj Project Management System
        </Text>
      </View>
      {/* ------------Button---------- */}
      <View style={{marginBottom: 100}}>
        <TouchableOpacity
          style={{
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5.62,
            elevation: 7,
            backgroundColor: style.colors.lightAccent,
            width: width / 1.5,
            alignItems: 'center',
            borderRadius: 30,
            paddingHorizontal: 10,
            paddingVertical: 15,
            alignSelf: 'center',
          }}
          onPress={() => navigation.navigate('Login')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 18,
                fontFamily: 'Poppins-Bold',
                color: style.colors.primary,
                fontWeight: '800',
                marginHorizontal: 10,
              }}>
              Go to Login
            </Text>
            <Icon name="arrow-forward-circle" color={'white'} size={25} />
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Main;
