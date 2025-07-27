import { routes } from "$lib/site";

export type RouteGroup = 'auth' | 'public' | 'protected';

export interface MetaTags {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    siteName: string;
    index: boolean;
    twitter: boolean;
    openGraph: boolean;
    schemaOrg: boolean;
    imageURL: string;
    logo: string;
    author: string;
    name: string;
}

export type RouteInfo = {
    path: string;
    name: string;
    iconPath: string;
    showInNav?: boolean;
    children?: RouteInfo[];
    metatags?: MetaTags;
}

export interface navProps {
    navType: 'protected' | 'public';
    routes: RouteInfo[];
}

// helper functions
function flattenRoutes(routeList: RouteInfo[]): RouteInfo[] {
    return routeList.reduce((acc, route) => {
        acc.push(route);
        if (route.children && route.children.length > 0) {
            acc.push(...flattenRoutes(route.children));
        }
        return acc;
    }, [] as RouteInfo[]);
}

/**
 * Find route information for a specific path, searching through all nested routes
 */
export function findRouteInfo(path: string): { group: RouteGroup; route: RouteInfo; parent?: RouteInfo, metatags?: MetaTags } | undefined {
    for (const [group, routeList] of Object.entries(routes) as [RouteGroup, RouteInfo[]][]) {
        // Check direct routes first
        const exactRoute = routeList.find(r => r.path === path);
        if (exactRoute) {
            return { group: group as RouteGroup, route: exactRoute, metatags: exactRoute.metatags };
        }

        // Check for sub-routes in children
        for (const parentRoute of routeList) {
            if (parentRoute.children) {
                const childRoute = parentRoute.children.find(child => child.path === path);
                if (childRoute) {
                    return {
                        group: group as RouteGroup,
                        route: childRoute,
                        parent: parentRoute,
                        metatags: childRoute.metatags
                    };
                }
            }
        }

        // Check for nested routes not in the children array
        const parentRoute = routeList.find(r => path.startsWith(`${r.path}/`));
        if (parentRoute) {
            return { group: group as RouteGroup, route: parentRoute };
        }
    }

    return undefined;
}

/**
 * Determines which route group a given path belongs to
 */
export function getRouteGroup(path: string): RouteGroup | undefined {
    const routeInfo = findRouteInfo(path);
    return routeInfo?.group;
}

/**
 * Get all navigable routes for a specific group, including children
 */
export function getNavRoutes(group: RouteGroup): RouteInfo[] {
    return routes[group].filter(route => route.showInNav);
}

/**
 * Get all routes for a specific group as a flat array
 */
export function getAllRoutes(group: RouteGroup): RouteInfo[] {
    return flattenRoutes(routes[group]);
}

/**
 * Gets breadcrumb trail for a path
 */
export function getBreadcrumbs(path: string): RouteInfo[] {
    const routeInfo = findRouteInfo(path);
    if (!routeInfo) return [];

    const breadcrumbs: RouteInfo[] = [];

    // Add parent if it exists
    if (routeInfo.parent) {
        breadcrumbs.push(routeInfo.parent);
    }

    // Add current route
    breadcrumbs.push(routeInfo.route);

    return breadcrumbs;
}

