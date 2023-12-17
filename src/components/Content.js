import { View, Text, StyleSheet, ScrollView} from "react-native";
import { useFonts, PlayfairDisplay_600SemiBold } from "@expo-google-fonts/playfair-display";
import MyContext from "../service/context";
import { useContext } from "react";
import Definition from "./Definition";


export default function Content() {

    const { dark, search, data,msg } = useContext(MyContext)

    const [fontsLoaded, fontError] = useFonts({
        PlayfairDisplay_600SemiBold,
    })
    if (!fontsLoaded || fontError) {
        return null
    }


    return (
        <ScrollView style={{ marginHorizontal: 20}} >
            {data.length != 0 ? (<Definition />) : (
                <View style={styles.empty}>
                    <Text style={{color:"gray", fontFamily:"PlayfairDisplay_600SemiBold", fontSize:30}}>Search for the word</Text>
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    empty: {
        marginTop: 80,
        alignSelf:"center",
        justifyContent:"center"

    }
})