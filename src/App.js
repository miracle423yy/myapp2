import React, { useEffect, Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react'

import { Auth, API } from 'aws-amplify'


Amplify.configure(config)


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      value:"",
      value2:"",
      value3:"",
      value4:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getData() { 
    let apiName = 'foodapi';
    let path = '/food';
    let myInit = { // OPTIONAL
        headers: {} // OPTIONAL
    }
    //let items = await API.get('foodapi', '/food', {
    //});
    let items = await API.get('foodapi', '/food');
    return await items
  }
  async putData() { 

      let apiName = 'foodapi';
      let path = '/food';
      let myInit = { // OPTIONAL
          body: {Name: this.state.value, LeekQuantity: this.state.value3, RedBeanQuantity: this.state.value4, XiaoQuantity: this.state.value2}, // replace this with attributes you need
          headers: {} // OPTIONAL
      }
      return await API.put(apiName, path, myInit);
  }
  componentDidMount() {
    let v = this.getData();
    console.log(v)
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(event.target)
  }
  handleChange2(event) {
    console.log("in handler2")
    this.setState({value2: event.target.value});
    console.log(event.target)
  }
  handleChange3(event) {
    console.log("in handler3")
    this.setState({value3: event.target.value});
    console.log(event.target)
  }
  handleChange4(event) {
    console.log("in handler4")
    this.setState({value4: event.target.value});
    console.log(event.target)
  }
  handleSubmit(event) {
    let items = {"Name":this.state.value, "LeekQuantity":this.state.value3,"RedBeanQuantity":this.state.value4, "XiaoQuantity":this.state.value2}
    console.log(items)
    let req = this.putData()

    event.preventDefault();
  }
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name On Order:
          <input value={this.state.value} onChange={this.handleChange} />
        </label>

        
        <label>
          Leek:
          <input value={this.state.value3} onChange={this.handleChange3}/>
        </label>
        
        <label>
          Red Bean:
          <input  value={this.state.value4} onChange={this.handleChange4} />
        </label>

        <label>
          Xiaolongbao:
          <input value={this.state.value2} onChange={this.handleChange2}/>
        </label>
        
        <input type="submit" value="Submit" />
      
      </form>
      </div>
    );
  }
}


export default withAuthenticator(App, { includeGreetings: true })