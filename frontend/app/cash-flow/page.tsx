import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
	Input,
} from '@/shared/ui';

//TODO это все фичи вынести туда + объединить в виджет
export default function DashboardQuickView() {
	return (
		<div className="mt-12 h-full flex-col">
			<section className="flex items-center gap-4">
				<Card className="max-w-full min-w-[90vw] md:min-w-[30vw]">
					<CardHeader>
						<CardTitle>Траты за месяц</CardTitle>
						<CardDescription>Топ категории: Покупки, Транспорт</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">222 100 ₽</p>
					</CardContent>
					<CardFooter className="flex justify-end">
						<button className="text-primary hover:underline">Подробнее →</button>
					</CardFooter>
				</Card>
				<Card className="max-w-full min-w-[90vw] md:min-w-[30vw]">
					<CardHeader>
						<CardTitle>Доход за месяц</CardTitle>
						<CardDescription>+8% к прошлому месяцу</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">560 000 ₽</p>
					</CardContent>
					<CardFooter className="flex justify-end">
						<button className="text-primary hover:underline">Аналитика</button>
					</CardFooter>
				</Card>
				<Card className="max-w-full min-w-[90vw] md:min-w-[30vw]">
					<CardHeader>
						<CardTitle>Общий баланс счетов</CardTitle>
						<CardDescription>Считается баланс со всех ваших счетов</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">10 560 000 ₽</p>
					</CardContent>
					<CardFooter className="flex justify-end">
						<button className="text-primary hover:underline">Изучить детальнее</button>
					</CardFooter>
				</Card>
			</section>

			<Card className="mx-auto mt-8 flex h-[450px] max-w-3xl flex-col hover:cursor-not-allowed">
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
			</Card>
		</div>
	);
}
