import { useState } from "react";
import classes from "../assets/ChildClass.module.css";

type PropType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function ChildFunction(props: PropType) {
  const [completed, setCompleted] = useState(props.completed);

  const handleChange = () => {
    setCompleted((prevState) => !prevState);
  };

  return (
    <div
      className={classes.wrapper}
      style={{ background: completed ? "green" : "red" }}
    >
      <h3 className={classes.item}>{props.title}</h3>
      <div className={classes.item}>{`Id:${props.id}`}</div>
      <div className={classes.item}>{`UserId:${props.userId}`}</div>
      <button onClick={handleChange} style={{ width: "150px" }}>
        {completed ? "Set uncompleted" : "Set completed"}
      </button>
    </div>
  );
}