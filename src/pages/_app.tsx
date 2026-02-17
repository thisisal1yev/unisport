import type { AppProps } from 'next/app'
import '@/app/globals.css'
import { ThemeProvider } from 'next-themes'
import { AppProvider } from '@/lib/store'
import { Sidebar } from '@/components/ui/sidebar'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
		>
			<AppProvider>
				<Sidebar />

				<div className="min-h-screen bg-slate-50 dark:bg-slate-950">
					<main className="md:ml-64 p-4 md:p-8">
						<Component {...pageProps} />
					</main>
				</div>
			</AppProvider>
		</ThemeProvider>
	)
}
