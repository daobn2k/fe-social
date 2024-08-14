/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_PATH } from '../../services/api.services';
import BaseRequest from '../../services/BaseRequest';

export enum EFriendOption {
	WAITING = 'WAITING',
	FRIEND = 'FRIEND',
	REQ = 'REQ',
	ALL = 'ALL',
}
export const getFriendsRequest = (data: {
	currentId: number;
	userName?: string;
	isFriend: EFriendOption;
}) => {
	const request = new BaseRequest();

	return request.post(API_PATH.USER_PROFILE_SEARCH, data);
};

export const makeFriend = (data: { idUser: number; idFriend: number }) => {
	const request = new BaseRequest();

	return request.post(API_PATH.MAKE_FRIEND, data);
};
export const approveFriend = (id: number) => {
	const request = new BaseRequest();

	return request.put(API_PATH.APPROVE_FRIEND(id));
};

export const RejectFriend = (id: number) => {
	const request = new BaseRequest();

	return request.put(API_PATH.REJECT_FRIEND(id));
};
