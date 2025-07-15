import type { RouteGroup, RouteInfo } from "./helpers/navigation";

// controller for entire app
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
                    path: '',
                    name: 'Web Design Group',
                    iconPath: '',
                    showInNav: true,
                    children: [
                        {
                            path: '/services/web-design',
                            name: 'Web Design',
                            iconPath: '',
                            showInNav: true,
                            metatags: {
                                title: 'Web Design',
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
                    ]
                },
                {
                    path: '',
                    name: 'Web Development',
                    iconPath: '',
                    showInNav: true,
                    children: [
                        {
                            path: '/software',
                            name: 'Software',
                            iconPath: '',
                            showInNav: true
                        },
                        {
                            path: '/ai',
                            name: 'AI',
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
            showInNav: true,
            metatags: {
                title: 'Contact Page',
                description: 'A powerful, responsive starter template for building modern web applications with the latest technologies and best practices.',
                keywords: 'web development, starter template, frontend, react, typescript, responsive design',
                canonical: 'https://mystarter.example.com/contact',
                siteName: '',
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
    ],

    // Protected routes
    protected: []
};
