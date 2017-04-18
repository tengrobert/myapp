import React, { Component } from 'react';
import Atodo from'./Atodo';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Add from 'material-ui/svg-icons/content/add-box';
import Deletelist from 'material-ui/svg-icons/action/delete';

const addstyle = { 
    width: 20,
    height: 20,
  }

  const paperstyle = {
    margin: 60,
  }

const TodoForm = ({id, addTodo, handletotalitem, gettotalitem}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <IconButton onClick={() => {
        if(input.value !=='' ){
        addTodo(input.value);
        handletotalitem(id, gettotalitem());
        input.value = '';
        }
      }} tooltip='add todo' iconStyle={addstyle}>
        <Add />
      </IconButton>
    </div>
  );
};


// const TodoList = ({todos, remove, changestyle}) => {
//   // Map through the todos
//   const todoNode = todos.map((todo) => {
//     return (<Todo todo={todo} key={todo.id} remove={remove} changestyle={changestyle}/>)
//   });
//   return (<ul>{todoNode}</ul>);
// }



// Contaner Component
// Todo Id
window.id = 0;
class Todo extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      title: 'Title',
      titlediv: 'display',
      titleinput: 'nodisplay'
    }
    this.changestyle = this.changestyle.bind(this);
    this.gettotalitem = this.gettotalitem.bind(this);
    this.getcompleteitem = this.getcompleteitem.bind(this);
  }
  // Add todo handler
  addTodo(val){
    // Assemble data
    var todo = {text: val, id: window.id++, complete: 'default'}
    // Update data
    this.state.data.push(todo);
    // Update state
    this.setState({data: this.state.data});
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // Update state with filter
    this.setState({data: remainder});
  }
  changestyle(id){
    for(var i = 0; i < this.state.data.length; i++){
      if(this.state.data[i].id === id) {
        if(this.state.data[i].complete === 'default') this.state.data[i].complete = 'complete';
        else this.state.data[i].complete = 'default';
      }
    }
    this.setState(this.state);
  }
  gettotalitem(){
    return this.state.data.length;
  }
  getcompleteitem(){
    let count = 0;
    for(var i = 0; i < this.state.data.length; i++){
      if(this.state.data[i].complete === 'complete') count += 1;
    }
    return count;
  }
  handletitlechange(e){
    this.state.title = e.target.value;
    this.setState(this.state);
  }
  handletitledisplay(){
    if(this.state.titlediv === 'display'){
      this.state.titlediv = 'nodisplay';
      this.state.titleinput = 'display';
    }
    else{
      this.state.titlediv = 'display';
      this.state.titleinput = 'nodisplay';
    }
    this.setState(this.state);
  }
  
  render(){
      const todoNode = this.state.data.map((todo,index) => {
    return (<Atodo appid={this.props.id} handlecompleteitem={this.props.handlecompleteitem} getcompleteitem={this.getcompleteitem} handletotalitem={this.props.handletotalitem} gettotalitem={this.gettotalitem} todo={todo} id={todo.id} complete={todo.complete} key={index} remove={this.handleRemove.bind(this)} changestyle={this.changestyle}/>)
  });
    // Render JSX
    return (
      <MuiThemeProvider>
      <div className="todo">
        <Paper style={paperstyle} zDepth={2}>
        <h2 className={this.state.titlediv}>{this.state.title}</h2>
        <input className={this.state.titleinput} onChange={(e) => {this.handletitlechange(e)}} />
        <IconButton onClick={() => {this.handletitledisplay()}} tooltip="edit title">
          <Edit />
         </IconButton>
        <div>{this.gettotalitem()} todos , {this.getcompleteitem()} complete </div>
        <TodoForm id={this.props.id} gettotalitem={this.gettotalitem} handletotalitem={this.props.handletotalitem} addTodo={this.addTodo.bind(this)} />
        <div className='ul'>{todoNode}</div>
         <IconButton tooltip='delete list' onClick={() => {this.props.deletetodolist(this.props.id); this.props.handlecompleteitem(this.props.id, this.props.getcompleteitem());}}>
           <Deletelist />
         </IconButton>
         </Paper>
      </div>
             </MuiThemeProvider>
    );
  }
}


export default Todo;