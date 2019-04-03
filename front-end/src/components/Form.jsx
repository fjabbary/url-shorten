import React, { Component } from 'react';
import axios from 'axios';
import './form.scss';

const urlRegex = RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)

export default class Form extends Component {

  constructor(props) {
    super(props);
    this.submitForm = React.createRef();

    this.state = {
      showResult: false,
      shortUrl: '',
      longUrl: '',
      formErrors: {
        originalUrl: ''
      }
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    const newUrl = {
      originalUrl: this.submitForm.current.originalUrl.value,
      shortBaseUrl: "http://demoapp.com"
    }

    const config = {
      method: "POST",
      url: "http://localhost:8080/urls",
      data: newUrl,
      headers: {
        "content-type": "application/json"
      }
    }

    axios(config).then(res => {
      this.setState({
        shortUrl: res.data.shortUrl,
        longUrl: res.data.originalUrl,
        showResult: true
      })
    })
    e.target.reset();

  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    // console.log(name + ': ' + value);

    switch (name) {
      case 'originalUrl':
        formErrors.originalUrl = urlRegex.test(value) && value.length > 0 ? '' : 'Please enter valid URL';
        break;

      default:
        break;
    }

    this.setState({
      formErrors, [name]: value
    }, () => {
      // console.log(this.state);
    })
  }

  render() {

    const { formErrors } = this.state;
    return (
      <div>
        <div className="main card card-body">
          <form ref={this.submitForm} onSubmit={this.submitHandler}>
            <div className="form-group">
              <label htmlFor="url">Original URL</label>
              <input type="text" className="form-control" name="originalUrl" required onChange={this.handleChange} placeholder="Please enter Url" />
            </div>
            {formErrors.originalUrl.length > 0 && (<span className="error"><small>{formErrors.originalUrl}</small></span>)}
            <button className="btn btn-success btn-block" style={{ margin: 0 }}>Submit</button>
          </form>
        </div>

        {this.state.showResult ? <div className="result card card-body my-3">
          <h2 className="header bg-secondary text-white rounded">Shortened URL:</h2>
          <a href={this.state.longUrl} target="blank">{this.state.shortUrl}</a>
        </div> : null}
      </div>
    )
  }
}
