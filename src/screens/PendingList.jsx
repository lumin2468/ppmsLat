import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import style from '../style'
import TableFormat from '../components/Table'
import { useApi } from '../components/apiContext';


const PendingList = ({navigation,route}) => {
  const {width,height} = Dimensions.get('screen')
  const {projectDetails}=route.params
  
  // async function fetchSingleProject() {
  //   try {
  //     const endpoint = `${baseUrl}/project/c0x1Q2ZSK3hBRlEwOG5pbWVxRVpTUT09`;
  
  //     const response = await fetch(endpoint, {
  //       method: "GET",
  //       headers: {
  //         // Add headers as needed
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Single Project Response:", data);
  //     } else {
  //       console.error("Failed to fetch Single Project. Status:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  // useEffect(()=>{
  //   fetchSingleProject()
  // },[])
  return (
    <LinearGradient style={{flex:1, }} start={{ x: 0, y: 0 }} end={{ x:1 , y:1}} locations={[0, 1]} colors={[ style.colors.lightAccent,'#fff']}>
       <View style={{flex:0.2,justifyContent:'center',alignItems:'center', backgroundColor:style.colors.background, borderBottomEndRadius:75, zIndex:1}}>
        <Text style={{fontSize:35, color:style.colors.primary, fontWeight:'bold', letterSpacing:1, textShadowRadius:20, textShadowColor:'#000'}}>PENDING LIST</Text>
       </View>
      <TableFormat nav={navigation} projectDetails={projectDetails}/>
      </LinearGradient>
  )
}

export default PendingList