/* eslint-disable no-debugger */
import { Icon24Cancel, Icon24DoneOutline, Icon24ListAdd } from '@vkontakte/icons';
import { Group, PanelHeader, PanelHeaderBack, SubnavigationBar, SubnavigationButton } from '@vkontakte/vkui';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContext } from '../components/NavigationContext';
import RuleDetail from '../components/RuleDetail';
import { uuid, setData } from '../util/helpers';
import { IDetail, URLType } from '../interfaces';
import './addRule.css';

const AddRulePanel = () => {
	const { goBack } = useContext(NavigationContext);
	const [details, setDetails] = useState<IDetail[]>([]);

	const getEmptyDetail = () => ({
		id: uuid(),
		requestURL: '',
		destinationURL: '',
		useWholeWordMatch: false,
	});

	useEffect(() => {
		if (!details.length) {
			setDetails([getEmptyDetail()]);
		}
	}, [setDetails, details.length]);

	const changeHandler = (value: string, name: URLType, index: number) => {
		setDetails((prev) => {
			const copied = [...prev];
			copied[index][name] = value;

			return copied;
		});
	};

	const addDetailHandler = () => {
		setDetails([...details, getEmptyDetail()]);
	};

	const saveRuleHandler = () => {
		const filtered = details.filter((detail) => detail.destinationURL && detail.requestURL);
		console.log(filtered);
	};

	return (
		<>
			<PanelHeader before={<PanelHeaderBack onClick={goBack} />}>Добавить правило</PanelHeader>
			<Group>
				<SubnavigationBar mode="fixed">
					<SubnavigationButton before={<Icon24DoneOutline />} size="l" textLevel="3" onClick={saveRuleHandler}>
						Сохранить
					</SubnavigationButton>
					<SubnavigationButton before={<Icon24Cancel />} size="l" textLevel="3" onClick={() => {}}>
						Отмена
					</SubnavigationButton>
					<SubnavigationButton before={<Icon24ListAdd />} size="l" textLevel="3" onClick={addDetailHandler}>
						Добавить
					</SubnavigationButton>
				</SubnavigationBar>
			</Group>
			{!!details.length &&
				details.map((redirect, index) => (
					<RuleDetail
						key={redirect.id}
						requestURL={redirect.requestURL}
						destinationURL={redirect.destinationURL}
						useWholeWordMatch={redirect.useWholeWordMatch}
						index={index}
						onChange={changeHandler}
					/>
				))}
		</>
	);
};

export default AddRulePanel;
