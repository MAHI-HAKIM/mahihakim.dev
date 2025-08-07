"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Download, Globe, Monitor, Smartphone, Clock, Calendar } from "lucide-react"

interface DownloadRecord {
  id: number
  timestamp: string
  ip: string
  country: string
  os: string
  browser: string
  deviceType: string
  userAgent: string
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">Loading analytics...</div>
      </div>
    )
  }

  if (!data || !data.success) {
    return (
      <div className="text-center text-gray-400 min-h-[400px] flex items-center justify-center">
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
      className="glass-morphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-4 rounded-full bg-${color}-500/20`}>
          <Icon className={`w-8 h-8 text-${color}-400`} />
        </div>
      </div>
    </motion.div>
  )

  const AnalyticsSection = ({ title, data, icon: Icon }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-morphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-6 h-6 text-gray-400" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {Object.entries(data)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .map(([key, value]) => (
            <div key={key} className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
              <span className="text-gray-300 font-medium">{key}</span>
              <span className="text-white font-bold text-lg">{value as number}</span>
            </div>
          ))}
      </div>
    </motion.div>
  )

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-12">
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
        className="glass-morphism rounded-2xl p-8"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Recent Downloads</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {data.recentDownloads.length === 0 ? (
            <div className="text-center py-12">
              <Download className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No downloads yet</p>
              <p className="text-gray-500 text-sm mt-2">Downloads will appear here once someone downloads your resume</p>
            </div>
          ) : (
            data.recentDownloads.reverse().map((download) => (
              <div
                key={download.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-6 text-sm mb-2">
                    <span className="text-blue-400 font-semibold">#{download.id}</span>
                    <span className="text-white font-medium">{download.country}</span>
                    <span className="text-gray-300">{download.os}</span>
                    <span className="text-gray-300">{download.browser}</span>
                    <span className="text-gray-300">{download.deviceType}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(download.timestamp)} • IP: {download.ip}
                  </div>
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