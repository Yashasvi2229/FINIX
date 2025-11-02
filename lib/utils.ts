import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { TravelSuggestion } from '@/types/travel'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function generateTravelSuggestions(
  destination: string,
  budgets: Record<string, number>
): Promise<TravelSuggestion[]> {
  // Call backend API to generate suggestions so the server-side AI key is used.
  const API_BASE = process.env.NEXT_PUBLIC_FINIX_API_URL || 'http://localhost:8000'
  const res = await fetch(`${API_BASE}/travel/suggestions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ destination, budgets })
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('Backend suggestions API error:', res.status, res.statusText, text)
    throw new Error(`Failed to fetch suggestions: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  if (!data || !Array.isArray(data.suggestions)) {
    throw new Error('Invalid response from suggestions API')
  }

  return data.suggestions as TravelSuggestion[]
}
