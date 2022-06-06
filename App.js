import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import {useState, useEffect} from 'react';

// const Item = ({ item, onPress, backgroundColor, textColor }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
//     <Text style={[styles.content, textColor]}>{item.content}</Text>
//   </TouchableOpacity>
// );

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
    const backgroundColor = item.done ? "#6e3b6e" : "#f9c2ff";
    const textColor = item.done ? 'white' : 'black';

    return (
      <TouchableOpacity onPress={() => handlePress(item)} style={[styles.item, backgroundColor]}>
        <Text style={[styles.content, textColor]}>{item.content}</Text>
      </TouchableOpacity>
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
    // flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
