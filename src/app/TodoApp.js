import React, { Component } from 'react';
import Todo from './Todo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';


let windowid = 0;
const style = {
  margin: 10,
};

class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    this.state = { todoapp: [] }
  }
  addtodolist(){
      this.state.todoapp.push({id: windowid++, totalitem: 0, completeitem:0 });
      this.setState(this.state);
  }
 deletetodolist(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.todoapp.filter((todo) => {if(todo.id !== id) return todo; });
     this.setState({todoapp: remainder});
 }
 handletotalitem(id, num){
     for(var i = 0; i < this.state.todoapp.length; i++){
         if(this.state.todoapp[i].id === id) this.state.todoapp[i].totalitem = num;
     }
     this.setState(this.state);
 }
 showtotalitem(){
     let sum = 0;
     for(var i = 0; i < this.state.todoapp.length; i++){
         sum += this.state.todoapp[i].totalitem;
     }
     return sum;
 }
  handlecompleteitem(id, num){
     for(var i = 0; i < this.state.todoapp.length; i++){
         if(this.state.todoapp[i].id === id) this.state.todoapp[i].completeitem = num;
     }
     this.setState(this.state);
 }
  showcompleteitem(){
     let sum = 0;
     for(var i = 0; i < this.state.todoapp.length; i++){
         sum += this.state.todoapp[i].completeitem;
     }
     if(sum < 0) sum = 0;
     return sum;
 }
  render(){
  const App = this.state.todoapp.map((item,index) => {return (<Todo
      key={item.id} id={item.id} totalitem={item.completeitem} deletetodolist={this.deletetodolist.bind(this)} handletotalitem={this.handletotalitem.bind(this)} handlecompleteitem={this.handlecompleteitem.bind(this)}/>);});   
      return (
          <div className='uptodoapp'>
          <h1>Todos</h1>
          <h3> {this.showtotalitem()} item(s) , {this.showcompleteitem()} complete</h3>
          <MuiThemeProvider><RaisedButton label = 'Add todolist' secondary={true} style={style} onClick={() => {this.addtodolist()}} /></MuiThemeProvider>
          <div>{App}</div>
         </div>
         );
  }
}


export default TodoApp;