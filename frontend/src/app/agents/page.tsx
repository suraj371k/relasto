"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/stores/authStore"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { Mail, Phone, User, Users } from "lucide-react"

const Agents = () => {
  const { agentId } = useParams()
  const { getAgents, agents } = useAuthStore()

  useEffect(() => {
    getAgents()
  }, [getAgents])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              Our Agents
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our professional team of experienced agents ready to help you with your needs.
          </p>
          <div className="mt-6">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              {agents.length} {agents.length === 1 ? "Agent" : "Agents"} Available
            </Badge>
          </div>
        </div>

        {/* Agents Grid */}
        {agents.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <Users className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No agents found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              There are currently no agents available. Please check back later.
            </p>
            <Button variant="outline">Refresh</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <Card
                key={agent._id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800 border-0 shadow-md"
              >
                <div className="relative">
                  {/* Agent Image */}
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                    <img
                      src={agent.image || "/placeholder.svg?height=300&width=300&text=Agent"}
                      alt={`${agent.user?.name || "Agent"} profile`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Online Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Agent Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                        {agent.user?.name || "Unknown Agent"}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        Professional Agent
                      </Badge>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-3">
                      {agent.user?.email && (
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <span className="truncate">{agent.user.email}</span>
                        </div>
                      )}

                      {agent.user?.phoneNumber && (
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <span>{agent.user.phoneNumber}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                      <Link href={`contact`} className="block">
                        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <User className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {agents.length > 0 && (
          <div className="text-center mt-16 py-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Need Help Choosing?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Our team is here to help you find the perfect agent for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={'/contact'}>
              <Button size="lg" className="px-8">
                Contact Support
              </Button>
              </Link>
              <Link href={'/listings'}>
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Explore Properties
              </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Agents
