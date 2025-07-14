<script lang="ts">
	import InteriorLayout from '$lib/components/layout/InteriorLayout.svelte';
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	let Content = $derived(data.Content);

	// const metatags = $derived(data?.routeInfo?.metatags);
	// const pageContent = $derived(data?.pageContent);
	// const compiledContent = $derived(data?.compiledContent);
	console.log(data);
</script>

<!-- {#if metatags}
	<SeoHead {metatags} />
{/if} -->
<!-- <InteriorLayout {pageContent} /> -->

<Content />
