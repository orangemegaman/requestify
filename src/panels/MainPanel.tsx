import {
	Icon24AddOutline,
	Icon24ArrowDownOutline,
	Icon24ArrowUpOutline,
	Icon24DeleteOutlineAndroid,
} from '@vkontakte/icons';
import { CardGrid, Group, PanelHeader, SubnavigationBar, SubnavigationButton, Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React, { useContext, useState } from 'react';
import { NavigationContext, PanelIDs } from '../components/NavigationContext';
import RuleCard from '../components/RuleCard';
import { IRule } from '../interfaces';

type IMainPanelProps = {};

const MainPanel = ({}: IMainPanelProps) => {
	const { setActivePanel } = useContext(NavigationContext);
	const [rules, setRules] = useState<IRule[]>([]);

	return (
		<>
			<PanelHeader>Requestify 3.0</PanelHeader>
			<Group>
				<SubnavigationBar mode="fixed">
					<SubnavigationButton
						before={<Icon24AddOutline />}
						size="l"
						textLevel="3"
						onClick={() => setActivePanel(PanelIDs.STATIC_MAPPER)}
					>
						Новое правило
					</SubnavigationButton>

					<SubnavigationButton before={<Icon24ArrowUpOutline />} size="l" textLevel="3" onClick={() => {}}>
						Экспорт
					</SubnavigationButton>
					<SubnavigationButton before={<Icon24ArrowDownOutline />} size="l" textLevel="3" onClick={() => {}}>
						Импорт
					</SubnavigationButton>
					<SubnavigationButton
						before={<Icon24DeleteOutlineAndroid fill="var(--destructive)" />}
						size="l"
						textLevel="3"
						onClick={() => {}}
						style={{ color: 'var(--destructive)' }}
					>
						Удалить все правила
					</SubnavigationButton>
				</SubnavigationBar>
			</Group>

			{!rules.length ? (
				<Title
					level="1"
					weight="2"
					style={{ textAlign: 'center', color: 'var(--vkui--color_text_secondary)', marginTop: 24 }}
				>
					Active rules not found
				</Title>
			) : (
				<Group>
					<CardGrid size="s">{rules && rules.map((rule) => <RuleCard />)}</CardGrid>
				</Group>
			)}
		</>
	);
};

export default MainPanel;
