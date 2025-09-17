import React from 'react';
import { View, Text } from 'react-native';
import { AuthProvider } from "./context/AuthContext";
import MainNavigator from "./Navigation/AppNavigator";

// const App = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Hello React Native JS 👋</Text>
//     </View>
//   );
// };

// export default App;



export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}