import type { RouteGroup, RouteInfo } from "$lib/navigation-helpers";

// routes for entire app.
export const routes: Record<RouteGroup, RouteInfo[]> = {
    auth: [],

    // Public routes
    public: [
        {
            path: '/',
            name: 'Home',
            iconPath: '',
            showInNav: true,
            metatags: {
                title: 'Welcome to My Starter Template | Modern Web Development',
                description: 'A powerful, responsive starter template for building modern web applications with the latest technologies and best practices.',
                keywords: 'web development, starter template, frontend, react, typescript, responsive design',
                canonical: 'https://mystarter.example.com/',
                siteName: 'My Starter Template',
                index: true,
                twitter: true,
                openGraph: true,
                schemaOrg: true,
                imageURL: 'https://mystarter.example.com/assets/images/home-banner.jpg',
                logo: 'https://mystarter.example.com/assets/images/logo.svg',
                author: 'Your Name or Company',
                name: 'Home Page'
            }
        },
        {
            path: '/services',
            name: 'Services',
            iconPath: '',
            showInNav: true,
            children: [
                {
                    path: '/',
                    name: 'Web Design',
                    iconPath: '',
                    showInNav: true,
                    children: [
                        {
                            path: '/web-design',
                            name: 'Web Design tert 1',
                            iconPath: '',
                            showInNav: true,
                            metatags: {
                                title: 'Web Development Services | Custom Solutions for Modern Businesses',
                                description: 'Professional web development services offering custom solutions, responsive design, and cutting-edge technologies to help your business thrive online.',
                                keywords: 'web development, frontend development, backend development, responsive design, JavaScript, TypeScript, React, Node.js, custom web solutions',
                                canonical: 'https://mystarter.example.com/web-development',
                                siteName: 'My Starter Template',
                                index: true,
                                twitter: true,
                                openGraph: true,
                                schemaOrg: true,
                                imageURL: 'https://mystarter.example.com/assets/images/web-dev-banner.jpg',
                                logo: 'https://mystarter.example.com/assets/images/logo.svg',
                                author: 'Your Name or Company',
                                name: 'Web Development'
                            }
                        },
                        {
                            path: '/',
                            name: 'Web Design tert 2',
                            iconPath: '',
                            showInNav: true
                        },
                    ]
                },
                {
                    path: '/web-dev',
                    name: 'Web Development',
                    iconPath: '',
                    showInNav: true,
                    children: [
                        {
                            path: '/',
                            name: 'Web dev tert 1',
                            iconPath: '',
                            showInNav: true
                        },
                        {
                            path: '/',
                            name: 'Web dev tert 1',
                            iconPath: '',
                            showInNav: true
                        },
                    ]
                },
            ],
        },
        {
            path: '/about',
            name: 'About',
            iconPath: '',
            showInNav: true
        },
        {
            path: '/portfolio',
            name: 'Portfolio',
            iconPath: '',
            showInNav: true,
            children: [
                {
                    path: '/portfolio-1',
                    name: 'Case 1',
                    iconPath: '',
                    showInNav: true
                },
                {
                    path: '/portfolio-2',
                    name: 'Case 2',
                    iconPath: '',
                    showInNav: true
                },
            ],
        },
        {
            path: '/contact',
            name: 'Contact',
            iconPath: '',
            showInNav: true
        },
    ],

    // Protected routes
    protected: []
};
