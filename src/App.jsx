import * as React from 'react';
import { View, StyleSheet,Image,Dimensions, Text } from 'react-native';
import { TextInput, Button, PaperProvider } from 'react-native-paper';
import style from '../style.jsx';
import MyComponent from '../Components/Dropdown.jsx';
import Icon from 'react-native-vector-icons/FontAwesome';

// import {Dropdown} from 'react-native-element-dropdown'
// import AntDesign from 'react-native-vector-icons';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];





const App = () => {
  // const [value, setValue] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const{width, height} = Dimensions.get('screen')
  const handleLogin = () => {
    // Perform login logic here
    console.log(`Email is ${email}`);
  };
  
  return (
    <PaperProvider>
    <View style={{alignItems:'center', justifyContent:'flex-start', paddingTop:70, backgroundColor:'#ffffff'}}>
      <Image source={require('../assets/logo.png')} style={{height:120, width:110}} />
      <Text style={{paddingVertical:10, fontSize:22,paddingHorizontal:15,textAlign:'center',letterSpacing:0, color:style.colors.background, fontWeight:700}}>Panchayati Raj Project Management System</Text>
      </View>
    <View style={styles.container}>
    <MyComponent/>
    <Icon name='times' size={24}/>
      <TextInput
        label="Mobile No."
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
        
        // right={<TextInput.Icon icon={'eye-plus'} />}
        theme={{
          colors: {
            primary: `${style.colors.background}`,
            text: 'blue',
            placeholder: `${style.colors.grey}`,
            background: `${style.colors.lightAccent}`,
          
          },
        }}
       
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Log In
      </Button>
    </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:'#FFFFFF',
    
  },
  input: {
    marginBottom: 10,
    backgroundColor:style.colors.lightAccent
    
  },
  button: {
    marginTop: 10,
    backgroundColor:style.colors.background
    
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default App;
