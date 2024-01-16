import Blockly from 'blockly/core';

// Define a custom field for the "case" input.
class CaseField extends Blockly.FieldTextInput {
  constructor(text, validator) {
    super(text, validator);
  }
}

// Define a mutator for the switch block.
const switchMutator = {
  /**
   * Create XML to represent the switch block's mutation.
   * @returns {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('cases', this.caseCount_);
    return container;
  },

  /**
   * Parse XML to restore the switch block's mutation.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const cases = parseInt(xmlElement.getAttribute('cases'), 10) || 0;
    this.updateShape_(cases);
  },

  /**
   * Adds arguments (cases) to the switch block.
   * @param {number} count Number of cases to add.
   * @this {Blockly.Block}
   * @private
   */
  updateShape_: function (count) {
    // Clear existing cases.
    for (let i = 0; i < this.caseCount_; i++) {
      this.removeInput('CASE' + i);
    }
    this.caseCount_ = 0;

    // Add new cases.
    for (let i = 0; i < count; i++) {
      const caseInput = this.appendValueInput('CASE' + i)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new CaseField('case', null));
      if (i === 0) {
        caseInput.appendField(new Blockly.FieldLabel('default:'));
      } else {
        caseInput.appendField('case');
      }
    }
    this.caseCount_ = count;
  },

  /**
   * Callback for the plus image. Adds a case to the block.
   */
  addCase: function () {
    this.updateShape_(this.caseCount_ + 1);
  },

  /**
   * Callback for the minus image. Removes the last case from the block.
   */
  removeCase: function () {
    if (this.caseCount_ > 0) {
      this.updateShape_(this.caseCount_ - 1);
    }
  },
};

// Create a custom block for the switch block.
Blockly.defineBlocksWithJsonArray([
  {
    type: 'controls_switch',
    message0: 'switch %1',
    args0: [
      {
        type: 'input_dummy',
        name: 'TOP',
      },
    ],
    inputsInline: false,
    style: 'logic_blocks',
    tooltip: 'Switch block with dynamic cases',
    helpUrl: '',
  },
]);

// Register the mutator for the switch block.
Blockly.Extensions.registerMutator('switch_mutator', switchMutator);

// Add the mutator to the controls_switch block.
Blockly.Extensions.register('switch_with_mutator', function() {
  this.mixin('switch_mutator');
});

// Define functions for dealing with variables and renaming variables for the switch block.
const switchVars = function () {
  // ... (similar structure to procedureVars)
};

// Register the variable-related functions for the switch block.
Blockly.Extensions.register('switch_vars', switchVars);

export default Blockly;
