export const DELETE = async ({ locals }) => {
	const session = await locals.getSession()
	const supabase = locals.supabase
	if (!session) return new Response('Unauthorized', { status: 401 })

	await supabase.rpc('delete_user')
	await supabase.auth.signOut()

	return new Response('User deleted', { status: 200 })
}
