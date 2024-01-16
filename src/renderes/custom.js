import * as Blockly from 'blockly/core';
import * as svgPaths from './svg_path';

class CustomConstantProvider extends Blockly.blockRendering.ConstantProvider {
    constructor() {
      // Set up all of the constants from the base provider.
      super();
      // Override a few properties.
      /**
       * The width of the notch used for previous and next connections.
       * @type {number}
       * @override
       */
      this.NOTCH_WIDTH = 20;
      /**
       * The height of the notch used for previous and next connections.
       * @type {number}
       * @override
       */
      this.NOTCH_HEIGHT = 10;
  
      /**
       * Rounded corner radius.
       * @type {number}
       * @override
       */
      this.CORNER_RADIUS = 12;
     
      this.FIELD_BORDER_RECT_COLOUR = 'red';

    //   this.FIELD_BORDER_RECT_COLOUR = 'blue';

   /** The minimum width of the block. */
  //  this.MIN_BLOCK_WIDTH = 500;
  //  this.EMPTY_BLOCK_SPACER_HEIGHT = 16;
  //  this.DUMMY_INPUT_MIN_HEIGHT=5;
  //  this.DUMMY_INPUT_MIN_WIDTH=500;
  //  this.DUMMY_INPUT_SHADOW_MIN_HEIGHT =10;

  //  /** Height of the top hat. */
  //  this.START_HAT_HEIGHT = 15;

  //  /** Width of the top hat. */
  //  this.START_HAT_WIDTH = 100;

  this.FIELD_TEXT_BASELINE = -1; // Dynamically set.

  /** A field's border rect corner radius. */
  this.FIELD_BORDER_RECT_RADIUS = 12;
  /** A field's border rect default height. */
  // this.FIELD_BORDER_RECT_HEIGHT = 30;

  /** A field's border rect X padding. */
  this.FIELD_BORDER_RECT_X_PADDING = 5;

  /** A field's border rect Y padding. */
  this.FIELD_BORDER_RECT_Y_PADDING = 3;

   /** Whether or not a dropdown field uses a text or SVG arrow. */
   this.FIELD_DROPDOWN_SVG_ARROW = false;
    /** A dropdown field's SVG arrow size. */
  this.FIELD_DROPDOWN_SVG_ARROW_SIZE = 0;
  // this.radius
      /**
       * The height of the puzzle tab used for input and output connections.
       * @type {number}
       * @override
       */
      this.TAB_HEIGHT = 8;
    }
    init() {
      /**
       * An object containing sizing and path information about collapsed block
       * indicators.
       */
      this.JAGGED_TEETH = this.makeJaggedTeeth();
  
      /** An object containing sizing and path information about notches. */
      this.NOTCH = this.makeNotch();
  
      /** An object containing sizing and path information about start hats */
      this.START_HAT = this.makeStartHat();
  
      /**
       * An object containing sizing and path information about puzzle tabs.
       */
      this.PUZZLE_TAB = this.makePuzzleTab();
  
      /**
       * An object containing sizing and path information about inside corners
       */
      this.INSIDE_CORNERS = this.makeInsideCorners();
  
      /**
       * An object containing sizing and path information about outside corners.
       */
      this.OUTSIDE_CORNERS = this.makeOutsideCorners();
    };

     makeJaggedTeeth() {
      const height = this.JAGGED_TEETH_HEIGHT;
      const width = this.JAGGED_TEETH_WIDTH;
  
      const mainPath = svgPaths.line([
        svgPaths.point(width, height / 4),
        svgPaths.point(-width * 2, height / 2),
        svgPaths.point(width, height / 4),
      ]);
      return {height, width, path: mainPath};
    };

