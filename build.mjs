import { build } from 'vite';
import { readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { execSync } from 'child_process';

const watch = process.argv.includes('--watch');
const pluginsDir = 'plugins';

const pluginNames = readdirSync(pluginsDir)
    .filter(name => existsSync(join(pluginsDir, name, 'src', 'index.ts')));

if (pluginNames.length === 0) {
    console.log('No plugins found.');
    process.exit(0);
}

// Type check before building
console.log('Type checking...');
execSync('npx tsc --noEmit', { stdio: 'inherit' });

for (const pluginName of pluginNames) {
    const entry = resolve(pluginsDir, pluginName, 'src', 'index.ts');
    const outDir = resolve(pluginsDir, pluginName, 'dist');

    await build({
        build: {
            lib: {
                entry,
                fileName: () => 'index.js',
                formats: ['es'],
            },
            outDir,
            emptyOutDir: true,
            minify: 'terser',
            watch: watch ? {} : undefined,
            rollupOptions: {
                // @voltex-viewer/plugin-api types are erased at compile time;
                // no runtime imports needed.
                external: [],
            },
        },
        logLevel: 'info',
    });

    console.log(`Built: ${pluginName} -> ${pluginName}/dist/index.js`);
}
