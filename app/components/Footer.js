import React from 'react';
import {Link} from 'react-router';
import FooterStore from '../stores/FooterStore'
import FooterActions from '../actions/FooterActions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = FooterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FooterStore.listen(this.onChange);
    // FooterActions.getTopCharacters();
  }

  componentWillUnmount() {
    FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

    return (
      <footer>
        <div className='container'>
          <div className='row'>
              <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>React</strong> with Flux architecture and server-side rendering.</p>
              <p>© 2016 游灵</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;