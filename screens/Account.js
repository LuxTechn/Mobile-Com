import { View, Text } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Button } from 'react-native-elements'
import { AuthContext } from '../navigation/AuthProvider';
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const Account = () => {
  const { logout } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        let tempData = []
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ', documentSnapshot.id,
            documentSnapshot.data()
          )
          tempData.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        })
        setUsers(tempData)
      })
  }
  return (

    <FlatList
      data={users}
      renderItem={({ item }) => {
        return (
          <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>User Name: {item.id}</Text>
            <Text>User Name: {item.data.email}</Text>
          </View>
        )
      }}
    />
  )
}

export default Account