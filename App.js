// import { StatusBar } from 'expo-status-bar';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Nav from './src/components/Nav';
import Content from './src/components/Content';
import MyContext from './src/service/context';
import { useState } from 'react';


export default function App() {

  const [dark, setDark] = useState(false)
  const [font, setFont] = useState("serif")
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")

  return (
    <MyContext.Provider value={{ dark, setDark, data, setData,search,setSearch }} >
      <View style={{backgroundColor: dark ? "black" : "white", height:"100%"}}>
        <Nav />
        <Content />
        <StatusBar style="auto" />
      </View>
    </MyContext.Provider>
  );
}
