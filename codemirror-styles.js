import '../../@polymer/polymer/polymer-element.js';
/**
Styles definitions for Code Mirror element.

Custom property | Description | Default
----------------|-------------|----------
`--arc-code-mirror-width` | Width of the editor area | `300px`
`--code-mirror-direction` | Direction property of the editor | `ltr`
`--arc-code-mirror-background-color` | Background color of the editor. | `white`
`--arc-code-mirror-line-padding` | Padding applied to editor area | `4px 0`
`--arc-code-mirror-pre-padding` | Padding of each line in the editor | `0 4px`
`--code-mirror-gutters-border-right-color` | Border right color of the gutters | `#ddd`
`--code-mirror-gutters-background-color` | Background of the gutters | `#f7f7f7`
`--code-mirror-line-number-color` | Color of the line number | `#999`
`--code-mirror-cursor-color` | Color of the cursor in the editor area | `black`
`--code-mirror-secondary-cursor-color` | Color of secondary cursor in the editor area | `silver`
`--code-mirror-header-color` | | `inherit`
`--code-mirror-quote-color` | | `#090`
`--code-mirror-negative-color` | | `#d44`
`--code-mirror-positive-color` | | `#292`
`--code-mirror-invalidchar-color` | | `#f00`
`--code-mirror-keyword-color` | | `#5A5CAD`
`--code-mirror-atom-color` | | `#6C8CD5`
`--code-mirror-def-color` | | `inherit`
`--code-mirror-number-color` | | `#164`
`--code-mirror-variable-color` | | `black`
`--code-mirror-variable2-color` | | `black`
`--code-mirror-variable3-color` | | `black`
`--code-mirror-property-color` | | `inherit`
`--code-mirror-operator-color` | | `inherit`
`--code-mirror-punctuation-color` | | `inherit`
`--code-mirror-comment-color` | | `#0080FF`
`--code-mirror-string-color` | | `#6C8CD5`
`--code-mirror-string-2-color` | | `#f50`
`--code-mirror-meta-color` | | `#9e9e9e`
`--code-mirror-qualifier-color` | | `grey`
`--code-mirror-builtin-color` | | `#7EA656`
`--code-mirror-bracket-color` | | `#cc7`
`--code-mirror-tag-color` | | `#3F7F7F`
`--code-mirror-attribute-color` | | `#7F007F`
`--code-mirror-error-color` | | `#f00`
`--code-mirror-active-line-background-color` | | `#e8f2ff`
`--code-mirror-active-match-bracked-color` | | `black`
`--code-mirror-active-match-bracked-background-color` | | `yellow`
`--code-mirror-matches-background-color` | | `rgba(255, 150, 0, .3)`
`--code-mirror-selected-background-color` | | `#d9d9d9`
`--code-mirror-focused-selected-background-color` | | `#d7d4f0`
`--code-mirror-selection-background-color` | | #d7d4f0

@customElement
@polymer
@demo demo/index.html
@memberof UiElements
*/

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="codemirror">
  <template>
    <style>
    .CodeMirror {
      /* Set height, width, borders, and global font properties here */
      font-family: monospace;
      height: var(--code-mirror-width, 300px);
      color: black;
      background: var(--code-mirror-background-color, white);
      direction: var(--code-mirror-direction, ltr);
    }

    .CodeMirror-lines {
      padding: var(--code-mirror-line-padding, 4px 0);
    }

    .CodeMirror pre.CodeMirror-line {
      color: var(--code-mirror-punctuation-color, inherit);
    }

    .CodeMirror pre {
      padding: var(--code-mirror-pre-padding, 0 4px);
    }

    .CodeMirror-scrollbar-filler,
    .CodeMirror-gutter-filler {
      background-color: var(--code-mirror-background-color, white);
    }
    /* GUTTER */
    .CodeMirror-gutters {
      border-right: 1px solid var(--code-mirror-gutters-border-right-color, #ddd);
      background-color: var(--code-mirror-gutters-background-color, #f7f7f7);
      white-space: nowrap;
    }

    .CodeMirror-linenumber {
      padding: 0 3px 0 5px;
      min-width: 20px;
      text-align: right;
      color: var(--code-mirror-line-number-color, #999);
      white-space: nowrap;
    }

    .CodeMirror-guttermarker {
      color: black;
    }

    .CodeMirror-guttermarker-subtle {
      color: #999;
    }
    /* CURSOR */
    .CodeMirror div.CodeMirror-cursor {
      border-left: 1px solid var(--code-mirror-cursor-color, black);
    }
    /* Shown when moving in bi-directional text */
    .CodeMirror div.CodeMirror-secondarycursor {
      border-left: 1px solid var(--code-mirror-secondary-cursor-color, silver);
    }

    .cm-fat-cursor .CodeMirror-cursor {
      width: auto;
      border: 0 !important;
      background: #7e7;
    }

    .cm-fat-cursor div.CodeMirror-cursors {
      z-index: 1;
    }

    .cm-fat-cursor-mark {
      background-color: rgba(20, 255, 20, 0.5);
      -webkit-animation: blink 1.06s steps(1) infinite;
      -moz-animation: blink 1.06s steps(1) infinite;
      animation: blink 1.06s steps(1) infinite;
    }

    .cm-animate-fat-cursor {
      width: auto;
      border: 0;
      -webkit-animation: blink 1.06s steps(1) infinite;
      -moz-animation: blink 1.06s steps(1) infinite;
      animation: blink 1.06s steps(1) infinite;
      background-color: #7e7;
    }

    @-moz-keyframes blink {
      0% {}
      50% { background-color: transparent; }
      100% {}
    }

    @-webkit-keyframes blink {
      0% {}
      50% { background-color: transparent; }
      100% {}
    }

    @keyframes blink {
      0% {}
      50% { background-color: transparent; }
      100% {}
    }

    .cm-tab {
      display: inline-block;
      text-decoration: inherit;
    }

    .CodeMirror-ruler {
      border-left: 1px solid #ccc;
      top: 0;
      bottom: 0;
      position: absolute;
    }

    /* DEFAULT THEME */
    .cm-header {
      font-weight: bold;
      color: var(--code-mirror-header-color, inherit);
    }

    .cm-quote {
      color: var(--code-mirror-quote-color, #090);
    }

    .cm-negative {
      color: var(--code-mirror-negative-color, #d44);
    }

    .cm-positive {
      color: var(--code-mirror-positive-color, #292);
    }

    .cm-em {
      font-style: italic;
    }

    .cm-link {
      text-decoration: underline;
    }

    .cm-strikethrough {
      text-decoration: line-through;
    }

    .cm-invalidchar {
      color: var(--code-mirror-invalidchar-color, #f00);
    }

    .cm-keyword {
      line-height: 1em;
      font-weight: bold;
      color: var(--code-mirror-keyword-color, #5A5CAD);
    }

    .cm-atom {
      color: var(--code-mirror-atom-color, #6C8CD5);
    }

    .cm-number {
      color: var(--code-mirror-number-color, #164);
    }

    .cm-def {
      text-decoration: underline;
      color: var(--code-mirror-def-color, inherit);
    }

    .cm-variable {
      color: var(--code-mirror-variable-color, black);
    }

    .cm-variable-2 {
      color: var(--code-mirror-variable2-color, black);
    }

    .cm-variable-3 {
      color: var(--code-mirror-variable3-color, black);
    }

    .cm-punctuation {
      color: var(--code-mirror-punctuation-color, inherit);
    }

    .cm-property {
      color: var(--code-mirror-property-color, inherit);
    }

    .cm-operator {
      color: var(--code-mirror-operator-color, inherit);
    }

    .cm-comment {
      color: var(--code-mirror-comment-color, #0080FF);
      font-style: italic;
    }

    .cm-string {
      color: var(--code-mirror-string-color, #6C8CD5);
    }

    .cm-string-2 {
      color: var(--code-mirror-string-color, #f50);
    }

    .cm-meta {
      color: var(--code-mirror-meta-color, #9e9e9e);
    }

    .cm-qualifier {
      color: var(--code-mirror-qualifier-color, grey);
    }

    .cm-builtin {
      color: var(--code-mirror-builtin-color, #7EA656);
    }

    .cm-bracket {
      color: var(--code-mirror-bracket-color, #cc7);
    }

    .cm-tag {
      color: var(--code-mirror-tag-color, #3F7F7F);
    }

    .cm-attribute {
      color: var(--code-mirror-attribute-color, #7F007F);
    }

    .cm-error {
      color: var(--code-mirror-error-color, #f00);
    }

    .CodeMirror-composing {
      border-bottom: 2px solid;
    }

    /* Default styles for common addons */
    .CodeMirror-activeline-background {
      background: var(--code-mirror-active-line-background-color, #e8f2ff);
    }

    div.CodeMirror span.CodeMirror-matchingbracket {
      outline: 1px solid grey;
      color: var(--code-mirror-active-match-bracked-color, black);
      background: var(--code-mirror-active-match-bracked-background-color, yellow);
    }

    div.CodeMirror span.CodeMirror-nonmatchingbracket {
      color: #f22;
    }

    .CodeMirror-matchingtag {
      background: var(--code-mirror-matches-background-color, rgba(255, 150, 0, .3));
    }

    /* Linter */
    .CodeMirror-lint-mark-error,
    .CodeMirror-lint-mark-warning {
      background-position: left bottom;
      background-repeat: repeat-x;
    }

    .CodeMirror-lint-mark-error {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==");
    }

    .CodeMirror-lint-mark-warning {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJFhQXEbhTg7YAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAMklEQVQI12NkgIIvJ3QXMjAwdDN+OaEbysDA4MPAwNDNwMCwiOHLCd1zX07o6kBVGQEAKBANtobskNMAAAAASUVORK5CYII=");
    }

    /* STOP */
    /* The rest of this file contains styles related to the mechanics of the editor. You probably shouldn't touch them. */

    .CodeMirror {
      position: relative;
      overflow: hidden;
    }

    .CodeMirror-scroll {
      overflow: scroll !important;
      /* Things will break if this is overridden */
      /* 30px is the magic margin used to hide the element's real scrollbars */
      /* See overflow: hidden in .CodeMirror */
      margin-bottom: -30px;
      margin-right: -30px;
      padding-bottom: 30px;
      height: 100%;
      outline: none;
      /* Prevent dragging from highlighting the element */
      position: relative;
    }

    .CodeMirror-sizer {
      position: relative;
      border-right: 30px solid transparent;
    }
    /* The fake, visible scrollbars. Used to force redraw during scrolling
   before actuall scrolling happens, thus preventing shaking and
   flickering artifacts. */

    .CodeMirror-vscrollbar,
    .CodeMirror-hscrollbar,
    .CodeMirror-scrollbar-filler,
    .CodeMirror-gutter-filler {
      position: absolute;
      z-index: 6;
      display: none;
    }

    .CodeMirror-vscrollbar {
      right: 0;
      top: 0;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    .CodeMirror-hscrollbar {
      bottom: 0;
      left: 0;
      overflow-y: hidden;
      overflow-x: scroll;
    }

    .CodeMirror-scrollbar-filler {
      right: 0;
      bottom: 0;
    }

    .CodeMirror-gutter-filler {
      left: 0;
      bottom: 0;
    }

    .CodeMirror-gutters {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3;
    }

    .CodeMirror-gutter {
      white-space: normal;
      height: 100%;
      display: inline-block;
      margin-bottom: -30px;
      /* Hack to make IE7 behave */
      *zoom: 1;
      *display: inline;
    }

    .CodeMirror-gutter-wrapper {
      position: absolute;
      z-index: 4;
      height: 100%;
    }

    .CodeMirror-gutter-elt {
      position: absolute;
      cursor: default;
      z-index: 4;
    }

    .CodeMirror-gutter-wrapper {
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    .CodeMirror-lines {
      cursor: text;
      min-height: 1px;
    }

    .CodeMirror pre {
      -moz-border-radius: 0;
      -webkit-border-radius: 0;
      border-radius: 0;
      border-width: 0;
      background: transparent;
      font-family: inherit;
      font-size: inherit;
      margin: 0;
      white-space: pre;
      word-wrap: normal;
      line-height: inherit;
      color: inherit;
      z-index: 2;
      position: relative;
      overflow: visible;
      -webkit-tap-highlight-color: transparent;
    }

    .CodeMirror-wrap pre {
      word-wrap: break-word;
      white-space: pre-wrap;
      word-break: normal;
    }

    .CodeMirror-linebackground {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;
    }

    .CodeMirror-linewidget {
      position: relative;
      z-index: 2;
      overflow: auto;
    }

    .CodeMirror-widget {}

    .CodeMirror-code {
      outline: none;
    }
    /* Force content-box sizing for the elements where we expect it */

    .CodeMirror-scroll,
    .CodeMirror-sizer,
    .CodeMirror-gutter,
    .CodeMirror-gutters,
    .CodeMirror-linenumber {
      -moz-box-sizing: content-box;
      box-sizing: content-box;
    }

    .CodeMirror-measure {
      position: absolute;
      width: 100%;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }

    .CodeMirror-measure pre {
      position: static;
    }

    .CodeMirror div.CodeMirror-cursor {
      position: absolute;
      border-right: none;
      width: 0;
    }

    div.CodeMirror-cursors {
      visibility: hidden;
      position: relative;
      z-index: 3;
    }

    .CodeMirror-focused div.CodeMirror-cursors {
      visibility: visible;
    }

    .CodeMirror-selected {
      background: var(--code-mirror-selected-background-color, #d9d9d9);
    }

    .CodeMirror-focused .CodeMirror-selected {
      background: var(--code-mirror-focused-selected-background-color, #d7d4f0);
    }

    .CodeMirror-crosshair {
      cursor: crosshair;
    }

    .CodeMirror ::selection {
      background: var(--code-mirror-selection-background-color, #d7d4f0);
    }

    .CodeMirror ::-moz-selection {
      background: var(--code-mirror-selection-background-color, #d7d4f0);
    }

    .cm-searching {
      background: #ffa;
      background: rgba(255, 255, 0, .4);
    }
    /* IE7 hack to prevent it from returning funny offsetTops on the spans */

    .CodeMirror span {
      *vertical-align: text-bottom;
    }
    /* Used to force a border model for a node */

    .cm-force-border {
      padding-right: .1px;
    }

    @media print {
      /* Hide the cursor when printing */
      .CodeMirror div.CodeMirror-cursors {
        visibility: hidden;
      }
    }
    /* See issue #2901 */

    .cm-tab-wrap-hack:after {
      content: '';
    }

    /* Help users use markselection to safely style text background */
    span.CodeMirror-selectedtext {
      background: none;
    }
    /* Hints added to the element */
    .hints ::slotted(.CodeMirror-hints) {
      position: absolute;
      z-index: 10;
      background: white;
      overflow: hidden;
      overflow-y: auto;
      max-height: 20em;
      margin-left: 20px;
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
