export const load = async ({ locals }: { locals: Locals }) => {
	async function getBuckets(): Promise<Bucket[]> {
		const session = await locals.getSession()

		if (!session) return []
		const { id: owner } = session.user
		const { data: buckets, error: err } = await locals.supabase
			.from('buckets')
			.select('*')
			.eq('owner', owner)
			.order('last_changed', { ascending: false })

		if (err) {
			console.error(err)
			throw err
		}

		return buckets || []
	}

	return {
		session: await locals.getSession(),
		buckets: await getBuckets(),
	}
}
