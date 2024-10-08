import { API_PATH } from '../../services/api.services';
import BaseRequest from '../../services/BaseRequest';

export interface IComment {
	id: number;
	idUser: number;
	idPost: number;
	description: string;
	createdDate: string;
	deleted: number;
	userName: string;
	avatar: string;
	totalLike?: number;
}
export interface ICreatePost {
	idGroup?: number;
	idUser?: number;
	description: string;
	urlImages: string[];
}
export interface ISearchPost {
	pTotalRecordInPage?: number;
	pBeginRecord?: number;
	userPosting?: number;
	description?: string;
	idUser?: number;
	idGroup?: number;
}

export const addPost = (data: ICreatePost) => {
	const request = new BaseRequest();

	return request.post(API_PATH.ADD_POST, data);
};

export const editPost = (data: ICreatePost) => {
	const request = new BaseRequest();

	return request.put(`/Post/EditPost`, data);
};
export const likePost = (params: { id: number }) => {
	const request = new BaseRequest();

	return request.put(`/Post/LikePost?id=${params.id}`);
};

export const likeComment = (params: { id?: number }) => {
	const request = new BaseRequest();

	return request.put(`/Comment/LikeComment?id=${params.id}`);
};
export const searchPost = (data: ISearchPost) => {
	const request = new BaseRequest();

	return request.post(API_PATH.SEARCH_POST, {
		...data,
		pTotalRecordInPage: 100,
		page: 1,
	});
};

export const createComment = (data: {
	description: string;
	idUser: number;
	idPost: number;
}) => {
	const request = new BaseRequest();

	return request.post(API_PATH.CREATE_COMMENT, data);
};

export const editComment = (id: number, data: { description: string }) => {
	const request = new BaseRequest();

	return request.put(API_PATH.EDIT_COMMENT(id), data);
};

export const deleteComment = (id: number) => {
	const request = new BaseRequest();

	return request.delete(API_PATH.DELETE_COMMENT(id));
};

export const deletePost = (data: { idUser: number; idPost: number }) => {
	const request = new BaseRequest();

	return request.delete(`/Post/DeletePost/${data.idPost}`);
};
