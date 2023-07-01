import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { type Handle, redirect, error } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_KEY,
		event,
	})

	event.locals.getSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession()
		return session
	}

	if (event.url.pathname.startsWith('/protected-routes')) {
		const session = await event.locals.getSession()
		if (!session) {
			// the user is not signed in
			throw redirect(303, '/auth')
		}
	}

	// protect POST requests to all routes that start with /protected-posts
	if (
		event.url.pathname.startsWith('/protected-posts') &&
		event.request.method === 'POST'
	) {
		const session = await event.locals.getSession()
		if (!session) {
			// the user is not signed in
			throw error(303, '/auth')
		}
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		},
	})
}
