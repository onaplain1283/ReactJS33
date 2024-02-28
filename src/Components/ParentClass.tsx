import React, { createRef, Fragment, RefObject } from "react";
import ChildFunction from "./ChildFunction.tsx";

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
    isDisabled: boolean;
    ref: RefObject<HTMLInputElement> | null;
  }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      inputValue: "",
      todos: [],
      isDisabled: false,
      ref: createRef(),
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
    if (e.currentTarget.value.includes("react")) {
      this.setState({
        isDisabled: true,
      });
    } else if (!e.currentTarget.value.includes("react")) {
      this.setState({
        isDisabled: false,
      });
    }
    this.setState({ inputValue: e.target.value });
  }

  handleFocus = () => {
    if (this.state.ref !== null) this.state.ref.current?.focus();
  };

  render() {
    const list = this.state.todos.map((el) => (
      <ChildFunction
        userId={el.userId}
        id={el.id}
        title={el.title}
        completed={el.completed}
        key={el.id}
      />
    ));
    return (
      <Fragment>
        <form>
          <input
            ref={this.state.ref}
            type="text"
            onChange={(e) => this.handleInput(e)}
          />
          <button disabled={this.state.isDisabled} type="reset">
            Reset
          </button>
          <button type="button" onClick={this.handleFocus}>
            Focus
          </button>
        </form>
        <p>{this.state.inputValue}</p>

        <div>{...list}</div>
      </Fragment>
    );
  }
}