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
} from 'react-native';
import React from 'react';
import DashbdCards from '../components/DashbdCards';
import LinearGradient from 'react-native-linear-gradient';
import style from '../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useApi } from '../components/apiContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({navigation,route}) => {
  const {width, height} = Dimensions.get('screen');
  // const [projectDetails,setProjectDetails]=React.useState([])
  const baseUrl = "http://203.193.144.19/ppms/api";
  let recentProjects=[]
  const { projectDetails, userDetail, fetchLoggedInUser,fetchProjectList } = useApi();
  console.log(`PROOOO`,projectDetails)
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
  },[])
  const handleLogout=async()=>{
    await AsyncStorage.removeItem('auth_token');
    navigation.navigate('Login');
  }
  return (
    <LinearGradient
      style={{flex: 1, alignItems: 'center', paddingTop: 25}}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0, 1]}
      colors={[style.colors.lightAccent, style.colors.primary]}>
      <View
        style={{
          width: width,
          paddingHorizontal: 15,
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <TouchableOpacity>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: style.colors.deepAccent,
                position: 'absolute',
                top: 3,
                left: -1,
                zIndex: 1,
              }}
            />
            <Fontisto name="bell" size={25} color={style.colors.primary} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleLogout}>
            <AntDesign name="poweroff" size={23} color={style.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      {/* ---------------------------------  */}
      <View>
        <View
          style={{
            flex: 0.3,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            width: width - 20,
            backgroundColor: style.colors.background,
            borderRadius: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }}>
          <View
            style={{
              backgroundColor: style.colors.primary,
              width: 80,
              height: 80,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
            }}>
            <Image
              source={require('../../assets/avatar.png')}
              style={{width: 50, height: 50}}
            />
          </View>
          <View style={{paddingLeft:20}} >
            <View style={{flexDirection:'column', alignItems:'center'}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 22,
                fontWeight: '700',
                color: style.colors.primary,
              }}>{`Welcome Back!!!`} </Text>
              <Text style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
                marginBottom:10,
                color: style.colors.primary,
              }}>{userDetail?.name}</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center',
                 gap:3,alignSelf:'flex-end', marginLeft:70}}>
              <Ionicons name='location' color={'white'} size={25} />
              <Text
              style={{
                textAlign:'left',
                fontSize: 16,
                fontWeight: '500',
                color: style.colors.primary,
                
              }}>{`${userDetail?.block}`}</Text>
              </View>
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
            {recentProjects? recentProjects?.map((project, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'white',
                  flex: 0.5,
                  flexDirection: 'row',
                  width: width - 40,
                  height: height / 8,
                  borderRadius: 20,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  padding: 10,
                  gap: 10,
                }}
              >
                <View style={{ paddingVertical: 5 }}>
                  <Image
                    source={require('../../assets/pjList.png')}
                    style={{ borderWidth: 3, borderColor: style.colors.background }}
                  ></Image>
                </View>
                <View style={{ gap: 3 }}>
                  <Text
                    style={{
                      width: width - 150,
                      textAlign: 'justify',
                      paddingHorizontal: 5,
                      fontWeight: 'bold',
                      color: style.colors.background,
                    }}
                  >
                    Project Name: <Text style={{ color: style.colors.grey }}>{project?.name}</Text>
                  </Text>
                  <Text
                    style={{
                      width: width - 150,
                      textAlign: 'justify',
                      paddingHorizontal: 5,
                      fontWeight: 'bold',
                      color: style.colors.background,
                    }}
                  >
                    Category: <Text style={{ color: style.colors.grey }}>{project?.category}</Text>
                  </Text>
                  <Text
                    style={{
                      width: width - 150,
                      textAlign: 'justify',
                      paddingHorizontal: 5,
                      fontWeight: 'bold',
                      color: style.colors.background,
                    }}
                  >
                    Estimation: <Text style={{ color: style.colors.grey }}>{project?.estimated}</Text>
                  </Text>
                </View>
              </View>
            )):<ActivityIndicator/>
          }
            
            <TouchableOpacity style={{ shadowColor: "#000000",
              shadowOffset: {
              width: 0,
              height: 5,
              },
              shadowOpacity:  0.20,
              shadowRadius: 5.62,
              elevation: 7,backgroundColor:style.colors.background, width:width/1.5, alignItems:'center', borderRadius:15, paddingHorizontal:10, paddingVertical:15, alignSelf:'center', }}
              onPress={()=>navigation.navigate('PendingList',{projectDetails})}
        >
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{alignSelf:'center', fontSize:22, color:style.colors.primary, fontWeight:'800', marginHorizontal:10}}>Show more</Text>
            <Ionicons name='arrow-forward-circle' color={'white'} size={25} />
            </View>
            
        </TouchableOpacity>
        <View style={{height: 50}} />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default Dashboard;
