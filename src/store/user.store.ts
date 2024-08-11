import { atom } from 'jotai';

export type UserRole = 'user' | 'admin';
export interface User {
	accessToken: string;
	refreshToken: string;
	id: number;
	userName: string;
	password: string;
	email: string;
	phoneNumber: string;
	avatar: string;
	createdDate: string; // ISO 8601 date string
	deleted: number;
	role: UserRole;
	education: string;
	introduce: string;
	gender: string;
	job: string;
}
export const atomUser = atom<User>({
	accessToken: '',
	refreshToken: '',
	id: 0,
	userName: '',
	password: '',
	email: '',
	phoneNumber: '',
	avatar: '',
	createdDate: '',
	deleted: 0,
	role: 'user',
	introduce: '',
	education: '',
	gender: '',
	job: '',
});
