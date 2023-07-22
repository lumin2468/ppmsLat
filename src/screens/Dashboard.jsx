import { View, Text,Dimensions, Image, FlatList, ScrollView,Pressable } from 'react-native'
import React from 'react'
import DashbdCards from '../components/DashbdCards'
import LinearGradient from 'react-native-linear-gradient'
import style from '../style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'


const Dashboard = ({navigation}) => {
  const {width, height} =Dimensions.get('screen')
  return (
    <LinearGradient style={{flex:1, alignItems:'center', paddingTop:25, }} start={{ x: 0, y: 0 }} end={{ x:1 , y:1}} locations={[0, 1]} colors={[ style.colors.lightAccent,style.colors.primary]} >
    <View style={{width:width, paddingHorizontal:15,marginBottom:15, flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
    <View >
        <Ionicons name='menu-sharp' size={30} color={style.colors.primary}/>
    </View>
    <View >
      <View style={{width:12, height:12, borderRadius:6, backgroundColor:style.colors.deepAccent, position:'absolute',top:3,right:-1, zIndex:1}}/>
        <Fontisto name='bell' size={25} color={style.colors.primary}/>
    </View>
    </View> 
   {/* ---------------------------------  */}
    <View>
      <View style={{flex:0.4,alignSelf:'center',justifyContent:'space-between', flexDirection:'row', alignItems:'center',width:width-20, backgroundColor:style.colors.background, borderRadius:20,marginBottom:20,shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,

      elevation: 8,}}>
  <View style={{backgroundColor:style.colors.primary, width:100,height:100, borderRadius:60, alignItems:'center', justifyContent:'center', margin:10}}>
   <Image source={require('../../assets/avatar.png')}style={{width:65, height:65}}/>
   </View>
   <View>
      <Text style={{textAlign:'center', fontSize:22, padding:20,marginEnd:30, fontWeight:'700', color:style.colors.primary}}>{`Welcome Back!!! \n Username`}</Text>
   </View>
</View>
{/* --------------------------------------------- */}
      <DashbdCards/>
  {/* ----------------------------------------------- */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{position:'absolute',alignSelf:'center',}}>
       <Pressable onLongPress={()=>navigation.navigate('PendingList')} style={{alignItems:'center', gap:15, alignSelf:'center',padding:10}}>
        <View style={{backgroundColor:'white', flex:0.5,flexDirection:'row' ,width:width-40, height:height/8, borderRadius:20, justifyContent:'center', padding:10, gap:10}}>
          <View style={{width:80, height:80, borderRadius:40, backgroundColor:style.colors.deepAccent}}>

          </View>
          <View>
            <Text style={{width:width-150, textAlign:'justify', paddingHorizontal:5}}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.</Text>
            <Text style={{fontWeight:'900', textAlign:'right', color:style.colors.background }}>{`Richard McClintock`}</Text>
          </View>
        </View>
        
        {/* -------------- */}
        <View style={{backgroundColor:'white', flex:0.5,flexDirection:'row' ,width:width-40, height:height/8, borderRadius:20, justifyContent:'center', padding:10, gap:10}}>
          <View style={{width:80, height:80, borderRadius:40, backgroundColor:style.colors.deepAccent}}>

          </View>
          <View>
            <Text style={{width:width-150, textAlign:'justify', paddingHorizontal:5}}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.</Text>
            <Text style={{fontWeight:'900', textAlign:'right', color:style.colors.background }}>{`Richard McClintock`}</Text>
          </View>
        </View>
        {/* ---------------------------------- */}
        <View style={{backgroundColor:'white', flex:0.5,flexDirection:'row' ,width:width-40, height:height/8, borderRadius:20, justifyContent:'center', padding:10, gap:10}}>
          <View style={{width:80, height:80, borderRadius:40, backgroundColor:style.colors.deepAccent}}>

          </View>
          <View>
            <Text style={{width:width-150, textAlign:'justify', paddingHorizontal:5}}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.</Text>
            <Text style={{fontWeight:'900', textAlign:'right', color:style.colors.background }}>{`Richard McClintock`}</Text>
          </View>
        </View>
        {/* ---------------------------------- */}
        <View style={{backgroundColor:'white', flex:0.5,flexDirection:'row' ,width:width-40, height:height/8, borderRadius:20, justifyContent:'center', padding:10, gap:10}}>
          <View style={{width:80, height:80, borderRadius:40, backgroundColor:style.colors.deepAccent}}>

          </View>
          <View>
            <Text style={{width:width-150, textAlign:'justify', paddingHorizontal:5}}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.</Text>
            <Text style={{fontWeight:'900', textAlign:'right', color:style.colors.background }}>{`Richard McClintock`}</Text>
          </View>
        </View>
        <View style={{height:40}}/>
        </Pressable>
      </ScrollView>
    </View>
    </LinearGradient>
  )
}

export default Dashboard