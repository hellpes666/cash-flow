import { ReactNode } from 'react';

import { cn } from '@shared/lib';

interface Props {
	children: ReactNode;
	className?: string;
}
export const TypographyLead = (props: Props) => {
	const { children, className } = props;
	return <p className={cn('text-muted-foreground text-xl', className)}>{children}</p>;
};
