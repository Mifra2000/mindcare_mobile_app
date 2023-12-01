import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';

const data = [
  {
    id: '1',
    name: 'John Doe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '2',
    name: 'Jane Smith',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '3',
    name: 'Jane Smith',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '4',
    name: 'Jane Smith',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '5',
    name: 'Jane Smith',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const renderItem = ({ item }) => (
  <Card style={{ marginVertical: 10 }}>
    <Card.Content>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
          style={{ width: 40, height: 40, marginRight: 15, borderRadius: 50 }}
        />
        <Text style={{ marginTop: 5 }}>{item.name}</Text>
      </View>
      <Text>{item.description}</Text>
    </Card.Content>
  </Card>
);

const App = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
    <Text style={{fontWeight:800,fontSize:18}}>Reviews</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default App;
