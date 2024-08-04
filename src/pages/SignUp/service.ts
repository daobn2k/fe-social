import { API_PATH } from '../../services/api.services';
import BaseRequest from '../../services/BaseRequest';

export interface ISignUp {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const serviceSignUp = (data: ISignUp) => {
	const request = new BaseRequest();

	return request.post(API_PATH.AUTH_SIGNUP, data);
};

export const serviceSignUpGoogle = (data: { googleAccessToken: string }) => {
	const request = new BaseRequest();

	return request.post(API_PATH.AUTH_SIGN_UP_GOOGLE, data);
};
