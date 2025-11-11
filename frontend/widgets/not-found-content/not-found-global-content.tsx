import Link from 'next/link';

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@shared/ui';

export const NotFoundGlobalContent = () => {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>404 - Not Found</EmptyTitle>
				<EmptyDescription>
					The page you&apos;re looking for doesn&apos;t exist. Try searching for what you
					need below.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<EmptyDescription>
					Need help? <a href="#">Contact support</a> <br />
					Or you can go on <Link href={'/'}>home page</Link>
				</EmptyDescription>
			</EmptyContent>
		</Empty>
	);
};
