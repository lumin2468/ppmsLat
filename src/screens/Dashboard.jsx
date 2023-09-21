import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import DashbdCards from '../components/DashbdCards';
import LinearGradient from 'react-native-linear-gradient';
import style from '../style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useApi} from '../components/apiContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({navigation, route}) => {
  const {width, height} = Dimensions.get('screen');
 
  // const [projectDetails,setProjectDetails]=React.useState([])
  const baseUrl = 'http://203.193.144.19/ppms/api';
  let recentProjects = [];
  const {projectDetails, userDetail, fetchLoggedInUser, fetchProjectList} =
    useApi();
  console.log(`PROOOO`, projectDetails);
  if (projectDetails && projectDetails.data && projectDetails.data.length > 0) {
    recentProjects = projectDetails.data.slice(0, 4);
  }

  React.useEffect(() => {
    async function getTokenAndFetchData() {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        // Use the token to fetch user data and project list
        fetchLoggedInUser(token);
        fetchProjectList(token);
      } else {
        // Handle the case when the token is not found
        console.error('Token not found in AsyncStorage');
      }
    }

    getTokenAndFetchData();
  }, []);
  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    navigation.navigate('Login');
  };
  return (

    
    <LinearGradient
      style={{flex: 1, alignItems: 'center', paddingTop: 25}}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0, 1]}
      colors={[style.colors.secondary, style.colors.primary]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={'-320'}>
      <View
        style={{
          width: width,
          paddingHorizontal: 15,
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:'space-between'
        }}>
        <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
       
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <Image
            source={require('../../assets/logo.png')}
            style={{height: 40, width: 35}}
          />
          <Text style={{color:style.colors.background, fontSize:22,textShadowColor:style.colors.grey,
            textShadowOffset: {
              width: 1,
              height: 1.3,
            },
            textShadowRadius:3,}}>PPMS</Text>
        </View>
        </View>
        {/* ---------------------- */}
        
        {/* ----------------         */}
        
        <View>
          <TouchableOpacity onPress={handleLogout}>
            <FontAwesome name="power-off" size={25} color={style.colors.background} />
          </TouchableOpacity>
        </View>
       
      </View>
      {/* ---------------------------------  */}
      <View>
        <View
          style={{
            flex: 0.06,
            alignSelf:'center',
            justifyContent:'space-between',
            alignItems:'center',
            flexDirection: 'row',
            paddingTop:5,
            paddingHorizontal:5,
            width: width - 20,
            marginBottom: 10,
            borderRadius:10,
            backgroundColor:style.colors.lightAccent,
          }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '700',
                  marginBottom: 10,
                  color: style.colors.primary,
                }}>
                Welcome {userDetail?.name}
              </Text>
            </View>
              <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                alignSelf: 'flex-start',
              }}>
              <Ionicons name="location" color={style.colors.primary} size={16} />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '500',
                  color: style.colors.primary,
                }}>{`${userDetail?.block}`}</Text>
            
            </View>
           
            
          
        </View>
        {/* --------------------------------------------- */}
        <DashbdCards />
        {/* ----------------------------------------------- */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{position: 'absolute', alignSelf: 'center'}}>
          <View
            style={{
              alignItems: 'center',
              gap: 20,
              alignSelf: 'center',
              padding: 10,
            }}>
            {recentProjects ? (
              recentProjects?.map((project, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    flex: 0.5,
                    flexDirection: 'row',
                    width: width - 20,
                    height: height / 8,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems:'center',
                    padding: 8,
                    gap: 10,
                    shadowColor: "#000000",
                    shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity:  0.23,
                  shadowRadius: 11.27,
                  elevation: 14
                  }}>
                  <View style={{paddingVertical: 5}}>
                    <Image
                      source={require('../../assets/project3.jpg')}
                      style={{width: 80, height: 80}}
                     ></Image>
                  </View>
                  <View style={{gap: 3}}>
                    <Text
                      style={{
                        width: width - 150,
                        textAlign: 'justify',
                        paddingHorizontal: 5,
                        fontWeight: 'bold',
                        color: style.colors.lightAccent,
                      }}>
                      Project Name:{' '}
                      <Text style={{color: style.colors.grey}}>
                        {project?.name}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        width: width - 150,
                        textAlign: 'justify',
                        paddingHorizontal: 5,
                        fontWeight: 'bold',
                        color: style.colors.lightAccent,
                      }}>
                      Category:{' '}
                      <Text style={{color: style.colors.grey}}>
                        {project?.category}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        width: width - 150,
                        textAlign: 'justify',
                        paddingHorizontal: 5,
                        fontWeight: 'bold',
                        color: style.colors.lightAccent,
                      }}>
                      Estimation:{' '}
                      <Text style={{color: style.colors.grey}}>
                      ₹{project?.estimated}
                      </Text>
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <ActivityIndicator />
            )}

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
                width: width / 3,
                alignItems: 'center',
                borderRadius: 15,
                paddingHorizontal: 10,
                paddingVertical: 10,
                alignSelf: 'center',
              }}
              onPress={() =>
                navigation.navigate('PendingList', {projectDetails})
              }>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    color: style.colors.primary,
                    fontWeight: '800',
                    marginHorizontal: 10,
                  }}>
                  Show more
                </Text>
                <Ionicons
                  name="arrow-forward-circle"
                  color={'white'}
                  size={25}
                />
              </View>
            </TouchableOpacity>
            <View style={{height: 50}} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Dashboard;
