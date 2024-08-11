/* eslint-disable @typescript-eslint/no-explicit-any */
import { Images } from '@phosphor-icons/react';
import { useRequest } from 'ahooks';
import { Button, Form, message, Modal, Skeleton, Upload } from 'antd';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import InputTextField from '../../../components/InputTextField';
import Text from '../../../components/Text';
import { atomUser } from '../../../store/user.store';
import { uploadFileToFirebase } from '../../../utils/common';
import { addGroup, ETypeGroup } from '../service';
import styles from './modall-add-news.module.scss';
export default function ModalAddGroup({
	children,
	reload,
}: {
	children: React.ReactNode;
	reload: any;
}) {
	const user = useAtomValue(atomUser);
	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imgUrls, setImgUrls] = useState<string[]>([]);
	const [loadingImages, setLoadingImages] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		form.resetFields();
		setImgUrls([]);
	};

	const { run, loading } = useRequest(addGroup, {
		manual: true,
		onSuccess(res) {
			if (res?.data?.code > 0) {
				message.success('Tạo nhóm thành công');
				reload && reload();
				handleCancel();
			} else {
				message.error('Tạo nhóm thất bại');
			}
		},
	});

	const onFinish = (values: any) => {
		run({
			groupName: values.description,
			backGround: imgUrls[0],
			idUserCreated: user.id,
			typeGroup: ETypeGroup.PUBLIC,
		});
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
	return (
		<>
			<div onClick={showModal} style={{ width: '100%' }}>
				{' '}
				{children}
			</div>
			<Modal
				title="Tin mới"
				open={isModalOpen}
				className={styles.modal}
				footer={false}
				onCancel={handleCancel}
			>
				<Form form={form} onFinish={onFinish}>
					<Form.Item
						name={'description'}
						rules={[{ message: 'Bạn chưa nhập thông tin', required: true }]}
					>
						<InputTextField maxLength={64} placeholder="Tên nhóm" />
					</Form.Item>
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
								<Text>Chọn ảnh đại diện nhóm</Text>
							</div>
						</Upload>
					</div>
					<PreviewImages urls={imgUrls} loading={loadingImages} />
					<div className={styles.formBtn}>
						<Button
							type="primary"
							danger
							onClick={handleCancel}
							disabled={loading || loadingImages}
						>
							Huỷ
						</Button>
						<Form.Item noStyle>
							<Button
								htmlType="submit"
								type="primary"
								disabled={loading || loadingImages}
								loading={loading || loadingImages}
							>
								Tạo tin
							</Button>
						</Form.Item>
					</div>
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
								width: '100%',
								height: '300px',
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
