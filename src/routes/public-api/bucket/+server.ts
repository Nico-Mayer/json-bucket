export async function GET({ locals, url }) {
	const supabase = locals.supabase

	const bucketID = url.searchParams.get('bucketID')

	const { data, error } = await supabase
		.from('buckets')
		.select('json_data')
		.match({ id: bucketID })
		.single()

	if (error) {
		console.error(error)
		return new Response('Internal Server Error', { status: 500 })
	}

	console.log(JSON.parse(data.json_data))

	const JSON_String = JSON.stringify(data.json_data)
	const JSON_OBJ = JSON.parse(JSON_String)
	return new Response(JSON_OBJ, { status: 200 })
}
