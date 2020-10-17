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
  }

  // 'onChange' handler for the URL creation input
  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  // 'onSubmit' handler, posts data to create a new short URL
  createUrl(e) {
    e.preventDefault();
    this.props.createNewUrl(this.state.input);
    this.setState({
      input: ''
    });
  }

  // formats output value with quotes and/or comma
  formatValue(key, index, length) {
    const value = this.props.urlInfo[key];
    const result = typeof value === "string" ? `"${value}"` : `${value}`;
    return index < length - 1 ? result + ',' : result;
  }

  render() {
    return (
      <form onSubmit={this.createUrl}>
        <label for="url-input">URL to be shortened:</label>
        <input id="url-input" type="text" value={this.state.input}
          onChange={this.handleChange}
        />
        <input type="submit" value="Create URL" />
        {
          this.props.urlInfo &&
          <ul className='code-block'>
            <code>
              <li>{'{'}</li>
              <ul>
                {Object.keys(this.props.urlInfo).map((key, index, array) =>
                  <li key={key}>"{key}": {this.formatValue(key, index, array.length)}</li>
                )}
              </ul>
              <li>{'}'}</li>
            </code>
          </ul>
        }
      </form>
    );
  }
}

/*
 * React component connected to the Redux store.
 */

const ConnectedCreateForm = ReactRedux.connect(
  state => ({
    urlInfo: state.urlInfo
  }),
  dispatch => ({
    createNewUrl: url => dispatch(createUrlAsync(url))
  })
)(CreateUrlForm);

/*
 * Render the connected component.
 */

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <ConnectedCreateForm />
  </ReactRedux.Provider>,
  document.querySelector('#create-url-form')
);
