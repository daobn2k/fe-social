/* eslint-disable @typescript-eslint/no-unused-vars */
import { Spin } from 'antd';
import Text from '../../components/Text';
import WrapperAuth from '../../components/WrapperAuth';
import FormSignIn from './FormSignIn';
import styles from './styles.module.scss';

export default function SignIn() {
	return (
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
	);
}
