/* eslint-disable @typescript-eslint/no-explicit-any */
import { Images } from '@phosphor-icons/react';
import { useRequest } from 'ahooks';
import {
	Button,
	Col,
	Form,
	message,
	Modal,
	Row,
	Skeleton,
	Spin,
	Upload,
} from 'antd';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import InputTextField from '../../../components/InputTextField';
import Text from '../../../components/Text';
import { REG_EMAIL, REG_PHONE } from '../../../components/utils/reg';
import { atomUser } from '../../../store/user.store';
import { uploadFileToFirebase } from '../../../utils/common';
import styles from './modall-add-news.module.scss';
import { editProfile } from './service';
export default function ModalSettingProfile({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useAtom(atomUser);
	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imgUrls, setImgUrls] = useState<string[]>([]);
	const [loadingImages, setLoadingImages] = useState(false);

	const { runAsync } = useRequest(editProfile, {
		manual: true,
	});

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		form.resetFields();
		setImgUrls([]);
	};

	const onFinish = async (values: any) => {
		if (imgUrls?.length <= 0) {
			return message.error('Tải ảnh lên để update profile');
		}
		const d = {
			...values,
			avatar: imgUrls[0],
		};
		const res = await runAsync(user.id, d);

		if (res?.data?.code > 0) {
			setUser({
				...user,
				...d,
			});
			localStorage.setItem('user', {
				...user,
				...d,
			});
			message.success('Cập nhật thành công');
		} else {
			message.error('Cập nhật thất bại');
		}
	};

	const onChangeFile = async ({ fileList }: any) => {
		try {
			setLoadingImages(true);
			const uploadPromises = fileList.map((data: any) =>
				uploadFileToFirebase(data.originFileObj)
			);
			const downloadURLs = await Promise.all(uploadPromises);

			setImgUrls(downloadURLs);
			setLoadingImages(false);
		} catch (error) {
			console.error('Error uploading files:', error);
		}
	};

	useEffect(() => {
		if (user) {
			form.setFieldsValue(user);

			setImgUrls([user.avatar]);
		}
	}, [user, form]);
	return (
		<>
			<div onClick={showModal} style={{ width: '100%' }}>
				{' '}
				{children}
			</div>
			<Modal
				width={700}
				title="Chỉnh sửa thông tin cá nhân"
				open={isModalOpen}
				className={styles.modal}
				footer={false}
				onCancel={handleCancel}
			>
				<Form form={form} className={styles.root} onFinish={onFinish}>
					<Row gutter={[12, 12]}>
						<Col xs={12}>
							<Form.Item
								name={'userName'}
								rules={[
									{ required: true, message: 'Vui lòng điền tên tài khoản' },
								]}
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
						<Col xs={12}>
							<Form.Item name={'education'}>
								<InputTextField placeholder="Học tập" />
							</Form.Item>
						</Col>
						<Col xs={12}>
							<Form.Item name={'job'}>
								<InputTextField placeholder="Nghề nghiệp" />
							</Form.Item>
						</Col>
						<Col xs={12}>
							<Form.Item name={'gender'}>
								<InputTextField placeholder="Giới tính" />
							</Form.Item>
						</Col>
					</Row>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<Upload
							customRequest={() => void 0}
							listType="picture-card"
							multiple
							maxCount={5}
							onChange={onChangeFile}
							fileList={[]}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
								<Images size={32} />
								<Text>Chọn ảnh đại diện</Text>
							</div>
						</Upload>
					</div>
					<PreviewImages urls={imgUrls} loading={loadingImages} />
					<Form.Item noStyle shouldUpdate>
						{() => {
							return (
								<Button
									type="primary"
									className={clsx(styles.btnLogin, {
										[styles.btnSpinning]: false,
									})}
									htmlType="submit"
								>
									{false && <Spin className={styles.spin} />}

									<Text
										type="font-16-semi-bold"
										fontFamily="font-plus-jakarta"
										color="--text-primary-white"
									>
										Chỉnh sửa
									</Text>
								</Button>
							);
						}}
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

const PreviewImages = ({
	urls,
	loading,
}: {
	urls: string[];
	loading: boolean;
}) => {
	return (
		<div className={styles.previewImages}>
			{loading ? (
				<>
					<Skeleton.Button active />
				</>
			) : (
				<>
					{urls.map((url, index) => (
						<img
							key={index}
							src={url}
							alt={`Preview ${index + 1}`}
							style={{
								width: '140px',
								height: '140px',
								objectFit: 'contain',
								borderRadius: 12,
							}}
						/>
					))}
				</>
			)}
		</div>
	);
};
