import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    // HomeActions.getTwoCharacters();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick(character) {
    var winner = character.characterId;
    var loser = first(without(this.state.characters, findWhere(this.state.characters, { characterId: winner }))).characterId;
    HomeActions.vote(winner, loser);
  }

  render() {
    var characterNodes = this.state.characters.map((character, index) => {
      return (
        <div key={character.characterId} className={index === 0 ? 'col-xs-6 col-sm-6 col-md-5 col-md-offset-1' : 'col-xs-6 col-sm-6 col-md-5'}>
          <div className='thumbnail fadeInUp animated'>
            <img onClick={this.handleClick.bind(this, character)} src={'http://image.eveonline.com/Character/' + character.characterId + '_512.jpg'}/>
            <div className='caption text-center'>
              <ul className='list-inline'>
                <li><strong>Race:</strong> {character.race}</li>
                <li><strong>Bloodline:</strong> {character.bloodline}</li>
              </ul>
              <h4>
                <Link to={'/characters/' + character.characterId}><strong>{character.name}</strong></Link>
              </h4>
            </div>
          </div>
        </div>
      );
    });

    return (
      <section className='bd container'>
        <div className="main-wrap col-md-8">
          <ul className="articles-wrap">
            <li className="article-con">
              <Link className="img-con" to={'/article:' + 'id'}>
                <img className="article-img" src='http://www.itatedu.com/upload/html/2015/08/19/xieping76dfb5bd1d7e45819969ee46e6cd2368.png' />
              </Link>
              <div className="desc-con">
                <Link to={'/article:' + 'id'} className="title">这是一个测试标题</Link>
                <div className="abstract">测试的描述性文字</div>
                <div>标签：<span className="tags">测试 tag react</span></div>
                <div className="other">
                  <div className="auth">作者：游灵</div>
                  <span className="date">2016-8-30</span>
                  <Link to={'/article:' + 'id'} className="read-all">阅读全文></Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className='side-wrap col-md-4'>
          row
        </div>
      </section>
    );
  }
}

export default Home;
