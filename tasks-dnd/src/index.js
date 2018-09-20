import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import "./index.css";
import initalData from "./inital-data";
import registerServiceWorker from "./registerServiceWorker";
import Column from "./column.jsx";

class App extends React.Component {
  state = initalData;
  render() {
    return this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map(taskIds => this.state.tasks[taskIds]);

      return <Column key={column.id} column={column} tasks={tasks} />;
    });
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
