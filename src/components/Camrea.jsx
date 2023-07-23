
import React from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet,Dimensions, Pressable } from 'react-native';
import { Camera,useCameraDevices } from 'react-native-vision-camera';
import style from '../style';

const CameraScreen = ({ modal, imgdata}) => {
    
    const devices=useCameraDevices()
    const camera=React.useRef(null)
    const device=devices.back
    const {width,height}=Dimensions.get('screen')
    
    
    
    


    React.useEffect(() => {
        const requestCameraPermission = async () => {
          try {
            const cameraPermissionStatus = await Camera.requestCameraPermission();
            console.log(cameraPermissionStatus)
            }catch (error) {
            console.warn('Error while requesting camera permission:', error);
          }
        };
    
        requestCameraPermission();
      }, []);
      if(device==null){ 
        return <ActivityIndicator/>
        }

        const takePicture=async()=>{
          if(camera!==null){
          const photo=await camera.current.takePhoto()
          console.log(photo)
          imgdata('file://'+photo.path)
          modal(false)
          
          }
        }
    return (
      <View>
        <View style={{flex:1, }}>
        <Camera photo={true} style={[StyleSheet.absoluteFill,{flex:1, height:height}]} device={device} isActive={true} ref={camera}/>
        <TouchableOpacity onPress={()=>{
          takePicture();
        }} 
        style={{position:'absolute', width:100, height:40, borderRadius:10,top:height/2+100, alignSelf:'center',justifyContent:'center', backgroundColor:style.colors.background }}>
          <Text style={{ fontSize: 16, textAlign:'center', color: 'white', }}>Take Picture</Text>
        </TouchableOpacity>
        </View>
       
      </View>
    );
  };
  
  export default CameraScreen;
  