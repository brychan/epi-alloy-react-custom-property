import React from "react";
import { asEditorWidget } from "@episerver/react-to-dijit-adapter";

const ToDoList = ({
  onChange,
  value,
  test
} : any) => {
  console.log("Test parameter from backend", test)
  return (
    <div>TEST</div>
  );
};

export default asEditorWidget(ToDoList);
