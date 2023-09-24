import * as React from 'react';
import { View, StyleSheet,Image,Dimensions, Text, TextInput,Pressable, KeyboardAvoidingView,Keyboard, Modal, TouchableOpacity} from 'react-native';
import style from '../style';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';


// import {Dropdown} from 'react-native-element-dropdown'
// import AntDesign from 'react-native-vector-icons';



const OtpVerify = ({navigation, route}) => {
  // const [value, setValue] = React.useState(null);
  const [focus, setFocus] = React.useState(false);
  const{width, height} = Dimensions.get('screen')
  const [otp, setOTP] = React.useState(['', '', '', '', '',]);
  const [timer, setTimer] = React.useState(60);
  const[showSucess,setShowSuccess]=React.useState(false)
  const[showFail,setShowFail]=React.useState(false)
  const [showModal, setShowModal]=React.useState(false)
  const inputRefs = React.useRef([]);
  const [isTimerRunning, setIsTimerRunning] =React.useState(false);
  const mobile=route.params.mobileNo
  const baseUrl = "http://203.193.144.19/ppms/api";
  const [data,setData] = React.useState()
  console.log(otp.join(''))
  async function fetchLogin() {
    try {
      const endpoint = `${baseUrl}/user-login`;
  
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: mobile,
          otp:`${otp.join('')}`,
        }),
      });
  
      const data = await response.json();
      if (data.code===1000) {
        console.log("Login Response:", data);
        await AsyncStorage.setItem('auth_token',data.token);
        setData(data);
        navigation.navigate('Dashboard',{token:data.token})
      } else {
        console.error("Failed to fetch Login. Status:", response.status);
        setShowModal(true)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleOTPChange = (value, index) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = value;
    setOTP(updatedOTP);

    if (index < otp.length - 1 && value !== '') {
      inputRefs.current[index + 1]?.focus();
      
    }
  };
  const handleResend = () => {
    // Implement your resend logic here
    console.log('Resend OTP');
    setTimer(60);
    setIsTimerRunning(true);
  };

  React.useEffect(() => {
    if (isTimerRunning) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [isTimerRunning]);

  React.useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  React.useEffect(() => {
    if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [timer]);

  const clearOTP = () => {
    const clearedOTP = otp.map(() => '');
    setOTP(clearedOTP);
    inputRefs.current[0]?.focus();
  };

  return (
    <>
        
    <LinearGradient style={{flex:1, alignItems:'center'}} start={{ x: 0, y: 0 }} end={{ x:1 , y:1}} locations={[0, 1]} colors={[ style.colors.secondary,'#fff']} >
    <Pressable style={{alignItems:'center'}} onPress={()=>Keyboard.dismiss()}>
    <View style={{alignItems:'center', justifyContent:'flex-start', paddingTop:50, paddingBottom:30}}>
      <Image source={require('../../assets/logo.png')} style={{height:120, width:110}} />
      <Text style={{paddingVertical:10,fontFamily:"Poppins-ExtraBold", fontSize:18,paddingHorizontal:15,textAlign:'center',letterSpacing:0, color:style.colors.lightAccent, fontWeight:'900'}}>Panchayati Raj Project Management System</Text>
      </View>
      <Text style={styles.title}>Enter Code</Text>
      <Text style={styles.subTitle}>{`A five digit code has been sent to \n `}<Text style={[styles.subTitle,{color:style.colors.lightAccent}]}>{`+91-******${(mobile.slice(6))}`}</Text></Text>

      <View style={styles.inputContainer}>
        
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.input, focus && styles.focus]}
            placeholder="0"
            onChangeText={(value) => handleOTPChange(value, index)}
            value={digit}
            keyboardType="numeric"
            maxLength={1}
            secureTextEntry={true}
            onFocus={()=>setFocus(true)}
            onBlur={()=>setFocus(false)}
            
          />
        ))}
        </View>
        <View style={{flexDirection:'row', width:width*0.7, justifyContent:"space-between"}}>
        <Pressable style={styles.linkButton} onPress={clearOTP}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={styles.linkText2}> Reset OTP</Text>
            </View>
        </Pressable>
        <Pressable style={styles.linkButton} onPress={()=>navigation.goBack()}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={styles.linkText2}> Change Mobile </Text>
            </View>
        </Pressable>

        </View>
        <View style={styles.resend}>
      {isTimerRunning ? (
          <Text style={styles.timerText}>{`Resend in ${timer} seconds`}</Text>
        ) : (
          <Pressable style={styles.linkButton} onPress={handleResend}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize:12,fontFamily:'Poppins-Light', color:'gray'}}>Didn't receive code?</Text>
            <Text style={styles.linkText}> Resend OTP</Text>
            </View>
           
          </Pressable>
        )}  
      </View>
      <Modal animationType="slide"
      statusBarTranslucent={true}
        transparent={true}
        visible={showModal}
        >
          {<View style={{flex:1,alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,0.5)'}}>
          <View style={styles.modal}>
            <AntDesign name='closecircle' color={'tomato'} size={50}/>
          <Text style={{fontSize:25}}>Failed!</Text>
          <Text>{`Oops Account verification failed please check mobile no. !!!`}</Text>
          <Pressable onPress={()=>setShowModal(false)}>
          <View style={styles.errorModal}>
            <Text>Try Again</Text>
            <Ionicons name='arrow-redo-circle-sharp' color={'white'} size={20} />
          </View>
          </Pressable>
        
          </View>
          </View>
          }
          {showSucess && <View style={{flex:1,alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,0.5)'}}>
          <View style={styles.modal}>
            <Ionicons name='checkmark-circle' color={'green'} size={80}/>
          <Text style={{fontSize:25, fontWeight:'bold'}}>Verified!!!</Text>
          <Text style={{textAlign:'center'}}>{`Yay you have successfully verified your account !!!`}</Text>
          <Pressable onPress={()=>setShowModal(false)}>
          <View style={styles.successModal}>
            <Text>Continue to App</Text>
            <Ionicons name='arrow-forward-circle' color={'white'} size={20} />
          </View>
          </Pressable>
        
          </View>
          </View>}
      </Modal>
       
       {/* ------------Button---------- */}
     <View style={{marginBottom:100}}>
      <TouchableOpacity style={{ shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity:  0.20,
        shadowRadius: 5.62,
        elevation: 7,backgroundColor:style.colors.lightAccent, width:width/2, alignItems:'center', borderRadius:10, paddingHorizontal:3, paddingVertical:10, alignSelf:'center',borderWidth:1,borderColor:style.colors.primary }}
        onPress={()=>{
          fetchLogin()
          
          }} >
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{alignSelf:'center', fontSize:18,fontFamily:'Poppins-Light', color:style.colors.primary, fontWeight:'800', marginHorizontal:10}}>Verify</Text>
            <Ionicons name='arrow-forward-circle' color={'white'} size={25} />
            </View>
            
        </TouchableOpacity>
      </View>
      </Pressable>
   </LinearGradient>
   </>
  );
};


