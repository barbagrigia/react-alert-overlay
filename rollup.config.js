/* eslint-disable */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

const prod = process.env.PRODUCTION;
const env = prod ? 'production' : 'development';

console.log(`Creating ${env} bundle...`);

const targets = prod ?
[
    { dest: `dist/react-alert-overlay.min.js`, format: 'umd' },
] :
[
    { dest: `dist/react-alert-overlay.js`, format: 'umd' },
    { dest: `dist/react-alert-overlay.es.js`, format: 'es' },
];

const plugins = [
  babel({
    exclude: 'node_modules/**',
    babelrc: false,
    presets: [
      'es2015-rollup',
      'react',
      'stage-2'
    ],
    plugins: [
      'external-helpers',
    ],
  }),
  commonjs(),
  nodeResolve(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development'),
  }),
];

if (prod) plugins.push(uglify());

export default {
  entry: 'src/index.js',
  exports: 'named',
  external: ['react'],
  globals: { react: 'React' },
  moduleName: 'react_alert_overlay',
  plugins,
  targets,
};
