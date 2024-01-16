import * as Blockly from "blockly";
// import * as BlockDynamicConnection from "@blockly/block-dynamic-connection";
// import * as Blockly from 'blockly/core';
// import './dynamic_list_create';
import './blocks/procedures';  // Import your custom blocks file
// import './blocks/switch';




// BlockDynamicConnection.overrideOldBlockDefinitions(Blockly.Blocks);

var amrModel = {
  type: "amr_model",
  message0: "AMR Model : %1 %2 %3",
  args0: [
    {
      type: "field_dropdown",
      name: "amr model dropdown",
      options: [
        ["option", "OPTIONNAME"],
        ["option", "OPTIONNAME"],
        ["option", "OPTIONNAME"],
      ],
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_dummy",
    },
  ],
  colour: 65,
  nextStatement: null,
  tooltip: "",
  helpUrl: "",
};

Blockly.Blocks["amr_model"] = {
  init: function () {
    this.jsonInit(amrModel);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      return 'Add a number to variable "%1".'.replace(
        "%1",
        thisBlock.getFieldValue("VAR")
      );
    });
  },
};

const taskPlan = {
  type: "task_plan",
  message0: "Task Plan %1 %2 Wait For  %3 %4 %5 %6",
  args0: [
    {
      type: "field_dropdown",
      name: "Task Plan",
      options: [
        ["Task Plan", "Task Plan"],
        ["option", "OPTIONNAME"],
        ["option", "OPTIONNAME"],
      ],
    },
    {
      type: "input_dummy",
    },
    {
      type: "field_dropdown",
      name: "wait",
      options: [
        ["none", "none"],
        ["option", "OPTIONNAME"],
        ["option", "OPTIONNAME"],
      ],
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "NAME",
      check: ["amr_blocks"],
    },
  ],
  colour: 230,
  // "nextStatement":null,
  previousStatement: ["non_amr_blocks", "amr_groups"],
  nextStatement: ["non_amr_blocks", "amr_groups"], // Specify the allowed next connection type
  tooltip: "",
  helpUrl: "",
};
Blockly.Blocks["task_plan"] = {
  init: function () {
    this.jsonInit(taskPlan);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // this.setPreviousStatement(true, "release_key");
    // this.setNextStatement(true, ["release_key"]);

    this.setTooltip(function () {
      return 'Add a number to variable "%1".'.replace(
        "%1",
        thisBlock.getFieldValue("VAR")
      );
    });
  },
};
const taskPlan2 = {
  type: "task_plan2",
  message0: "Task Plan %1 %2 Wait For  %3 Using %4 %5 %6 %7",
  args0: [
    {
      type: "field_dropdown",
      name: "Task Plan",
      options: [
        ["Task Plan", "Task Plan"],
        ["option", "OPTIONNAME"],
        ["option", "OPTIONNAME"],
      ],
    },
    {
      type: "input_dummy",
    },
    {
      type: "field_dropdown",
      name: "time",
      options: [
        ["key", "none"],
        ["option", "OPTIONNAME"],
        ["option", "OPTIONNAME"],
      ],
    },
    {
      type: "field_dropdown",
      name: "use",
      options: [
        ["Method", "none"],
        ["option", "OPTIONNAME"],
        ["option", "OPTIONNAME"],
      ],
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "NAME",
      check: ["amr_blocks"],
    },
  ],
  colour: 210,
  previousStatement: ["non_amr_blocks", "amr_groups"],
  nextStatement: ["non_amr_blocks", "amr_groups"], // Specify the allowed next connection type
  tooltip: "",
  helpUrl: "",
};
Blockly.Blocks["task_plan2"] = {
  init: function () {
    this.jsonInit(taskPlan2);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      return 'Add a number to variable "%1".'.replace(
        "%1",
        thisBlock.getFieldValue("VAR")
      );
    });
  },
};
const liftDown = {
  type: "lift_down",
  message0: "Go to %1 Wait For %2 Seconds %3 and %4",
  args0: [
    {
      type: "field_input",
      name: "destination",
      text: "",
    },
    {
      type: "field_input",
      name: "time",
      text: "",
    },
    {
      type: "input_dummy",
    },
    {
      type: "field_input",
      name: "navigate",
      text: "",
      // "check":["amr_blocks"]
    },
  ],
  colour: 230,
  previousStatement: ["amr_blocks"],
  nextStatement: ["amr_blocks"], // Specify the allowed next connection type
  tooltip: "",
  helpUrl: "",
};
Blockly.Blocks["lift_down"] = {
  init: function () {
    this.jsonInit(liftDown);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      return 'Add a number to variable "%1".'.replace(
        "%1",
        thisBlock.getFieldValue("VAR")
      );
    });
  },
};

