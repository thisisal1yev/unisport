import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '@/app/globals.css'
import { ThemeProvider } from 'next-themes'
import { AppProvider } from '@/lib/store'
import { AdminLayout } from '@/layouts/admin-layout'
import { CoachLayout } from '@/layouts/coach-layout'
import { SportsmanLayout } from '@/layouts/sportsman-layout'

function getLayoutForRoute(pathname: string) {
	if (pathname.startsWith('/admin')) return AdminLayout
	if (pathname.startsWith('/coach')) return CoachLayout
	if (pathname.startsWith('/sportsman')) return SportsmanLayout
	return null
}

export default function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const Layout = getLayoutForRoute(router.pathname)

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
		>
			<AppProvider>
				{Layout ? (
					<Layout>
						<Component {...pageProps} />
					</Layout>
				) : (
					<Component {...pageProps} />
				)}
			</AppProvider>
		</ThemeProvider>
	)
}
