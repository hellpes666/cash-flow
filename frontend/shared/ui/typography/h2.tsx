import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export const TypographyH2 = (props: Props) => {
	const { children } = props;

	return (
		<h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
			{children}
		</h2>
	);
};
