import React from "react";
import classes from "../assets/ChildClass.module.css";

type PropType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type StateType = {
  completed: boolean;
};

class ChildClass extends React.Component<PropType, StateType> {
  state: StateType = {
    completed: this.props.completed,
  };

  handleChange = () => {
    this.setState((prevState) => {
      return {
        completed: !prevState.completed,
      };
    });
  };

  render() {
    return (
      <div
        className={classes.wrapper}
        style={{ background: this.state.completed ? "green" : "red" }}
      >
        <h3 className={classes.item}>{this.props.title}</h3>
        <div className={classes.item}>{`Id:${this.props.id}`}</div>
        <div className={classes.item}>{`UserId:${this.props.userId}`}</div>
        <button onClick={this.handleChange} style={{ width: "150px" }}>
          {this.state.completed ? "Set uncompleted" : "Set completed"}
        </button>
      </div>
    );
  }
}

export default ChildClass;