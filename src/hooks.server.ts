// hooks.server.ts
import { dev } from '$app/environment';
import { PRIVATE_SITE_SLUG, PRIVATE_CMS_API_BASE } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
const DEV_CMS_API_BASE = "http://localhost:5173/api/public";

export const handle: Handle = async ({ event, resolve }) => {
    // Only fetch CMS data for non-API routes
    if (!event.url.pathname.startsWith('/api/')) {
        try {
            // Fetch site data and make it available to all routes
            const siteResponse = await fetch(`${dev ? DEV_CMS_API_BASE : PRIVATE_CMS_API_BASE}/sites/${PRIVATE_SITE_SLUG}`)

            if (siteResponse.ok) {
                const { site, site_navigation } = await siteResponse.json();

                // Make data available to all routes via locals
                event.locals.cms = {
                    site,
                    site_navigation,
                };
            }
        } catch (error) {
            console.error('Failed to fetch CMS data:', error);
            // Site can still work without CMS data in emergency
            event.locals.cms = null;
        }
    }

    return resolve(event);
};