import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        searchKey: 'input key',
        listdata: null
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchKey: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // const testdata = [{
    //   key: '253', times: '3', unlocktime: 'xx'
    // },{
    //     key: '253', times: '3', unlocktime: 'xx'
    // },{
    //     key: '253', times: '3', unlocktime: 'xx'
    // }];
    //
    // this.setState({searchKey: '', listdata: testdata});

    const requestUrl = "/apis/lockout/" + this.state.searchKey;
    this.serverRequest = axios.get(requestUrl).then((response) => {

      this.setState({searchKey: '', listdata: response.data.data});
    }).catch((response) => {
      const testdata = [{
        key: response.message, times: '', unlocktime: ''
      }];
       this.setState({listdata: testdata});
    });

  }

  componentWillUnmount(){
    this.serverRequest.abort();
  }


  render() {

   function lockItems(props){
        const listdata = props.listdata;
        const searchKey =  props.searchKey;
        const lockitems = (listdata==null)?searchKey:listdata.map((item) =>
          <tr>
            <td width='50%'>{(item.key!=null)?item.key:''}</td>
            <td width='15%'>{item.times!=null?item.times:''}</td>
            <td width='35%'>{item.unlocktime!=null?item.unlocktime:''}</td>
          </tr>
        );
        console.log(lockitems);
        return lockitems;
      }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>输入要查询的账号：<input type='text' value={this.state.searchKey} onChange={this.handleChange} /></label>
            <input type='submit' value='submit' />
          </form>
        </div>
        <div>
        <table>
          <tr>
            <td width='50%'>锁定key</td>
            <td width='15%'>剩余锁定时间</td>
            <td width='35%'>解锁时间</td>
          </tr>
        {lockItems(this.state)}
        </table>
        </div>
      </div>
    );
  }
}

export default App;
