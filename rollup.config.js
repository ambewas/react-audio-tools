const babel = require("rollup-plugin-babel");
const uglify = require("rollup-plugin-uglify-es");
const minify = require("uglify-es").minify;

import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/lib/index.js",
  external: [
    // add external packages here
    // e.g. 'rxjs/Observable'
    "ramda",
    "react",
    "reactDOM",
    "prop-types",
    "webmidi",
    "tone",
    "lensify",
  ],
  output: {
    file: "build/index.js",
    name: "react-audio-tools",
    format: "umd",
    sourcemap: false,
    exports: "named",
    globals: {
      // add external packages as globals here
      // e.g. 'rxjs/Observable': 'rxjs_Observable'
      "ramda": "ramda",
      "react": "react",
      "reactDOM": "reactDOM",
      "prop-types": "PropTypes",
      "webmidi": "webmidi",
      "tone": "Tone",
      "lensify": "lensify",
    },
  },
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      presets: ["react-app"],
      plugins: ["transform-object-rest-spread", "external-helpers"],
      exclude: "node_modules/**",
    }),
    uglify({}, minify),
  ],
};
