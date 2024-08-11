import { API_PATH } from '../../services/api.services';
import BaseRequest from '../../services/BaseRequest';

export enum ETypeGroup {
	PUBLIC = 'PUB',
	PRIVATE = 'PRI',
}
export interface IComment {
	idUserCreated: number;
	groupName: string;
	typeGroup: string;
	backGround: string;
}
export interface ICreateGroup {
	idUserCreated: number;
	groupName: string;
	typeGroup: string;
	backGround: string;
}
export interface ISearchGroup {
	pTotalRecordInPage?: number;
	pBeginRecord?: number;
	groupName?: string;
}

export const addGroup = (data: ICreateGroup) => {
	const request = new BaseRequest();

	return request.post(API_PATH.ADD_GROUP, data);
};
export const searchGroup = (data: ISearchGroup) => {
	const request = new BaseRequest();

	return request.post(API_PATH.SEARCH_GROUP, data);
};
