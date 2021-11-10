import ts from 'rollup-plugin-typescript2';
import path from 'path';
import rimraf from 'rimraf';

rimraf.sync('./lib');

export default {
    input: 'src/index.ts',
    output: {
        file: 'lib/index.esm.js',
        format: 'esm'
    },
    plugins: [
        ts({
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        })
    ]
}