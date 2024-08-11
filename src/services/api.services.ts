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

	EDIT_PROFILE: '/UserProfile/editprofile',

	SEND_MESSAGE: '/Message/SendMessage',
	CREATE_ZOOM_CHAT: '/Message/CreateRoomChat',
	GET_MESSAGE: '/Message/GetMessageInRoom',

	GET_USER_INFO: (id: number) => `/UserProfile/getbyid/${id}`,
	GET_ZOOM_BY_CURRENT_USER: (id: number) =>
		`/Message/GetRoomChatByCurrentUser/${id}`,

	GET_LIST_USER: (id: number) =>
		`/UserProfile/GetListUserProfileByCurrentId/${id}`,
};
