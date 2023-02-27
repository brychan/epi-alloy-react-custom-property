"use strict";

const path = require("path");

const customPropertiesConfig = {
  entry: path.resolve(
    __dirname,
    "./CustomProperties/ToDoList/ToDoList.tsx"
  ),
  mode: "development", //change?
  output: {
    filename: "ToDoList.js",
    libraryTarget: "amd",
    libraryExport: "default",
    path: path.resolve(__dirname, "ClientResources/Scripts/Editors/"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: ["dojo/_base/declare", "dijit/_WidgetBase"],
};

module.exports = [customPropertiesConfig];