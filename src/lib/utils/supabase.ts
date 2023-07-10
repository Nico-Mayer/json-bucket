export async function createNewBucket() {
	const res = await fetch('/protected-api/new-bucket', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const body = await res.json()

	if (res.ok === false) {
		throw new Error(body.message)
	}
}

export async function deleteBuckets(buckets: string[]) {
	await fetch(`/protected-api/delete-bucket/`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ buckets }),
	})
}

export async function saveBucket(newBucket: Bucket) {
	const res = await fetch(`/protected-api/update-bucket/`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			newBucket,
		}),
	})

	return res
}
