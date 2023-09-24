import {View, Text, StyleSheet,ScrollView,Dimensions,Image,TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import style from '../style';

export const BeforeInitiation = ({projectDetails,navigation}) => {
    const {width, height} = Dimensions.get('screen');
    const tableData = projectDetails && projectDetails.data ? projectDetails.data : [];
  const message = function _alertIndex(index) {
  navigation.navigate('DetailedView', { data: tableData[index] });
  
  }
  return (
    <LinearGradient
    style={{flex: 1}}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    locations={[0, 1]}
    colors={[style.colors.secondary, '#fff']}>
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
          {projectDetails ? (
            projectDetails.data?.map((project, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'white',
                  flex: 0.5,
                  flexDirection: 'row',
                  width: width - 20,
                  height: height / 8,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 20,
                  padding: 10,
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
                    source={require('../../assets/project2.png/')}
                    style={{width: 82, height: 85}}></Image>
                </View>
                <View style={{gap: 3, width: 130}}>
                  <Text style={{color: style.colors.grey,fontFamily:'Poppins-Light',fontSize:14}}>
                    {project?.name}
                  </Text>
                  <Text style={{color: style.colors.background,fontFamily:'Poppins-Light',fontSize:12}}>
                  ₹{project?.estimated}
                  </Text>
                  <Text style={{color: style.colors.grey,fontFamily:'Poppins-Light',fontSize:12}}>
                    {project?.category}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => message(index)}>
                  <View
                    style={{
                      width: 80,
                      height: 30,
                      borderWidth: 1,
                      borderColor: style.colors.lightAccent,
                      paddingHorizontal: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    //   backgroundColor: style.colors.lightAccent,
                     marginTop:20
                    }}>
                    <Text style={{color: style.colors.lightAccent, fontFamily:'Poppins-Light',fontSize:8}}>Update Status</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <ActivityIndicator />
          )}

          <View style={{height: 50}} />
        </View>
      </ScrollView>
      </LinearGradient>
  );
};

export const DuringExecution = () => {
  return (
    <LinearGradient
    style={{flex: 1}}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    locations={[0, 1]}
    colors={[style.colors.secondary, '#fff']}>
    <View>
      <Text>Screen2</Text>
    </View>
    </LinearGradient>
  );
};
export const Completion = () => {
  return (
    <LinearGradient
    style={{flex: 1}}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    locations={[0, 1]}
    colors={[style.colors.secondary, '#fff']}>
    <View>
      <Text>Screen3</Text>
    </View>
    </LinearGradient>
  );
};

const Tab = createMaterialTopTabNavigator();
const TabNav = ({projectDetails,navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Submitted"
      screenOptions={{
        // tabBarActiveTintColor: '#fff',
        tabBarIndicatorStyle: {backgroundColor: 'cyan', height: 3},
        tabBarStyle: [styles.container],
      }}>
      <Tab.Screen
        name="Submitted"
        options={{
          title: ({color, focused}) => {
            return (
              <View
                style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                <Ionicons
                  size={20}
                  color={focused ? 'cyan' : '#fff'}
                  name="shield-checkmark-sharp"
                />
                <Text
                  style={{
                    color: `${focused ? '#fff' : '#fff'}`,
                    letterSpacing: 0.2,
                    fontSize: 10,
                    fontFamily:'Poppins-Light',
                    fontWeight:'700',
                    marginRight:3
                  }}>
                  Before Initiatition   
                </Text>
              </View>
            );
          },
        }}>
        {() => <BeforeInitiation projectDetails={projectDetails} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen
        name="Pending"
        options={{
          title: ({color, focused}) => {
            return (
              <View
                style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                <MaterialIcons
                  size={20}
                  color={focused ? '#c264ff' : '#fff'}
                  name="pending"
                />
                <Text
                  style={{
                    color: `${focused ? '#fff' : '#fff'}`,
                    fontWeight: '700',
                    letterSpacing: 0.2,
                    fontSize: 10,
                    fontFamily:'Poppins-Light'
                  }}>
                  During Execution 
                </Text>
              </View>
            );
          },
        }}>
        {() => <DuringExecution />}
      </Tab.Screen>
      <Tab.Screen
        name="Archive"
        options={{
          title: ({color, focused}) => {
            return (
              <View
                style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                <Entypo
                  size={20}
                  color={focused ? 'tomato' : '#fff'}
                  name="archive"
                />
                <Text
                  style={{
                    color: `${focused ? '#fff' : '#fff'}`,
                    fontWeight: '700',
                    letterSpacing: 0.2,
                    fontSize: 10,
                    fontFamily:'Poppins-Light'
                  }}>
                  Completion
                </Text>
              </View>
            );
          },
        }}>
        {() => <Completion />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: style.colors.lightAccent,
  },
});
export default TabNav;
