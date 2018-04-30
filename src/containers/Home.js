import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';
import _toNumber from 'lodash/toNumber';
import { moveRobot } from '../reducers/robot'
import DirectionalPad from "../components/DirectionalPad";
import Room from "../components/Room";
import { setRoomSize } from "../reducers/room";
import { generateDirt, cleanDirt } from "../reducers/dirt";
import Status from "../components/Status";
import { setStartPosition } from "../reducers/robot";

const Error = styled.span`
  font-weight: bold;
  color: red;
  display: block;
`;

const InputGroup = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  margin: 0 5px;
`;

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.onSetupSubmit = this.onSetupSubmit.bind(this);
  }

  static propTypes = {
    robot: PropTypes.shape({
      position: PropTypes.arrayOf(PropTypes.number),
      error: PropTypes.string
    }),
    dirtPositions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    room: PropTypes.shape({
      size: PropTypes.arrayOf(PropTypes.number),
      error: PropTypes.string
    }),
    moveRobot: PropTypes.func,
    setStartPosition: PropTypes.func,
    setRoomSize: PropTypes.func,
    generateDirt: PropTypes.func,
    cleanDirt: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    const {
      room: { size: roomSize }
    } = this.props;
    if (!_isEqual(nextProps.room.size, roomSize) && nextProps.room.size[0] > 0 && nextProps.room.size[1] > 0) {
      this.props.generateDirt();
    }
  }

  onSetupSubmit(e) {
    e.preventDefault();
    this.props.setRoomSize([
      _toNumber(e.target['size-x'].value),
      _toNumber(e.target['size-y'].value)
    ]);
    this.props.setStartPosition([
      _toNumber(e.target['robot-x'].value),
      _toNumber(e.target['robot-y'].value)
    ]);
  }

  renderSetup() {
    return (
      <form onSubmit={this.onSetupSubmit}>
        <InputGroup>
          <label>Set Room Size (x and y):</label>
          <Input type="number" name="size-x" />
          <Input type="number" name="size-y" />
          { this.props.room.error ? <Error>{this.props.room.error}</Error> : null }
        </InputGroup>
        <InputGroup>
          <label>Set robot starting position:</label>
          <Input type="number" name="robot-x" defaultValue="0" />
          <Input type="number" name="robot-y" defaultValue="0" />
        </InputGroup>
        <InputGroup>
          <label>Number of patches of dirt:</label>
          <Input type="number" name="dirt" />
        </InputGroup>
        <InputGroup>
          <button type="submit">Generate</button>
        </InputGroup>
      </form>
    )
  }

  renderRoom() {
    return (
      <div>
        <Room
          size={this.props.room.size}
          robotPosition={this.props.robot.position}
          dirtPositions={this.props.dirtPositions}
          cleanDirt={this.props.cleanDirt}
        />
        <DirectionalPad moveRobot={this.props.moveRobot} />
        <Status dirtPositions={this.props.dirtPositions}
                robotPosition={this.props.robot.position}
                roomSize={this.props.room.size}
                setRoomSize={this.props.setRoomSize}
        />
      </div>
    )
  }

  render() {
    const { room: { size: roomSize } } = this.props;
    return (
      roomSize[0] > 0 && roomSize[1] > 0 ?
        this.renderRoom() :
        this.renderSetup()
    );
  }

}

const mapStateToProps = (state) => {
  return {
    robot: {
      position: state.robot.position,
    },
    room: {
      size: state.room.size || [0, 0],
      error: state.room.error
    },
    dirtPositions: state.dirt.positions
  };
};

const mapDispatchToProps = {
  moveRobot,
  setStartPosition,
  setRoomSize,
  generateDirt,
  cleanDirt
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);