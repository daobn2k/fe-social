import { API_PATH } from '../../services/api.services';
import BaseRequest from '../../services/BaseRequest';

export interface ISignUp {
	displayName: string;
	userName: string;
	email: string;
	password: string;
	phoneNumber: string;
	avatar: string;
	role: string;
	createdAt: string;
}

export const serviceSignUp = (data: ISignUp) => {
	const request = new BaseRequest();

	return request.post(API_PATH.AUTH_SIGNUP, data);
};

export const serviceSignUpGoogle = (data: { googleAccessToken: string }) => {
	const request = new BaseRequest();

	return request.post(API_PATH.AUTH_SIGN_UP_GOOGLE, data);
};
