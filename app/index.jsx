// index.js
var React = require('react');
var ReactDOM = require('react-dom');

// Get Upgrade list configuration from json file
var buttonUpgradeFullList = require('./upgrades.json');

// Autoclick update rate in milliseconds
var autoclickUpdateRate = 20; // 20 ~ 50Hz

console.log(buttonUpgradeFullList);

// Shows current number of clicks
var ClickCounter = React.createClass({
  render: function() {
    return (
      <div>
        <p>
          Clicks: {Math.floor(this.props.clicks)}
          <br/>
          Autoclicking at {this.props.clickDelta.toFixed(0)} clicks per second (cps).
        </p>
      </div>
    );
  }
});

// Click button contains button for clicking manually
var ClickButton = React.createClass({
  render: function() {
    return (
      <button type="button" onClick={this.props.submitClick}>Click me</button>
    );
  }
});

var UpgradeButton = React.createClass({
  render: function() {
    var upgrade = this.props.data;
    var id = upgrade.id;
    var state = this.props.state; // overall state, to determine if button is grayed out and what level
    var numUpgraded = state.upgrades[id];
    var isDisabled = state.clicks < upgrade.minclicks;
    return (
      <span id={id}>
        <button type="button" 
                onClick={this.props.submitUpgrade} 
                key={id}
                disabled={isDisabled}>{upgrade.label} ({upgrade.ratepersecond} cps) x {numUpgraded}
        </button> - Cost : {upgrade.minclicks} clicks
      </span>
    );
  }
});

// Upgrade auto clickers based on button selected
var ClickButtonUpgrades = React.createClass({
  render: function() {
    var submitUpgradeHandler = this.props.submitUpgrade;
    var state = this.props.state;

    var upgradeButtons = this.props.upgradeFullList.map(function(upgrade,i) {
      // Only show button if number of clicks hits min threshold
      if (state.upgrades[i] > 0 || state.clicks >= upgrade.minclicks)
      {
        return (
          <li key={upgrade.id}>
            <UpgradeButton key={upgrade.id}
                           submitUpgrade={submitUpgradeHandler.bind(null,upgrade.id)}
                           data={upgrade}
                           state={state} />
          </li>
        );
      }

      else
      {
        return;
      }
    });

    return (
      <div className="UpgradeList">
        <ul>
          {upgradeButtons}
        </ul>
      </div>
    );
  }
});

var ClickerWindow = React.createClass({
  getInitialState: function() {
    var upgradeCounts = Array.apply(null, Array(this.props.upgradeFullList.length)).map(Number.prototype.valueOf,0);
    return {clicks: 0, 
            upgrades: upgradeCounts};
  },

  componentDidMount: function() {
    setInterval(this.updateClicks, this.props.updateInterval);
  },

  updateClicks: function() {
    // The meat, increment clicks based on autoclickers
    var clicks = this.state.clicks;
    var rate_multiplier = this.props.updateInterval/1000;

    for (var i = 0; i < this.props.upgradeFullList.length; i++) {
      var ratepersecond = this.props.upgradeFullList[i].ratepersecond;
      // Add to clicks for each upgrade of this level that exists
      clicks = clicks + ratepersecond * this.state.upgrades[i] * rate_multiplier;
    };
    this.setState({'clicks': clicks});
  },

  handleClick: function() {
    this.setState({'clicks': this.state.clicks+1})
  },

  handleUpgrades: function(buttonId) {
    var clicks = this.state.clicks;
    var currentUpgrades = this.state.upgrades;
    currentUpgrades[buttonId] = currentUpgrades[buttonId] + 1;
    clicks = clicks - this.props.upgradeFullList[buttonId].minclicks;
    this.setState({'clicks':clicks, 'upgrades':currentUpgrades});
  },
  render: function() {
    var upgradeState = this.state.upgrades;

    var delta = this.props.upgradeFullList.map(function(upgrade,i) {
      return upgrade.ratepersecond * upgradeState[i];
    }).reduce(function(a1,a2) {return a1+a2;});
    
    return (
        <div className="clickerWindow">
          <h1>Clicker Game</h1>
          <ClickCounter clicks={this.state.clicks} clickDelta={delta} />
          <ClickButton submitClick={this.handleClick} />
          <ClickButtonUpgrades upgradeFullList={this.props.upgradeFullList}
                               state={this.state}
                               submitUpgrade={this.handleUpgrades} />
        </div>
      );
  }
});

ReactDOM.render(
  <ClickerWindow upgradeFullList={buttonUpgradeFullList} updateInterval={autoclickUpdateRate}/>,
  document.getElementById('content')
);
