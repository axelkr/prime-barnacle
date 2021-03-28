import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'primeBarnacle',
    globals: {
      rxjs: 'rxjs',
      'choicest-barnacle': 'choicest-barnacle'
    }
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    commonjs({ sourceMap: false }),
    terser()
  ],
  external: ['rxjs', 'choicest-barnacle']
};
