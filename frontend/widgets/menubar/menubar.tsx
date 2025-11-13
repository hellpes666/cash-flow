import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from '@shared/ui';

export const CashFlowMenubar = () => {
	//TODO добавить хоткеи
	return (
		<Menubar className="mt-12 inline-flex max-w-max">
			<MenubarMenu>
				<MenubarTrigger>Доходы</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Добавить доход</MenubarItem>
					<MenubarItem>Редактировать доход</MenubarItem>
					<MenubarItem>Категории доходов</MenubarItem>
					<MenubarSeparator />
					<MenubarItem disabled>Импорт из CSV</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Расходы</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Добавить расход</MenubarItem>
					<MenubarItem>Редактировать расход</MenubarItem>
					<MenubarItem>Категории расходов</MenubarItem>
					<MenubarSeparator />
					<MenubarItem disabled>Установить лимит по категории</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Статистика</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Общий баланс</MenubarItem>
					<MenubarItem>График доходов и расходов</MenubarItem>
					<MenubarItem>Анализ по категориям</MenubarItem>
					<MenubarSeparator />
					<MenubarItem disabled>Экспорт отчета</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Счета</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Добавить счёт</MenubarItem>
					<MenubarItem>Редактировать счёт</MenubarItem>
					<MenubarItem>Перевод между счетами</MenubarItem>
					<MenubarSeparator />
					<MenubarItem disabled>Синхронизация с банком</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Настройки</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Управление категориями</MenubarItem>
					<MenubarItem>Уведомления</MenubarItem>
					<MenubarItem>Язык и валюта</MenubarItem>
					<MenubarSeparator />
					<MenubarItem disabled>Сброс данных</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};
