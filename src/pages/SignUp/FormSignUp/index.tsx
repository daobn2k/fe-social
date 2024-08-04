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
import { REG_EMAIL } from '../../../components/utils/reg';
import InputFieldPassword from '../../../components/InputFieldPassword';
import Text from '../../../components/Text';

const FormSignUp = () => {
	const { runAsync, loading } = useRequest(serviceSignUp, { manual: true });

	const [form] = Form.useForm();
	const router = useNavigate();

	const onFinish = async (values: ISignUp) => {
		const res: any = await runAsync(values);

		if (res?.data?.success) {
			// localStorageUtils.set('accessToken', res?.data?.data?.accessToken)
			// localStorageUtils.set('refreshToken', res?.data?.data?.refreshToken)
			message.success('Đăng ký thành công');
			router(ROUTE_PATH.SIGN_IN);
		} else {
			message.error('Đăng ký thất bại');
		}
	};

	return (
		<Form form={form} className={styles.root} onFinish={onFinish}>
			<Row gutter={[12, 12]}>
				<Col xs={24}>
					<Form.Item
						name={'name'}
						rules={[{ required: true, message: 'Vui lòng điền họ và tên' }]}
					>
						<InputTextField placeholder="Họ và tên" />
					</Form.Item>
				</Col>
			</Row>
			<Form.Item
				name={'email'}
				rules={[
					{ required: true, message: 'Vui lòng nhập email' },
					{ pattern: REG_EMAIL, message: 'Sai Email' },
				]}
			>
				<InputTextField placeholder="Email" />
			</Form.Item>
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
