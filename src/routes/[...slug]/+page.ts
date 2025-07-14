import { findRouteInfo } from '$lib/helpers/navigation/index.js';
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
    const modules = import.meta.glob('/src/lib/cms/pages/*.{md,svx,svelte.md}')
    // services/web-design
    const fullPath = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
    // web-design
    const currentPagePath = fullPath.split('/').pop();
    const routeInfo = findRouteInfo(`/${currentPagePath}`)

    for (let [path, resolver] of Object.entries(modules)) {
        const filePath = path.replace('/src/lib/cms/pages/', '').replace(/\.(svelte\.md|md|svx)$/i, '')

        if (filePath === currentPagePath) {
            const module = await resolver()
            return {
                contentPath: path,
                frontmatter: module.metadata,
                Content: module.default,
                routeInfo
            }
        }
    }

    throw error(404, 'Page not found')
}