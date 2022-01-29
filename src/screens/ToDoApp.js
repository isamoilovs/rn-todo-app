import { StyleSheet, View, FlatList } from 'react-native';
import { AddToDo } from '../components/AddToDo';
import { useEffect, useState } from 'react';
import { ToDo } from '../components/ToDo';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import SearchBar from '../components/SearchBar';
import AddToDoBtn from '../components/AddToDoBtn';
import AddToDoModal from '../components/AddToDoModal';


export default ToDoApp = () => {
    const {getItem, setItem} = useAsyncStorage('@todolist');
    const [todos, setTodos] = useState([]);
    const [isAddBtnVisible, setAddBtnVisible] = useState(true);
    const [isAddToDoModalVisible, setAddToDoModalVisible] = useState(false);

    useEffect(async () => {
      const todosFromStorage = await getItem();
      !!todosFromStorage ? setTodos(JSON.parse(todosFromStorage)) : setTodos([]);
    }, []);

    useEffect(async () => {
      await setItem(JSON.stringify(todos));
    }, [todos]);

    const getPrettifiedIDs = (todoList) => {
      let prettifiedTodos = [...todoList];
      prettifiedTodos.forEach((t, i) => t.id = String(i));
      return prettifiedTodos;
    }

    const addToDo = title => {
      setTodos([...todos, {
        id: JSON.stringify(todos.length),
        title: title
      }]);
      setAddToDoModalVisible(false);
    }

    const removeToDo = (todo) => {
      let newTodos = getPrettifiedIDs(todos.filter(t => t.id !== todo.id));
      setTodos(newTodos);
    }
  
    return (
      <View
        style={styles.body}
      >
        <SearchBar 
          onPressIn={() => setAddBtnVisible(false)}
          onEndEditing={() => setAddBtnVisible(true)}
        />
        <View 
          style={styles.container}
        >
          <FlatList
            data={todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ToDo todo={item} remove={removeToDo}/>
            )}/>
        </View>
        <AddToDoModal 
              isModalVisible={isAddToDoModalVisible}
              setModalVisible={setAddToDoModalVisible}
              addToDo={addToDo}
            />
        {isAddBtnVisible && 
          <AddToDoBtn 
            onClick={() => setAddToDoModalVisible(true)}
          />}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 15,
    },

    body: {
      paddingTop: 40,
      backgroundColor: '#eeeeee',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }
  });