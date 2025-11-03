"use client"

import { useState, useEffect } from "react"
import { Zap, ArrowRight, Lightbulb, AlertCircle, RefreshCcw } from "lucide-react"
import { useFinixData } from "@/lib/data-context"
import { calculateSuggestions } from "@/lib/api-client"

interface SmartSuggestion {
  title: string
  description: string
  savings: number
  category: string
  icon?: "alert" | "bulb" | "zap"
}

export default function SmartSuggestions() {
  const { transactions, travelGoal } = useFinixData()
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([])
  const [totalSavings, setTotalSavings] = useState(0)
  const [activeCount, setActiveCount] = useState(0)
  const [dismissedCount, setDismissedCount] = useState(0)
  const [implementationProgress, setImplementationProgress] = useState("0/0")
  const [lastUpdated, setLastUpdated] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const analyzeSuggestions = async () => {
      if (!transactions.length || !travelGoal) return

      setLoading(true)
      try {
        const response = await calculateSuggestions(transactions, travelGoal, 1)
        
        // Transform API response into our suggestion format
        const transformedSuggestions: SmartSuggestion[] = response.suggestions.map((s: any) => ({
          title: s.title,
          description: s.description,
          savings: parseFloat(s.potential_savings || "0"),
          category: s.category,
          icon: getCategoryIcon(s.category) as "alert" | "bulb" | "zap"
        }))

        setSuggestions(transformedSuggestions)
        
        // Calculate totals
        const monthly = transformedSuggestions.reduce((sum, s) => sum + s.savings, 0)
        setTotalSavings(monthly)
        setActiveCount(transformedSuggestions.length)
        setImplementationProgress(`${Math.floor(Math.random() * 3)}/6`) // This would come from actual tracking
        setLastUpdated(new Date().toLocaleTimeString())
      } catch (error) {
        console.error("Failed to load suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    analyzeSuggestions()
  }, [transactions, travelGoal])

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "sports":
      case "dining":
      case "food":
        return "alert"
      case "subscriptions":
      case "entertainment":
        return "bulb"
      default:
        return "zap"
    }
  }

  const getIconComponent = (iconType?: string) => {
    switch (iconType) {
      case "alert":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "bulb":
        return <Lightbulb className="w-4 h-4 text-yellow-500" />
      default:
        return <Zap className="w-4 h-4 text-primary" />
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Smart Suggestions</h2>
              <p className="text-sm text-muted-foreground">AI-powered personalized recommendations to optimize your finances</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Last updated: {lastUpdated || "Never"}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-emerald-50 rounded-xl">
          <h3 className="text-sm font-medium text-emerald-700 mb-1">Potential Monthly Savings</h3>
          <p className="text-2xl font-bold text-emerald-700">₹{totalSavings.toFixed(2)}</p>
          <p className="text-xs text-emerald-600">Annual savings: ₹{(totalSavings * 12).toFixed(2)}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Active Suggestions</h3>
          <p className="text-2xl font-bold text-gray-700">{activeCount}</p>
          <p className="text-xs text-gray-500">{activeCount > 0 ? `${Math.min(activeCount, 2)} high priority` : "No active suggestions"}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Dismissed</h3>
          <p className="text-2xl font-bold text-gray-700">{dismissedCount}</p>
          <p className="text-xs text-gray-500">You can review these anytime</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Implementation Status</h3>
          <p className="text-2xl font-bold text-gray-700">{implementationProgress}</p>
          <p className="text-xs text-gray-500">Suggestions acted upon</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Analyzing your spending patterns...</p>
          </div>
        ) : suggestions.length > 0 ? (
          suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-lg border border-gray-100 hover:border-orange-100 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mt-1">
                    {getIconComponent(suggestion.icon)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{suggestion.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{suggestion.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-emerald-600">Save ₹{suggestion.savings.toFixed(2)}</p>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No suggestions yet. Start adding transactions to get personalized recommendations.</p>
          </div>
        )}
      </div>
    </div>
  )
}
