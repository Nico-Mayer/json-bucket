import { writable, type Writable } from 'svelte/store'

export const activeTheme: Writable<'light' | 'dark' | undefined> =
	writable('light')

export const homeSearchTerm: Writable<string> = writable('')