const navigateBlock1 = {
  type: "navigate_block1",
  message0: "Go to  %1 Wait For  %2 Second %3 %4",
  args0: [
    {
      type: "field_input",
      name: "destination",
      text: "",
    },
    {
      type: "field_input",
      name: "time",
      text: "",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_dummy",
      // "check":["amr_blocks"]
    },
  ],
  colour: 230,
  previousStatement: ["amr_blocks"],
  nextStatement: ["amr_blocks"], // Specify the allowed next connection type
  tooltip: "",
  helpUrl: "",
};
Blockly.Blocks["navigate_block1"] = {
  init: function () {
    this.jsonInit(navigateBlock1);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      return 'Add a number to variable "%1".'.replace(
        "%1",
        thisBlock.getFieldValue("VAR")
      );
    });
  },
};

const releaseKey = {
  type: "release_key",
  message0: "Release Key %1",
  args0: [
    {
      type: "field_dropdown",
      name: "key",
      options: [
        ["True", "true"],
        ["False", "false"],
      ],
    },
  ],
  colour: 260,
  previousStatement: ["non_amr_blocks", "amr_groups"],
  nextStatement: ["non_amr_blocks", "amr_groups"],
  tooltip: "",
  helpUrl: "",
};
Blockly.Blocks["release_key"] = {
  init: function () {
    this.jsonInit(releaseKey);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      return 'Add a number to variable "%1".'.replace(
        "%1",
        thisBlock.getFieldValue("VAR")
      );
    });
  },
};

// Blockly.Blocks['conditions'] = Blockly.Blocks['dynamic_list_create'];
export const toolbox = {
  // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
  kind: "flyoutToolbox",
  // The contents is the blocks and other items that exist in your toolbox.
  contents: [
    {
      kind: "block",
      type: "amr_model",
    },
    {
      kind: "block",
      type: "task_plan",
    },
    {
      kind: "block",
      type: "task_plan2",
    },
    {
      kind: "block",
      type: "navigate_block1",
    },
    {
      kind: "block",
      type: "lift_down",
    },
    {
      kind: "block",
      type: "release_key",
    },
    // {
    //   kind: "block",
    //   type: "conditions",
    // },
    {
      kind: "block",
      type: "logic_boolean",
    },
    // Include procedures from the imported file
    {
      kind: "block",
      type: "procedures_defnoreturn",
    },
    {
      kind: "block",
      type: "procedures_defreturn",
    },
    // {
    //   kind: "block",
    //   type: "controls_if",
    // },
    // {
    //   kind: "block",
    //   type: "controls_if_if",
    // },{
    //   kind: "block",
    //   type: "controls_if_elseif",
    // },{
    //   kind: "block",
    //   type: "controls_if_else",
    // },{
    //   kind: "block",
    //   type: "logic_compare",
    // },{
    //   kind: "block",
    //   type: "logic_operation",
    // },
    // {
    //   kind: "block",
    //   type: "logic_negate",
    // },{
    //   kind: "block",
    //   type: "logic_boolean",
    // },
    // {
    //   kind: "block",
    //   type: "logic_null",
    // },{
    //   kind: "block",
    //   type: "logic_ternary",
    // },

    // You can add more blocks to this array.
  ],
  
};

// toolbox.contents.push({
//   kind: 'block',
//   type: 'controls_switch',
// });