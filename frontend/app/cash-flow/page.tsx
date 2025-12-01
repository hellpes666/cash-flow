import { QuickDashboardInfoCard } from '@/features';

import { PageRoutes } from '@/shared/constants';

const MOCK_DATA = [
	{
		title: 'Траты за месяц',
		description: 'Топ категории: Покупки, Транспорт',
		content: '222 100 ₽',
		button: { content: 'Подробнее →', link: PageRoutes.DASHBOARDS },
	},
	{
		title: 'Доход за месяц',
		description: '+8% к прошлому месяцу',
		content: '560 000 ₽',
		button: { content: 'Аналитика', link: PageRoutes.ANALYTICS },
	},
	{
		title: 'Общий баланс счетов',
		description: 'Считается баланс со всех ваших счетов',
		content: '10 560 000 ₽',
		button: { content: 'Изучить детальнее', link: PageRoutes.BANK_ACCOUNTS },
	},
];

//TODO это все фичи вынести туда + объединить в виджет
export default function DashboardQuickView() {
	return (
		<div className="mt-12 h-full">
			<section className="flex items-center gap-4">
				{MOCK_DATA.map((data, i) => {
					return <QuickDashboardInfoCard key={i} {...data} />;
				})}
			</section>

			{/* IMPLEMENT IT WHEN AI WILL ADD */}
			{/* <Card className="mx-auto mt-8 flex h-[450px] max-w-3xl flex-col hover:cursor-not-allowed">
				<CardHeader>
					<CardTitle>Чат с ассистентом</CardTitle>
				</CardHeader>
				<CardContent className="flex-1 overflow-y-auto">
					<Empty className="p-0 md:p-0">
						<EmptyHeader>
							<EmptyMedia variant="default">
								<Avatar className="size-12">
									<AvatarImage
										src="https://github.com/shadcn.png"
										className="grayscale"
									/>
									<AvatarFallback>LR</AvatarFallback>
								</Avatar>
							</EmptyMedia>
							<EmptyTitle>AI in Development</EmptyTitle>
							<EmptyDescription>
								Пока что чат с ИИ не работает.
								<br /> Он в процессе разработки!
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				</CardContent>
				<CardFooter className="flex justify-end">
					<div className="flex w-full max-w-sm items-center gap-2">
						<Input disabled type="search" placeholder="Ask something" />
						<Button disabled type="submit" variant="outline">
							Subscribe
						</Button>
					</div>
				</CardFooter>
			</Card> */}
		</div>
	);
}
