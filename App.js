import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';
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

  const [newTodo, setNewTodo] = useState('');

  const handlePress = item => {
    setTodos(todos.map(todo => {
      if (todo.id === item.id) {
        return {...todo, done: !todo.done};
      } else {
        return todo;
      }
    }));
  };

  const handleSubmitNewTodo = ({ nativeEvent: { text, eventCount, target }}) => {
    setTodos([...todos, {id: todos.length, content: text, done: false}]);
    setNewTodo('');
  };

  const Item = ({ item }) => {
    const textStyle = item.done && {textDecorationLine: 'line-through', textDecorationStyle: 'solid'};
    return (
      <CheckBox
        title={item.content}
        checked={item.done}
        onPress={() => handlePress(item)}
        textStyle={textStyle}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={newTodo}
        onChangeText={setNewTodo}
        placeholder='Create a new todo item'
        onSubmitEditing={handleSubmitNewTodo}
      />
      <FlatList
        data={todos}
        renderItem={Item}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },
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
