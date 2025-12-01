import Link from 'next/link';

import { ArrowUpRightIcon } from 'lucide-react';

import { PageRoutes } from '@/shared/constants';
import { Button, TypographyH2 } from '@/shared/ui';

export const Header = () => {
	return (
		<header className="flex w-full items-center justify-between">
			<TypographyH2>
				<Link href={PageRoutes.MAIN_PAGE}>Cash Flow.</Link>
			</TypographyH2>

			<nav className="flex items-center gap-2">
				<Link href={PageRoutes.ABOUT_PAGE}>About</Link>

				<Link href={PageRoutes.CASH_FLOW_PAGE}>
					<Button variant="secondary" size="lg">
						Try it out <ArrowUpRightIcon />
					</Button>
				</Link>
			</nav>
		</header>
	);
};
