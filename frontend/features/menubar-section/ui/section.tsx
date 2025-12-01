import Link from 'next/link';

import {
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from '@/shared/ui';

export interface MenuItem {
	label: string;
	disabled?: boolean;
}

export interface Props {
	title: string;
	items: MenuItem[];
	link: string;
}

export const MenubarSection = (props: Props) => {
	const { title, items, link } = props;

	return (
		<MenubarMenu>
			<MenubarTrigger>{title}</MenubarTrigger>
			<MenubarContent>
				{items.map((item, index) =>
					item.label === '---' ? (
						<MenubarSeparator key={index} />
					) : (
						<MenubarItem asChild key={index} disabled={item.disabled}>
							<Link href={link}>{item.label}</Link>
						</MenubarItem>
					)
				)}
			</MenubarContent>
		</MenubarMenu>
	);
};
