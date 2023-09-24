import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import style from '../style';
import TableFormat from '../components/Table'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TabNav from '../components/TabNav';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PendingList = ({navigation, route}) => {
  const {width, height} = Dimensions.get('screen');
  const [search, setSearch] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Select GP Wise');
  const pickerRef=useRef()
  const {projectDetails} = route.params;
  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    navigation.navigate('Login');
  };
  
console.log(projectDetails)
  // Create an event handler to toggle the `search` state
  const toggleSearch = () => {
    setSearch((prevSearch) => !prevSearch);
  };

  return (
    <LinearGradient
    style={{flex: 1}}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0, 1]}
      colors={[style.colors.secondary, '#fff']}>
      <View
        style={{
          width: width,
          paddingTop: 15,
          paddingHorizontal: 15,
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:'space-between',
          borderBottomWidth:10,
          zIndex:10,
          backgroundColor:style.colors.primary,
          borderBottomColor:style.colors.primary
        }}>
        <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
       
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <Image
            source={require('../../assets/logo.png')}
            style={{height: 50, width: 45}}
          />
          <Text style={{color:style.colors.background,fontFamily:'Poppins-Bold', fontSize:22,textShadowColor:style.colors.grey,
            textShadowOffset: {
              width: 1,
              height: 1.3,
            },
            textShadowRadius:3,}}>PPMS</Text>
        </View>
        </View>
        {/* ---------------------- */}
        <View style={{flexDirection: 'row', alignItems: 'center',gap:5}}>
          {/* {search && <View style={{
                flexDirection:'row',
                alignItems:'center',
                width: 170,
                height: 30,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: style.colors.primary,
                backgroundColor:'rgba(0,0,0,0.09)',
                paddingLeft:5
                
              }}>
            <AntDesign name="search1" size={16} color={style.colors.primary} />
            <TextInput
            style={{padding:5}}
            placeholder='Search'
            />
            </View>} */}

         
        </View>
        
        <View style={{flexDirection:'row', alignItems:'center', gap:8}}>
        {/* <TouchableOpacity onPress={toggleSearch}>
          <AntDesign name="search1" size={23} color={style.colors.background} />
          </TouchableOpacity> */}
        <View>
          <TouchableOpacity onPress={handleLogout}>
            <FontAwesome name="power-off" size={25} color={style.colors.background} />
          </TouchableOpacity>
        </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.08,
          width:width-20,
          flexDirection:'row',
          alignSelf:'center',
          borderRadius:10,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          // backgroundColor: style.colors.lightAccent,
          paddingHorizontal:10
        }}>
        <View>
        <Text
          style={{
            fontSize: 20,
            color: style.colors.background,
            fontFamily:'Poppins-Light',
            fontWeight:'700'
          }}>
          Project List
        </Text>
        </View>
        <View>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <AntDesign name="back" size={25} color={style.colors.background} />
        </TouchableOpacity>
        </View>
      </View>
      <View style={{width:width-20,borderWidth:1,borderColor:style.colors.lightAccent, alignSelf:'center',borderRadius:10}}>
      <Picker
        ref={pickerRef}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        style={{color:style.colors.lightAccent}}
      >
        <Picker.Item style={{fontSize:16, fontFamily:'Poppins-Light'}} label="Select GP Wise" />
        <Picker.Item style={{fontSize:14, fontFamily:'Poppins-Light'}} label="Option 1" value="option1" />
        <Picker.Item style={{fontSize:14, fontFamily:'Poppins-Light'}} label="Option 2" value="option2" />
      </Picker>
     
    </View>
    <View style={{flex:1, marginTop:10}}>
    <TabNav projectDetails={projectDetails} navigation={navigation}/>
    </View>
   
    </LinearGradient>
  );
};

export default PendingList;
