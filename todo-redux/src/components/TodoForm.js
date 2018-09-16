import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCurrent, saveTodo } from "../reducers/todo";

class TodoForm extends Component {
  handleInputChange = e => {
    const val = e.target.value;
    this.props.updateCurrent(val);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.saveTodo(this.props.currentTodo);
  };

  render() {
    const { currentTodo } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={currentTodo}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

export default connect(
  state => ({ currentTodo: state.currentTodo }),
  { updateCurrent, saveTodo }
)(TodoForm);
