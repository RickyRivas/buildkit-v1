<script lang="ts">
	import { page } from '$app/state';
	import Logo from '../Logo.svelte';
	import { onMount } from 'svelte';
	import type { navProps } from '$lib/helpers/navigation';
	import { theme } from '$lib/theme/index.svelte';

	let isActive = $state(false);
	let currentPagePath = $derived(page.url.pathname);
	let { navType, routes }: navProps = $props();

	const toggleTheme = () => (theme.current = theme.current === 'light' ? 'dark' : 'light');

	let width = $state(0);

	$effect(() => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme.current);
	});

	let mainHeader,
		mainNav,
		trigger,
		mainNavItems: NodeListOf<HTMLLIElement>,
		mainNavSubItems: NodeListOf<HTMLLIElement>;

	onMount(() => {
		mainNavItems = document.querySelectorAll('.main-header__nav-item');
		mainNavSubItems = document.querySelectorAll('.main-header__nav-sub-item');
	});

	function toggleNav() {
		isActive = !isActive;
		if (mainNavItems.length) {
			mainNavItems.forEach((item) => item.classList.remove('main-header__nav-item--clicked'));
		}
		if (mainNavSubItems.length) {
			mainNavSubItems.forEach((item) =>
				item.classList.remove('main-header__nav-sub-item--clicked')
			);
		}
	}

	let y = $state(0);
</script>

<svelte:window bind:innerWidth={width} bind:scrollY={y} />

<header
	id="main-header"
	class:ready={currentPagePath === '/' && y < 100}
	class="main-header"
	tabindex="-1"
	bind:this={mainHeader}
>
	<a class="skiplink" href="#content"> Skip to Main Content </a>

	<div class="main-header__container">
		<a id="logo" class="main-header__logo" href="/">
			<Logo />
		</a>

		<div class="main-header__mod">
			<div class="main-header__contactinfo">
				<a href="/" class="btn">Contact Us</a>

				<button
					bind:this={trigger}
					onclick={toggleTheme}
					id="theme-toggle"
					aria-label="Click to change theme"
				>
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
					aria-label="Toggle"
					class:main-header__menu-toggle--active={isActive}
					aria-expanded={isActive}
					onclick={toggleNav}
				>
					<span />
					<span />
					<span />
				</button>
			</div>

			<nav class="main-header__nav" class:main-header__nav--active={isActive} bind:this={mainNav}>
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<ul class="main-header__nav-items" style="--level: 1;">
					<!-- top level routes -->
					{#each routes as route}
						{#if route.path === '/'}
							<li
								class="main-header__nav-item"
								class:main-header__nav-item--active={currentPagePath === route.path}
							>
								<a
									onclick={toggleNav}
									class="main-header__nav-link"
									id="main-header__nav-link-{route.name.toLowerCase()}"
									href={route.path}
									tabindex="0"
								>
									<span>{route.name}</span>
								</a>
							</li>
						{:else}
							<li
								class="main-header__nav-item"
								class:main-header__nav-item--haschildren={route.children?.length}
								class:main-header__nav-item--active={currentPagePath.startsWith(route.path)}
							>
								<!-- 2nd level routes -->
								{#if route.children?.length}
									<button
										class="main-header__nav-button"
										id="main-header__nav-button-{route.name.toLowerCase()}"
										tabindex="0"
										onclick={(e: MouseEvent) => {
											const target = e.target as HTMLElement;

											if (width > 1023) {
												// focus on first list item
												const siblingList = target.nextElementSibling as HTMLElement;
												if (siblingList) {
													const siblingListFirstItem = siblingList.children[0] as HTMLLIElement;
													const siblingListFirstItemAnchor =
														siblingListFirstItem?.firstChild as HTMLAnchorElement;
													siblingListFirstItemAnchor.focus();
												}
											} else {
												// toggle classes
												const parent = target.parentElement as HTMLElement;
												mainNavItems.forEach((item: HTMLElement) => {
													if (item === parent) return;
													item.classList.remove('main-header__nav-item--clicked');
												});

												// toggle sub items too
												mainNavSubItems.forEach((item: HTMLElement) => {
													if (item === parent) return;
													item.classList.remove('main-header__nav-sub-item--clicked');
												});

												parent.classList.toggle('main-header__nav-item--clicked');
											}
										}}
									>
										<span>{route.name}</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="10"
											fill="none"
											viewBox="0 0 15 10"
											aria-hidden="true"
											role="img"
											class="main-header__nav-arrow"
										>
											<path
												fill="currentcolor"
												d="M12.94.223 7.5 5.663 2.06.222 0 2.283l7.5 7.5 7.5-7.5-2.06-2.06Z"
											/>
										</svg>
									</button>

									<ul class="main-header__nav-sub-items" style="--level: 2;">
										{#each route.children as subroute}
											<li
												class="main-header__nav-sub-item"
												class:main-header__nav-sub-item--haschildren={subroute.children?.length}
											>
												<!-- tertiary links -->
												{#if subroute.children?.length}
													<button
														class="main-header__nav-sub-button"
														tabindex="0"
														onclick={(e: MouseEvent) => {
															const target = e.target as HTMLElement;

															if (width > 1023) {
																// focus on first list item
																const siblingList = target.nextElementSibling as HTMLElement;
																if (siblingList) {
																	const siblingListFirstItem = siblingList
																		.children[0] as HTMLLIElement;
																	const siblingListFirstItemAnchor =
																		siblingListFirstItem?.firstChild as HTMLAnchorElement;
																	siblingListFirstItemAnchor.focus();
																}
															} else {
																// toggle classes
																const parent = target.parentElement as HTMLElement;
																const mainNavSubItems = document.querySelectorAll(
																	'.main-header__nav-sub-item'
																) as NodeListOf<HTMLLIElement>;

																mainNavSubItems.forEach((item: HTMLElement) => {
																	if (item === parent) return;
																	item.classList.remove('main-header__nav-sub-item--clicked');
																});
																parent.classList.toggle('main-header__nav-sub-item--clicked');
															}
														}}
													>
														<span>{subroute.name}</span>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="15"
															height="10"
															fill="none"
															viewBox="0 0 15 10"
															aria-hidden="true"
															role="img"
															class="main-header__nav-arrow"
														>
															<path
																fill="currentcolor"
																d="M12.94.223 7.5 5.663 2.06.222 0 2.283l7.5 7.5 7.5-7.5-2.06-2.06Z"
															/>
														</svg>
													</button>
													<ul class="main-header__nav-tertiary-items" style="--level: 3;">
														{#each subroute.children as tertiaryRoute}
															<li class="main-header__nav-tertiary-item">
																<a href={tertiaryRoute.path} class="main-header__nav-tertiary-link">
																	<span>{tertiaryRoute.name}</span>
																</a>
															</li>
														{/each}
													</ul>
												{:else}
													<a
														href={subroute.path}
														class="main-header__nav-sub-link"
														onclick={toggleNav}
													>
														<span>{subroute.name}</span>
													</a>
												{/if}
											</li>
										{/each}
									</ul>
								{:else}
									<a
										class="main-header__nav-link"
										id="main-header__nav-link-{route.name.toLowerCase()}"
										href={route.path}
										tabindex="0"
										onclick={toggleNav}
									>
										<span>{route.name}</span>
									</a>
								{/if}
							</li>
						{/if}
					{/each}
				</ul>
			</nav>
		</div>
	</div>
</header>
