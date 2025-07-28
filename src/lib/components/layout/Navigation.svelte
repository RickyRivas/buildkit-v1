<script lang="ts">
	import { page } from '$app/state';
	import Logo from '../Logo.svelte';
	import { theme } from '$lib/theme/index.svelte';
	import type { SiteNavigationItem, SiteNavigationTree } from '$lib/types';

	let isActive = $state(false);
	let currentPagePath = $derived(page.url.pathname);

	const toggleTheme = () => (theme.current = theme.current === 'light' ? 'dark' : 'light');

	let width = $state(0);
	const DESKTOP_BREAKPOINT = 1023;

	function getNavItemId(navItem: SiteNavigationItem): string {
		return (
			navItem.slug ||
			navItem.title
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/[^a-z0-9-]/g, '')
		);
	}

	function getNavItemHref(navItem: SiteNavigationItem): string {
		if (navItem.slug === '/' || navItem.slug === 'home') {
			return '/';
		}

		if (navItem.navigation_item_type === 'link') {
			return navItem.external_url || navItem.slug || '#';
		}
		return navItem.slug ? `/${navItem.slug}` : '#';
	}

	function isActiveNavItem(navItem: SiteNavigationTree): boolean {
		// Check if current item is active
		if (navItem.slug === '/' || navItem.slug === 'home') {
			return currentPagePath === '/';
		}

		// Check direct match
		if (navItem.slug && currentPagePath.startsWith(`/${navItem.slug}`)) {
			return true;
		}

		// Recursively check if any child is active (for parent highlighting)
		if (navItem.children?.length) {
			return navItem.children.some((child) => isActiveNavItem(child));
		}

		return false;
	}

	$effect(() => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme.current);
	});

	let mainHeader: HTMLElement;
	let mainNav: HTMLElement;

	function toggleNav() {
		isActive = !isActive;
		// Reset all mobile nav states when closing
		if (!isActive) {
			// Close all levels
			for (let i = 1; i <= 10; i++) {
				const items = document.querySelectorAll(`.main-header__nav-item--level-${i}`);
				items.forEach((item) => {
					item.classList.remove('main-header__nav-item--open');
					const button = item.querySelector('button');
					if (button) {
						button.setAttribute('aria-expanded', 'false');
					}
				});
			}
		}
	}

	function handleFolderClick(e: MouseEvent, level: number) {
		// Only handle mobile interactions
		if (width > DESKTOP_BREAKPOINT) return;

		const target = e.target as HTMLElement;
		const parent = target.parentElement as HTMLElement;

		// Close other items at the same level
		const levelSelector = `.main-header__nav-item--level-${level}`;
		const itemsAtLevel = document.querySelectorAll(levelSelector);

		itemsAtLevel.forEach((item) => {
			if (item !== parent) {
				item.classList.remove('main-header__nav-item--open');
			}
		});

		// Close all items at deeper levels
		for (let i = level + 1; i <= 10; i++) {
			// Assuming max 10 levels
			const deeperItems = document.querySelectorAll(`.main-header__nav-item--level-${i}`);
			deeperItems.forEach((item) => {
				item.classList.remove('main-header__nav-item--open');
			});
		}

		// Toggle current item
		parent.classList.toggle('main-header__nav-item--open');

		// Update aria-expanded
		const button = parent.querySelector('button');
		if (button) {
			const isOpen = parent.classList.contains('main-header__nav-item--open');
			button.setAttribute('aria-expanded', isOpen.toString());
		}
	}

	let y = $state(0);

	// nav items fetched from CMS need to be restructured into a new array
	function buildNavigationTree(navItems: SiteNavigationItem[]): SiteNavigationTree[] {
		const sortedNavItems = navItems.sort((a, b) => a.display_order - b.display_order);

		function buildTree(parentId: string | null = null): SiteNavigationTree[] {
			return sortedNavItems
				.filter((item) => item.parent_id === parentId)
				.map((item) => ({
					...item,
					children: buildTree(item.id)
				}));
		}

		return buildTree();
	}

	// Arrow SVG component for reuse
	const ArrowIcon = `
		<svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" fill="none" viewBox="0 0 15 10" aria-hidden="true" role="img" class="main-header__nav-arrow">
			<path fill="currentcolor" d="M12.94.223 7.5 5.663 2.06.222 0 2.283l7.5 7.5 7.5-7.5-2.06-2.06Z"/>
		</svg>
	`;
</script>

<svelte:window bind:innerWidth={width} bind:scrollY={y} />

<header
	id="main-header"
	class:ready={currentPagePath === '/' && y < 100}
	class="main-header"
	tabindex="-1"
	bind:this={mainHeader}
