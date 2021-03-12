/** @typedef {import('@web/test-runner').TestRunnerConfig} TestRunnerConfig */

export default /** @type TestRunnerConfig */ ({
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
  testRunnerHtml: testFramework =>
  `<html>
    <body>
      <script src="node_modules/jsonlint/lib/jsonlint.js"></script>
      <script src="node_modules/codemirror/lib/codemirror.js"></script>
      <script src="node_modules/codemirror/addon/mode/loadmode.js"></script>
      <script src="node_modules/codemirror/mode/meta.js"></script>
      <script src="node_modules/codemirror/mode/javascript/javascript.js"></script>
      <script src="node_modules/codemirror/mode/xml/xml.js"></script>
      <script src="node_modules/codemirror/mode/htmlmixed/htmlmixed.js"></script>
      <script src="node_modules/codemirror/mode/markdown/markdown.js"></script>
      <script type="module" src="${testFramework}"></script>
    </body>
  </html>`,
})
