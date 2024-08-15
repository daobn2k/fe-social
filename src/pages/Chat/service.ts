/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_PATH } from '../../services/api.services';
import BaseRequest from '../../services/BaseRequest';

interface ISendMessage {
	message: string;
	idUserSend: number;
	idUserRecieve: number;
	idRoom: number;
	urlAttach?: string;
	listUrlAttch?: string[];
}

export const createZoomChat = (data: {
	idCreatedUser: number;
	toIdUser: number;
	roomName: string;
}) => {
	const request = new BaseRequest();

	return request.post(API_PATH.CREATE_ZOOM_CHAT, data);
};

export const getMessageInZoom = (id: any) => {
	const request = new BaseRequest();

	return request.get(API_PATH.GET_MESSAGE + `/${id}`);
};

export const sendMessage = (data: ISendMessage) => {
	const request = new BaseRequest();

	return request.post(API_PATH.SEND_MESSAGE, data);
};
export const getProfile = (id: number) => {
	const request = new BaseRequest();

	return request.get(API_PATH.GET_USER_INFO(id));
};

export const getZoomChatById = (id: number) => {
	const request = new BaseRequest();

	return request.get(API_PATH.GET_ZOOM_BY_CURRENT_USER(id));
};
export const getListUser = (id: number) => {
	const request = new BaseRequest();

	return request.get(API_PATH.GET_LIST_USER(id));
};
