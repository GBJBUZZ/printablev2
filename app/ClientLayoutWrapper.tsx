'use client'

import { usePathname } from 'next/navigation'
import { NavBar } from "@/components/nav-bar";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavbarRoutes = ['/login', '/no-navbar']
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname)

  return (
    <>
      {!shouldHideNavbar && <NavBar />}
      <main>{children}</main>
    </>
  )
}
