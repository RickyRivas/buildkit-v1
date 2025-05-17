<script lang="ts">
	import { page } from '$app/state';
	import type { MetaTags } from '$lib/navigation/helpers';
	let { metatags }: { metatags: MetaTags } = $props();

	// export let title = '';
	// export let description = '';
	// export let keywords = '';
	// export let canonical = '';
	// export let siteName = '';
	// export let index = true;
	// export let twitter = true;
	// export let openGraph = true;
	// export let schemaOrg = false;
	// export let imageURL = '';
	// export let logo = '';
	// export let author = '';
	// export let socials = [];
	// export let name = '';

	let jsonLd = {
		'@context': 'https://schema.org',
		'@type': ['Person', 'Organization'],
		name: `${metatags.name}`,
		url: `${page.url.origin}`,
		image: `${metatags.imageURL}`,
		logo: {
			'@type': 'ImageObject',
			url: `${metatags.logo}`,
			width: 48,
			height: 48
		}
	};
	let jsonLdStrung = JSON.stringify(jsonLd);
	let jsonLdScript = `<script type="application/ld+json">${jsonLdStrung}${'<'}/script>`;
</script>

<svelte:head>
	{#if metatags.title !== ''}
		<meta name="robots" content={metatags.index ? 'index, follow' : 'noindex'} />
		<title>{metatags.title}</title>
		<meta rel="canonical" content={metatags.canonical === '' ? page.url : metatags.canonical} />
	{/if}
	{#if metatags.description !== ''}
		<meta name="description" content={metatags.description} />
	{/if}
	{#if metatags.keywords !== ''}
		<meta name="keywords" content={metatags.keywords} />
	{/if}
	{#if metatags.author !== ''}
		<meta name="author" content={metatags.author} />
	{/if}

	<!-- Open Graph Meta Tags -->
	{#if metatags.openGraph}
		{#if metatags.siteName !== ''}
			<meta property="og:site_name" content={metatags.siteName} />
		{/if}
		{#if metatags.title !== ''}
			<!-- <meta property="og:url" content={metatags.page.url} /> -->
			<meta property="og:type" content="website" />
			<meta property="og:title" content={metatags.title} />
		{/if}
		{#if metatags.description !== ''}
			<meta property="og:description" content={metatags.description} />
		{/if}
		{#if metatags.imageURL !== ''}
			<meta property="og:image" content={metatags.imageURL} />
		{/if}
	{/if}

	<!-- Twitter Meta Tags -->
	<!-- {#if metatags.twitter}
		{#if metatags.title !== ''}
			<meta name="twitter:card" content="summary_large_image" />
			<meta property="twitter:domain" content={page.url.host} />
			<meta property="twitter:url" content={page.url} />
			<meta name="twitter:title" content={metatags.title} />
		{/if}
		{#if metatags.description !== ''}
			<meta name="twitter:description" content={metatags.description} />
		{/if}
		{#if metatags.imageURL !== ''}
			<meta name="twitter:image" content={metatags.imageURL} />
		{/if}
	{/if} -->

	<!-- JSON-LD Schema -->
	{#if metatags.schemaOrg !== undefined || metatags.logo !== '' || metatags.name !== ''}
		{@html jsonLdScript}
	{/if}
</svelte:head>
