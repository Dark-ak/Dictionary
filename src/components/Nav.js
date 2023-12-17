import { Text, View, StyleSheet, TextInput, Switch } from "react-native"
import { Feather, FontAwesome } from "@expo/vector-icons"
import { useContext, useState } from "react"
import MyContext from "../service/context"
import axios from "axios"

export default function Nav() {
    const { dark, setDark, data, setData, search, setSearch } = useContext(MyContext)

    const handleSearch = () => {
        if (!search) {
            console.log("empty")
        }
        else {
            const response = axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`).then(
                response => {
                    setData(response.data)
                }
            ).catch(error => {
                if(error){setData(false)}
            })
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.navContainer}>
                    <Feather name="book" size={35} color={"gray"} />
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Switch
                            trackColor={{ false: '#767577', true: '#a445ee' }}
                            thumbColor="white"
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setDark(!dark)}
                            value={dark}
                        />
                        <FontAwesome name="moon-o" size={30} color={"gray"} />
                    </View>
                </View>
                <View style={[styles.search, dark && styles.darkSearch]}>
                    <TextInput placeholder="Search" style={{ fontSize: 18, width: "80%", color: dark ? "white" : "black" }} onChangeText={(text) => setSearch(text)} defaultValue={search} placeholderTextColor={dark ? "white" : "gray"} returnKeyType="search" onSubmitEditing={handleSearch} />
                    <Feather name="search" size={25} color={"#956ab6"} onPress={handleSearch} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    search: {
        marginTop: 15,
        flexDirection: "row",
        backgroundColor: "#f4f4f4",
        paddingVertical: 8,
        justifyContent: "space-between",
        borderRadius: 20,
        paddingHorizontal: 15
    },
    darkSearch: {
        backgroundColor: "#1F1F1F"
    },
    lightSearch: {
        backgroundColor: "#f4f4f4",
    }
})