import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class Weather extends Component {
  constructor(props){
      super(props);
      this.state = {
        searchKey: 'input city',
        weatherData: null
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({searchKey: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const requestUrl = "apis/getweather/" + this.state.searchKey;
    this.serverRequest = axios.get(requestUrl).then((response) => {
      if(response.data.success){
        this.setState({weatherData: "天气: " + response.data.data.text + "   气温：" + response.data.data.temperature});
      } else {
        this.setState({weatherData: response.data});
      }
      //this.setState({searchKey: '', listdata: response.data.data});
    }).catch((response) => {
      this.setState({weatherData: "some unexpect error"});
    });

  }

  componentWillUnmount(){
    this.serverRequest.abort();
  }


  render() {
    return (
      <div className="Weather">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>输入要查询的城市（拼音）：<input type='text' value={this.state.searchKey} onChange={this.handleChange} /></label>
            <input type='submit' value='submit' />
          </form>
        </div>
        <div>
        {this.state.weatherData}
        </div>
      </div>
    );
  }
}

export default Weather;
