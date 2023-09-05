import * as React from 'react';
import { View, StyleSheet,Image,Dimensions, Text, TextInput,Pressable, KeyboardAvoidingView,Keyboard, Alert, TouchableOpacity} from 'react-native';
import style from '../style';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'



// import {Dropdown} from 'react-native-element-dropdown'
// import AntDesign from 'react-native-vector-icons';



const Login = ({navigation}) => {
  // const [value, setValue] = React.useState(null);
  const [mobile, setMobile]=React.useState("")
  const [focus, setFocus] = React.useState('');
  const{width, height} = Dimensions.get('screen')
  // const baseUrl = "http://203.193.144.19/ppms/api";
  
  
  async function fetchLoginOTP() {
    try {
      const endpoint = `http://203.193.144.19/ppms/api/login-otp-send?phone=${mobile}`;
  
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Login OTP Response:", data);
      } else {
        console.error("Failed to fetch Login OTP. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  
 
  const handleOtpLogin=()=>{
    if(mobile.length===10){
      fetchLoginOTP();
      navigation.navigate('OtpVerify',{mobileNo:mobile})
      setMobile("")
    }else{
      Alert.alert('Something went wrong...', 'Please check your mobile no.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }
  
  return (
    <Pressable onPress={Keyboard.dismiss} style={{flex:1}}>
        
    <LinearGradient style={{flex:1, alignItems:'center'}} start={{ x: 0, y: 0 }} end={{ x:1 , y:1}} locations={[0, 1]} colors={[ style.colors.lightAccent,'#fff']} >
    <View style={{alignItems:'center', justifyContent:'flex-start', paddingTop:70, }}>
      <Image source={require('../../assets/logo.png')} style={{height:120, width:110}} />
      <Text style={{paddingVertical:10, fontSize:22,paddingHorizontal:15,textAlign:'center',letterSpacing:0, color:style.colors.primary, fontWeight:700, textShadowColor:'#000000',textShadowRadius:12}}>Panchayati Raj Project Management System</Text>
      </View>
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={{flexDirection:'row', borderWidth:1,borderColor:style.colors.grey, width:width-80, alignItems:'center', paddingHorizontal:10,borderRadius:100, marginTop:width/4}} >
        <Icon name='mobile1' size={24}/>
        <TextInput
        placeholder='Enter registered mobile no.'
        keyboardType='numeric'
        maxLength={10}
        value={mobile}
        onChangeText={(text) => setMobile(text)}
        onFocus={()=>setFocus(true)}
        onBlur={()=>setFocus(false)}

        />
    </KeyboardAvoidingView >
    {/* ------------Button---------- */}
    <View style={{marginBottom:100}}>
      <TouchableOpacity style={{ shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity:  0.20,
        shadowRadius: 5.62,
        elevation: 7,backgroundColor:style.colors.background, width:width-80, alignItems:'center', borderRadius:30, paddingHorizontal:10, paddingVertical:12, alignSelf:'center',marginTop:15 }}
        onPress={handleOtpLogin}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{alignSelf:'center', fontSize:22, color:style.colors.primary, fontWeight:'800', marginHorizontal:10}}>Login</Text>
            <Ionicons name='arrow-forward-circle' color={'white'} size={25} />
            </View>
            
      </TouchableOpacity>
      
      </View>
   </LinearGradient>
   </Pressable>
  );
};


export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:'#FFFFFF',
    
  },
  input: {
    marginBottom: 10,
    backgroundColor:style.colors.lightAccent
    
  },
  button: {
    marginTop: 10,
    backgroundColor:style.colors.background
    
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});


