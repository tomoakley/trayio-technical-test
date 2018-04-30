import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _isEqual from 'lodash/isEqual';
import _toNumber from 'lodash/toNumber';

const Line = styled.div`
  margin-top: 15px;
`;

export default class Status extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      roomSize: props.roomSize
    };
    this.onChangeRoomSize = this.onChangeRoomSize.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEqual(this.props.roomSize, nextProps.roomSize)) {
      this.setState({ roomSize: nextProps.roomSize });
    }
  }

  static propTypes = {
    dirtPositions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    robotPosition: PropTypes.arrayOf(PropTypes.number),
    roomSize: PropTypes.arrayOf(PropTypes.number),
    setRoomSize: PropTypes.func
  };

  renderDirtStatus() {
    const { dirtPositions } = this.props;
    if (dirtPositions.length) {
      return (
        <div>
          <Line>You still have {dirtPositions.length} bits of dirt to clean up.</Line>
          <Line>They are positioned at: { dirtPositions.map((dirt, i) => <span key={i}> [{dirt[0]},{dirt[1]}] </span>) }</Line>
        </div>
      );
    } else {
      return <Line>You cleaned all the dirt, well done!</Line>;
    }
  }

  renderRobotStatus() {
    const { robotPosition } = this.props;
    return <Line>The robot is at position { robotPosition[0] }, { robotPosition[1] }.</Line>;
  }

  onChangeRoomSize(e) {
    const index = e.target.name === 'x' ? 0 : 1;
    const newRoomSize = this.state.roomSize;
    newRoomSize[index] = _toNumber(e.target.value);
    this.setState({ roomSize: newRoomSize }, () => {
      this.props.setRoomSize(this.state.roomSize);
    });
  }

  renderRoomSizeModification() {
    const { roomSize } = this.state;
    return (
      <Line>
        <span>The room is </span> {roomSize[0]} <span> x </span> {roomSize[1]} <span> squares.</span>
      </Line>
    );
  }

  render() {
    return (
      <div>
        { this.renderDirtStatus() }
        { this.renderRobotStatus() }
        { this.renderRoomSizeModification() }
      </div>
    );
  }

}