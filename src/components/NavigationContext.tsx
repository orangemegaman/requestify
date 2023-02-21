import React, { useCallback, useState } from 'react';

export enum PanelIDs {
	MAIN = 'main',
	STATIC_MAPPER = 'static_mapper',
}

type NavigationContextType = {
	activePanel: PanelIDs;
	panelHistory: PanelIDs[];
	setActivePanel: (panel: PanelIDs) => void;
	goBack: () => void;
};

export const NavigationContext = React.createContext<NavigationContextType>({
	activePanel: PanelIDs.MAIN,
	panelHistory: [],
	setActivePanel: () => undefined,
	goBack: () => undefined,
});

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [history, setHistory] = useState([PanelIDs.MAIN]);
	const [activePanel, setActivePanel] = useState<PanelIDs>(PanelIDs.MAIN);

	const setActivePanelHandler = useCallback((panel: PanelIDs) => {
		setActivePanel(panel);
		setHistory((prev) => [...prev, panel]);
	}, []);

	const goBackHandler = useCallback(() => {
		const prevPanel = history.at(-2);
		if (prevPanel) {
			setActivePanel(prevPanel);
			setHistory((prev) => prev.slice(0, prev.length - 1));
		}
	}, [history]);

	return (
		<NavigationContext.Provider
			value={{
				activePanel,
				panelHistory: [],
				setActivePanel: setActivePanelHandler,
				goBack: goBackHandler,
			}}
		>
			{children}
		</NavigationContext.Provider>
	);
};
