import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import './App.css'

const style = { 
    width: 17,
    height: 17,
  };

class Atodo extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
  }

  render(){
      return (<div><div onClick={() => {var x = this.props.id; this.props.changestyle(x); this.props.handlecompleteitem(this.props.appid, this.props.getcompleteitem());}} className={this.props.todo.complete}>
      {this.props.todo.text}</div>
      <div  className='inlineli' >
        <IconButton iconStyle={style} tooltip='cancel item' onClick={() => {this.props.remove(this.props.id); this.props.handletotalitem(this.props.appid, this.props.gettotalitem() - 1); this.props.handlecompleteitem(this.props.appid, this.props.getcompleteitem() - 1);}}>
        <Cancel /></IconButton>
      </div>
  </div>);
  }
}


export default Atodo;