import { useState, useEffect } from 'react'
import { ActivityCalendar } from 'react-activity-calendar'
import './GitHubActivity.css'

const USERNAME = 'hrtowii'
const CACHE_KEY = 'gh-contrib'
const MAX_CACHE_HITS = 5
const API_BASE = 'https://github-contributions-api.jogruber.de/v4'

interface Contribution {
	date: string
	count: number
	level: 0 | 1 | 2 | 3 | 4
}

interface CacheData {
	data: Contribution[]
	lastFetch: string
	cacheHits: number
}

function getLastYear(data: Contribution[]): Contribution[] {
	const cutoff = new Date()
	cutoff.setFullYear(cutoff.getFullYear() - 1)
	return data.filter((c) => new Date(c.date) >= cutoff)
}

function getYearsSince(dateStr: string): number[] {
	const date = new Date(dateStr)
	const now = new Date()
	const years: number[] = []
	for (let y = date.getFullYear(); y <= now.getFullYear(); y++) {
		years.push(y)
	}
	return years
}

function mergeContributions(
	existing: Contribution[],
	fresh: Contribution[],
): Contribution[] {
	const map = new Map<string, Contribution>()
	for (const c of existing) map.set(c.date, c)
	for (const c of fresh) map.set(c.date, c)
	return Array.from(map.values()).sort((a, b) =>
		a.date.localeCompare(b.date),
	)
}

export default function GitHubActivity() {
	const [data, setData] = useState<Contribution[] | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const cached = localStorage.getItem(CACHE_KEY)

		if (!cached) {
			fetchAll()
			return
		}

		try {
			const cache: CacheData = JSON.parse(cached)
			const newHits = cache.cacheHits + 1

			if (newHits >= MAX_CACHE_HITS) {
				refresh(cache)
			} else {
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ ...cache, cacheHits: newHits }),
				)
				setData(cache.data)
			}
		} catch {
			fetchAll()
		}
	}, [])

	async function fetchAll() {
		try {
			const res = await fetch(`${API_BASE}/${USERNAME}?y=all`)
			if (!res.ok) throw new Error('Failed to fetch')
			const json = await res.json()
			const cache: CacheData = {
				data: json.contributions,
				lastFetch: new Date().toISOString(),
				cacheHits: 0,
			}
			localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
			setData(json.contributions)
		} catch {
			setError('Could not load contributions')
		}
	}

	async function refresh(cache: CacheData) {
		try {
			const years = getYearsSince(cache.lastFetch)
			const params = years.map((y) => `y=${y}`).join('&')
			const res = await fetch(`${API_BASE}/${USERNAME}?${params}`)
			if (!res.ok) throw new Error('Failed to fetch')
			const json = await res.json()
			const merged = mergeContributions(cache.data, json.contributions)
			const newCache: CacheData = {
				data: merged,
				lastFetch: new Date().toISOString(),
				cacheHits: 0,
			}
			localStorage.setItem(CACHE_KEY, JSON.stringify(newCache))
			setData(merged)
		} catch {
			setData(cache.data)
		}
	}

	if (error) return <p className="gh-error" data-ascii-block>{error}</p>
	if (!data) return <p className="gh-loading" data-ascii-block>Loading contributions...</p>

	const displayData = getLastYear(data)

	return (
		<section className="github-activity" data-ascii-block>
			<h2>github commits</h2>
			<ActivityCalendar data={displayData} />
		</section>
	)
}
