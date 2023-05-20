import React, {useState, useEffect, useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider';
import Appstack from './Appstack';

const Routes = () => {

  const {user, setUser} = useContext(AuthContext);
  const {initializing, setinitializing} = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user)
    if(initializing) setinitializing(false);
  }

  useEffect(()=>{
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if(initializing) return null;

  return (
    <NavigationContainer>
        {user ? <Appstack/>: <AuthStack/>}
    </NavigationContainer>
  )
}

export default Routes