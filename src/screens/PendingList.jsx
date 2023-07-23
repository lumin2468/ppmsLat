import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import style from '../style'
import TableFormat from '../components/Table'


const PendingList = ({navigation}) => {
  const {width,height} = Dimensions.get('screen')
  return (
    <LinearGradient style={{flex:1, }} start={{ x: 0, y: 0 }} end={{ x:1 , y:1}} locations={[0, 1]} colors={[ style.colors.lightAccent,'#fff']}>
       <View style={{flex:0.2,justifyContent:'center',alignItems:'center', backgroundColor:style.colors.background, borderBottomEndRadius:75, zIndex:1}}>
        <Text style={{fontSize:35, color:style.colors.primary, fontWeight:'bold', letterSpacing:1, textShadowRadius:20, textShadowColor:'#000'}}>PENDING LIST</Text>
       </View>
      <TableFormat nav={navigation}/>
      </LinearGradient>
  )
}

export default PendingList