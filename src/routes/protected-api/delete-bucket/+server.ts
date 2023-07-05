export async function DELETE({ locals, request }) {
	const session = await locals.getSession()
	const supabase = locals.supabase

	if (!session) return new Response('Unauthorized', { status: 401 })

	const body = await request.json()

	const { buckets } = body

	const { id: owner } = session.user

	for (const bucketId of buckets) {
		const { error } = await supabase
			.from('buckets')
			.delete()
			.match({ id: bucketId, owner: owner })

		if (error) {
			console.error(error)
			return new Response('Internal Server Error', { status: 500 })
		}
	}

	return new Response('Bucket Deleted', { status: 200 })
}
