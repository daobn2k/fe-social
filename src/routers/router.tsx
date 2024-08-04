import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATH } from '../constants/routers.constant';
import AuthLayout from '../layout/AuthLayout';
import MainLayout from '../layout/MainLayout';
import Chat from '../pages/Chat';
import News from '../pages/News';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { AppLayout } from './AppLayout';
import Profile from '../pages/Profile';
import Friends from '../pages/Friends';
import Groups from '../pages/Groups';

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				element: <AuthLayout />,
				path: '/auth',
				children: [
					{
						path: ROUTE_PATH.SIGN_IN,
						element: <SignIn />,
					},
					{
						path: ROUTE_PATH.SIGN_UP,
						element: <SignUp />,
					},
				],
			},
			{
				element: <MainLayout />,
				children: [
					{
						path: ROUTE_PATH.NEWS,
						element: <News />,
					},
					{
						path: ROUTE_PATH.CHAT,
						element: <Chat />,
					},
					{
						path: ROUTE_PATH.PROFILE,
						element: <Profile />,
					},
					{
						path: ROUTE_PATH.FRIENDS,
						element: <Friends />,
					},
					{
						path: ROUTE_PATH.GROUPS,
						element: <Groups />,
					},
				],
			},
		],
	},
]);
