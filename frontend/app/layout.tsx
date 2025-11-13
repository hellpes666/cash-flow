import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Header } from '@/widgets';

import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Cash Flow | Ваш помощник в управлении финансами',
	description:
		'Держите свои деньги под контролем с Cash Flow — умный ИИ-помощник, удобное планирование бюджета, бесплатный тариф и подписки для максимальной эффективности.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`dark ${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col px-18 py-6 antialiased`}
			>
				<Header />
				<main className="flex h-full w-full flex-1 flex-col">{children}</main>
			</body>
		</html>
	);
}
