import React from 'react';
import {Link} from 'react-router';
import Cookie from '../utils/cookie';
import HeaderStore from '../stores/HeaderStore';
import HeaderActions from '../actions/HeaderActions';
import LoginStore from '../stores/LoginStore';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = HeaderStore.getState();
    this.state.isShowEditor = "none";
    this.onChange = this.onChange.bind(this);
    this.showEditor = this.showEditor.bind(this);
  }

  componentDidMount() {
    HeaderStore.listen(this.onChange);
    LoginStore.listen(this.showEditor);

    
    // HeaderActions.getCharacterCount();

    // let socket = io.connect();

    // socket.on('onlineUsers', (data) => {
    //   HeaderActions.updateOnlineUsers(data);
    // });

    // $(document).ajaxStart(() => {
    //   HeaderActions.updateAjaxAnimation('fadeIn');
    // });

    // $(document).ajaxComplete(() => {
    //   setTimeout(() => {
    //     HeaderActions.updateAjaxAnimation('fadeOut');
    //   }, 750);
    // });
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this.onChange);
    LoginStore.unlisten(this.showEditor);
  }

  onChange(state) {
    this.setState(state);
  }

  showEditor(state) {
    this.setState({isShowEditor: state.isShowEditor});
    // this.refs.editor.display = state.isShowEditor;
  }

  handleSubmit(event) {
    event.preventDefault();

    let searchQuery = this.state.searchQuery.trim();

    if (searchQuery) {
      HeaderActions.findCharacter({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm,
        history: this.props.history
      });
    }
  }
  imgClick() {
    HeaderActions.toLogin(this.props.history.replaceState);
  }
  render() {
    return (
      <header className='header'>
        <div className='banner'>
          <div className="ban-sign">
            <div className="my-sign">
            </div>
          </div>
          <div className="ban-img">
            <div className="my-img" onClick={this.imgClick.bind(this)}></div>
            <p>
              <span>前端</span>
              <span>旅游</span>
              <span>电影</span>
              <span>游戏</span>
            </p>
          </div>
        </div>
        <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className=""><Link to="/">首页<span className="sr-only">(current)</span></Link></li>
              <li><Link to="/essay">笔迹</Link></li>
              <li><Link to="/samples">项目实验</Link></li>
              <li className="dropdown">
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">技术小结<span className="caret"></span></Link>
                <ul className="dropdown-menu">
                  <li><Link to="#">Html</Link></li>
                  <li><Link to="#">JavaScript</Link></li>
                  <li><Link to="#">Css/Css3</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link to="#">Git</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link to="#">Other</Link></li>
                </ul>
              </li>
              <li style={{display:this.state.isShowEditor}}><Link to="/editor">编辑</Link></li>
            </ul>
            <form className="navbar-form navbar-right" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
              <button type="submit" className="btn btn-default">搜索</button>
            </form>
          </div>
        </div>
        </nav>
      </header>
    );
  }
}

export default Header;