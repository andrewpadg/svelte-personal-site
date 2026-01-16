<!-- @component A customizable contact form component with name, email, and message fields that supports form submission feedback -->
<script lang="ts">
	import { enhance } from '$app/forms';

	let submitting = $state(false);
	let completed = $state(false);
	let error = $state('');
</script>

<h1>Contact</h1>
<p>Use the contact form below to get in touch with me.</p>

{#if completed}
	<p>Thank you for your message. I'll get back to you as soon as possible.</p>
{:else}
	<form
		method="post"
		action="?/sendEmail"
		use:enhance={() => {
      submitting = true;
      error = "";
      return async ({ result }) => {
        submitting = false;
        if (result.type === 'failure' && result.data) {
          error = result.data.text;
        } else if (result.type === "success") {
          completed = true;
        }
      };
    }}
	>
		{#if error !== ""}
			<p class="error">{error}</p>
		{/if}
		<label for="name">Name</label>
		<input type="text" id="name" name="name" required />

		<label for="email">Email</label>
		<input type="email" id="email" name="email" required />

		<label for="subject">Subject</label>
		<input type="text" id="subject" name="subject" required />

		<label for="message">Message</label>
		<textarea id="message" name="message" rows="5" minlength="10" maxlength="750" required
		></textarea>

		<input type="text" name="company" style="display: none" />

		<button type="submit">
			{#if submitting}Submitting...{:else}Submit{/if}
		</button>
	</form>
{/if}