/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_PATH } from '../../../services/api.services';
import BaseRequest from '../../../services/BaseRequest';

export const editProfile = (id: number, data: any) => {
	const request = new BaseRequest();

	return request.put(API_PATH.EDIT_PROFILE + `/${id}`, data);
};
