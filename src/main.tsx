import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/router';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ConfigProvider>
		<RouterProvider router={router}></RouterProvider>
	</ConfigProvider>
);
