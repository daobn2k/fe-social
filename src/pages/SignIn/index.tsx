/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import FormSignIn from './FormSignIn';
import { serviceSignInGoogle } from './service';
import styles from './styles.module.scss';
import Text from '../../components/Text';
import WrapperAuth from '../../components/WrapperAuth';

export default function SignIn() {
	const { loading } = useRequest(serviceSignInGoogle, {
		manual: true,
		onSuccess() {
			// if (res?.data?.success) {
			//   localStorageUtils.set('accessToken', res?.data?.data?.accessToken)
			//   localStorageUtils.set('refreshToken', res?.data?.data?.refreshToken)
			//   message.success('Sign in with google successfully')
			//   router.push(ROUTE_PATH.COMPOSE)
			// } else {
			//   message.error('Sign in with google failed')
			// }
		},
	});
	return (
		<Spin spinning={loading}>
			<WrapperAuth className={styles.root}>
				<Text
					type="font-32-semi-bold"
					color="--text-primary"
					fontFamily="font-fauces"
					style={{ textAlign: 'center' }}
				>
					Đăng nhập ViConnect
				</Text>
				<Text
					type="font-16-medium"
					color="--text-primary"
					fontFamily="font-fauces"
					style={{ textAlign: 'center' }}
				>
					Trang web giành cho cộng đồng người Việt kết nối và trao đổi
				</Text>
				<FormSignIn />
			</WrapperAuth>
		</Spin>
	);
}
