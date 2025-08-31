import chokidar from 'chokidar';
import fs from 'fs-extra';
import path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';

function copy(map: Record<string, string>): Plugin {
	function mapToCopy(cb?: () => void) {
		Object.entries(map).forEach(([to, from]) => {
			const fromPath = path.resolve(process.cwd(), from);

			if (fs.existsSync(fromPath)) {
				fs.copySync(fromPath, path.resolve(process.cwd(), to), { overwrite: true });
			} else {
				console.warn(`${fromPath} is not exist!`);
			}
		});

		cb?.();
	}

	return {
		name: 'simple-copy',
		buildStart() {
			mapToCopy();
		},
		configureServer({ ws, config: { root: viteRoot } }: ViteDevServer) {
			const output = path.join(viteRoot, 'index.html');

			const reload = () => {
				ws.send({ type: 'full-reload', path: output });
			};

			const initCopy = () => {
				mapToCopy(reload);
			};

			chokidar
				.watch(Object.values(map).map((from) => path.resolve(process.cwd(), from)), {
					cwd: viteRoot,
					ignoreInitial: true,
				})
				.on('add', initCopy)
				.on('change', initCopy);
		},
	};
}

export default copy;
