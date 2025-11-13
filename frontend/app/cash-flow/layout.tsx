import type { Metadata } from 'next';

import { CashFlowMenubar } from '@/widgets';

export const metadata: Metadata = {
	title: 'Все операции | Cash Flow',
	description:
		'Вся ваша финансовая активность в одном месте — отслеживайте расходы, доходы, переводы и управляйте ими легко с Cash Flow и ИИ-помощником.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<CashFlowMenubar />
			{children}
		</>
	);
}
