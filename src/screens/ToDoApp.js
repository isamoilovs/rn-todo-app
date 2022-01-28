import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { AddToDo } from '../components/AddToDo';
import { Navbar } from '../components/Navbar';
import { useEffect, useState } from 'react';
import { ToDo } from '../components/ToDo';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';


export default function ToDoApp() {
    const [todos, setTodos] = useState([]);
    const {getItem, setItem} = useAsyncStorage('@todolist')

    useEffect(async () => {
      const todosFromStorage = await getItem();
      !!todosFromStorage ? setTodos(JSON.parse(todosFromStorage)) : setTodos([])
    }, [])

    const getPrettifiedIDs = (todoList) => {
      let prettifiedTodos = [...todoList];
      prettifiedTodos.forEach((t, i) => t.id = String(i));
      return prettifiedTodos;
    }

    const addToDo = async title => {
      setTodos([...todos, {
        id: JSON.stringify(todos.length),
        title: title
      }])

      await setItem(JSON.stringify(todos));
    }

    const removeToDo = async (todo) => {
      let newTodos = getPrettifiedIDs(todos.filter(t => t.id !== todo.id));
      setTodos(newTodos);
      await setItem(JSON.stringify(newTodos));
    }
  
    return (
      <View>
        <Navbar title='ToDo App' />
        <View style={styles.container}>
          <AddToDo onSubmit={addToDo} />
          <FlatList
            data={todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ToDo todo={item} remove={removeToDo}/>
            )}/>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 15
    }
  });