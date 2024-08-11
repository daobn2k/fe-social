export const API_PATH = {
	AUTH_SIGNUP: '/UserProfile/addnew',
	AUTH_SIGN_UP_GOOGLE: '/Auth/google',
	AUTH_SIGN_IN: '/Auth/login',
	AUTH_SIGN_IN_GOOGLE: '/Auth/google',
	AUTH_GET_ME: '/Auth/me',
	AUTH_SESSION: '/Auth/session',

	ADD_POST: '/Post/AddNewPostOnNewFeed',
	SEARCH_POST: '/Post/SearchOption',

	ADD_GROUP: '/SocialGroup/CreateGroup',
	SEARCH_GROUP: '/SocialGroup/SearchOption',

	CREATE_COMMENT: '/Comment/CreateComment',
	EDIT_COMMENT: (id: number) => '/Comment/EditComment/' + id,
	DELETE_COMMENT: (id: number) => '/Comment/DeleteComment/' + id,
};
