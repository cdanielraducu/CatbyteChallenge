import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {addUser, removeUser} from './globalSlice';
import {User, UserApiResponse} from './models';
import {RootState} from './store';

interface HomeProps {
  componentId: string;
}

const Home: React.FC<HomeProps> = ({componentId}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.global.users);

  const [fetchedUsers, setFetchedUsers] = useState<UserApiResponse[]>([]);

  const handleAdd = () => {
    const newUser = fetchedUsers[users.length + 1];
    dispatch(
      addUser({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        address: newUser.address.address,
        age: newUser.age,
        image: newUser.image,
        state: newUser.state,
      }),
    );
  };

  const handleRemove = (item: User) => {
    dispatch(removeUser(item));
  };

  useEffect(() => {
    fetch('https://dummyjson.com/users', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        setFetchedUsers(json.users);

        json.users.slice(0, 5).forEach((user: UserApiResponse) => {
          dispatch(
            addUser({
              firstName: user.firstName,
              lastName: user.lastName,
              address: user.address.address,
              age: user.age,
              image: user.image,
              state: user.state,
            }),
          );
        });
      });
  }, []);

  const renderItem = ({item, index}: {item: User; index: number}) => {
    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          index % 2 === 0 ? styles.listItemExtraSpacing : undefined,
        ]}
        activeOpacity={0.5}
        onPress={() =>
          Navigation.showOverlay({
            component: {
              name: 'UserScreen',
            },
          })
        }>
        <View style={styles.listItemContainer}>
          <Text
            numberOfLines={1}
            style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
          <Text>{`Age: ${item.age}`}</Text>
          <TouchableOpacity
            style={styles.removeItemContainer}
            hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
            onPress={() => handleRemove(item)}>
            <Text style={styles.removeItemText}>X</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = useCallback(
    (item: User) => `grid-list-${item.firstName}-${item.lastName}`,
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        style={styles.listContainer}
      />
      <TouchableOpacity
        onPress={handleAdd}
        activeOpacity={0.7}
        style={styles.addButton}>
        <Text>ADD</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
  },
  listItem: {
    flex: 0.5,
  },
  listItemContainer: {
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 18,
    paddingBottom: 22,
    borderRadius: 20,
  },
  listItemExtraSpacing: {
    paddingRight: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: '#EEEEEE',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 16,
  },
  removeItemContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'gray',
    padding: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeItemText: {
    fontSize: 8,
    lineHeight: 8,
  },
});

export default Home;
