import { View, Text,Dimensions,ScrollView } from 'react-native'
import React from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import style from '../style';
import LinearGradient from 'react-native-linear-gradient';

const pieData = [
  {
    name: "Seoul",
    population: 21500000,
    color:'#e5e5e5',
    legendFontColor: style.colors.grey,
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2800000,
    color: '#b2b2b2',
    legendFontColor:style.colors.grey,
    legendFontSize: 15
  },
  {
    name: "Beijing",
    population: 527612,
    color: "#8b8b8b",
    legendFontColor: style.colors.grey,
    legendFontSize: 15
  },
  {
    name: "New York",
    population: 8538000,
    color: "#585858",
    legendFontColor: style.colors.grey,
    legendFontSize: 15
  },
  {
    name: "Moscow",
    population: 11920000,
    color: '#4c4c4c',
    legendFontColor: style.colors.grey,
    legendFontSize: 15
  }
];

const barData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

const chartConfig={
  backgroundGradientFrom: style.colors.lightAccent,
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: style.colors.primary,
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) =>`rgba(123,123,123,${opacity})`,
  labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  strokeWidth: 4, // optional, default 3
  barPercentage: 0.8,
  useShadowColorFromDataset: false, // optional
  fillShadowGradientToOpacity:1,
  fillShadowGradientToOffset:0.7,
}

const DashbdCards = () => {
  const prgdata = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8],
    
  };

  const {width, height}=Dimensions.get("screen")
  return (
<View style={{alignItems:'center', flexDirection:'row'}}>
  <ScrollView snapToInterval={width} decelerationRate='fast' bounces={false} horizontal={true} contentContainerStyle={{paddingTop:10, gap:14,paddingRight:10, alignItems:'center',}} showsHorizontalScrollIndicator={false}>
    <Text style={{position:'absolute', left:width/6,top:-5, fontWeight:'700', letterSpacing:0.3,textDecorationLine:'underline', color:style.colors.grey, fontSize:22,zIndex:1}}>Before Initiation of photo</Text>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10
          ]
        }
      ]
    }}
    
    width={width-30} // from react-native
    height={220}
    yAxisLabel="  "
    yAxisSuffix="Pending"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundGradientFrom: style.colors.lightAccent,
      backgroundGradientTo:style.colors.primary,
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(123,123,123,${opacity})`,
      labelColor: (opacity = 1) =>`rgba(255,255,255,${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "5",
        strokeWidth: "3",
        stroke: style.colors.primary
        
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
      paddingVertical: 10,
      paddingHorizontal:15,
      
    }}
  />
  <View style={{marginRight:12 }}>
  <Text style={{position:'absolute', left:width/5, top:-35, fontWeight:'700', letterSpacing:0.3,textDecorationLine:'underline', color:style.colors.grey, fontSize:22,zIndex:1}}>Transparency Pillar</Text>

  <ProgressChart
  data={prgdata}
  width={width-30}
  height={220}
  strokeWidth={15}
  radius={32}
  chartConfig= {{
    backgroundGradientFrom: style.colors.lightAccent,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: style.colors.primary,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) =>`rgba(123,123,123,${opacity})`,
    labelColor: (opacity = 1) => `rgba(123,123,123,${opacity})`,
    strokeWidth: 4, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
    fillShadowGradientToOpacity:1,
    fillShadowGradientToOffset:0.5,
    style:{backgroundGradient:style.colors.background}
  }}
  hideLegend={false}
  style={{borderRadius:15, alignSelf: 'center'}}
/>
</View>
<View>
<Text style={{position:'absolute', left:width/6, top:-35, fontWeight:'700', letterSpacing:0.3,textDecorationLine:'underline', color:style.colors.grey, fontSize:22,zIndex:1}}>During Execution Photo</Text>

<BarChart
  data={barData}
  style={{borderRadius:15, alignSelf: 'center'}}
  width={width-30}
  height={220}
  yAxisLabel="$"
  chartConfig={chartConfig}
  
/>
</View>
<LinearGradient style={{flex:1, alignItems:'center', borderRadius:15,paddingRight:10, marginLeft:10 }} start={{ x: 0, y:1 }} end={{ x:1 , y:1}} locations={[0, 1]} colors={[ style.colors.lightAccent,style.colors.primary]} >
<Text style={{position:'absolute', left:width/4, top:-30, fontWeight:'700', letterSpacing:0.3,textDecorationLine:'underline', color:style.colors.grey, fontSize:22,zIndex:1}}>Completion Photo</Text>
<PieChart
  data={pieData}
  width={width-30}
  height={220}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"10"}
  center={[0, 0]}
  avoidFalseZero={true}
  absolute
/>
</LinearGradient>
</ScrollView>
</View>

  )
}

export default DashbdCards