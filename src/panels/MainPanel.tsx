import {
    Icon24AddOutline,
    Icon24ArrowDownOutline,
    Icon24ArrowUpOutline,
    Icon24DeleteOutlineAndroid,
} from '@vkontakte/icons';
import {
    CardGrid,
    Group,
    PanelHeader,
    SubnavigationBar,
    SubnavigationButton,
    Title,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React, { useContext, useState } from 'react';
import { MODAL, ModalsContext } from '../components/ModalsContext';
import { NavigationContext, PanelIDs } from '../components/NavigationContext';

import { RuleCard } from '../components/RuleCard';
import { actions, StoreContext } from '../components/StoreContext';
import { IRule } from '../interfaces';

export type IMainPanelProps = {};

const MainPanel = ({}: IMainPanelProps) => {
    const { setActivePanel } = useContext(NavigationContext);
    const { store, dispatch } = useContext(StoreContext);
    const { setActiveModal } = useContext(ModalsContext);
    const { rules } = store;

    return (
        <>
            <PanelHeader>Requestify 3.0</PanelHeader>
            <Group>
                <SubnavigationBar mode="fixed">
                    <SubnavigationButton
                        before={<Icon24AddOutline />}
                        size="l"
                        textLevel="3"
                        onClick={() => setActivePanel(PanelIDs.RULE)}
                    >
                        Новое правило
                    </SubnavigationButton>

                    <SubnavigationButton
                        before={<Icon24ArrowUpOutline />}
                        size="l"
                        textLevel="3"
                        onClick={() => {
                            setActiveModal(MODAL.EXPORT);
                        }}
                    >
                        Экспорт
                    </SubnavigationButton>
                    <SubnavigationButton
                        before={<Icon24ArrowDownOutline />}
                        size="l"
                        textLevel="3"
                        onClick={() => {
                            setActiveModal(MODAL.IMPORT);
                        }}
                    >
                        Импорт
                    </SubnavigationButton>
                    <SubnavigationButton
                        before={
                            <Icon24DeleteOutlineAndroid fill="var(--destructive)" />
                        }
                        size="l"
                        textLevel="3"
                        onClick={() => {
                            dispatch(actions.clearAll());
                        }}
                        style={{ color: 'var(--destructive)' }}
                    >
                        Удалить все правила
                    </SubnavigationButton>
                    <SubnavigationButton
                        before={
                            <Icon24DeleteOutlineAndroid fill="var(--destructive)" />
                        }
                        size="l"
                        textLevel="3"
                        onClick={() => {
                            dispatch(
                                actions.addRule({
                                    id: '1',
                                    timestamp: 324234,
                                    title: 'string',
                                    isActive: false,
                                    details: [
                                        {
                                            id: 'string',
                                            requestURL: 'string',
                                            destinationURL: 'string',
                                            useWholeWordMatch: true,
                                        },
                                        {
                                            id: 'string1',
                                            requestURL: 'string',
                                            destinationURL: 'string',
                                            useWholeWordMatch: true,
                                        },
                                    ],
                                })
                            );
                        }}
                        style={{ color: 'var(--destructive)' }}
                    >
                        dump
                    </SubnavigationButton>
                </SubnavigationBar>
            </Group>

            {!rules.length ? (
                <Title
                    level="1"
                    weight="2"
                    style={{
                        textAlign: 'center',
                        color: 'var(--vkui--color_text_secondary)',
                        marginTop: 24,
                    }}
                >
                    Active rules not found
                </Title>
            ) : (
                <Group>
                    <CardGrid size="s">
                        {rules &&
                            rules.map((rule: IRule) => (
                                <RuleCard key={rule.id} {...rule} />
                            ))}
                    </CardGrid>
                </Group>
            )}
        </>
    );
};

export default MainPanel;
