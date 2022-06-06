import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import {useState} from 'react';
import { CheckBox } from '@rneui/themed';


export default function App() {
  const [todos, setTodos] = useState([
    {
    "id": 0,
    "content": "Learn Redis",
    "done": false
    },
    {
      "id": 1,
      "content": "Learn React",
      "done": true
    }
  ]);

  const handlePress = item => {
    setTodos(todos.map(todo => {
      if (todo.id === item.id) {
        return {...todo, done: !todo.done};
      } else {
        return todo;
      }
    }));
  };

  const Item = ({ item }) => {
    const textStyle = item.done && {textDecorationLine: 'line-through', textDecorationStyle: 'solid'};
    return (
      <CheckBox
        center
        title={item.content}
        checked={item.done}
        onPress={() => handlePress(item)}
        textStyle={textStyle}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        renderItem={Item}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 40,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  content: {
    fontSize: 32,
  },
});
