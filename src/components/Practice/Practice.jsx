import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Main = styled.li`
  background-color: ${(props) => (props.backgroundColor ? "#000" : "#fff")};
`;

const Button = styled.button`
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Practice = () => {
  const [task, setTask] = useState("");
  const [person, setPerson] = useState("");
  const [age, setAge] = useState("");
  const [toDo, setToDo] = useState([]);
  const [toggle, setToggle] = useState(1000);
  const url = useParams();

  const handleInput = () => {
    const newToDo = [...toDo, { text: task, subText: person, myAge: age }];
    setToDo(newToDo);
    setTask("");
    setPerson("");
    setAge("");
  };

  useEffect(() => {
    const key = setInterval(() => {
      setToggle((toggle) => toggle - 1);
    }, 1000);
    return () => {
      clearInterval(key);
    };
  }, [toggle]);
  return (
    <div>
      <div>{toggle}</div>
      <input
        type="text"
        value={task}
        onChange={(e) => {
          const value = e.target.value;
          setTask(value);
        }}
      />
      <input
        type="text"
        value={person}
        onChange={(e) => {
          const value = e.target.value;
          setPerson(value);
        }}
      />
      <input
        type="text"
        value={age}
        onChange={(e) => {
          const value = e.target.value;
          setAge(value);
        }}
      />

      <div>{person.age}</div>
      <Button onClick={handleInput}>click me</Button>
      <Button>click me</Button>
      <div>
        {toDo.map((item, index) => {
          return (
            <ul key={index}>
              <li>{item.text}</li>
              <li>{item.subText}</li>
              <li>{item.myAge}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Practice;
