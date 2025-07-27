<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';

	let { data } = $props();
	const { page } = $derived(data);
	// console.log(page);

	const metatags = $derived({
		title: page.meta_title,
		description: page.meta_description,
		keywords: page.meta_keywords,
		canonical: page.canonical_url,
		siteName: page.title,
		index: true,
		twitter: true,
		openGraph: true,
		schemaOrg: true,
		imageURL: page.featured_image,
		logo: 'https://mystarter.example.com/assets/images/logo.svg',
		author: 'Your Name or Company',
		name: 'Home Page'
	});
</script>

<SeoHead {metatags} />

<h1>{page.title}</h1>
<p>Created at: {page.created_at}</p>
<p>display order: {page.display_order}</p>
<p>featured image: {page.featured_image}</p>
