import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from '../style';
import Geolocation from 'react-native-geolocation-service';


const CameraScreen = ({modal, imgdata, navigation,route}) => {
  const devices = useCameraDevices();
  const camera = useRef(null);
  const device = devices.back;
  const {width, height} = Dimensions.get('screen');
  const [capturedImages, setCapturedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const data=route.params.data
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        await Camera.requestCameraPermission();
      } catch (error) {
        console.warn('Error while requesting camera permission:', error);
      }
    };

    requestCameraPermission();
  }, []);

  if (device == null) {
    return <ActivityIndicator />;
  }

  const takePicture = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto();

      Geolocation.getCurrentPosition(
        position => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          const updatedImages = [
            {uri: 'file://' + photo.path, location: locationData},
            ...capturedImages,
          ];

          setCapturedImages(updatedImages);
          setShowPreviewModal(true);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const handleKeep = () => {
    setShowPreviewModal(false);
  };
  const handleTakeAnother = () => {
    // Remove the most recent captured image
    const updatedImages = capturedImages.slice(1, capturedImages.length);

    // Update the state with the remaining images and close the modal
    setCapturedImages(updatedImages);
    setCurrentIndex(currentIndex - 1);
    setShowPreviewModal(false);
    if (updatedImages.length === 0) {
      // If no more images, close the preview modal
      setShowPreviewModal(false);
      setCurrentIndex(0);
    }
  };

  
  return (
    <View style={{flex: 1}}>
      
      <Camera
        photo={true}
        style={[StyleSheet.absoluteFill, {flex: 1, height: height}]}
        device={device}
        isActive={true}
        ref={camera}
      />
      <TouchableOpacity
        onPress={takePicture}
        style={{
          position: 'absolute',
          width: width / 5,
          height: height / 11,
          borderRadius: width / 10,
          top: height - 150,
          alignSelf: 'center',
          backgroundColor: 'gray',
        }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Ionicons name="camera" size={50} color="white" />
        </View>
      </TouchableOpacity>

      <Modal visible={showPreviewModal} animationType="slide">
        <LinearGradient
          style={{flex: 1, alignItems: 'center', paddingTop: 25}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0, 1]}
          colors={[style.colors.secondary, style.colors.primary]}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <FlatList
              data={capturedImages}
              ItemSeparatorComponent={() => <View style={{width: 15}} />}
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View>
                  <Image
                    source={{uri: item.uri}}
                    style={{
                      width: width - 25,
                      height: '65%',
                      resizeMode: 'cover',
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: style.colors.primary,
                    }}
                  />
                  <View style={{position: 'absolute', left: 10, top: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name="location"
                        color={style.colors.background}
                        size={25}
                      />
                      <Text style={styles.buttonText}>Latitude: </Text>
                      <Text style={styles.buttonText}>
                        {item.location.latitude}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name="location"
                        color={style.colors.background}
                        size={25}
                      />
                      <Text style={styles.buttonText}>Longitude: </Text>
                      <Text style={styles.buttonText}>
                        {item.location.longitude}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: '25%',
              }}>
              <TouchableOpacity onPress={handleKeep} style={styles.modalButton}>
                <Text style={styles.buttonText}>Keep This</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleTakeAnother}
                style={styles.modalButton}>
                <Text style={styles.buttonText}>Retake</Text>
              </TouchableOpacity>
            </View>
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
                backgroundColor: style.colors.background,
                width: width / 1.5,
                alignItems: 'center',
                borderRadius: 15,
                paddingHorizontal: 10,
                paddingVertical: 15,
                alignSelf: 'center',
                position: 'absolute',
                bottom: '10%',
              }}
              onPress={()=>navigation.navigate("DetailedView",{imgData:capturedImages,data:data})}
              >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    color: style.colors.primary,
                    fontFamily:'Poppins-Light',
                    marginHorizontal: 10,
                  }}>
                  Go to submit
                </Text>
                <Ionicons
                  name="arrow-forward-circle"
                  color={'white'}
                  size={25}
                />
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalButton: {
    width: 120,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
    backgroundColor: style.colors.lightAccent,
  },
  buttonText: {
    color: style.colors.primary,
    textAlign: 'center',
    fontFamily:'Poppins-Light',
    fontSize:12
  },
});

export default CameraScreen;
