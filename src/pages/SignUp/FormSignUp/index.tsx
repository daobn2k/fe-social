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
			message.success('Sign up successfully');
			router(ROUTE_PATH.SIGN_IN);
		} else {
			message.error('Sign up failed');
		}
	};

	return (
		<Form form={form} className={styles.root} onFinish={onFinish}>
			<Row gutter={[12, 12]}>
				<Col xs={12}>
					<Form.Item
						name={'firstName'}
						rules={[{ required: true, message: 'Please enter first name' }]}
					>
						<InputTextField placeholder="First Name" />
					</Form.Item>
				</Col>
				<Col xs={12}>
					<Form.Item
						name={'lastName'}
						rules={[{ required: true, message: 'Please enter last name' }]}
					>
						<InputTextField placeholder="Last Name" />
					</Form.Item>
				</Col>
			</Row>
			<Form.Item
				name={'email'}
				rules={[
					{ required: true, message: 'Please enter email' },
					{ pattern: REG_EMAIL, message: 'Email invalid' },
				]}
			>
				<InputTextField placeholder="Email Adress" />
			</Form.Item>
			<Form.Item
				name={'password'}
				rules={[{ required: true, message: 'Please enter password' }]}
			>
				<InputFieldPassword placeholder="Password" />
			</Form.Item>
			<Form.Item
				name={'re_password'}
				rules={[
					{ required: true, message: 'Please enter confirm password' },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}

							return Promise.reject(
								new Error(
									'Confirmation password is not the same as the current password'
								)
							);
						},
					}),
				]}
			>
				<InputFieldPassword placeholder="Confirm Password" />
			</Form.Item>
			<div className={styles.remember}>
				<Form.Item
					name={'policy'}
					valuePropName="checked"
					rules={[
						{
							required: true,
							message:
								'Please agree Term of Use and Conditions of Use to register ',
						},
					]}
				>
					<Checkbox>
						<Text type="font-14-medium" color="--text-tertiary">
							By clicking on Register, you agree to our{' '}
							<Text
								element="span"
								type="font-14-medium"
								color="--text-primary"
								fontFamily="font-plus-jakarta"
								className="text-cursor-pointer"
							>
								Terms of Use
							</Text>{' '}
							and{' '}
							<Text
								element="span"
								type="font-14-medium"
								color="--text-primary"
								fontFamily="font-plus-jakarta"
								className="text-cursor-pointer"
							>
								Conditions of Use
							</Text>
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
								Register
							</Text>
						</Button>
					);
				}}
			</Form.Item>
		</Form>
	);
};

export default memo(FormSignUp);
