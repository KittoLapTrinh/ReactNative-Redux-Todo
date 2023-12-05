import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { store } from '../redux/Store'
import { actionAdd, actionDelete, actionUpdate } from '../redux/Actions'


const Home = () => {
    const[todo, setTodo] = useState('')
    const[todos, setTodos] = useState([])
    const[flag, setFlag] = useState(false)


    const addToDo = ()=>{
        if(!flag){
            store.dispatch(actionAdd(todo))
            setTodos(store.getState())
            setTodo('')
        }
    }

    const deleteTodo =(i) =>{
        store.dispatch(actionDelete(i))
        setTodos(store.getState())
    }

    const updateTodo =(i, todo)=>{
        store.dispatch(actionUpdate({
            index: i,
            todo: todo,
        }))
        setTodos(store.getState())
    }
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Text style={{color: 'red', fontSize: 25, fontWeight: 'bold'}}>HELLO TO DO APP REDUX!</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TextInput placeholder='Enter todo...' style={{ width: 300, height: 35,borderRadius: 10, borderColor: 'while', borderWidth: 1, marginLeft: 10, marginTop: 20}} value={todo} onChangeText={setTodo}></TextInput>
                <TouchableOpacity style={{backgroundColor: 'red', borderRadius: 10, width: 40, alignItems: 'center' , justifyContent: 'center', height: 40,marginTop: 18, }} onPress={addToDo}>
                    <Text style={{color:'#FFFFFF', fontWeight: 'bold'}} >Add</Text>
                </TouchableOpacity>
            </View>
            <View style={{  width: '100%',marginTop: 20,}}>
                {todos.length == 0 ? (<View></View>) : todos.map((j, index) =>{
                    return (
                        <View style={{ width: '100%',
                            padding: 10,
                            borderColor: '#ccc',
                            borderWidth: 1,
                            borderRadius: 5,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,}} key={index}>
                            <Text>{j}</Text>
                            <View>
                                <Text style={[styles.edit,{display:`${flag ? 'none' : 'block' }`}]} 
                                    onPress={()=>{setFlag(!flag) 
                                    setTodo(j)
                                    }}>Edit</Text>
                                <Text style={[styles.edit,{display:`${!flag ? 'none' : 'block' }`}]} 
                                    onPress={()=>{
                                    updateTodo(index,todo)
                                    setFlag(!flag) 
                                    setTodo('')
                                    }}>Update</Text>
                                <Text onPress={()=>{deleteTodo(index)}}>X</Text>
                            </View>
                        </View>
                 
                    )
                })}
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    
})