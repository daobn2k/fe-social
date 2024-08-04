import { API_PATH } from '../../services/api.services';
import BaseRequest from '../../services/BaseRequest';

export interface ISignIn {
	email: string;
	password: string;
}

export const serviceSignIn = (data: ISignIn) => {
	const request = new BaseRequest();

	return request.post(API_PATH.AUTH_SIGN_IN, data);
};

export const serviceSignInGoogle = (data: { googleAccessToken: string }) => {
	const request = new BaseRequest();

	return request.post(API_PATH.AUTH_SIGN_UP_GOOGLE, data);
};
