import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { NavigationProvider } from './components/NavigationContext';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<ConfigProvider>
			<AdaptivityProvider>
				<NavigationProvider>
					<AppRoot>
						<App />
					</AppRoot>
				</NavigationProvider>
			</AdaptivityProvider>
		</ConfigProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
