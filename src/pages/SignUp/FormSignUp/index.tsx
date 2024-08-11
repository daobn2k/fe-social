/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Checkbox, Col, Form, Row, Spin, message } from 'antd';
import clsx from 'clsx';
import { memo } from 'react';
import { ISignUp, serviceSignUp } from '../service';
import styles from './styles.module.scss';
import { ROUTE_PATH } from '../../../constants/routers.constant';
import { useNavigate } from 'react-router-dom';
import InputTextField from '../../../components/InputTextField';
import { REG_EMAIL, REG_PHONE } from '../../../components/utils/reg';
import InputFieldPassword from '../../../components/InputFieldPassword';
import Text from '../../../components/Text';
import { serviceSignIn } from '../../SignIn/service';
import { localStorageUtils } from '../../../components/utils/local-storage-utils';
import { atomUser } from '../../../store/user.store';
import { useAtom } from 'jotai';

const FormSignUp = () => {
	const router = useNavigate();
	const [, setUser] = useAtom(atomUser);
	const { runAsync, loading } = useRequest(serviceSignUp, { manual: true });
	const { run: onSignIn, loading: loadingSignIn } = useRequest(serviceSignIn, {
		manual: true,

		onSuccess(res) {
			localStorageUtils.set('accessToken', res?.data?.source?.accessToken);
			localStorageUtils.set('user', res?.data?.source);
			setUser(res?.data?.source);
			router(ROUTE_PATH.NEWS);
		},
	});

	const [form] = Form.useForm();

	const onFinish = async (values: ISignUp) => {
		const res: any = await runAsync({
			...values,
			avatar: '',
			role: 'user',
			createdAt: '',
		});
		if (res?.data?.code > 0) {
			onSignIn({
				userName: values.userName,
				password: values.password,
			});

			message.success(res?.data?.message);
		} else {
			message.error(res?.data?.message);
		}
	};

	return (
		<Form form={form} className={styles.root} onFinish={onFinish}>
			<Row gutter={[12, 12]}>
				<Col xs={12}>
					<Form.Item
						name={'userName'}
						rules={[{ required: true, message: 'Vui lòng điền tên tài khoản' }]}
					>
						<InputTextField placeholder="Tên tài khoản" />
					</Form.Item>
				</Col>
				<Col xs={12}>
					<Form.Item
						name={'displayName'}
						rules={[{ required: true, message: 'Vui lòng điền họ và tên' }]}
					>
						<InputTextField placeholder="Họ và tên" />
					</Form.Item>
				</Col>
				<Col xs={12}>
					<Form.Item
						name={'email'}
						rules={[
							{ required: true, message: 'Vui lòng nhập email' },
							{ pattern: REG_EMAIL, message: 'Sai Email' },
						]}
					>
						<InputTextField placeholder="Email" />
					</Form.Item>
				</Col>
				<Col xs={12}>
					<Form.Item
						name={'phoneNumber'}
						rules={[
							{ required: true, message: 'Vui lòng nhập số điên thoại' },
							{
								pattern: REG_PHONE,
								message: 'Không phải định dạng số điện thoại',
							},
						]}
					>
						<InputTextField placeholder="Số diện thoại" />
					</Form.Item>
				</Col>
			</Row>

			<Form.Item
				name={'password'}
				rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
			>
				<InputFieldPassword placeholder="Mật khẩu" />
			</Form.Item>
			<Form.Item
				name={'re_password'}
				rules={[
					{ required: true, message: 'Vui lòng điền mật khẩu xác nhận' },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}

							return Promise.reject(
								new Error('Mật khẩu xác nhận đang không giống với mật khẩu')
							);
						},
					}),
				]}
			>
				<InputFieldPassword placeholder="Mật khẩu xác nhận" />
			</Form.Item>
			<div className={styles.remember}>
				<Form.Item
					name={'policy'}
					valuePropName="checked"
					rules={[
						{
							required: true,
							message: 'Vui lòng tích chọn',
						},
					]}
				>
					<Checkbox>
						<Text type="font-14-medium" color="--text-tertiary">
							Để đăng ký tài khoản hay chấp thuận các điều khoản
						</Text>
					</Checkbox>
				</Form.Item>
			</div>
			<Form.Item noStyle shouldUpdate>
				{() => {
					return (
						<Button
							className={clsx(styles.btnLogin, {
								[styles.btnSpinning]: loading || loadingSignIn,
							})}
							htmlType="submit"
						>
							{(loading || loadingSignIn) && (
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
								Đăng ký
							</Text>
						</Button>
					);
				}}
			</Form.Item>
		</Form>
	);
};

export default memo(FormSignUp);
