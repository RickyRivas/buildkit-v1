import { error } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
    // fetch page from CMS Data
    const pageId = params.slug
    const pages = locals.cms.site_navigation
    const page = pages.find(page => page.slug === pageId)

    // if page doesnt exist or isnt published
    if (!page || !page.is_published) error(404, 'Page not found.')

    return { page }
}