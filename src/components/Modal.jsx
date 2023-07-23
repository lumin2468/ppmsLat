import { View,Text,Pressable, Modal, StyleSheet,Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import style from '../style';


const Success=({handlePress})=>{
    
    return (
        <Modal animationType="fade"
      statusBarTranslucent={true}
        transparent={true}
        >

          <View style={{flex:1,alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,0.8)'}}>
          <View style={styles.modal}>
            <Ionicons name='checkmark-circle' color={'green'} size={80}/>
          <Text style={{fontSize:25, fontWeight:'bold'}}>{`Submitted !!!`}</Text>
          <Text style={{textAlign:'center'}}>{`Yay you have successfully submitted the form !!!`}</Text>
          <Pressable onPress={()=>handlePress.navigate('Dashboard')}>
          <View style={styles.successModal}>
            <Text style={{color:style.colors.primary}}>Home</Text>
            <Ionicons name='arrow-forward-circle' color={'white'} size={20} />
          </View>
          </Pressable>
        
          </View>
          </View>
        </Modal>
    )
}

const {width,height}=Dimensions.get('screen')
const styles= StyleSheet.create({
    modal:{
        height:height/3, 
        width:width*90/100, 
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center', 
        gap:15,
        padding:20, 
        borderRadius:15
      },
    successModal:{
        flexDirection:'row', 
        backgroundColor:'green',
        paddingVertical:10, 
        paddingHorizontal:15, 
        borderRadius:8, 
        gap:5, 
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
    
        elevation: 8,
      }
})


export default Success