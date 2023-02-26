import React from "react";
import { asEditorWidget } from "@episerver/react-to-dijit-adapter";

const ToDoList = ({
  onChange,
  value,
} : any) => {
  return (
    <div>TEST</div>
  );
};

export default asEditorWidget(ToDoList);
