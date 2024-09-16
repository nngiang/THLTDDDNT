import React,{useState, useEffect} from "react";
import {
    StyleSheet,Text,View,FlatList,ActivityIndicator
} from 'react-native'
import { fetchContacts } from "../utils/api";
import ContactThumbnail from "../components/ContactThumbnail";
import { useDispatch,useSelector } from "react-redux";
const keyExtractor = ({phone})=>phone;
const Favorites = ({navigation})=>
{
     //state
     const {contacts,loading,error} = useSelector((state) =>state); 
     //Load du lieu
     useEffect(()=>{
         fetchContacts()
         .then(
             contacts=> {
                 setContacts(contacts);
                 setLoading(false);
                 setError(false);
             }
         )
         .catch(
             e=>{
                 setLoading(false);
                 setError(true); 
             }
         )
     })
     const renderFavorateThumbnail= ({item})=>{
        const {avatar} =item;
        return (
            <ContactThumbnail
            avatar={avatar}
            onPress={()=> navigation.navigate('Profile',{contact:item})}
            />
        );
     };
     const favorites = contacts.filter(contact => contact.favorite);
     return (
        <View style={StyleSheet.container}>
            {loading && <ActivityIndicator size="large"/>}
            {error && <Text>Error...</Text>}
            {!loading && !error && (
                <FlatList
                    data={favorites}
                    keyExtractor={keyExtractor}
                    numColumns={3}
                    contentContainerStyle={styles.list}
                    renderItem={renderFavorateThumbnail}
                    />
            )}
        </View>
     );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        justifyContent: "center",
        flex:1,
    },
    list:{
        alignItems: "center",
    },

});
export default Favorites;