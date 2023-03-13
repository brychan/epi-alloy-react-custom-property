import React, { useMemo, useRef, useState } from "react";
import { asEditorWidget } from "@episerver/react-to-dijit-adapter";

interface Task {
  i: string;
  v: string;
  d: boolean;
}

interface TaskItem {
  task: Task;
  handleMarkDone: (i: string) => void;
}

const TaskItem = ({ task, handleMarkDone }: TaskItem) => {
  return (
    <li>
      {task.d ? (
        <s>{task.v}</s>
      ) : (
        <>
          <span>{task.v}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleMarkDone(task.i);
            }}
          >
            Done
          </button>
        </>
      )}
    </li>
  );
};

const getTasksList = (tasks: Task[], handleMarkDone: (i: string) => void) => {
  return tasks?.length ? (
    tasks?.map((task: Task) => (
      <TaskItem key={task.i} task={task} handleMarkDone={handleMarkDone} />
    ))
  ) : (
    <div>No tasks.</div>
  );
};

const tasksToString = (tasksJSON: string) => {
  return tasksJSON ? JSON.parse(tasksJSON) : [];
};

const tasksToJSON = (tasks: Task[]) => {
  return JSON.stringify(tasks);
};

const ToDoList = ({ onChange, value, test }: any) => {
  // "test" prop is provided by ToDoListAttribute.cs
  const inputEl = useRef(null);
  const [newTaskValue, setNewTaskValue] = useState("");
  const [allTasks, setAllTasks] = useState(tasksToString(value));

  const handleAddToList = () => {
    if (!newTaskValue) return;
    inputEl.current.focus();
    const _newTask = {
      i: Math.random().toString(16).slice(10),
      v: newTaskValue,
      d: false,
    };
    setAllTasks([...allTasks, _newTask]);
    setNewTaskValue("");
  };

  const handleMarkDone = (i: string) => {
    const changed = allTasks?.map((task: Task) =>
      task.i === i ? { ...task, d: true } : task
    );
    setAllTasks(changed);
  };

  const taskList = useMemo(
    () => getTasksList(allTasks, handleMarkDone),
    [allTasks]
  );

  return (
    <div
      onBlur={() => {
        console.log("Container onBlur triggering auto-save.");
        const _allTasksJson = tasksToJSON(allTasks);
        if (allTasks && value && _allTasksJson !== value)
          onChange(_allTasksJson);
      }}
    >
      <ul>{taskList}</ul>
      <input
        ref={inputEl}
        type="text"
        value={newTaskValue}
        onChange={(e) => {
          setNewTaskValue(e.target.value);
        }}
      />
      <div onClick={handleAddToList}>Add to list</div>
    </div>
  );
};

export default asEditorWidget(ToDoList);
