import React from 'react';
import './TodoList.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  render() {
    let list;
    if (this.state.tasks.length === 0) {
      list = <div className="task">Empty.</div>;
    } else {
      list = this.state.tasks.map((task, index) => (
        <Task key={index} index={index} task={task} deleteTask={this.deleteTask} />
    ))};

    return (
      <div>
        <h1 className="header">TODO LIST:</h1>
        
        <form className="form" onSubmit={this.addTask}>
          <label>Task name:</label>
          <input type="text" value={this.state.text} onChange={this.handleChange} />
          <input type="submit" value="Create task" />
        </form>

        {list}
      </div>
    );
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  addTask(event) {
    event.preventDefault();
    if (this.state.text.length > 0) {
      if (this.state.tasks.includes(this.state.text)) {
        // Prevent duplicates.
        this.setState(state => ({
          text: ''
        }));
      } else {
        this.setState(state => ({
          tasks: state.tasks.concat(this.state.text),
          text: ''
        }));
      }
    }
  }

  deleteTask(index) {
    let newTasks = [...this.state.tasks]
    newTasks.splice(index, 1)
    this.setState(state => ({
      tasks: newTasks
    }));
  }
}

class Task extends React.Component {
  render() {
    return (
      <div className="task">
        {this.props.task}
        <button className="delete-btn" onClick={() => this.props.deleteTask(this.props.index)}>
          Delete task
        </button>
      </div>
    );
  }
}

export default TodoList;
