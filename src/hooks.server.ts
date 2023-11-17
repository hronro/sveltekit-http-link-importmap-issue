import type { Handle } from '@sveltejs/kit'

const importMap = {
	imports: {
        'lodash-get': 'https://unpkg.com/lodash-es@latest/get.js'
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('<head>', `<head><script type="importmap">${JSON.stringify(importMap)}</script>`),
	})

	return response
}
