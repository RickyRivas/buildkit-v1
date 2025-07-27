<script lang="ts">
	import { page } from '$app/state';
	import Logo from '../Logo.svelte';
	let currentPagePath = $derived(page.url.pathname);
	import { data } from '$lib/account';
	import PhoneIcon from '../icons/PhoneIcon.svelte';
	import EmailIcon from '../icons/EmailIcon.svelte';
	import MarkerIcon from '../icons/MarkerIcon.svelte';
	import type { navProps } from '$lib/helpers/navigation';
	import { formatPhoneLink } from '$lib/helpers/format';
	let { routes }: navProps = $props();
</script>

<footer id="ft" class="ft">
	<div class="ft__container">
		<div class="ft__main-col">
			<a href="/" class="ft__main-col-logo">
				<Logo />
			</a>
			<p class="ft__main-col-bio">
				We are a Tulsa Web Design agency that provides custom-coded, professionally designed
				websites that deliver premium results. No WordPress or Page-builders.
			</p>
		</div>

		<div class="ft__cols">
			<div class="ft__col">
				<h2>Sitemap</h2>
				<nav class="ft__col-nav">
					<ul class="ft__col-list">
						{#each routes as route}
							{#if route.path === '/'}
								<li
									class="ft__col-list-item"
									class:ft__col-list-item--active={currentPagePath === '/'}
								>
									<a class="ft__col-list-item-link" href={route.path}>{route.name}</a>
								</li>
							{:else}
								<li
									class="ft__col-list-item"
									class:ft__col-list-item--active={currentPagePath.startsWith(route.path)}
								>
									<a class="ft__col-list-item-link" href={route.path}>{route.name}</a>
								</li>
							{/if}
						{/each}
					</ul>
				</nav>
			</div>

			<div class="ft__col">
				<h2>Services</h2>
				<ul class="ft__col-list">
					<li class="ft__col-list-item">
						<a href="/" class="ft__col-list-item-link">Service Item</a>
					</li>
					<li class="ft__col-list-item">
						<a href="/" class="ft__col-list-item-link">Service Item</a>
					</li>
					<li class="ft__col-list-item">
						<a href="/" class="ft__col-list-item-link">Service Item</a>
					</li>
					<li class="ft__col-list-item">
						<a href="/" class="ft__col-list-item-link">Service Item</a>
					</li>
					<li class="ft__col-list-item">
						<a href="/" class="ft__col-list-item-link">Service Item</a>
					</li>
				</ul>
			</div>

			<div class="ft__col">
				<h2>Contact</h2>
				<ul class="ft__col-list">
					{#if data.phone}
						<li class="ft__col-list-item">
							<a href="tel:{formatPhoneLink(data.phone)}" class="ft__col-list-item-link">
								<span class="ft__col-list-item-link-icon">
									<PhoneIcon />
								</span>
								{data.phone}
							</a>
						</li>
					{/if}
					{#if data.email}
						<li class="ft__col-list-item">
							<a href="mailto:{data.email}" class="ft__col-list-item-link">
								<span class="ft__col-list-item-link-icon">
									<EmailIcon />
								</span>
								{data.email}
							</a>
						</li>
					{/if}
					{#if data.location}
						<li class="ft__col-list-item">
							<a href="/contact" class="ft__col-list-item-link">
								<span class="ft__col-list-item-link-icon">
									<MarkerIcon />
								</span>
								{data.location}
							</a>
						</li>
					{/if}
				</ul>
			</div>
		</div>
	</div>

	<div class="ft__copyright">
		<span class="ft__copyright-business">
			© {new Date().getFullYear()}
			{data.company}. All rights reserved.
		</span>
		<span class="ft__copyright-credit">
			Custom-Coded & Designed by <a href="/">Rivas Web Designs</a>
		</span>
	</div>
</footer>
