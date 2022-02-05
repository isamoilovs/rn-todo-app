import { StyleSheet, View, FlatList, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { ToDo } from '../components/ToDo';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import SearchBar from '../components/SearchBar';
import AddToDoBtn from '../components/AddToDoBtn';
import AddToDoModal from '../components/AddToDoModal';


export default ToDoApp = () => {
    const {getItem, setItem} = useAsyncStorage('@todolist');
    const [todos, setTodos] = useState([]);
    const [isBtnVisible, setBtnVisible] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const containerOpacity = useRef(new Animated.Value(1)).current;

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
    };

    const addToDo = (title, tasks) => {
      setTodos([...todos, {
        id: todos.length.toString(),
        title: title,
        tasks: tasks,
        done: false
      }]);
      setModalVisible(false);
    };

    const removeToDo = (todo) => {
      let newTodos = getPrettifiedIDs(todos.filter(t => t.id !== todo.id));
      setTodos(newTodos);
    };

    const onFocusSearch = () => {
      setBtnVisible(false);
      Animated.sequence([
        Animated.timing(containerOpacity,
          {
            toValue: 0.5,
            useNativeDriver: true,
            duration: 300
          }
        )
      ]).start();
    };

    const onBlurSearch = () => {
      setBtnVisible(true);
      Animated.sequence([
        Animated.timing(containerOpacity,
          {
            toValue: 1,
            useNativeDriver: true,
            duration: 300
          }
        )
      ]).start();
    };
  
    return (
      <View style={styles.body}>
        <SearchBar 
          onFocus={onFocusSearch}
          onBlur={onBlurSearch}
        />
        <Animated.View 
          style={[
            styles.container,
              {
                opacity: containerOpacity
              }
          ]}
        >
          <FlatList
            data={todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ToDo todo={item} remove={removeToDo}/>
            )}
          />
        </Animated.View>
        <AddToDoModal 
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
              addToDo={addToDo}
            />
        <AddToDoBtn
          isVisible = {isBtnVisible}
          onClick={() => {
            setModalVisible(true);
          }}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 15,
      height: '100%',
    },

    body: {
      paddingTop: 50,
      backgroundColor: '#eeeeee',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }
  });