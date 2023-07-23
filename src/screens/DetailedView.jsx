import { View, Text,Pressable,TouchableOpacity,TextInput, Dimensions,KeyboardAvoidingView, ScrollView,Modal,Image } from 'react-native'
import React from 'react'
import CameraScreen from '../components/Camrea'
import style from '../style'
import LinearGradient from 'react-native-linear-gradient'
import Geolocation from 'react-native-geolocation-service';
import LoactionScreen from '../components/Location'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Success from '../components/Modal'


 


const DetailedView = ({route, navigation}) => {
  const [capturedImage, setCapturedImage] = React.useState('');
  const [locationData, setLocationData] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const {width, height} =Dimensions.get('screen')
  const data=route.params.data

  const handleModal=(value)=>{
    setShowModal(value)
  }

  const handleImage=(value)=>{
     setCapturedImage(value)
  }
  const getLocation=()=>{
    Geolocation.getCurrentPosition(
        (position) => {
          setLocationData(position)
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  } 

  const handleSuccess = (value) => {
    setShowSuccessModal(value)
  }

  
  return (
    <LinearGradient style={{flex:1}} start={{ x: 0, y: 0 }} end={{ x:1 , y:1}} locations={[0, 1]} colors={[ style.colors.lightAccent,'#fff']} >
       <View style={{flex:0.2,justifyContent:'center',alignItems:'center', backgroundColor:style.colors.background, borderBottomEndRadius:75, zIndex:1}}>
        <Text style={{fontSize:35, color:style.colors.primary, fontWeight:'bold', letterSpacing:1, textShadowRadius:20, textShadowColor:'#000'}}>Detailed View</Text>
       </View>
    <View style={{flex:1}}>

    <ScrollView showsHorizontalScrollIndicator={false} >
    <KeyboardAvoidingView style={{gap:20, marginTop:30}}>
    <View style={{flexDirection:'row',borderWidth:1,borderColor:style.colors.grey, width:'90%', alignSelf:'center',borderRadius:10 }}>
    <View style={{alignItems:'flex-start',backgroundColor:style.colors.grey, width:width/3.5, paddingVertical:18, paddingHorizontal:5, borderTopLeftRadius:9, borderBottomLeftRadius:9,}}>
      <Text style={{color:style.colors.primary,fontWeight:'700'}}>Project Name</Text>
    </View>
    <TextInput
       style={{flex:1, fontSize:16,}}
       value={data[1]}
       selectTextOnFocus={false}
       editable={false}
        // onChangeText={(text) => setMobile(text)}
        // onFocus={()=>setFocus(true)}
        // onBlur={()=>setFocus(false)}
        />
        </View>
        <View style={{flexDirection:'row',borderWidth:1,borderColor:style.colors.grey, width:'90%', alignSelf:'center',borderRadius:10 }}>
    <View style={{alignItems:'flex-start',flexWrap:'nowrap',backgroundColor:style.colors.grey, width:width/3.5, paddingVertical:18,paddingHorizontal:5, borderTopLeftRadius:9, borderBottomLeftRadius:9,}}>
      <Text style={{color:style.colors.primary,fontWeight:'700'}}>Catagory</Text>
    </View>
    <TextInput
        style={{flex:1, fontSize:16,}}
        value={data[2]}
        editable={false}
        selectTextOnFocus={false}
       
        // onChangeText={(text) => setMobile(text)}
        // onFocus={()=>setFocus(true)}
        // onBlur={()=>setFocus(false)}

        />
        </View>
        <View style={{flexDirection:'row',borderWidth:1,borderColor:style.colors.grey, width:'90%', alignSelf:'center',borderRadius:10 }}>
    <View style={{alignItems:'flex-start',backgroundColor:style.colors.grey, width:width/3.5, paddingVertical:18, paddingHorizontal:5, borderTopLeftRadius:9, borderBottomLeftRadius:9,}}>
      <Text style={{color:style.colors.primary,fontWeight:'700'}}>Sub-Category</Text>
    </View>
    <TextInput
       style={{flex:1, fontSize:16,}}
       
        // onChangeText={(text) => setMobile(text)}
        // onFocus={()=>setFocus(true)}
        // onBlur={()=>setFocus(false)}

        />
        </View>
        <View style={{flexDirection:'row',borderWidth:1,borderColor:style.colors.grey, width:'90%', alignSelf:'center',borderRadius:10 }}>
    <View style={{alignItems:'flex-start',backgroundColor:style.colors.grey, width:width/3.5, paddingVertical:18, paddingHorizontal:5, borderTopLeftRadius:9, borderBottomLeftRadius:9,}}>
      <Text style={{color:style.colors.primary,fontWeight:'700'}}>Estimated Cost</Text>
    </View>
    <TextInput
        style={{flex:1, fontSize:16,}}
        value={data[3]}
        editable={false}
        selectTextOnFocus={false}
        // onChangeText={(text) => setMobile(text)}
        // onFocus={()=>setFocus(true)}
        // onBlur={()=>setFocus(false)}

        />
        </View>
        <View style={{flexDirection:'row',borderWidth:1,borderColor:style.colors.grey, width:'90%', alignSelf:'center',borderRadius:10 }}>
    <View style={{alignItems:'flex-start',backgroundColor:style.colors.grey, width:width/3.5, paddingVertical:18, paddingHorizontal:5, borderTopLeftRadius:9, borderBottomLeftRadius:9,}}>
      <Text style={{color:style.colors.primary,fontWeight:'700'}}>Sanction Amnt.</Text>
    </View>
    <TextInput
        style={{flex:1, fontSize:16,}}
        // onChangeText={(text) => setMobile(text)}
        // onFocus={()=>setFocus(true)}
        // onBlur={()=>setFocus(false)}

        />
        </View>
    </KeyboardAvoidingView>
    {showModal && <Modal style={{flex:1}}>
      <CameraScreen modal={handleModal} imgdata={handleImage}/>
    </Modal>}
    <View style={{flex:1, alignItems:'center', marginTop:50}}>
          {capturedImage!=="" && <Image source={{uri:capturedImage}} resizeMode='cover' style={{width:'90%',borderWidth:1,borderColor:style.colors.grey, height:200, borderRadius:15, marginBottom:10}}/>}
        <Pressable style={{width:'90%',borderRadius:15,backgroundColor:style.colors.lightAccent, height:50, borderWidth:1,borderColor:style.colors.grey, alignSelf:'center', alignItems:'center', justifyContent:'center'}} onPress={()=>setShowModal(true)}>
       <Text style={{ fontSize:20, fontWeight:'bold', color:style.colors.primary}}>Take Photo</Text>
        </Pressable>
        </View>
        {/* .............................. */}

      <LoactionScreen/>
      <View style={{gap:20, marginTop:50}}>
      <View style={{flexDirection:'row',borderWidth:1,borderColor:style.colors.grey, width:'90%', alignSelf:'center',borderRadius:10 }}>
    <View style={{flexDirection:'row',alignItems:'center',backgroundColor:style.colors.grey, width:width/3.5, paddingVertical:18, paddingHorizontal:5, borderTopLeftRadius:9, borderBottomLeftRadius:9,}}>
    <Icon name='map-marker-radius' size={25} color={style.colors.primary}/>
      <Text style={{color:style.colors.primary,fontWeight:'700'}}>Latitude</Text>
    </View>
    <TextInput
       style={{flex:1, fontSize:16,}}
       value={locationData.coords ? locationData.coords.latitude+'':''}
        editable={false}
        selectTextOnFocus={false}
        // onChangeText={(text) => setMobile(text)}
        // onFocus={()=>setFocus(true)}
        // onBlur={()=>setFocus(false)}

        />
        </View>
        <View style={{flexDirection:'row',borderWidth:1,borderColor:style.colors.grey, width:'90%', alignSelf:'center',borderRadius:10 }}>
    <View style={{flexDirection:'row',alignItems:'center',backgroundColor:style.colors.grey, width:width/3.5, paddingVertical:15, paddingHorizontal:5, borderTopLeftRadius:9, borderBottomLeftRadius:9,}}>
      <Icon name='map-marker-radius' size={25} color={style.colors.primary}/>
      <Text style={{color:style.colors.primary,fontWeight:'700'}}>Longitude</Text>
    </View>
    <TextInput
       style={{flex:1, fontSize:16,}}
       value={locationData.coords ? locationData.coords.longitude+'':''}
        editable={false}
        selectTextOnFocus={false}
        // onChangeText={(text) => setMobile(text)}
        // onFocus={()=>setFocus(true)}
        // onBlur={()=>setFocus(false)}

        />
        </View>
        <View style={{flex:1, alignItems:'center', marginTop:10}}>
        <Pressable style={{width:'90%',borderRadius:15,backgroundColor:style.colors.lightAccent, height:50, borderWidth:1,borderColor:style.colors.grey, alignSelf:'center', alignItems:'center', justifyContent:'center'}} onPress={getLocation} >
       <Text style={{ fontSize:20, fontWeight:'bold', color:style.colors.primary}}>Location</Text>
        </Pressable>
        </View>
      </View>
      <View style={{height:50}}/>
      <View style={{marginBottom:100}}>
      
      {showSuccessModal && <Success handlePress={navigation}/> }
      <View style={{ shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity:  0.20,
        shadowRadius: 5.62,
        elevation: 7,backgroundColor:style.colors.background, width:width/2, alignItems:'center', borderRadius:30, paddingHorizontal:10, paddingVertical:12, alignSelf:'center',marginTop:15 }}>
        <Pressable onPress={()=>setShowSuccessModal(true)}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{alignSelf:'center', fontSize:22, color:style.colors.primary, fontWeight:'800', marginHorizontal:10}}>SUBMIT</Text>
            </View>
            
        </Pressable>
      </View>
      </View>
    </ScrollView>
    </View>
    </LinearGradient>
  )
}

export default DetailedView