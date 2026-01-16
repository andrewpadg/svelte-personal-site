import { fail } from '@sveltejs/kit';
import { MAILJET_API_KEY, MAILJET_SECRET_KEY } from '$env/static/private';

export async function handleContactForm(request: Request) {
	const data = await request.formData();
	const name = data.get('name') as string;
	const email = data.get('email') as string;
	const subject = data.get('subject') as string;
	const message = data.get('message') as string;
	const company = data.get('company') as string;

	// honeypot check
	if (company !== '') {
		return fail(400, { company, invalid: true, text: 'Oops! Something went wrong!' });
	}

	// purposely verbose error checking
	if (!name) {
		return fail(400, { name, missing: true, text: 'Name is missing.' });
	}
	if (!email) {
		return fail(400, { email, missing: true, text: 'Email is missing.' });
	}
	if (!subject) {
		return fail(400, { subject, missing: true, text: 'Subject is missing.' });
	}
	if (!message) {
		return fail(400, { message, missing: true, text: 'Message is missing.' });
	}

	// create a plain text email with all the fields except the honeypot
	const text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;

	// Prepare the Mailjet API request payload
	const mailjetData = {
		Messages: [
			{
				From: {
					Email: email,
					Name: name
				},
				To: [
					{
						Email: 'andrewcpadg@gmail.com',
						Name: 'andrewcpadg@gmail.com Personal Email'
					}
				],
				Subject: `Personal website: New message from ${name}`,
				TextPart: text
			}
		]
	};

	// Send the email via Mailjet API
	const response = await fetch('https://api.mailjet.com/v3.1/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + btoa(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`)
		},
		body: JSON.stringify(mailjetData)
	});

	if (!response.ok) {
		const error = new Error(`Mailjet API error: ${response.statusText}`);
		console.error(error);
		return fail(500, { message: error });
	}

	return {
		status: 200,
		body: {
			message: 'Email sent successfully'
		}
	};
}
