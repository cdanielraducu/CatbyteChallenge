import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const User: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* <Image source={''} /> */}
      <Text>aaa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default User;
