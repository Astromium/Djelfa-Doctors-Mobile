
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import AsyncStorage from '@react-native-community/async-storage'


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
    //console.log('loaded doctors initialy')
    await cache.store('data', res.doctors);
  }
}



const fetchFont = async () => {
  return Font.loadAsync({
    'tajawal': require('./assets/fonts/Tajawal-Regular.ttf')
  })
}


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);


  const [theme, setTheme] = useState({});

  const fetchTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem('theme');
      if (theme === null) setTheme({ ...greenTheme })
      else setTheme({ ...JSON.parse(theme) })
    } catch (err) {
      console.log(err);
    }
  }

  //fetchTheme().then(theme => setTheme({ ...theme })).catch(err => console.log(err))

  const onToggleTheme = async () => {
    //theme.type === 'green' ? setTheme(blueTheme) : setTheme(greenTheme)
    if (theme.type === 'green') {
      setTheme(blueTheme)
      try {
        await AsyncStorage.setItem('theme', JSON.stringify(blueTheme))
      } catch (err) {
        console.log(err)
      }
    } else if (theme.type === 'blue') {
      setTheme(greenTheme)
      try {
        await AsyncStorage.setItem('theme', JSON.stringify(greenTheme))
      } catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    loadDoctors()
    fetchTheme()
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


