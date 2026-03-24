"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download, Globe, Monitor, Smartphone, Clock, Calendar } from "lucide-react"

function HomeLogoLink() {
  return (
    <Link
      href="/"
      className="absolute left-5 top-5 z-30 flex rounded-full border border-white/10 p-2 glass-morphism transition-colors hover:bg-white/10 sm:left-6 sm:top-6 lg:left-8"
      aria-label="Back to home"
    >
      <Image
        src="/logo.png"
        alt=""
        width={40}
        height={40}
        className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
        style={{ filter: "brightness(0) invert(1) drop-shadow(0 0 0 transparent)" }}
      />
    </Link>
  )
}

/** Matches GET /api/download-track `recentDownloads` select shape (no IP exposed). */
interface DownloadRecord {
  id: number
  timestamp: string
  country: string
  os: string
  browser: string
  deviceType: string
}

interface Analytics {
  countries: Record<string, number>
  operatingSystems: Record<string, number>
  browsers: Record<string, number>
  deviceTypes: Record<string, number>
  hourlyDistribution: Record<string, number>
  dailyDistribution: Record<string, number>
}

interface AnalyticsData {
  success: boolean
  downloadCount: number
  analytics: Analytics
  recentDownloads: DownloadRecord[]
  totalDownloads: number
}

/** Max height for scrollable panel bodies (lists / dense content). */
const SCROLL_PANEL_MAX_H = "max-h-80"

/** Ultra-thin, glassy gray scrollbar (Firefox + WebKit). */
function formatCountryLabel(country: string | undefined | null): string {
  const c = country?.trim() ?? ''
  if (!c || c === 'Unknown') return 'Unknown'
  if (c === 'Local/Unknown') return 'Local (no public IP — e.g. localhost)'
  return c
}

const SCROLLBAR_THIN_GLASS = [
  "[scrollbar-width:thin]",
  "[scrollbar-color:rgba(156,163,175,0.42)_rgba(255,255,255,0.04)]",
  "[&::-webkit-scrollbar]:w-[3px]",
  "[&::-webkit-scrollbar]:h-[3px]",
  "[&::-webkit-scrollbar-track]:rounded-full",
  "[&::-webkit-scrollbar-track]:bg-white/[0.04]",
  "[&::-webkit-scrollbar-thumb]:rounded-full",
  "[&::-webkit-scrollbar-thumb]:border-[0.5px] [&::-webkit-scrollbar-thumb]:border-white/12",
  "[&::-webkit-scrollbar-thumb]:bg-gray-400/[0.28]",
  "[&::-webkit-scrollbar-thumb]:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]",
  "hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/[0.4]",
].join(" ")

const AnalyticsDashboard = () => {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/download-track')
        const analyticsData = await response.json()
        setData(analyticsData)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="relative flex min-h-[400px] items-center justify-center">
        <HomeLogoLink />
        <div className="text-gray-400">Loading analytics...</div>
      </div>
    )
  }

  if (!data || !data.success) {
    return (
      <div className="relative flex min-h-[400px] flex-col items-center justify-center text-center text-gray-400">
        <HomeLogoLink />
        No analytics data available
      </div>
    )
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const StatCard = ({ title, value, icon: Icon, color = "blue" }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-morphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300 flex flex-col min-h-0 ${SCROLL_PANEL_MAX_H} overflow-y-auto pr-1 ${SCROLLBAR_THIN_GLASS}`}
    >
      <div className="flex items-center justify-between gap-4 shrink-0">
        <div className="min-w-0">
          <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-white break-words">{value}</p>
        </div>
        <div className={`p-4 rounded-full bg-${color}-500/20 shrink-0`}>
          <Icon className={`w-8 h-8 text-${color}-400`} />
        </div>
      </div>
    </motion.div>
  )

  const AnalyticsSection = ({ title, data, icon: Icon }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-morphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300 flex flex-col min-h-0"
    >
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <Icon className="w-6 h-6 text-gray-400" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div
        className={`space-y-4 ${SCROLL_PANEL_MAX_H} overflow-y-auto overflow-x-hidden pr-2 min-h-0 ${SCROLLBAR_THIN_GLASS}`}
      >
        {Object.entries(data)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .map(([key, value]) => (
            <div key={key} className="flex justify-between items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
              <span className="text-gray-300 font-medium truncate min-w-0" title={formatCountryLabel(key)}>
                {title === "Countries" ? formatCountryLabel(key) : key}
              </span>
              <span className="text-white font-bold text-lg shrink-0">{value as number}</span>
            </div>
          ))}
      </div>
    </motion.div>
  )

  return (
    <div className="relative mx-auto max-w-7xl space-y-12 px-6 py-12 sm:px-8 lg:px-12">
      <HomeLogoLink />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Download Analytics</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Detailed insights about your resume downloads and audience engagement
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <StatCard
          title="Total Downloads"
          value={data.downloadCount}
          icon={Download}
          color="blue"
        />
        <StatCard
          title="Unique Countries"
          value={Object.keys(data.analytics.countries).length}
          icon={Globe}
          color="green"
        />
        <StatCard
          title="Most Popular OS"
          value={Object.entries(data.analytics.operatingSystems)
            .sort(([, a], [, b]) => (b as number) - (a as number))[0]?.[0] || 'N/A'}
          icon={Monitor}
          color="purple"
        />
        <StatCard
          title="Mobile Downloads"
          value={data.analytics.deviceTypes.Mobile || 0}
          icon={Smartphone}
          color="orange"
        />
      </div>

      {/* Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <AnalyticsSection
          title="Countries"
          data={data.analytics.countries}
          icon={Globe}
        />
        <AnalyticsSection
          title="Operating Systems"
          data={data.analytics.operatingSystems}
          icon={Monitor}
        />
        <AnalyticsSection
          title="Browsers"
          data={data.analytics.browsers}
          icon={Download}
        />
        <AnalyticsSection
          title="Device Types"
          data={data.analytics.deviceTypes}
          icon={Smartphone}
        />
        <AnalyticsSection
          title="Hourly Distribution"
          data={data.analytics.hourlyDistribution}
          icon={Clock}
        />
        <AnalyticsSection
          title="Daily Distribution"
          data={data.analytics.dailyDistribution}
          icon={Calendar}
        />
      </div>

      {/* Recent Downloads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism rounded-2xl p-8 flex flex-col min-h-0"
      >
        <h3 className="text-xl font-semibold text-white mb-6 shrink-0">Recent Downloads</h3>
        <div
          className={`space-y-4 ${SCROLL_PANEL_MAX_H} overflow-y-auto overflow-x-hidden pr-2 min-h-0 ${SCROLLBAR_THIN_GLASS}`}
        >
          {data.recentDownloads.length === 0 ? (
            <div className="text-center py-12">
              <Download className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No downloads yet</p>
              <p className="text-gray-500 text-sm mt-2">Downloads will appear here once someone downloads your resume</p>
            </div>
          ) : (
            data.recentDownloads.map((download) => (
              <div
                key={download.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-2">
                    <span className="text-blue-400 font-semibold shrink-0">#{download.id}</span>
                    <span
                      className="text-white font-medium shrink-0"
                      title={formatCountryLabel(download.country)}
                    >
                      {formatCountryLabel(download.country)}
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-xs font-medium text-gray-200 shrink-0">
                      {download.deviceType?.trim() || "Unknown"}
                    </span>
                    <span className="text-gray-300">{download.os}</span>
                    <span className="text-gray-400">{download.browser}</span>
                  </div>
                  <div className="text-xs text-gray-500">{formatDate(download.timestamp)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsDashboard 