/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly";
import { blocks } from "./blocks/text";
import { forBlock } from "./generators/javascript";
import { javascriptGenerator } from "blockly/javascript";
import { save, load } from "./serialization";
import { toolbox } from "./toolbox";
import "./index.css";
import "./renderes/custom";

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById("generatedCode").firstChild;
const outputDiv = document.getElementById("output");
const blocklyDiv = document.getElementById("blocklyDiv");
const ws = Blockly.inject(blocklyDiv, {
  renderer: "custom_renderer",
  toolbox,
});


// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
// const runCode = () => {
//   const code = javascriptGenerator.workspaceToCode(ws);
//   codeDiv.innerText = code;

//   outputDiv.innerHTML = "";

//   eval(code);
// };

// index.js

// ... existing code

const runCode = () => {
  const code = javascriptGenerator.workspaceToCode(ws);
  codeDiv.innerText = code;

  outputDiv.innerHTML = "";

  // Log JSON to console
  console.log(code);

  // Display JSON in the output area
  outputDiv.innerText = code;
};

// ... existing code


// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (
    e.isUiEvent ||
    e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  runCode();
});

const parseStatements = (statements) => {
  try {
    // Parse the JSON array
    const statementsArray = JSON.parse(`[${statements}]`);

    // Recursively parse nested statements
    const parsedStatements = statementsArray.map(obj => {
      if (obj.statements) {
        obj.statements = parseStatements(obj.statements);
      }
      return obj;
    });

    return parsedStatements;
  } catch (error) {
    // Handle JSON parsing error
    console.error('Error parsing nested statements:', error);
    return [];
  }
};

const generateAndDisplayJSON = () => {
  const code = javascriptGenerator.workspaceToCode(ws);

  // Replace "}{" with "},{"
  const replaceCode = code.replace(/}\s*{/g, '},{');

  // console.log('reee',replaceCode);
  // Remove the first line starting with 'var'
var modifiedString = replaceCode.replace(/^var.*$/m, '');
// console.log('modifiedData',modifiedString);

  // Wrap the JSON objects in an array
  const wrappedCode = `[${modifiedString}]`;

  try {
    // Parse the JSON array
    const jsonDataArray = JSON.parse(wrappedCode);

    // Recursively parse statements
    const parsedStatements = jsonDataArray.map(obj => {
      if (obj.statements) {
        obj.statements = parseStatements(obj.statements);
      }
      return obj;
    });

    // Log the parsed data to the console
    console.log(parsedStatements);

    // Display JSON in the output area
    outputDiv.innerText = JSON.stringify(parsedStatements, null, 2);
  } catch (error) {
    // Handle JSON parsing error
    console.error('Error parsing JSON:', error);
    outputDiv.innerText = 'Error parsing JSON';
  }
};



// Event listener for the "Generate JSON" button
const generateJsonButton = document.getElementById('generateJsonButton');
generateJsonButton.addEventListener('click', generateAndDisplayJSON);

// Event listener for the "Generate JSON" button
// const generateJsonButton = document.getElementById('generateJsonButton');
// generateJsonButton.addEventListener('click', generateAndDisplayJSON);

// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  if (e.isUiEvent) return;
  save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  if (
    e.isUiEvent ||
    e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  runCode();
});

