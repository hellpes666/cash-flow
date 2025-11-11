import Link from 'next/link';

import { Button, ButtonGroup, TypographyH1, TypographyLead } from '@shared/ui';

export default function Home() {
	return (
		<main className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12">
			<TypographyH1>
				Управление финансами с умом:
				<br />
				ваш личный ИИ-помощник уже здесь
			</TypographyH1>

			<TypographyLead className="text-md">
				С Cash Flow вы легко контролируете доходы и расходы,
				<br /> получаете умные рекомендации и планируете бюджет с помощью искусственного
				интеллекта.
			</TypographyLead>

			<ButtonGroup className="mt-6">
				<ButtonGroup>
					<Link href={'/cash-flow'}>
						<Button variant="secondary" size="lg">
							Попробовать бесплатно
						</Button>
					</Link>
				</ButtonGroup>

				<ButtonGroup>
					<Button variant="default" size="lg">
						Выбрать подписку
					</Button>
				</ButtonGroup>
			</ButtonGroup>
		</main>
	);
}
