import React from 'react';
import PropTypes from 'prop-types';
import _forEach from 'lodash/forEach';
import _find from 'lodash/find';

export default class DirectionalPad extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    moveRobot: PropTypes.func
  };
  
  handleClick(e) {
    e.preventDefault();
    const button = _find(this.buttonDetails(), { label: e.target.innerHTML });
    this.props.moveRobot(button.move);
  }

  buttonDetails = () => ([
    {
      label: "North",
      move: [0, 1]
    }, {
      label: "South",
      move: [0, -1]
    }, {
      label: "East",
      move: [1, 0]
    }, {
      label: "West",
      move: [-1, 0]
    }
  ]);

  renderButtons() {
    const buttons = [];
    _forEach(this.buttonDetails(), (button, i) => {
      buttons.push(<button onClick={this.handleClick} key={i}>{button.label}</button>);
    });
    return buttons;
  }

  render() {
    return (
      <div className="dpad">
        { this.renderButtons() }
      </div>
    )
  }

}