     makeStartHat() {
      const height = this.START_HAT_HEIGHT;
      const width = this.START_HAT_WIDTH;
  
      const mainPath = svgPaths.curve('c', [
        svgPaths.point(30, -height),
        svgPaths.point(70, -height),
        svgPaths.point(width, 0),
      ]);
      return {height, width, path: mainPath};
    };
  /**
   * @returns An object containing sizing and path information about puzzle
   *     tabs.
   */
   makePuzzleTab() {
    const width = this.TAB_WIDTH;
    const height = this.TAB_HEIGHT;

    /**
     * Make the main path for the puzzle tab made out of a few curves (c and s).
     * Those curves are defined with relative positions.  The 'up' and 'down'
     * versions of the paths are the same, but the Y sign flips.  Forward and
     * back are the signs to use to move the cursor in the direction that the
     * path is being drawn.
     *
     * @param up True if the path should be drawn from bottom to top, false
     *     otherwise.
     * @returns A path fragment describing a puzzle tab.
     */
    function makeMainPath(up) {
      const forward = up ? -1 : 1;
      const back = -forward;

      const overlap = 2.5;
      const halfHeight = height / 2;
      const control1Y = halfHeight + overlap;
      const control2Y = halfHeight + 0.5;
      const control3Y = overlap; // 2.5

      const endPoint1 = svgPaths.point(-width, forward * halfHeight);
      const endPoint2 = svgPaths.point(width, forward * halfHeight);

      return (
        svgPaths.curve('c', [
          svgPaths.point(0, forward * control1Y),
          svgPaths.point(-width, back * control2Y),
          endPoint1,
        ]) +
        svgPaths.curve('s', [
          svgPaths.point(width, back * control3Y),
          endPoint2,
        ])
      );
    }

    // c 0,-10  -8,8  -8,-7.5  s 8,2.5  8,-7.5
    const pathUp = makeMainPath(true);
    // c 0,10  -8,-8  -8,7.5  s 8,-2.5  8,7.5
    const pathDown = makeMainPath(false);

    return {
      type: this.SHAPES.PUZZLE,
      width,
      height,
      pathDown,
      pathUp,
    };
  }
   makeNotch() {
    const width = this.NOTCH_WIDTH;
    const height = this.NOTCH_HEIGHT;
    const innerWidth = 3;
    const outerWidth = (width - innerWidth) / 2;

    /**
     * Make the main path for the notch.
     *
     * @param dir Direction multiplier to apply to horizontal offsets along the
     *     path. Either 1 or -1.
     * @returns A path fragment describing a notch.
     */
    function makeMainPath(dir) {
      return svgPaths.line([
        svgPaths.point(dir * outerWidth, height),
        svgPaths.point(dir * innerWidth, 0),
        svgPaths.point(dir * outerWidth, -height),
      ]);
    }
    const pathLeft = makeMainPath(1);
    const pathRight = makeMainPath(-1);

    return {
      type: this.SHAPES.NOTCH,
      width,
      height,
      pathLeft,
      pathRight,
    };
  }
   makeInsideCorners() {
    const radius = this.CORNER_RADIUS;

    const innerTopLeftCorner = svgPaths.arc(
      'a',
      '0 0,0',
      radius,
      svgPaths.point(-radius, radius),
    );

    const innerBottomLeftCorner = svgPaths.arc(
      'a',
      '0 0,0',
      radius,
      svgPaths.point(radius, radius),
    );

    return {
      width: radius,
      height: radius,
      pathTop: innerTopLeftCorner,
      pathBottom: innerBottomLeftCorner,
    };
  }

  /**
   * @returns An object containing sizing and path information about outside
   *     corners.
   */
   makeOutsideCorners() {
    const radius = this.CORNER_RADIUS;
    /** SVG path for drawing the rounded top-left corner. */
    const topLeft =
      svgPaths.moveBy(0, radius) +
      svgPaths.arc('a', '0 0,1', radius, svgPaths.point(radius, -radius));

    /** SVG path for drawing the rounded top-right corner. */
    const topRight = svgPaths.arc(
      'a',
      '0 0,1',
      radius,
      svgPaths.point(radius, radius),
    );

    /** SVG path for drawing the rounded bottom-left corner. */
    const bottomLeft = svgPaths.arc(
      'a',
      '0 0,1',
      radius,
      svgPaths.point(-radius, -radius),
    );

    /** SVG path for drawing the rounded bottom-right corner. */
    const bottomRight = svgPaths.arc(
      'a',
      '0 0,1',
      radius,
      svgPaths.point(-radius, radius),
    );

    return {
      topLeft,
      topRight,
      bottomRight,
      bottomLeft,
      rightHeight: radius,
    };
  }

