// generators/javascript.js


export const forBlock = Object.create(null);

forBlock['amr_model'] = function (block, generator) {
  const dropdownValue = block.getFieldValue('amr model dropdown') || 'OPTIONNAME';

  const jsonData = {
    type: 'amr_model',
    dropdownValue: dropdownValue,
    statements: generator.statementToCode(block, 'NAME'),
  };

  return JSON.stringify(jsonData);
};

forBlock['task_plan'] = function (block, generator) {
  const dropdownTask = block.getFieldValue('Task Plan') || 'OPTIONNAME';
  const dropdownWait = block.getFieldValue('wait') || 'none';

  const jsonData = {
    type: 'task_plan',
    dropdownTask: dropdownTask,
    dropdownWait: dropdownWait,
    statements: generator.statementToCode(block, 'NAME'),
  };

  return JSON.stringify(jsonData);
};

forBlock['task_plan2'] = function (block, generator) {
  const dropdownTask = block.getFieldValue('Task Plan') || 'OPTIONNAME';
  const dropdownTime = block.getFieldValue('time') || 'none';
  const dropdownUse = block.getFieldValue('use') || 'none';

  const jsonData = {
    type: 'task_plan2',
    dropdownTask: dropdownTask,
    dropdownTime: dropdownTime,
    dropdownUse: dropdownUse,
    statements: generator.statementToCode(block, 'NAME'),
  };

  return JSON.stringify(jsonData);
};

forBlock['lift_down'] = function (block, generator) {
  const destination = block.getFieldValue('destination') || '';
  const time = block.getFieldValue('time') || '';
  const navigate = block.getFieldValue('navigate') || '';

  const jsonData = {
    type: 'lift_down',
    destination: destination,
    time: time,
    navigate: navigate,
    statements: generator.statementToCode(block, 'NAME'),
  };

  return JSON.stringify(jsonData);
};

forBlock['navigate_block1'] = function (block, generator) {
  const destination = block.getFieldValue('destination') || '';
  const time = block.getFieldValue('time') || '';

  const jsonData = {
    type: 'navigate_block1',
    destination: destination,
    time: time,
    statements: generator.statementToCode(block, 'NAME'),
  };

  return JSON.stringify(jsonData);
};

forBlock['release_key'] = function (block, generator) {
  const dropdownKey = block.getFieldValue('key') || 'true';

  const jsonData = {
    type: 'release_key',
    dropdownKey: dropdownKey,
    statements: generator.statementToCode(block, 'NAME'),
  };

  return JSON.stringify(jsonData);
};

// forBlock['conditions'] = function (block, generator) {
//   // Handle the statements inside the "statements" block.
//   console.log(block);
//   const statementsCode = generator.statementToCode(block, 'STACK');
//   console.log(statementsCode);

//   // Generate code for the "statements" block.
//   // const code = `
//   //   // Your custom code for handling statements block
//   //   ${statementsCode}
//   //   // Additional code if needed
//   // `;
//  const code =statementsCode;
//   return code;
// };

function extractDropdownValuesByArgId(block) {
  const dropdownValues = [];
  const argData = block.argData_ || [];
  // console.log('bb',block.argData_);

  for (const argDatum of argData) {
    const argId = argDatum.argId;
    // console.log('argId',argId);
    const name = block.getFieldValue(argId);
    // console.log('name',name);
    const dropdownValue = block.getFieldValue(`DROPDOWNVALUE_${argId}`);
    // console.log('xsss',dropdownValue)
    dropdownValues.push({ argId: argId, name: name, value: dropdownValue });

  }
  // console.log('qq',dropdownValues)

  return dropdownValues;
}

forBlock['procedures_defnoreturn'] = function (block, generator) {
  // Handle the statements inside the "STACK" block.
  const statementsCode = generator.statementToCode(block, 'STACK');

  // console.log('state',statementsCode)
  // const statementParse = JSON.parse(statementsCode);
  // console.log('stateparse',statementParse)

  // Extract information from the block
  const procedureName = block.getFieldValue('NAME');

  // Extract additional information based on the modified getDefNoReturn mixin
  const dropdownValues = extractDropdownValuesByArgId(block);

  // Generate JSON data
  const jsonData = {
    type: 'conditions',
    Name: procedureName,
    dropdownValues: dropdownValues,
    statements: statementsCode,
  };

  // Remove the "var" declarations from the statementsCode
  // console.log('11',jsonData);

  return JSON.stringify(jsonData, null, 2); // Add indentation for better readability
};

