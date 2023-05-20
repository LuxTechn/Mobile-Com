import { View, Text } from 'react-native'
import FormButton from '../components/FormButton'
import { AuthContext } from '../navigation/AuthProvider'
import { useContext } from 'react';

const Dashboard = () => {
  const {user, logout} = useContext(AuthContext);
  return (
    <View>
      <Text>Dashboard {user.email}</Text>
      <FormButton
        buttonTitle='Logout' onPress={() => logout()}
      />
    </View>
  )
}

export default Dashboard