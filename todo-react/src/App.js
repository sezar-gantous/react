import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "./logo.svg";
import "./App.css";
import { TodoForm, TodoList, Footer } from "./components/todo";
import {
  addTodo,
  generateId,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodos
} from "./lib/todoHelpers";
import { pipe, partial } from "./lib/utils";
import {
  loadTodos,
  createTodo,
  saveTodo,
  destroyTodo
} from "./lib/todoService";

class App extends Component {
  state = {
    todos: [],
    currentTodo: ""
  };

  static contextTypes = {
    route: PropTypes.string
  };

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({ todos }))
      .catch(err => this.setState({ errorMsg: `${err}` }));
  }

  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updateTodos = removeTodo(this.state.todos, id);
    this.setState({ todos: updateTodos });
    destroyTodo(id)
      .then(() => this.showTempMessage("Todo Removed"))
      .catch(err => this.setState({ errorMsg: `${err}` }));
  };

  handleToggle = id => {
    const getToggleTodo = pipe(
      findById,
      toggleTodo
    );
    const updated = getToggleTodo(id, this.state.todos);
    const getUpdatedTodos = partial(updateTodo, this.state.todos);

    const updatedTodos = getUpdatedTodos(updated);

    this.setState({ todos: updatedTodos });
    saveTodo(updated)
      .then(() => this.showTempMessage("Todo Upaded"))
      .catch(err => this.setState({ errorMsg: `${err}` }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const newId = generateId();
    const newTodo = {
      name: this.state.currentTodo,
      isComplete: false,
      id: newId
    };

    const updatedTodo = addTodo(this.state.todos, newTodo);

    this.setState({
      todos: updatedTodo,
      currentTodo: "",
      errorMsg: ""
    });

    createTodo(newTodo)
      .then(() => this.showTempMessage("Todo added"))
      .catch(err => this.setState({ errorMsg: `${err}` }));
  };

  showTempMessage = msg => {
    this.setState({ message: msg });
    setTimeout(() => this.setState({ message: "" }), 2500);
  };

  handleEmptySubmit = e => {
    e.preventDefault();
    this.setState({
      errorMsg: "Please supply a todo name"
    });
  };

  handleInputChange = e => {
    this.setState({
      currentTodo: e.target.value
    });
  };
  render() {
    const submitHandler = this.state.currentTodo
      ? this.handleSubmit
      : this.handleEmptySubmit;
    const displayTodos = filterTodos(this.state.todos, this.context.route);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMsg && (
            <span className="error"> {this.state.errorMsg}</span>
          )}

          {this.state.message && (
            <span className="success"> {this.state.message}</span>
          )}
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}
          />
          <TodoList
            handleToggle={this.handleToggle}
            todos={displayTodos}
            handleRemove={this.handleRemove}
          />

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
