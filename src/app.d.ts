import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from './DatabaseDefinitions'

declare global {
	interface Locals {
		supabase: SupabaseClient<Database>
		getSession(): Promise<Session | null>
	}
	interface PageData {
		session: Session | null
	}
	type Bucket = {
		id: string
		created_at: Date
		owner: string
		name: string
		description: string
		json_data: JSON
	}

	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: Session | null
		}
		type Bucket = {
			id: string
			created_at: Date
			owner: string
			name: string
			description: string
			json_data: JSON
		}
	}

	// interface Error {}
	// interface Platform {}
}
