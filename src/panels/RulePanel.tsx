/* eslint-disable no-debugger */
import {
    Icon24Cancel,
    Icon24DoneOutline,
    Icon24ListAdd,
} from '@vkontakte/icons';
import {
    FormItem,
    Group,
    Headline,
    Input,
    PanelHeader,
    PanelHeaderBack,
    SubnavigationBar,
    SubnavigationButton,
} from '@vkontakte/vkui';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContext } from '../components/NavigationContext';
import { RuleDetail } from '../components/RuleDetail';
import { uuid } from '../util/helpers';
import { IDetail, IRule, URLType } from '../interfaces';
import { actions, StoreContext } from '../components/StoreContext';

export type IRulePanelProps = {
    rule?: IRule;
};

const RulePanel = (props: IRulePanelProps) => {
    const { goBack } = useContext(NavigationContext);
    const [details, setDetails] = useState<IDetail[]>([]);
    const [ruleName, setRuleName] = useState('');
    const { dispatch } = useContext(StoreContext);

    const { rule } = props;
    const isEdit = !!rule;

    const getEmptyDetail = () => ({
        id: uuid(),
        requestURL: '',
        destinationURL: '',
        useWholeWordMatch: false,
    });

    const createEmptyRule = (): IRule => {
        return {
            id: uuid(),
            timestamp: Date.now(),
            title: 'unnamed',
            isActive: false,
            details: [],
        };
    };

    useEffect(() => {
        if (isEdit) {
            setDetails(rule.details || []);
            setRuleName(rule.title || '');
        } else {
            setDetails([getEmptyDetail()]);
        }
    }, []);

    const changeHandler = (value: string, name: URLType, index: number) => {
        setDetails((prev) => {
            const copied = [...prev];
            copied[index][name] = value;
            return copied;
        });
    };
    const deleteHandler = (index: number) => {
        const newDetails = details.filter((detail, i) => i !== index);
        setDetails(newDetails.length ? newDetails : [getEmptyDetail()]);
    };

    const addDetailHandler = () => {
        setDetails([...details, getEmptyDetail()]);
    };

    const saveRuleHandler = () => {
        const filteredDetails = details.filter(
            (detail) => detail.destinationURL && detail.requestURL
        );
        // if (!filteredDetails.length) return;
        const newRule = {
            ...(isEdit ? rule : createEmptyRule()),
            title: ruleName,
            details: filteredDetails,
        };
        isEdit
            ? dispatch(actions.updateRule(newRule))
            : dispatch(actions.addRule(newRule));
    };

    return (
        <>
            <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
                {rule ? 'Редактировать правило' : 'Добавить правило'}
            </PanelHeader>
            <Group>
                <SubnavigationBar mode="fixed">
                    <SubnavigationButton
                        before={<Icon24DoneOutline />}
                        size="l"
                        textLevel="3"
                        onClick={saveRuleHandler}
                    >
                        Сохранить
                    </SubnavigationButton>
                    <SubnavigationButton
                        before={<Icon24Cancel />}
                        size="l"
                        textLevel="3"
                        onClick={() => {}}
                    >
                        Отмена
                    </SubnavigationButton>
                    <SubnavigationButton
                        before={<Icon24ListAdd />}
                        size="l"
                        textLevel="3"
                        onClick={addDetailHandler}
                    >
                        Добавить
                    </SubnavigationButton>
                </SubnavigationBar>
            </Group>
            <FormItem top="Rule name">
                <Input
                    type="text"
                    value={ruleName}
                    placeholder="Введите имя для правила"
                    onChange={(e) => setRuleName(e.target.value)}
                />
            </FormItem>

            {!!details.length &&
                details.map((detail, index) => (
                    <RuleDetail
                        key={detail.id}
                        requestURL={detail.requestURL}
                        destinationURL={detail.destinationURL}
                        useWholeWordMatch={detail.useWholeWordMatch}
                        index={index}
                        onChange={changeHandler}
                        onDelete={deleteHandler}
                    />
                ))}
        </>
    );
};

export default RulePanel;
