import React, { Component } from 'react';
import axios from 'axios';
import './topUrls.scss';

export default class TopUrls extends Component {

  state = {
    urls: []
  }

  componentDidMount() {
    axios.get('http://localhost:8080/url').then(res => {
      // this.setState({
      //   ulrs: ''
      // })
    })
  }





  render() {
    return (
      <div>
        <h1>Top URL Section</h1>
      </div>
    )
  }
}
