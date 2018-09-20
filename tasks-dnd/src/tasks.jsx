import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
export default class Task extends React.Component {
  render() {
    return <Container>{this.props.task.content}</Container>;
  }
}
