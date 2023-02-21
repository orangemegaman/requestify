import React from 'react';
import { Icon28DeleteOutline, Icon28EditOutline, Icon28ShareExternal } from '@vkontakte/icons';
import { Caption, Card, Div, Headline, SimpleCell, Switch } from '@vkontakte/vkui';
import './style.css';

const CardComponent = () => (
	<Card mode="outline">
		<Div>
			<div className="card__header">
				<div className="card__status">
					<Headline weight="2" className="card__headline">
						Headline medium
					</Headline>
					<Switch />
				</div>
				<Caption level="1" weight="2" className="card__caption">
					{new Date().toLocaleDateString()}
				</Caption>
			</div>
			<SimpleCell className="card__action" onClick={() => {}} expandable before={<Icon28EditOutline />}>
				Редактировать
			</SimpleCell>

			<SimpleCell
				className="card__action"
				onClick={() => {}}
				expandable
				before={<Icon28DeleteOutline fill="var(--destructive)" />}
			>
				Удалить
			</SimpleCell>
		</Div>
	</Card>
);

export default CardComponent;