>
	<a class="skiplink" href="#content">Skip to Main Content</a>

	<div class="main-header__container">
		<a id="logo" class="main-header__logo" href="/">
			<Logo />
		</a>

		<div class="main-header__mod">
			<div class="main-header__contactinfo">
				<a href="/contact" class="btn">Contact Us</a>

				<button onclick={toggleTheme} id="theme-toggle" aria-label="Click to change theme">
					<svg
						class="theme"
						aria-hidden="true"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						fill="none"
						viewBox="0 0 25 25"
					>
						<path
							class="moon"
							fill="currentcolor"
							d="M14.472 0C7.58 0 2 5.597 2 12.5S7.58 25 14.472 25c3.382 0 6.445-1.35 8.694-3.538a.892.892 0 0 0-.775-1.518 9.79 9.79 0 0 1-1.68.145c-5.407 0-9.794-4.397-9.794-9.821a9.819 9.819 0 0 1 4.984-8.555.892.892 0 0 0-.369-1.663 13.36 13.36 0 0 0-1.06-.044V0Z"
						/>
						<path
							class="sun"
							fill="currentcolor"
							d="M17.65.06a.79.79 0 0 1 .47.581l.97 5.268 5.269.967a.79.79 0 0 1 .58.468.776.776 0 0 1-.078.743L21.82 12.5l3.041 4.409c.152.22.181.498.079.742a.79.79 0 0 1-.581.468l-5.268.972-.972 5.268a.79.79 0 0 1-.468.58.776.776 0 0 1-.742-.078L12.5 21.82l-4.409 3.04a.776.776 0 0 1-.742.079.79.79 0 0 1-.468-.581l-.972-5.268-5.268-.972a.79.79 0 0 1-.58-.468.776.776 0 0 1 .078-.742L3.18 12.5.14 8.091a.776.776 0 0 1-.08-.741.79.79 0 0 1 .581-.468l5.268-.972.972-5.268a.79.79 0 0 1 .468-.58.776.776 0 0 1 .742.078L12.5 3.18 16.909.14a.776.776 0 0 1 .741-.08ZM7.814 12.5a4.687 4.687 0 1 1 9.374 0 4.687 4.687 0 0 1-9.374 0Zm10.936 0a6.25 6.25 0 1 0-12.498 0 6.25 6.25 0 0 0 12.498 0Z"
						/>
					</svg>
				</button>

				<button
					id="main-header__menu-toggle"
					class="main-header__menu-toggle"
					class:main-header__menu-toggle--active={isActive}
					aria-label="Toggle navigation menu"
					aria-expanded={isActive}
					onclick={toggleNav}
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>

			<nav class="main-header__nav" class:main-header__nav--active={isActive} bind:this={mainNav}>
				{#if page.data.cms.site_navigation?.length}
					{#snippet navLevel(items, level = 1)}
						<ul
							class="main-header__nav-list main-header__nav-list--level-{level}"
							style="--list-level: {level};"
							class:main-header__nav-list--sub={level > 1}
						>
							{#each items as navItem}
								{#if navItem.is_published}
									<li
										class="main-header__nav-item main-header__nav-item--{navItem.navigation_item_type} main-header__nav-item--level-{level}"
										class:main-header__nav-item--active={isActiveNavItem(navItem)}
										class:main-header__nav-item--sub={level > 1}
									>
										{#if navItem.navigation_item_type === 'folder'}
											<!-- Folder Button -->
											<button
												class="main-header__nav-button main-header__nav-button--level-{level}"
												class:main-header__nav-button--sub={level > 1}
												id="main-header__nav-button-{getNavItemId(navItem)}"
												aria-expanded="false"
												onclick={(e) => handleFolderClick(e, level)}
											>
												<span>{navItem.title}</span>
												{@html ArrowIcon}
											</button>

											<!-- Recursive Submenu -->
											{#if navItem.children?.length}
												{@render navLevel(navItem.children, level + 1)}
											{/if}
										{:else}
											<!-- Regular Link -->
											<a
												class="main-header__nav-link main-header__nav-link--{navItem.navigation_item_type} main-header__nav-link--level-{level}"
												class:main-header__nav-link--sub={level > 1}
												id="main-header__nav-link-{getNavItemId(navItem)}"
												href={getNavItemHref(navItem)}
												target={navItem.navigation_item_type === 'link'
													? navItem.link_target || '_blank'
													: undefined}
												onclick={toggleNav}
											>
												<span>{navItem.title}</span>
											</a>
										{/if}
									</li>
								{/if}
							{/each}
						</ul>
					{/snippet}

					{@render navLevel(buildNavigationTree(page.data.cms.site_navigation))}
				{/if}
			</nav>
		</div>
	</div>
</header>
