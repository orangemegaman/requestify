import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ModalsProvider } from './components/ModalsContext';
import { NavigationProvider } from './components/NavigationContext';
import { StoreContextProvider } from './components/StoreContext';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <ConfigProvider>
            <AdaptivityProvider>
                <StoreContextProvider>
                    <NavigationProvider>
                        <ModalsProvider>
                            <AppRoot>
                                <App />
                            </AppRoot>
                        </ModalsProvider>
                    </NavigationProvider>
                </StoreContextProvider>
            </AdaptivityProvider>
        </ConfigProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
