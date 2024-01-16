/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Defines a version of the list_create block with dyanmic
 *     inputs that appear when a block is dragged over inputs on the block.
 */

import * as Blockly from 'blockly/core';


/* eslint-disable @typescript-eslint/naming-convention */
const DYNAMIC_LIST_CREATE_MIXIN = {
  /* eslint-enable @typescript-eslint/naming-convention */
  /** Minimum number of inputs for this block. */
  minInputs: 2,

  /** Count of item inputs. */
  itemCount: 0,

  /** Block for concatenating any number of strings. */
  init: function () {
    this.itemCount = this.minInputs;

    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    this.setStyle('list_blocks');
    this.addFirstInput();
    for (let i = 1; i < this.minInputs; i++) {
      this.appendValueInput(`ADD${i}`);
    }
    this.setOutput(true, 'Array');
    this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_TOOLTIP']);
  },

  /**
   * Create XML to represent number of text inputs.
   *
   * @returns XML storage element.
   */

  // ...
  mutationToDom: function () {
    // If we call finalizeConnections here without disabling events, we get into
    // an event loop.
    Blockly.Events.disable();
    this.finalizeConnections();
    if (this instanceof Blockly.BlockSvg) this.initSvg();
    Blockly.Events.enable();

    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', `${this.itemCount}`);
    return container;
  },

  domToMutation: function (xmlElement) {
    if (xmlElement.getAttribute('inputs')) {
      this.deserializeInputs(xmlElement);
    } else {
      this.deserializeCounts(xmlElement);
    }
  },

  deserializeInputs: function (xmlElement) {
    const items = xmlElement.getAttribute('inputs');
    if (items) {
      const inputNames = items.split(',');
      this.inputList = [];
      inputNames.forEach((name) => this.appendValueInput(name));
      this.inputList[0].appendField(
        Blockly.Msg['LISTS_CREATE_WITH_INPUT_WITH'],
      );
    }
  },

  deserializeCounts: function (xmlElement) {
    this.itemCount = Math.max(
      parseInt(xmlElement.getAttribute('items') ?? '0', 10),
      this.minInputs,
    );
    // minInputs are added automatically.
    for (let i = this.minInputs; i < this.itemCount; i++) {
      this.appendValueInput('ADD' + i);
    }
  },
// ...



  /**
   * Returns the state of this block as a JSON serializable object.
   *
   * @returns The state of this block, ie the item count.
   */
  saveExtraState: function ( ) {
    // If we call finalizeConnections here without disabling events, we get into
    // an event loop.
    Blockly.Events.disable();
    this.finalizeConnections();
    if (this instanceof Blockly.BlockSvg) this.initSvg();
    Blockly.Events.enable();

    return {
      itemCount: this.itemCount,
    };
  },

  /**
   * Applies the given state to this block.
   *
   * @param state The state to apply to this block, ie the item count.
   */
  loadExtraState: function (
    state,
  ) {
    if (typeof state === 'string') {
      this.domToMutation(Blockly.utils.xml.textToDom(state));
      return;
    }

    this.itemCount = state['itemCount'] ?? 0;
    // minInputs are added automatically.
    for (let i = this.minInputs; i < this.itemCount; i++) {
      this.appendValueInput('ADD' + i);
    }
  },

  /**
   * Check whether a new input should be added and determine where it should go.
   *
   * @param connection The connection that has a pending connection.
   * @returns The index before which to insert a new input, or null if no input
   *     should be added.
   */
  findInputIndexForConnection(
    connection,
  ){
    if (!connection.targetConnection) {
      // this connection is available
      return null;
    }

    let connectionIndex = -1;
    for (let i = 0; i < this.inputList.length; i++) {
      if (this.inputList[i].connection == connection) {
        connectionIndex = i;
      }
    }

    if (connectionIndex == this.inputList.length - 1) {
      // this connection is the last one and already has a block in it, so
      // we should add a new connection at the end.
      return this.inputList.length + 1;
    }

    const nextInput = this.inputList[connectionIndex + 1];
    const nextConnection = nextInput?.connection?.targetConnection;
    if (
      nextConnection &&
      !nextConnection.getSourceBlock().isInsertionMarker()
    ) {
      return connectionIndex + 1;
    }

    // Don't add new connection
    return null;
  },

  /**
   * Called by a monkey-patched version of InsertionMarkerManager when
   * a block is dragged over one of the connections on this block.
   *
   * @param connection The connection on this block that has a pending
   *     connection.
   */
  onPendingConnection(
    connection,
  ) {
    const insertIndex = this.findInputIndexForConnection(connection);
    if (insertIndex == null) {
      return;
    }
    this.appendValueInput(`ADD${Blockly.utils.idGenerator.genUid()}`);
    this.moveNumberedInputBefore(this.inputList.length - 1, insertIndex);
  },

  /**
   * Called by a monkey-patched version of InsertionMarkerManager when a block
   * drag ends if the dragged block had a pending connection with this block.
   */
  finalizeConnections() {
    const targetConns = this.removeUnnecessaryEmptyConns(
      this.inputList.map((i) => i.connection?.targetConnection),
    );
    this.tearDownBlock();
    this.addItemInputs(targetConns);
    this.itemCount = targetConns.length;
  },

  /** Deletes all inputs on the block so it can be rebuilt. */
  tearDownBlock(){
    for (let i = this.inputList.length - 1; i >= 0; i--) {
      this.removeInput(this.inputList[i].name);
    }
  },

  /**
   * Filters the given target connections so that empty connections are removed,
   * unless we need those to reach the minimum input count. Empty connections
   * are removed starting at the end of the array.
   *
   * @param targetConns The list of connections associated with inputs.
   * @returns A filtered list of connections (or null/undefined) which should
   *     be attached to inputs.
   */
  removeUnnecessaryEmptyConns(
    targetConns ,
  ) {
    const filteredConns = [...targetConns];
    for (let i = filteredConns.length - 1; i >= 0; i--) {
      if (!filteredConns[i] && filteredConns.length > this.minInputs) {
        filteredConns.splice(i, 1);
      }
    }
    return filteredConns;
  },

  /**
   * Adds inputs based on the given array of target cons. An input is added for
   * every entry in the array (if it does not already exist). If the entry is
   * a connection and not null/undefined the connection will be connected to
   * the input.
   *
   * @param targetConns The connections defining the inputs to add.
   */
  addItemInputs(
 
    targetConns,
  ) {
    const input = this.addFirstInput();
    const firstConn = targetConns[0];
    if (firstConn) input.connection?.connect(firstConn);

    for (let i = 1; i < targetConns.length; i++) {
      const input = this.appendValueInput(`ADD${i}`);

      const targetConn = targetConns[i];
      if (targetConn) input.connection?.connect(targetConn);
    }
  },

  /**
   * Adds the top input with the label to this block.
   *
   * @returns The added input.
   */
  addFirstInput( ) {
    return this.appendValueInput('ADD0').appendField(
      Blockly.Msg['LISTS_CREATE_WITH_INPUT_WITH'],
    );
  },
};

Blockly.Blocks['dynamic_list_create'] = DYNAMIC_LIST_CREATE_MIXIN;