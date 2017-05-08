import React, { Component } from 'react';
import Cookie from '../utils/cookie';
import LoginAction from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

class Loading extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    LoginAction.checkLogin(this.props);
  }

  render() {
    return (
      <div className="spinner">
        <div className="spinner-container container1">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="circle4"></div>
        </div>
        <div className="spinner-container container2">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="circle4"></div>
        </div>
        <div className="spinner-container container3">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="circle4"></div>
        </div>
      </div>
    );
  }
}

export default Loading;