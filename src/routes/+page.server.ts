import { handleContactForm } from '$lib/functions/handleContactForm';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	sendEmail: async ({ request }) => {
		return await handleContactForm(request);
	}
} satisfies Actions;
