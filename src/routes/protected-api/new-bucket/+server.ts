export async function POST({ locals }) {
	const session = await locals.getSession()
	const supabase = locals.supabase

	if (!session) return new Response('Unauthorized', { status: 401 })

	const { id: owner } = session.user
	const { data, error } = await supabase
		.from('buckets')
		.insert([{ owner: owner }])
		.select()

	if (error) {
		console.error(error)
		return new Response('Internal Server Error', { status: 500 })
	}

	return new Response('New Bucket Created', { status: 201 })
}
