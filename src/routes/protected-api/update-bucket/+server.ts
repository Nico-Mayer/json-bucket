export async function PUT({ locals, request }) {
	const session = await locals.getSession()
	const supabase = locals.supabase

	if (!session) return new Response('Unauthorized', { status: 401 })

	const body = await request.json()
	const { newBucket } = body

	const { id: owner } = session.user

	const { data, error } = await supabase
		.from('buckets')
		.update({ ...newBucket, last_changed: new Date() })
		.match({ id: newBucket.id, owner: owner })

	if (error) {
		console.error(error)
		return new Response('Internal Server Error', { status: 500 })
	}

	return new Response('Bucket Updated', { status: 200 })
}
