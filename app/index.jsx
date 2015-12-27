// index.js
var React = require('react');
var ReactDOM = require('react-dom');

var ClickerWindow = React.createClass({
  getInitialState: function() {
    return {clicks: 0}
  },
  componentDidMount: function() {
  },

  handleClick: function() {
    this.setState({'clicks': this.state.clicks+1})
    console.log("Click! #"+this.state.clicks);
  },
  render: function() {
    return (
        <div className="clickerWindow">
          <h1>Clicker Game</h1>
          <p>
            # Clicks: {this.state.clicks} <br/>
            <button type="button" onClick={this.handleClick}>Click me</button>
          </p>

        </div>
      );
  }
});

ReactDOM.render(
  <ClickerWindow/>,
  document.getElementById('content')
);