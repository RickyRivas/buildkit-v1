<script lang="ts">
	import { routes } from '$lib/site';
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import type { MetaTags } from '$lib/helpers/navigation';

	const metatags = routes.public.find((route) => route.name === 'Home')?.metatags as MetaTags;
</script>

<SeoHead {metatags} />

<h1>Rivas Web designs 2025 buildkit!</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<section id="hero" class="hero">
	<div class="hero__mod">
		<h1>Small Business Web Development & Design</h1>
		<p>
			We are a Tulsa Web Design agency that provides custom-coded, professionally designed websites
			that deliver premium results. No WordPress or Page-builders.
		</p>
	</div>
</section>
