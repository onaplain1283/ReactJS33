import React from "react";
import ChildClass from "./ChildClass.tsx";

type todos = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default class ParentClass extends React.Component<
  Record<string, never>,
  {
    inputValue: string;
    todos: todos[];
  }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      inputValue: "",
      todos: [],
    };
    this.handleInput = this.handleInput.bind(this);
  }

  static getDerivedStateFromProps() {
    console.log("Get derived state from props");
    return null;
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          todos: res,
        }),
      );
    console.log("Component did mount");
  }

  shouldComponentUpdate(
    nextProps: Readonly<Record<string, never>>,
    nextState: Readonly<{
      inputValue: string;
    }>,
  ): boolean {
    if (nextProps !== this.props || nextState !== this.state) {
      console.log("Component should  update");
      return true;
    }
    console.log("Component should not update");
    return false;
  }

  componentDidUpdate(
    prevProps: Readonly<Record<string, never>>,
    prevState: Readonly<{
      inputValue: string;
    }>,
  ) {
    if (
      this.state.inputValue !== prevState.inputValue ||
      prevProps !== this.props
    ) {
      console.log("Action after update");
    }
  }

  componentWillUnmount() {
    console.log("Component unmounted");
  }

  handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    const list = this.state.todos.map((el) => (
      <ChildClass
        userId={el.userId}
        id={el.id}
        title={el.title}
        completed={el.completed}
      />
    ));
    return (
      <div>
        <form>
          <input type="text" onChange={(e) => this.handleInput(e)} />
          <button type="reset">Reset</button>
        </form>
        <p>{this.state.inputValue}</p>

        <div>{...list}</div>
      </div>
    );
  }
}