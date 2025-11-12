import Link from 'next/link';

import { ArrowUpRightIcon } from 'lucide-react';

import { Button, TypographyH2 } from '@/shared/ui';

export const Header = () => {
	return (
		<header className="flex w-full items-center justify-between">
			<TypographyH2>
				<Link href={'/'}>Cash Flow.</Link>
			</TypographyH2>

			<nav className="flex items-center gap-2">
				<Link href={'/about'}>About</Link>

				<Link href={'/cash-flow'}>
					<Button variant="secondary" size="lg">
						Try it out <ArrowUpRightIcon />
					</Button>
				</Link>
			</nav>
		</header>
	);
};
