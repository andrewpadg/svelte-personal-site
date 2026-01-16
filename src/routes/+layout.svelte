<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<nav
	class="sticky top-0 z-10 mx-auto max-w-screen-sm bg-base-100/90 p-8 py-4 text-base text-secondary"
>
	<div class="flex justify-end gap-2">
		{#if page.url.pathname !== "/"}
			<a href="/" class="inline-block text-secondary hover:text-accent"> home </a>
			<span> | </span>
		{/if}
		<a
			class="inline-block hover:text-accent {page.url.pathname === '/projects'
				? 'text-accent'
				: 'text-secondary'}"
			href="/projects"
		>
			projects
		</a>
	</div>
</nav>

<main class="relative mx-auto max-w-screen-sm bg-base-100 text-base text-primary">
	{@render children()}
</main>