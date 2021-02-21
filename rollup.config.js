import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'primeBarnacle',
      globals :{
          rxjs:'rxjs'
      }
    },
    plugins: [
        typescript({
          typescript: require('typescript'),
        })
    ],
    external: [ 'rxjs' ]
  };
