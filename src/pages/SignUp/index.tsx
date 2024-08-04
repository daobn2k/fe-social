/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRequest } from 'ahooks';
import { Spin, message } from 'antd';
import FormSignUp from './FormSignUp';
import { serviceSignUpGoogle } from './service';
import styles from './styles.module.scss';
import { localStorageUtils } from '../../components/utils/local-storage-utils';
import { useNavigate } from 'react-router-dom';
import WrapperAuth from '../../components/WrapperAuth';
import Text from '../../components/Text';

export default function SignUp() {
	const router = useNavigate();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { loading } = useRequest(serviceSignUpGoogle, {
		manual: true,
		onSuccess(res: any) {
			if (res?.data?.success) {
				localStorageUtils.set('accessToken', res?.data?.data?.accessToken);
				localStorageUtils.set('refreshToken', res?.data?.data?.refreshToken);
				message.success('Sign up with google successfully');
				router('/');
			} else {
				message.error('Sign up with google failed');
			}
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
					Đăng ký tài khoản ViConnect
				</Text>
				<Text
					type="font-16-medium"
					color="--text-primary"
					fontFamily="font-fauces"
					style={{ textAlign: 'center' }}
				>
					Trang web giành cho cộng đồng người Việt kết nối và trao đổi
				</Text>
				<FormSignUp />
			</WrapperAuth>
		</Spin>
	);
}
