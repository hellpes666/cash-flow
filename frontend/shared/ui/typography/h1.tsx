import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export const TypographyH1 = (props: Props) => {
	const { children } = props;

	return (
		<h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
			{children}
		</h1>
	);
};
