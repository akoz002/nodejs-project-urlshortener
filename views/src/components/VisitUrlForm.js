
import React from 'react';
import { connect } from 'react-redux';
import { setShortUrl } from '../redux/actions';

/*
 * React component for visiting short URLs.
 */

class VisitUrlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.visitUrl = this.visitUrl.bind(this);
  }

  // 'onChange' handler for the input field
  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  // 'onSubmit' handler
  // sets the state to be used by the form action
  visitUrl(e) {
    if (this.state.input) {
      this.props.setShortUrl(this.state.input);
      this.setState({
        input: ''
      });
    }
    else {
      // block the form action as there is no input
      e.preventDefault();
    }
  }

  render() {
    // use the form action to visit the short URL
    return (
      <form action={'api/shorturl/' + this.props.shortUrl} method='GET'
        target='_blank' onSubmit={this.visitUrl}>
        <label for='url-input'>Short URL to visit:</label>
        <input id='url-input' type='text' value={this.state.input}
          onChange={this.handleChange}
        />
        <input type='submit' value='Visit URL' />
      </form>
    );
  }
}

/*
 * Connect component to the Redux store.
 */

const ConnectedVisitForm = connect(
  state => ({
    shortUrl: state.shortUrl
  }),
  dispatch => ({
    setShortUrl: shortUrl => dispatch(setShortUrl(shortUrl))
  })
)(VisitUrlForm);

export default ConnectedVisitForm;
