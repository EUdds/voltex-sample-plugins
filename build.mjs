import { build, context } from 'esbuild';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

const watch = process.argv.includes('--watch');

const pluginsDir = 'plugins';
const entryPoints = readdirSync(pluginsDir)
    .map(name => join(pluginsDir, name, 'src', 'index.ts'))
    .filter(p => existsSync(p));

const options = {
    entryPoints,
    bundle: true,
    format: 'esm',
    // Output each plugin's index.js next to its src/ folder
    outbase: pluginsDir,
    outdir: pluginsDir,
    // Strip the src/ segment: plugins/notepad/src/index.ts -> plugins/notepad/index.js
    entryNames: '[dir]/../index',
    external: [],
    minify: false,
    sourcemap: false,
};

if (watch) {
    const ctx = await context(options);
    await ctx.watch();
    console.log('Watching for changes...');
} else {
    await build(options);
    console.log('Built:', entryPoints.join(', '));
}
