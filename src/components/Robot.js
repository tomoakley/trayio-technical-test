import React from 'react';
import styled from 'styled-components';

const RobotObject = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: white;
`;

export default class Robot extends React.Component {

  render() {
    return (
      <RobotObject />
    );
  }

}