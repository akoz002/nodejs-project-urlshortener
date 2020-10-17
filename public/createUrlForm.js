'use strict';

import { createUrlAsync, store } from './redux.js';
/*
 * React component for creating short URLs.
 */

class CreateUrlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 'https://www.freecodecamp.org/'
    };
    this.createUrl = this.createUrl.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formatValue = this.formatValue.bind(this);
  } // 'onChange' handler for the URL creation input


  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  } // 'onSubmit' handler, posts data to create a new short URL


  createUrl(e) {
    e.preventDefault();
    this.props.createNewUrl(this.state.input);
    this.setState({
      input: ''
    });
  } // formats output value with quotes and/or comma


  formatValue(key, index, length) {
    const value = this.props.urlInfo[key];
    const result = typeof value === "string" ? `"${value}"` : `${value}`;
    return index < length - 1 ? result + ',' : result;
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      onSubmit: this.createUrl
    }, /*#__PURE__*/React.createElement("label", {
      for: "url-input"
    }, "URL to be shortened:"), /*#__PURE__*/React.createElement("input", {
      id: "url-input",
      type: "text",
      value: this.state.input,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Create URL"
    }), this.props.urlInfo && /*#__PURE__*/React.createElement("ul", {
      className: "code-block"
    }, /*#__PURE__*/React.createElement("code", null, /*#__PURE__*/React.createElement("li", null, '{'), /*#__PURE__*/React.createElement("ul", null, Object.keys(this.props.urlInfo).map((key, index, array) => /*#__PURE__*/React.createElement("li", {
      key: key
    }, "\"", key, "\": ", this.formatValue(key, index, array.length)))), /*#__PURE__*/React.createElement("li", null, '}'))));
  }

}
/*
 * React component connected to the Redux store.
 */


const ConnectedCreateForm = ReactRedux.connect(state => ({
  urlInfo: state.urlInfo
}), dispatch => ({
  createNewUrl: url => dispatch(createUrlAsync(url))
}))(CreateUrlForm);
/*
 * Render the connected component.
 */

ReactDOM.render( /*#__PURE__*/React.createElement(ReactRedux.Provider, {
  store: store
}, /*#__PURE__*/React.createElement(ConnectedCreateForm, null)), document.querySelector('#create-url-form'));