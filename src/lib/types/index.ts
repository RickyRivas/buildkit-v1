export type SiteNavigationItem = {
    // Core identification
    id: string;
    site_id: string;
    parent_id: string | null;

    // Navigation structure
    title: string;
    navigation_item_type: 'page' | 'folder' | 'link';
    display_order: number;
    is_published: boolean;

    // Slugs and URLs
    slug: string | null;
    external_url: string | null;
    link_target: '_blank' | '_self' | '_parent' | '_top' | null;

    // General description
    description: string | null;

    // SEO Meta Tags
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    meta_robots: string | null;
    canonical_url: string | null;

    // Open Graph
    og_title: string | null;
    og_description: string | null;
    og_image: string | null;
    og_type: string | null;
    og_url: string | null;

    // Twitter Card
    twitter_card: 'summary' | 'summary_large_image' | 'app' | 'player' | null;
    twitter_title: string | null;
    twitter_description: string | null;
    twitter_image: string | null;
    twitter_creator: string | null;
    twitter_site: string | null;

    // Additional SEO
    featured_image: string | null;
    schema_markup: any | null;

    // Timestamps
    created_at: string;
    updated_at: string;
    published_at: string | null;

};

export type SiteNavigationTree = SiteNavigationItem & {
    children: SiteNavigationTree[];
};