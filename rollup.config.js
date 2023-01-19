import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from '@rollup/plugin-postcss'
import cjs from '@rollup/plugin-commonjs';
import styles from "@rollup/plugin-styles";
import autoprefixer from 'autoprefixer'
import cssurl from 'postcss-url'
import env from 'postcss-preset-env'
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import bundleWorker from '@rollup/plugin-bundle-worker'
const aliases = require('./aliases')

export default {
    input: './src/main.ts',
    output: {
        dir: '.',
        sourcemap: 'inline',
        format: 'cjs',
        exports: 'default'
    },
    external: ['obsidian'],
    plugins: [
        typescript(),
        styles(),
        postcss({
            modules: true,
            extract: true,
            namedExports: true,
            plugins: [
                cssurl({
                    url: 'inline',
                }),
                env(),
                autoprefixer(),
            ],
        }),
        alias(aliases),
        bundleWorker(),
        babel({
            exclude: 'node_modules/**',
        }),
        nodeResolve({ browser: true }),
        cjs()
    ]
};