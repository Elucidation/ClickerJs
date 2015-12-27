// index.js
var React = require('react');
var ReactDOM = require('react-dom');

var React = require('react');


var buttons = [
{id: 1, label: 'AutoClicker', ratepersecond:'1', minclicks:'10'},
{id: 2, label: 'SuperClicker', ratepersecond:'5', minclicks:'100'},
{id: 3, label: 'UltraClicker', ratepersecond:'20', minclicks:'1000'},
];

// Shows current number of clicks
var ClickCounter = React.createClass({
  render: function() {
    return (
      <p>
        Clicks: {this.props.clicks}
      </p>
    );
  }
});

// Click button contains button for clicking and upgrades
var ClickButtonList = React.createClass({
  render: function() {
    return (
      <button type="button" onClick={this.props.submitClick}>Click me</button>
    );
  }
});

var ClickerWindow = React.createClass({
  getInitialState: function() {
    return {clicks: 0}
  },

  handleClick: function() {
    this.setState({'clicks': this.state.clicks+1})
    console.log("Click! #"+this.state.clicks);
  },
  render: function() {
    return (
        <div className="clickerWindow">
          <h1>Clicker Game</h1>
          <ClickCounter clicks={this.state.clicks} />
          <ClickButtonList submitClick={this.handleClick} />
        </div>
      );
  }
});

ReactDOM.render(
  <ClickerWindow/>,
  document.getElementById('content')
);