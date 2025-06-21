"use client"

import type { ReactNode } from "react"

interface StaticSectionProps {
  children: ReactNode
  className?: string
}

const StaticSection = ({ children, className = "" }: StaticSectionProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="h-full w-full">{children}</div>
    </div>
  )
}

export default StaticSection
