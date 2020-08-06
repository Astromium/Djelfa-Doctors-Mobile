
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


import TabNavigator from './navigation/TabNavigator';
import DrawerNavigator from './navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native'
import navigationTheme from './navigation/navigationTheme';
import cache from './utility/cache';
import doctors from './api/doctors';
import ThemeContext from './themes/ThemeContext';
import { greenTheme, blueTheme } from './themes/themes'



const loadDoctors = async () => {
  const res = await doctors.getAllDoctors();
  if (res.status === 'success') {
    console.log('loaded doctors initialy')
    await cache.store('data', res.doctors);
  } else {
    console.log('couldnt get data from the server')
  }
}



const fetchFont = async () => {
  return Font.loadAsync({
    'tajawal': require('./assets/fonts/Tajawal-Regular.ttf')
  })
}





export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const [theme, setTheme] = useState(greenTheme);

  const onToggleTheme = () => {
    theme.type === 'green' ? setTheme(blueTheme) : setTheme(greenTheme)
  }

  useEffect(() => {
    loadDoctors()
  }, [])

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFont} onFinish={() => setFontLoaded(true)} />
  }



  return (


    <NavigationContainer theme={navigationTheme}>
      <ThemeContext.Provider value={{
        theme,
        onChangeTheme: onToggleTheme
      }}>
        <DrawerNavigator />
      </ThemeContext.Provider>
    </NavigationContainer>


  )
}


