import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _fill from 'lodash/fill';
import _forEach from 'lodash/forEach';
import _clone from 'lodash/clone';
import _map from 'lodash/map';
import _compact from 'lodash/compact';
import _isEqual from 'lodash/isEqual';
import Robot from "./Robot";
import Dirt from "./Dirt";

const Tile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: grey;
  width: 100px;
  height: 100px;
  border: solid thin white;
`;

const Row = styled.div`
  display: flex;
`;

const RoomContainer = styled.div`
  position: relative;
`;

export default class Room extends React.Component {

  static propTypes = {
    size: PropTypes.arrayOf(PropTypes.number),
    robotPosition: PropTypes.arrayOf(PropTypes.number),
    dirtPositions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    cleanDirt: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    if (!_isEqual(nextProps.robotPosition, this.props.robotPosition)) {
      _forEach(this.props.dirtPositions, (dirt, i) => {
        if (_isEqual(nextProps.robotPosition, dirt)) {
          this.props.cleanDirt(i);
        }
      });
    }
  }

  renderRows() {
    const rows = [];
    const tiles = _fill(new Array(this.props.size[1]), _fill(new Array(this.props.size[0]), <Tile />));
    const numberOfRows = tiles.length;
    _forEach(tiles, (row, i) => {
      const rowContainsRobot = this.props.robotPosition[1] === numberOfRows - 1 - i;
      const rowContainsDirt = _map(this.props.dirtPositions, (dirt) => {
        return dirt[1] === numberOfRows - 1 - i ? dirt[0] + 1 : false;
      });
      const columnsWithDirt = _map(_compact(rowContainsDirt), column => column - 1);
      if (rowContainsRobot || columnsWithDirt.length) {
        const modifiedRow = _clone(row);
        const key = modifiedRow[this.props.robotPosition[0]].key;
        if (rowContainsRobot) {
          modifiedRow[this.props.robotPosition[0]] = <Tile key={key}><Robot/></Tile>;
        }
        if (columnsWithDirt.length) {
          _forEach(columnsWithDirt, (column) => {
            modifiedRow[column] = <Tile><Dirt/></Tile>;
          });
        }
        rows.push(<Row key={i}>{modifiedRow}</Row>);
      } else {
        rows.push(<Row key={i}>{row}</Row>);
      }
    });
    return rows;
  }

  render() {
    return (
      <RoomContainer>
        { this.renderRows() }
      </RoomContainer>
    );
  }

}