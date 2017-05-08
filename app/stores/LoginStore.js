import alt from '../alt';
import LoginActions from '../actions/LoginActions';
import email from '../utils/email';
import Cookie from '../utils/cookie';

class LoginStroe {
  constructor() {
    this.bindActions(LoginActions);
    this.loginId = 'leeyo1214@126.com';
    this.loginPwd = 'lyzy5261214';
    this.remenber = true;
    this.checkOk = false;
    this.checkFail = false;
    this.isShowEditor = "none";
  }

  onUpdateLoginId(event) {
    this.loginId = event.target.value;
  }

  onCheckEmail() {
    email(this.loginId) ? (this.checkOk = true, this.checkFail = false) : (this.checkOk = false, this.checkFail = true);
  }
  onUpdateLoginPwd(event) {
    this.loginPwd = event.target.value;
  }

  onUpdateRemenber(event) {
    this.remenber = event.target.checked ? true : false;
  }

  onLoginSuccess(data) {
    if (data.data.sessionId) {
      Cookie.set('sessionId', data.data.sessionId);
    }
    this.onCheckLoginSuccess(data.data);
    const location = data.props.location;
    if(location.state && location.state.nextPathname) {
      data.props.history.replaceState(null, location.state.nextPathname);
    } else {
      data.props.history.replaceState(null, '/');
    }
  }

  onLoginFail() {
    
  }

  onCheckLoginSuccess(data) {
    window.userInfo = data.userInfo;
    this.isShowEditor = 'block';
  }
}

export default alt.createStore(LoginStroe);