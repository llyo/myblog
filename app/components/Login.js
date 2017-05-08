import React, { Component } from 'react';
import cn from 'classnames';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    // LoginActions.checkLoginStatus();
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleLogin() {
    let param = {
      loginId: this.state.loginId,
      loginPwd: this.state.loginPwd,
      remenber: this.state.remenber
    };
    LoginActions.login(param, this.props);
  }

  render() {
    let checkEmail = cn({
      'glyphicon': true,
      'form-control-feedback': true,
      'glyphicon-ok': this.state.checkOk,
      'glyphicon-remove': this.state.checkFail
    });
    return (
      <div className="login-wrapper">
        <form className="form-horizontal login-container">
          <div className="form-group has-feedback">
            <label className="col-sm-2 control-label">邮箱</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" placeholder="Email" onChange={LoginActions.updateLoginId} value={this.state.loginId} onBlur={LoginActions.checkEmail}/>
              <span className={checkEmail} aria-hidden="true"></span>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">密码</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" placeholder="Password" onChange={LoginActions.updateLoginPwd} value={this.state.loginPwd}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <div className="checkbox">
                <label>
                  <input type="checkbox" defaultChecked={this.state.remenber} onChange={LoginActions.updateRemenber} />记住登录状态(7天)
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <input type='button' ref='submit' className='btn btn-primary' value='登录' onClick={this.handleLogin.bind(this)} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;