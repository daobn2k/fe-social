/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Checkbox, Form, Spin, message } from 'antd';
import clsx from 'clsx';
import { memo } from 'react';
import InputFieldPassword from '../../../components/InputFieldPassword';
import InputTextField from '../../../components/InputTextField';
import { REG_EMAIL } from '../../../components/utils/reg';
import { serviceSignIn } from '../service';
import styles from './styles.module.scss';
import Text from '../../../components/Text';
import { ROUTE_PATH } from '../../../constants/routers.constant';
import { useNavigate } from 'react-router-dom';

const FormSignIn = () => {
	const { runAsync, loading } = useRequest(serviceSignIn, { manual: true });
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onFinish = async (values: {
		email: string;
		password: string;
		remember_me: boolean;
	}) => {
		const res: any = await runAsync({
			email: values.email,
			password: values.password,
		});

		if (res?.data?.success) {
			// localStorageUtils.set('accessToken', res?.data?.data?.accessToken)
			// localStorageUtils.set('refreshToken', res?.data?.data?.refreshToken)
			// message.success('Sign in successfully')
			// router.push(ROUTE_PATH.COMPOSE)
		} else {
			message.error('Sign in failed');
		}
	};

	return (
		<Form form={form} className={styles.root} onFinish={onFinish}>
			<Form.Item
				name={'email'}
				rules={[
					{ required: true, message: 'Vui lòng điền Email' },
					{ pattern: REG_EMAIL, message: 'Sai email' },
				]}
			>
				<InputTextField placeholder="Email Adress" />
			</Form.Item>
			<Form.Item
				name={'password'}
				rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
			>
				<InputFieldPassword placeholder="Mật khẩu" />
			</Form.Item>
			<div className={styles.remember}>
				<Form.Item name={'remember_me'} noStyle valuePropName="checked">
					<Checkbox>
						<Text type="font-14-medium" color="--text-tertiary">
							Ghi nhớ tài khoản
						</Text>
					</Checkbox>
				</Form.Item>
				<Text
					type="font-14-semi-bold"
					color="--text-primary"
					fontFamily="font-plus-jakarta"
					className="text-cursor-pointer"
				>
					Quên mật khẩu?
				</Text>
			</div>
			<Form.Item noStyle shouldUpdate>
				{() => {
					return (
						<Button
							className={clsx(styles.btnLogin, {
								[styles.btnSpinning]: loading,
							})}
							htmlType="submit"
						>
							{loading && (
								<Spin
									indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
									className={styles.spin}
								/>
							)}

							<Text
								type="font-16-semi-bold"
								fontFamily="font-plus-jakarta"
								color="--text-primary-white"
							>
								Đăng nhập
							</Text>
						</Button>
					);
				}}
			</Form.Item>
			<div className={styles.ask}>
				<Text
					type="font-14-medium"
					color="--text-secondary"
					fontFamily="font-plus-jakarta"
				>
					Bạn đã có tài khoản chưa?{' '}
					<Text
						element="span"
						color="--text-primary"
						type="font-14-semi-bold"
						className="text-underline text-cursor-pointer"
						fontFamily="font-plus-jakarta"
						onClick={() => {
							navigate(ROUTE_PATH.SIGN_UP);
						}}
					>
						Đăng ký ngay
					</Text>
				</Text>
			</div>
		</Form>
	);
};

export default memo(FormSignIn);
