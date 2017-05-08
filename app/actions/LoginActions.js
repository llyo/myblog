import alt from '../alt';
import crypto from 'crypto';
import Cookie from '../utils/cookie';

class LoginActions {
  constructor() {
    this.generateActions(
      'updateLoginId',
      'updateLoginPwd',
      'updateRemenber',
      'checkEmail',
      'loginSuccess',
      'loginFail',
      'checkLoginSuccess'
    );
  }

  login(param, props) {
    let sha1 = crypto.createHash('sha1');
    param.loginPwd = crypto.createHash('sha1').update(param.loginPwd).digest('hex');
    toastr.options={
      positionClass: 'toast-top-center',
      timeOut: 2000
    }
    toastr.clear();
    $.ajax({
      url: '/api/login',
      type: 'post',
      data: param
    }).done((data) => {
      if (data.status == 200) {
        this.actions.loginSuccess({data:data,props:props});
        toastr.info('success');
      } else {
        toastr.error(data.message);
      }
    }).fail((jqXhr) => {
      toastr.error(jqXhr.responseJSON.message);
      this.actions.loginFail();
    })
  }

  checkLogin(param) {
    //let param = data;this.props.location.state;
    $.ajax({
      url: '/api/checkLoginStatus',
      type: 'post',
      data: {sessionId: param.location.state.sessionId}
    }).done((data) => {
      if (data.status == 200) {
        // LoginStore.state.isShowEditor = 'block';
        // LoginStore.emitChange();
        console.log(data);
        this.actions.checkLoginSuccess(data);
        param.history.replaceState(null, param.location.state.successPath);
      } else {
        Cookie.remove('sessionId');
        param.history.replaceState(null, param.location.state.failPath);
      }
    }).fail((jqXhr) => {
      Cookie.remove('sessionId');
      param.history.replaceState(null, param.location.state.failPath);
    });
  }

}

export default alt.createActions(LoginActions);