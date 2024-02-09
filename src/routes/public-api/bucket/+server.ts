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

	const JSON_String = JSON.stringify(data.json_data)
	const JSON_OBJ = JSON.parse(JSON_String)
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	}

	return new Response(JSON.stringify(JSON_OBJ), { status: 200, headers })
}
