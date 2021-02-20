import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'primeBarnacle',
      globals :{
          sitka:'sitka'
      }
    },
    plugins: [
        typescript({
          typescript: require('typescript'),
        })
    ],
    external: [ 'sitka' ]
  };
