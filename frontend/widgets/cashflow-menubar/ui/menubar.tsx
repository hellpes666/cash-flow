import { MenubarSection } from '@/features';

import { PageRoutes } from '@/shared/constants';
import { Menubar } from '@/shared/ui';

export const CashFlowMenubar = () => {
	return (
		<Menubar className="mt-12 inline-flex max-w-max">
			<MenubarSection
				title="Доходы"
				items={[
					{ label: 'Добавить доход' },
					{ label: 'Редактировать доход' },
					{ label: 'Категории доходов' },
					{ label: '---' },
					{ label: 'Импорт из CSV', disabled: true },
				]}
				link={PageRoutes.CASH_FLOW_INCOME}
			/>

			<MenubarSection
				title="Расходы"
				items={[
					{ label: 'Добавить расход' },
					{ label: 'Редактировать расход' },
					{ label: 'Категории расходов' },
					{ label: '---' },
					{ label: 'Установить лимит по категории', disabled: true },
				]}
				link={PageRoutes.CASH_FLOW_EXPENSES}
			/>

			<MenubarSection
				title="Статистика"
				items={[
					{ label: 'Общий баланс' },
					{ label: 'График доходов и расходов' },
					{ label: 'Анализ по категориям' },
					{ label: '---' },
					{ label: 'Экспорт отчета', disabled: true },
				]}
				link={PageRoutes.CASH_FLOW_STATS}
			/>

			<MenubarSection
				title="Счета"
				items={[
					{ label: 'Добавить счёт' },
					{ label: 'Редактировать счёт' },
					{ label: 'Перевод между счетами' },
					{ label: '---' },
					{ label: 'Синхронизация с банком', disabled: true },
				]}
				link={PageRoutes.BANK_ACCOUNTS}
			/>
		</Menubar>
	);
};
