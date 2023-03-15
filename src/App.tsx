import {
    Panel,
    PanelHeader,
    SplitCol,
    SplitLayout,
    View,
} from '@vkontakte/vkui';
import { useContext, useEffect, useState } from 'react';
import { getData } from './util/helpers';
import { IRule } from './interfaces';
import AddRulePanel from './panels/AddRulePanel';
import MainPanel from './panels/MainPanel';
import './app.css';
import '@vkontakte/vkui/dist/vkui.css';
import { NavigationContext, PanelIDs } from './components/NavigationContext';
import { Modal } from './components/Modal';

export const App = () => {
    const { activePanel, setActivePanel } = useContext(NavigationContext);
    const [panel, setPanel] = useState('main');
    const [popout, setPopout] = useState(null);
    const [rules, setRules] = useState<IRule[]>([]);
    const isDesktop = true;

    useEffect(() => {
        const data = getData();
        if (data?.rules) {
            setRules(data.rules);
        }
    }, []);

    return (
        <SplitLayout
            style={{ justifyContent: 'center' }}
            header={<PanelHeader separator={false} />}
            popout={popout}
            modal={<Modal />}
        >
            <SplitCol animate={false} spaced={isDesktop}>
                <View activePanel={activePanel}>
                    <Panel id={PanelIDs.MAIN}>
                        <MainPanel />
                    </Panel>
                    <Panel id={PanelIDs.STATIC_MAPPER}>
                        <AddRulePanel />
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    );
};
