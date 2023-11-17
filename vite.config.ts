import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		{
			name: 'lodash-get-from-cdn',
			enforce: 'pre',
			config(config) {
				config.optimizeDeps = {
					...(config.optimizeDeps ?? {}),
					exclude: [...(config.optimizeDeps?.exclude ?? []), 'lodash-get'],
				}
			},
			configResolved(resolvedConfig) {
				const VALID_ID_PREFIX = `/@id/`
				const reg = new RegExp(`${VALID_ID_PREFIX}(${Array.from(['lodash-get']).join('|')})`, 'g')
				// @ts-ignore
				resolvedConfig.plugins.push({
					name: 'vite-plugin-ignore-static-import-replace-idprefix',
					transform: (code: string) => (reg.test(code) ? code.replace(reg, (m, s1) => s1) : code),
				})
			},
			resolveId(id) {
				if (id === 'lodash-get') {
					return { id, external: true }
				}
			},
		},
		sveltekit()
	]
});
