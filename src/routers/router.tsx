import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATH } from '../constants/routers.constant';
import AuthLayout from '../layout/AuthLayout';
import MainLayout from '../layout/MainLayout';
import Chat from '../pages/Chat';
import News from '../pages/News';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { AppLayout } from './AppLayout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				element: <AuthLayout />,
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
				],
			},
		],
	},
]);
