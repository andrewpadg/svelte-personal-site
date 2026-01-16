<script lang="ts">
	import ContactForm from '$lib/components/ContactForm.svelte';

	let showContent1 = $state(false);
	let showContent2 = $state(false);
	let showContent3 = $state(false);
	let showContent4 = $state(false);

	// Delay the rendering to trigger transitions
	setTimeout(() => {
		showContent1 = true;
	}, 200);

	$effect(() => {
		if (showContent1) {
			setTimeout(() => (showContent2 = true), 200);
		}
		if (showContent2) {
			setTimeout(() => (showContent3 = true), 200);
		}
		if (showContent3) {
			setTimeout(() => (showContent4 = true), 200);
		}
	});
</script>

<div class="flex justify-between gap-4 p-8 pb-2 pt-28">
	<h1 class="text-lg font-semibold">Andrew Padgett</h1>
	<div class="flex justify-center space-x-4">
		<a
			class="text-secondary hover:text-accent"
			href="https://www.linkedin.com/in/username"
			target="_blank"
		>
			linkedin
		</a>
		<a
			class="text-secondary hover:text-accent"
			href="https://github.com/username"
			target="_blank"
		>
			github
		</a>
		<a
			class="text-secondary hover:text-accent"
			href="mailto:developer@example.com"
			target="_blank"
		>
			email
		</a>
	</div>
</div>

<p class="mb-8 px-8">
	Code wizard by day, bug creator by night. I turn coffee into code and occasionally make computers do cool things.
</p>

<div class="p-8 pb-0 pt-0">
	<div class="grid grid-cols-1 gap-8 sm:grid-cols-2">

	</div>
</div>

{#if showContent4}
	<ContactForm />
{/if}