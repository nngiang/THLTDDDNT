import { View } from "react-native"
import React from "react";
import ContactListItem from "./components/ContactListItem";
import { useEffect, useState } from "react";
import Address from "ipaddr.js";
import { fetchRandomContact } from "./utils/api";
import Profile from "./screens/Profile";
import Contacts from "./screens/Contacts";
import DrawerNavigation from './components/Routes'
import Favorites from "./screens/Favorites";
import User from "./screens/User";
import Options from "./screens/Options";
import Store from "./src/store";
import { Provider } from "react-redux";
const App=()=>{
  
  return (
    <Provider store={Store}>
      <DrawerNavigation></DrawerNavigation>
    </Provider>
  )
}

export default App; 