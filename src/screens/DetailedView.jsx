import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import CameraScreen from '../components/Camrea';
import style from '../style';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import LoactionScreen from '../components/Location';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Success from '../components/Modal';

const DetailedView = ({route, navigation}) => {
  const [capturedImage, setCapturedImage] = React.useState('');
  const [locationData, setLocationData] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const {width, height} = Dimensions.get('screen');
  const data = route.params.data;
  const baseUrl = "http://203.193.144.19/ppms/api";
  const token = "your_bearer_token";
  console.log(data)
  let imgData;
  if (route.params.imgData) {
    imgData = route.params.imgData;
  }

  console.log(`fsdsdfsdfsdssdfsdsffsdsfd`, imgData);
  async function fetchProjectImageUpload(imageData) {
    try {
      const endpoint = `${baseUrl}/project-image-upload/${data.id}`;
  
      const formData = new FormData();
  
      // Append empty arrays for "lat" and "lng"
      formData.append("lat[]", "");
      formData.append("lng[]", "");
  
      // Append each image file
      imageData.forEach((image, index) => {
        formData.append(`image[${index}]`, {
          uri: image.uri,
          name: `image_${index}.jpg`, // You can change the file name as needed
          type: "image/jpeg", // You can change the file type as needed
        });
      });
  
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Project Image Upload Response:", data);
      } else {
        console.error("Failed to upload Project Images. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  
  
  const handleImage = value => {
    setCapturedImage(value);
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocationData(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleSuccess = value => {
    setShowSuccessModal(value);
  };

  return (
    <LinearGradient
      style={{flex: 1}}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0, 1]}
      colors={[style.colors.lightAccent, '#fff']}>
      <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: style.colors.background,
          borderBottomEndRadius: 75,
          zIndex: 1,
        }}>
        <Text
          style={{
            fontSize: 35,
            color: style.colors.primary,
            fontWeight: 'bold',
            letterSpacing: 1,
            textShadowRadius: 20,
            textShadowColor: '#000',
          }}>
          Detailed View
        </Text>
      </View>
      <View style={{flex: 1}}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <KeyboardAvoidingView style={{gap: 20, marginTop: 30}}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: style.colors.grey,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              <View
                style={{
                  alignItems: 'flex-start',
                  backgroundColor: style.colors.grey,
                  width: width / 3.5,
                  paddingVertical: 18,
                  paddingHorizontal: 5,
                  borderTopLeftRadius: 9,
                  borderBottomLeftRadius: 9,
                }}>
                <Text style={{color: style.colors.primary, fontWeight: '700'}}>
                  Project Name
                </Text>
              </View>
              <TextInput
                style={{flex: 1, fontSize: 16}}
                value={data.name}
                selectTextOnFocus={false}
                editable={false}
                // onChangeText={(text) => setMobile(text)}
                // onFocus={()=>setFocus(true)}
                // onBlur={()=>setFocus(false)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: style.colors.grey,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              <View
                style={{
                  alignItems: 'flex-start',
                  flexWrap: 'nowrap',
                  backgroundColor: style.colors.grey,
                  width: width / 3.5,
                  paddingVertical: 18,
                  paddingHorizontal: 5,
                  borderTopLeftRadius: 9,
                  borderBottomLeftRadius: 9,
                }}>
                <Text style={{color: style.colors.primary, fontWeight: '700'}}>
                  Catagory
                </Text>
              </View>
              <TextInput
                style={{flex: 1, fontSize: 16}}
                value={data.category}
                editable={false}
                selectTextOnFocus={false}

                // onChangeText={(text) => setMobile(text)}
                // onFocus={()=>setFocus(true)}
                // onBlur={()=>setFocus(false)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: style.colors.grey,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              <View
                style={{
                  alignItems: 'flex-start',
                  backgroundColor: style.colors.grey,
                  width: width / 3.5,
                  paddingVertical: 18,
                  paddingHorizontal: 5,
                  borderTopLeftRadius: 9,
                  borderBottomLeftRadius: 9,
                }}>
                <Text style={{color: style.colors.primary, fontWeight: '700'}}>
                  Sub-Category
                </Text>
              </View>
              <TextInput
                style={{flex: 1, fontSize: 16}}

                // onChangeText={(text) => setMobile(text)}
                // onFocus={()=>setFocus(true)}
                // onBlur={()=>setFocus(false)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: style.colors.grey,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              <View
                style={{
                  alignItems: 'flex-start',
                  backgroundColor: style.colors.grey,
                  width: width / 3.5,
                  paddingVertical: 18,
                  paddingHorizontal: 5,
                  borderTopLeftRadius: 9,
                  borderBottomLeftRadius: 9,
                }}>
                <Text style={{color: style.colors.primary, fontWeight: '700'}}>
                  Estimated Cost
                </Text>
              </View>
              <TextInput
                style={{flex: 1, fontSize: 16}}
                value={data.estimated.toString()}
                editable={false}
               
                // onChangeText={(text) => setMobile(text)}
                // onFocus={()=>setFocus(true)}
                // onBlur={()=>setFocus(false)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: style.colors.grey,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              <View
                style={{
                  alignItems: 'flex-start',
                  backgroundColor: style.colors.grey,
                  width: width / 3.5,
                  paddingVertical: 18,
                  paddingHorizontal: 5,
                  borderTopLeftRadius: 9,
                  borderBottomLeftRadius: 9,
                }}>
                <Text style={{color: style.colors.primary, fontWeight: '700'}}>
                  Sanction Amnt.
                </Text>
              </View>
              <TextInput
                style={{flex: 1, fontSize: 16}}
                // onChangeText={(text) => setMobile(text)}
                // onFocus={()=>setFocus(true)}
                // onBlur={()=>setFocus(false)}
              />
            </View>
          </KeyboardAvoidingView>
          <LoactionScreen/>
          <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
            <TouchableOpacity
              style={{
                width: '90%',
                borderRadius: 15,
                backgroundColor: style.colors.lightAccent,
                height: 50,
                borderWidth: 1,
                borderColor: style.colors.grey,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.navigate('CameraScreen', {data})}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: style.colors.primary,
                }}>
                Take Photo
              </Text>
            </TouchableOpacity>
          </View>
          {imgData && (
            <>
              <View
                style={{
                  backgroundColor: style.colors.grey,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  width: width / 2,
                  alignSelf: 'center',
                  marginTop: 30,
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: style.colors.primary,
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.17,
                  shadowRadius: 3.05,
                  elevation: 4,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: '900',
                    color: style.colors.primary,
                  }}>
                  Image View
                </Text>
              </View>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}>
                <View style={{width: 15}} />
                {imgData.map((item, index) => (
                  <View key={index} style={{marginRight: 10}}>
                    <Image
                      source={{uri: item.uri}}
                      style={{
                        width: width - 100,
                        height: 150,
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
                ))}
                <View style={{width: 15}} />
              </ScrollView>
            </>
          )}
          {/* .............................. */}

          <View style={{height: 50}} />
          <View style={{marginBottom: 100}}>
            {showSuccessModal && <Success handlePress={navigation} />}
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
                bottom: 0,
              }}
              onPress={()=>fetchProjectImageUpload(imgData)}
              >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 22,
                    color: style.colors.primary,
                    fontWeight: '800',
                    marginHorizontal: 10,
                  }}>
                  Submit
                </Text>
                <Ionicons
                  name="arrow-forward-circle"
                  color={'white'}
                  size={25}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
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
    backgroundColor: style.colors.grey,
  },
  buttonText: {
    color: style.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default DetailedView;
