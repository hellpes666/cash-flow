import Link from 'next/link';

import { PageRoutes } from '@/shared/constants';
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/ui';

interface Props {
	title: string;
	description: string;
	content: string;
	button: {
		link: PageRoutes;
		content: string;
	};
}

export const QuickDashboardInfoCard = (props: Props) => {
	const { title, description, content, button } = props;

	return (
		<Card className="max-w-full min-w-[90vw] md:min-w-[30vw]">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-2xl font-bold">{content}</p>
			</CardContent>
			<CardFooter className="flex justify-end">
				<Link href={button.link}>
					<Button variant="ghost">{button.content}</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};
