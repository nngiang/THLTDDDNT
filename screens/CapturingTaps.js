import React from "react";
import { Button, View, TouchableOpacity, Text, StyleSheet } from "react-native";


export default () => {
    return (
        <View style={MyStyle.container}>
            <Button title="Button 1" onPress={() => alert("hello! i'm namgiang")} />
            <TouchableOpacity style={MyStyle.button}
                onPress={() => alert("That's not lie!")}
            >   
                <Text style={MyStyle.text}>Button 2</Text>
                
            </TouchableOpacity>
        </View>
    );
};

const MyStyle = StyleSheet.create(
    {
        container:{
            flex: 1,
            justifyContent: "center"
        },
        button:{
            backgroundColor: "blue",
            marginTop: 10,
            alignItems: "center",
            padding: 10
        },
        text:{
            color: "white",
            fontSize: 18
        }
    }
)