   injectCSS_(tagName, selector) {
    const cssArray = this.getCSS_(selector);
    const cssNodeId = 'blockly-renderer-style-' + tagName;
    this.cssNode = document.getElementById(cssNodeId);
    const text = cssArray.join('\n');
    if (this.cssNode) {
      // Already injected, update if the theme changed.
      this.cssNode.firstChild.textContent = text;
      return;
    }
    // Inject CSS tag at start of head.
    const cssNode = document.createElement('style');
    cssNode.id = cssNodeId;
    const cssTextNode = document.createTextNode(text);
    cssNode.appendChild(cssTextNode);
    document.head.insertBefore(cssNode, document.head.firstChild);
    this.cssNode = cssNode;
  }

  /**
   * Get any renderer specific CSS to inject when the renderer is initialized.
   *
   * @param selector CSS selector to use.
   * @returns Array of CSS strings.
   */
   getCSS_(selector){
    // prettier-ignore
    return [
      // Text.
      `${selector} .blocklyText, `,
      `${selector} .blocklyFlyoutLabelText {`,
        `font: ${this.FIELD_TEXT_FONTWEIGHT} ` +
            `${this.FIELD_TEXT_FONTSIZE}pt ${this.FIELD_TEXT_FONTFAMILY};`,
      `}`,

      // Fields.
      `${selector} .blocklyText {`,
        `fill: #fff;`,
      `}`,
      `${selector} .blocklyNonEditableText>rect,`,
      `${selector} .blocklyEditableText>rect {`,
        `fill: ${this.FIELD_BORDER_RECT_COLOUR};`,
        `fill-opacity: .6;`,
        `stroke: none;`,
      `}`,
      `${selector} .blocklyNonEditableText>text,`,
      `${selector} .blocklyEditableText>text {`,
        `fill: #000;`,
      `}`,

      // Flyout labels.
      `${selector} .blocklyFlyoutLabelText {`,
        `fill: #000;`,
      `}`,

      // Bubbles.
      `${selector} .blocklyText.blocklyBubbleText {`,
        `fill: #000;`,
      `}`,

      // Editable field hover.
      `${selector} .blocklyEditableText:not(.editing):hover>rect {`,
        `stroke: #fff;`,
        `stroke-width: 2;`,
      `}`,

      // Text field input.
      `${selector} .blocklyHtmlInput {`,
        `font-family: ${this.FIELD_TEXT_FONTFAMILY};`,
        `font-weight: ${this.FIELD_TEXT_FONTWEIGHT};`,
      `}`,

      // Selection highlight.
      `${selector} .blocklySelected>.blocklyPath {`,
        `stroke: #fc3;`,
        `stroke-width: 3px;`,
      `}`,

      // Connection highlight.
      `${selector} .blocklyHighlightedConnectionPath {`,
        `stroke: #fc3;`,
      `}`,

      // Replaceable highlight.
      `${selector} .blocklyReplaceable .blocklyPath {`,
        `fill-opacity: .5;`,
      `}`,
      `${selector} .blocklyReplaceable .blocklyPathLight,`,
      `${selector} .blocklyReplaceable .blocklyPathDark {`,
        `display: none;`,
      `}`,

      // Insertion marker.
      `${selector} .blocklyInsertionMarker>.blocklyPath {`,
        `fill-opacity: ${this.INSERTION_MARKER_OPACITY};`,
        `stroke: none;`,
      `}`,
    ];
  }


    
  }
class CustomRenderer extends Blockly.blockRendering.Renderer {
    constructor() {
      super();
      
    }
    /**
   * @override
   */
  makeConstants_() {
    return new CustomConstantProvider();
  }
  
  }
  

  Blockly.blockRendering.register('custom_renderer', CustomRenderer);