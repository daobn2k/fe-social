import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/router';
import './styles/index.scss';
import { Provider } from 'jotai';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Load the plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ConfigProvider>
		<Provider>
			<RouterProvider router={router}></RouterProvider>
		</Provider>
	</ConfigProvider>
);