export default OtpVerify;
const {width, height}=Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    marginTop:width/3,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    fontFamily:'Poppins-Bold',
    letterSpacing:0.6,
    color:style.colors.lightAccent,
    textDecorationLine:'underline',
    textDecorationColor:style.colors.grey,
   
  },
  subTitle:{
    fontSize: 14,
    marginBottom: 10,
    color:style.colors.grey,
    letterSpacing:0.3,
    textAlign: 'center',
    fontFamily:'Poppins-Italic'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '70%',
    marginBottom: 20,
    
  },
  input: {
    width: '13%',
    height: 50,
    borderWidth: 1,
    borderColor: style.colors.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 20,
    fontFamily:'Poppins-Light',
    textAlign: 'center',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  button: {
    backgroundColor: 'rgba(171,17,51,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  focus:{
    borderColor:style.colors.background
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    
  },
  linkText: {
    color: style.colors.lightAccent,
    fontSize: 16,
    fontFamily:'Poppins-Light',
    textDecorationLine: 'underline',
  },
  linkText2: {
    color: style.colors.primary,
    fontSize: 12,
    fontFamily:'Poppins-Light',
    borderWidth: 1,
    borderColor:style.colors.primary,
    borderRadius:5,
    backgroundColor:style.colors.lightAccent,
    paddingHorizontal:10,
    paddingVertical:10,
    shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 4,
},
shadowOpacity:  0.19,
shadowRadius: 5.62,
elevation: 6

  },
  timerText: {
    fontSize: 16,
    color: style.colors.background,
    fontWeight: 'bold',
  },
  resend:{
    width:'50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:'10%',
  },
  logo:{
    alignSelf: 'center',
    },
    modal:{
    height:height/3, 
    width:width*90/100, 
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center', 
    gap:15,
    padding:20, 
    borderRadius:15
  },
  errorModal:{
    flexDirection:'row', 
    backgroundColor:'tomato',
    paddingVertical:10, 
    paddingHorizontal:15, 
    borderRadius:8, 
    gap:5, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  successModal:{
    flexDirection:'row', 
    backgroundColor:'green',
    paddingVertical:10, 
    paddingHorizontal:15, 
    borderRadius:8, 
    gap:5, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  }
});