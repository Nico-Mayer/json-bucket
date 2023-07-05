import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }: { locals: Locals }) => {
	const session = await locals.getSession()

	if (session) {
		throw redirect(303, '/protected-routes/home')
	}
}
