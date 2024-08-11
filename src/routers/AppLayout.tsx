import { useMount } from 'ahooks';
import { message } from 'antd';
import { useAtom } from 'jotai';
import { Outlet, useNavigate } from 'react-router-dom';
import { localStorageUtils } from '../components/utils/local-storage-utils';
import { ROUTE_PATH } from '../constants/routers.constant';
import { atomUser } from '../store/user.store';

export const AppLayout = () => {
	const [, setUser] = useAtom(atomUser);
	const router = useNavigate();
	useMount(() => {
		const user = localStorageUtils.get('user');
		if (user) {
			setUser(user);
		} else {
			message.error('Hãy đăng nhập để trải nhiệm ứng dụng');
			router(ROUTE_PATH.SIGN_IN);
		}
	});
	// if (!user.id) {
	// 	return <Spin />;
	// }

	return <Outlet />;
};
