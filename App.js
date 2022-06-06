import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, SafeAreaView, TextInput, View, TouchableOpacity, Text } from 'react-native';
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
  const submitDisabled = newTodo === '';

  const handlePress = item => {
    setTodos(todos.map(todo => {
      if (todo.id === item.id) {
        return {...todo, done: !todo.done};
      } else {
        return todo;
      }
    }));
  };

  const handleSubmitNewTodo = () => {
    setTodos([...todos, {id: todos.length, content: newTodo, done: false}]);
    setNewTodo('');
  };

  const Item = ({ item }) => {
    const textStyle = item.done && {textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'grey'};
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
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center'}}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder='Create a new todo item'
          onSubmitEditing={handleSubmitNewTodo}
        />
        <TouchableOpacity
          onPress={handleSubmitNewTodo}
          disabled={submitDisabled}
          style={submitDisabled ? {...styles.submit, ...styles.submitDisabledOverride} : styles.submit}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={Item}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  submit: {
    height: 40,
    margin: 20, 
    marginStart: 0, 
    padding: 10,
    backgroundColor: 'cyan',
    borderRadius: 5,
    alignItems: 'center'
  },
  submitDisabledOverride: {
    backgroundColor: 'grey'
  },
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
