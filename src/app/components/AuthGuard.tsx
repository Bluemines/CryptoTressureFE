"use client"

import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

const AuthGuard = ({
  allowedRole,
  children,
}: {
  allowedRole: string
  children: React.ReactNode
}) => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("role") || Cookies.get("role")

    if (role === allowedRole) {
      setAuthorized(true)
    } else {
      router.push("/")
    }
  }, [allowedRole, router])

  if (!authorized) return null

  return <>{children}</>
}

export default AuthGuard
