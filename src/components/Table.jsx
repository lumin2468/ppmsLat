import React from 'react';
import { StyleSheet, View,Pressable,Alert,Text, ScrollView } from 'react-native';
import { Table,Row, Rows, Col,Cell, TableWrapper} from 'react-native-table-component';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import style from '../style';   

const tData = [
    ['1','Project1','Catagory1','₹2000000',""],
    ['2','Project2','Catagory2','₹6676677',""],
    ['3','Project3','Catagory3','₹7656566',""],
    ['4','Project4','Catagory4','₹6667834',""],
    ['5','Project5','Catagory5','₹6656834',""],
    ['6','Project6','Catagory6','₹6667664',""],
    ['7','Project7','Catagory7','₹6667664',""],
    ['8','Project8','Catagory8','₹6667664',""],
    ['9','Project9','Catagory9','₹6667664',""],
    ['10','Project10','Catagory10','₹6667664',""],
    ['11','Project11','Catagory11','₹6667664',""],
    ['12','Project12','Catagory12','₹6667664',""],
    ['13','Project13','Catagory13','₹6667664',""],
    ['14','Project14','Catagory14','₹6667664',""],
    ['15','Project15','Catagory15','₹6667664',""],
    ['16','Project16','Catagory16','₹6667664',""],
    ['17','Project17','Catagory17','₹6667664',""],
    ['18','Project18','Catagory18','₹6667664',""],
   
    
  ]
const TableFormat=({nav})=>{
    const [tableHead,setTableHead]=React.useState(['Sl.no.','Project Name','Project Catagory','Estimated Cost', 'Action'])
    const [tableData,setTableData]=React.useState(tData)
      const message= function _alertIndex(index) {
        nav.navigate('DetailedView',{data:tableData[index]})
      }
      
      const element = (data, index) => (
        <Pressable onPress={() =>message(index)}>
          <View>
            <MaterialIcon name='eye-arrow-right' size={25} color={style.colors.deepAccent}/>
          </View>
        </Pressable>
      );
      return (
        <ScrollView style={styles.container} stickyHeaderIndices={[2]} pagingEnabled={true}>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
        <Table>
          <Row data={tableHead} flexArr={[1,2,2,2,1]} style={styles.head} textStyle={styles.text}/>
          {
            tableData.map((rowData, index) => (
              <TableWrapper key={index} style={[index%2===0?styles.row:styles.erow]}>
                {
                
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} textStyle={styles.celltext} data={cellIndex === 4 ? element(cellData, index) : cellData}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </ScrollView>
      <View style={{height:100}}/>
      </ScrollView>
      )
}
export default TableFormat
const styles = StyleSheet.create({
    container: { flex: 0.8,padding:5, paddingTop: 30},
    head: { height: 60, backgroundColor: style.colors.deepAccent, borderWidth:2, borderColor:style.colors.lightAccent},
    text: { margin: 6, color: style.colors.primary, textAlign:'center', fontSize:16, fontWeight:'900'},
    celltext:{ marginHorizontal:12,marginVertical:15, color: style.colors.grey,alignSelf:'center'},
    row: { flexDirection: 'row', backgroundColor: style.colors.primary, alignSelf:'center' },
    erow: { flexDirection: 'row', backgroundColor: style.colors.lightAccent },
    
  });