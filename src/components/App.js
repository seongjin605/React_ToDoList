import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {
    state = {
        input: '',
        todos: [
            {id:0, text:'컴포넌트 스타일링0', done:true},
            {id:1, text:'컴포넌트 스타일링1', done:false},
            {id:2, text:'컴포넌트 스타일링2', done:false},
            {id:3, text:'컴포넌트 스타일링3', done:false},
            {id:4, text:'컴포넌트 스타일링4', done:false},
            {id:5, text:'컴포넌트 스타일링5', done:false},
            {id:6, text:'컴포넌트 스타일링6', done:false},
            {id:7, text:'컴포넌트 스타일링7', done:false},
        ]
    }

    id = 1
    getId = () => {
        return ++this.id;
    }

    handleChange = (e) => {
        const {value} = e.target;
        this.setState({
            input:value
        });
    }

    handleInsert = () => {
        const {todos, input} = this.state;
        const newTodo = {
            id: this.getId(),
            done: false,
            text: input
        };

        this.setState({
            todos: [...todos, newTodo],
            iput: ''
        });
    }

    handleToggle = (id) => {
        const {todos} = this.state;
        const index = todos.findIndex(todo => todo.id === id)

        const toggleId = {
            ...todos[index],
            done: !todos[index].done
        };

        //slice를 사용하여 우리가 찾은 index 전후의 데이터들을 복사
        // 그리고 사이에는 변경된 to 객체를 넣어줌
        this.setState({
            todos: [
            ...todos.slice(0, index),
            toggleId,
            ...todos.slice(index + 1, todos.length)
            ]
        });
    }

    handleRemove = (id) => {
        const{ todos } = this.state;
        const index = todos.findIndex(todo => todo.id === id)

        this.setState({
            todos:[
            ...todos.slice(0, index),
            ...todos.slice(index + 1, todos.length)
            ]
        });
    }

    render() {
        const{input, todos} = this.state;
        const{
            handleChange,
            handleInsert,
            handleToggle,
            handleRemove
        } = this;
        
        return (
            <PageTemplate>
                <TodoInput onChange={handleChange} onInsert={handleInsert} value={input}/>
                <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
            </PageTemplate>
        );
    }
}

export default App;