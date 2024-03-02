import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import external from 'rollup-plugin-peer-deps-external'
import sass from 'rollup-plugin-sass'
import { dts } from 'rollup-plugin-dts'
import packageJson from './package.json'

export default [
  {
    input: './src/index.tsx',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        //   name: "cola-design.cjs",
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        //   name: "cola-design.esm",
      },
    ],
    Plugin: [
      external(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['src/**/*.test.tsx', 'src/**/*.stories.tsx', 'src/**/*.stories.mdx'],
      }),
      sass({ output: './dist/index.css' }),
      terser(),
    ],
  },
  // {
  //   input: 'dist/esm/index.d.ts',
  //   output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  //   external: [/\.css$/],
  //   plugins: [dts()],
  // },
]
