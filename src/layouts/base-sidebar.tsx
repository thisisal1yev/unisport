'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useApp } from '@/lib/store'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface NavItem {
	id: string
	label: string
	icon: string
	to: string
}

interface BaseSidebarProps {
	navItems: NavItem[]
	profileHref: string
	title?: string
	subtitle?: string
	accentGradient?: string
}

export function BaseSidebar({
	navItems,
	profileHref,
	title = 'UniSport',
	subtitle = 'Sport Platformasi',
	accentGradient = 'from-blue-500 to-indigo-600',
}: BaseSidebarProps) {
	const { currentPage, setCurrentPage, isAuthenticated, currentUser, logout } =
		useApp()
	const router = useRouter()
	const [mobileOpen, setMobileOpen] = useState(false)

	const handleNavClick = (pageId: string) => {
		setCurrentPage(pageId)
		setMobileOpen(false)
	}

	const handleLogout = () => {
		logout()
		setMobileOpen(false)
		router.push('/')
	}

	const isActive = (item: NavItem) => {
		return router.pathname === item.to || currentPage === item.id
	}

	const SidebarContent = () => (
		<div className="h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
			{/* Logo */}
			<div className="p-6 border-b border-slate-200 dark:border-slate-800">
				<div className="flex items-center gap-3">
					<div className="text-4xl">🏆</div>
					<div>
						<h2 className="text-xl font-bold text-slate-800 dark:text-white">
							{title}
						</h2>
						<p className="text-sm text-slate-500 dark:text-slate-400">
							{subtitle}
						</p>
					</div>
				</div>
			</div>

				{/* Navigation */}
			<nav className="flex-1 p-4 space-y-2 overflow-y-auto">
				{navItems.map(item => (
					<Link
						key={item.id}
						onClick={() => handleNavClick(item.id)}
						href={item.to}
						className={cn(
							'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium',
							isActive(item)
								? `bg-linear-to-r ${accentGradient} text-white shadow-lg shadow-blue-500/25`
								: 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
						)}
					>
						<span className="text-xl">{item.icon}</span>
						<span>{item.label}</span>
					</Link>
				))}
			</nav>

			{/* Bottom Actions */}
			<div className="p-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 gap-3">
				{isAuthenticated && currentUser ? (
					<Link
						href={profileHref}
						onClick={() => handleNavClick('profil')}
						className={cn(
							'inline-flex items-center gap-3 p-2 rounded-xl transition-all',
							router.pathname === profileHref
								? 'bg-slate-200 dark:bg-slate-700'
								: 'hover:bg-slate-100 dark:hover:bg-slate-800'
						)}
					>
						<div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-base">
							{currentUser.avatar_emoji}
						</div>

						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-slate-800 dark:text-white truncate">
								{currentUser.ism} {currentUser.familiya}
							</p>
						</div>
					</Link>
				) : (
					<Link
						href="/auth"
						onClick={() => handleNavClick('auth')}
						className="flex items-center gap-3 p-2 rounded-xl text-emerald-700 w-full dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all"
					>
						<div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-base">
							👤
						</div>
						<span className="text-sm font-medium">Kirish</span>
					</Link>
				)}

				<div className="flex items-center gap-2">
					<ThemeToggle />
					{isAuthenticated && (
						<Button
							variant="outline"
							size="sm"
							className="h-9 flex-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
							onClick={handleLogout}
						>
							Chiqish
						</Button>
					)}
				</div>
			</div>
		</div>
	)

	return (
		<>
			{/* Desktop Sidebar */}
			<aside className="hidden md:block w-64 h-screen fixed left-0 top-0 z-40">
				<SidebarContent />
			</aside>

			{/* Mobile Sidebar */}
			<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
				<SheetTrigger asChild>
					<Button
						variant="default"
						size="icon"
						className="fixed top-4 left-4 z-50 md:hidden shadow-lg"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="p-0 w-64">
					<SidebarContent />
				</SheetContent>
			</Sheet>
		</>
	)
}
