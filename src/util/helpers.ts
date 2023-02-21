/* eslint-disable no-bitwise */
import STORAGE_NAME from './constants';
import { IRule, IData } from '../interfaces';

// const parseJSON = (str: string | null) => {
// 	try {
// 		if (str) {
// 			const parsedData = JSON.parse(str);
// 			return parsedData;
// 		} else {
// 			return null;
// 		}
// 	} catch (error) {
// 		return null;
// 	}
// };

export const getData = (): IData | null => {
	const data = localStorage.getItem(STORAGE_NAME);

	return data ? JSON.parse(data) : {};
};

export const getRules = (): IRule[] | [] => {
	return getData()?.rules || [];
};

export const setData = (data: IData): void => {
	localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
};

export const uuid = (): string => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;

		return v.toString(16);
	});
};
