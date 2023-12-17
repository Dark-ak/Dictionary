import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import { useFonts, PlayfairDisplay_600SemiBold } from "@expo-google-fonts/playfair-display";
import { Quintessential_400Regular } from "@expo-google-fonts/quintessential"
import { FontAwesome } from "@expo/vector-icons";
import { Neuton_400Regular } from "@expo-google-fonts/neuton";
import MyContext from "../service/context";
import { useContext } from "react";


export default function Definition() {

    const { dark, search, data } = useContext(MyContext)

    const [fontsLoaded, fontError] = useFonts({
        PlayfairDisplay_600SemiBold,
        Quintessential_400Regular,
        Neuton_400Regular
    })
    if (!fontsLoaded || fontError) {
        return null
    }

    if (!data) {
        return (
            <View style={styles.empty}>
                <Text style={{ color: "gray", fontFamily: "PlayfairDisplay_600SemiBold", fontSize: 30 }}>Enter a valid word</Text>
            </View>
        )
    }

    const phonetics = data[0].phonetics
    const meanings = data[0].meanings.map(mean => ({
        partOfSpeech: mean.partOfSpeech,
        definitions: mean.definitions.slice(0, 4)
    }))

    const isVerb = meanings.some(meaning => meaning.partOfSpeech == "verb")
    const isNoun = meanings.some(meaning => meaning.partOfSpeech == "noun")

    return (
        <View>
            <View style={styles.word}>
                <View>
                    <Text style={[styles.heading, { color: dark ? "white" : "black" }]}>{data[0].word}</Text>
                    <Text style={styles.def}>{data[0].phonetic}</Text>
                </View>
                {/* <View style={styles.audio}>
                    <FontAwesome name="play" size={22} color={"#a445ee"} />
                </View> */}
            </View>

            { isNoun && <View>
                <View style={styles.lineCont}>
                    <Text style={[styles.gram, { color: dark ? "white" : "black" }]}>noun</Text>
                    <View style={styles.line}></View>
                </View>

                <View >
                    <Text style={styles.meanHead}>Meaning</Text>
                    {meanings[0].definitions.map(def => {
                        return (
                            <View style={styles.meanCont}>
                                <Text style={[styles.meaning, { color: dark ? "white" : "black" }]}><View style={styles.bullet}></View>    {def.definition}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>}

            {isVerb &&
                <View>
                    <View style={styles.lineCont}>
                        <Text style={[styles.gram, { color: dark ? "white" : "black" }]}>verb</Text>
                        <View style={styles.line}></View>
                    </View>

                    <View >
                        <Text style={styles.meanHead}>Meaning</Text>
                        {meanings[1].definitions.map(def => {
                            return (
                                <View style={styles.meanCont}>
                                    <Text style={[styles.meaning, { color: dark ? "white" : "black" }]}><View style={styles.bullet}></View>    {def.definition}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>}

            <View style={styles.divert}></View>

            <View>
                <Text style={styles.src}>Source</Text>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center", paddingTop: 8, display: "flex", marginBottom: 40 }}>
                    <Text style={[styles.link, { color: dark ? "white" : "black" }]} onPress={() => Linking.openURL("https://google.com")}>{data[0].sourceUrls[0]}  <FontAwesome name="external-link" size={14} color={"gray"} style={{ paddingTop: 4, textDecorationLine:"none"}} /></Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 38,
        fontFamily: "PlayfairDisplay_600SemiBold"
    },
    def: {
        color: "#956ab6",
        paddingVertical: 5,
        fontSize: 18
    },
    audio: {
        width: 55,
        height: 55,
        backgroundColor: "#e9d0fa",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20
    },
    word: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    gram: {
        fontFamily: "Quintessential_400Regular",
        fontSize: 25
    },
    lineCont: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginVertical: 10,
    },
    line: {
        height: 2,
        width: "80%",
        backgroundColor: "#efefef"
    },
    meanHead: {
        fontSize: 22,
        color: "gray",
        fontFamily: "Neuton_400Regular",
        height: 27,
        marginBottom: 10
    },

    meaning: {
        fontSize: 18,
        fontFamily: "Neuton_400Regular",
        marginVertical: 5,
        height:25
    },
    bullet: {
        width: 8,
        height: 8,
        marginRight: 5,
        borderRadius: 100,
        backgroundColor: "#a445ee",
    },
    divert: {
        height: 2,
        marginVertical: 20,
        backgroundColor: "#efefef"
    },
    src: {
        color: "gray",
        fontSize: 20,
    },
    link: {
        textDecorationLine: "underline",
        fontSize: 18,
        width:"80%"
    },
    empty: {
        marginTop: 80,
        alignSelf: "center",
        justifyContent: "center"
    }
})