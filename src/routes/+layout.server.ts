export const load = async ({ locals }: { locals: Locals }) => {
	return {
		session: await locals.getSession(),
	}
}
