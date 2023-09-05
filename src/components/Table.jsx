import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../style';

const TableFormat = ({ nav, projectDetails }) => {
  // Check if projectDetails is defined and contains data
  const tableData = projectDetails && projectDetails.data ? projectDetails.data : [];
console.log(tableData)
  const message = function _alertIndex(index) {
    nav.navigate('DetailedView', { data: tableData[index] });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Serial No</Text>
            </View>
            <View style={[styles.headerCell]}>
              <Text style={styles.headerText}>Project Name</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Category</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Estimated Cost</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Action</Text>
            </View>
          </View>
          {tableData.map((item, index) => (
            <View key={index} style={[styles.dataRow, index % 2 !== 0 ? styles.evenRow : null]}>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
              </View>
              <View style={[styles.cell, styles.projectNameCell]}>
                <Text style={styles.cellText}>{item.name}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{item.category}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{item.estimated}</Text>
              </View>
              <View style={styles.cell}>
                <MaterialIcon name="eye-arrow-right" size={25} color={style.colors.deepAccent} onPress={() => message(index)} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 0.8, padding: 5, paddingTop: 30 },
  table: { backgroundColor: style.colors.primary,alignItems:'center'},
  headerRow: { flexDirection: 'row', backgroundColor: style.colors.deepAccent, borderWidth: 2, borderColor: style.colors.lightAccent },
  headerCell: { flex: 1, paddingVertical: 5, paddingHorizontal: 8, borderWidth:1,borderColor:style.colors.primary},
  headerText: { color: style.colors.primary, fontSize: 16, fontWeight: '900', textAlign: 'center' ,},
  dataRow: { flexDirection: 'row', paddingHorizontal: 8,alignItems: 'center' },
  evenRow: { backgroundColor: style.colors.lightAccent,alignItems: 'center'},
  cell: { flex: 1, paddingVertical: 12, width:100, alignItems:'center'},
  projectNameCell: { flex: 2 }, // Adjust the width of the Project Name column
  cellText: { color: style.colors.grey, textAlign:'center' },
});

export default TableFormat;
