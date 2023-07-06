export async function POST({ locals }) {
	const session = await locals.getSession()
	const supabase = locals.supabase
	const maxBucketCount = 100

	if (!session) return new Response('Unauthorized', { status: 401 })

	const { id: owner } = session.user

	const { data: bucketCount } = await supabase
		.from('buckets')
		.select('*', { count: 'exact' })
		.match({ owner: owner })

	if (bucketCount) {
		if (bucketCount?.length >= maxBucketCount) {
			return new Response(
				JSON.stringify({ message: 'Bucket limit reached' }),
				{ status: 403 }
			)
		}
	}

	const { data, error } = await supabase
		.from('buckets')
		.insert([{ owner: owner }])
		.select()

	if (error) {
		console.error(error)
		return new Response(
			JSON.stringify({ message: 'Internal server error' }),
			{ status: 500 }
		)
	}

	return new Response(JSON.stringify({ message: 'Bucket created' }), {
		status: 201,
	})
}
