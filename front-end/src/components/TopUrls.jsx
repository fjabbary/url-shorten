import React, { Component } from 'react';
import axios from 'axios';
import './topUrls.scss';

export default class TopUrls extends Component {

  state = {
    urls: []
  }

  componentDidMount() {
    axios('http://localhost:8080/urls').then(res => {
      this.setState({
        urls: res.data
      })
      console.log(res.data)
    })
  }


  render() {
    const { urls } = this.state;

    const topUrls = urls.map((item, index) => <a target="blank" key={index} href={item._id}><li className="list-group-item my-2"><b><span className="title">URL:</span></b> {item._id} <span className="number">(Number of request: {item.count}) </span></li></a>)

    return (
      <div className="pouplar card card-body">
        <h2>Top 5 URLs Requesed</h2>
        <ul className="list-group">
          {topUrls}
        </ul>

      </div>
    )
  }
}
