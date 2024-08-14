/* eslint-disable @typescript-eslint/no-explicit-any */
import { Images, Smiley } from '@phosphor-icons/react';
import { Button, Form, message, Modal, Skeleton, Upload } from 'antd';
import EmojiPicker from 'emoji-picker-react';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import InputTextArea from '../../../components/InputTextArea';
import Text from '../../../components/Text';
import { atomUser } from '../../../store/user.store';
import { getMediaType, uploadFileToFirebase } from '../../../utils/common';
import styles from './modall-add-news.module.scss';
import { useRequest } from 'ahooks';
import { addPost } from '../service';
export default function ModalAddNews({
	children,
	groupId,
	reload,
}: {
	children: React.ReactNode;
	groupId?: number;
	reload?: any;
}) {
	const user = useAtomValue(atomUser);
	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [previewEmoji, setPreviewEmoji] = useState(false);
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

	const { run, loading } = useRequest(addPost, {
		manual: true,
		onSuccess(res) {
			if (res?.data?.code > 0) {
				message.success('Tạo tin thành công');
				reload && reload();
				handleCancel();
			} else {
				message.error('Tạo tin thất bại');
			}
		},
	});

	const onPreviewEmoji = () => {
		setPreviewEmoji(true);
	};

	const onEmojiClick = (emojiObject: any) => {
		const textAreaInput = form.getFieldValue('description') ?? '';
		form.setFieldValue('description', textAreaInput + emojiObject.emoji);
		setPreviewEmoji(false);
	};

	const onFinish = (values: any) => {
		const data: any = {
			description: values.description,
			urlImages: imgUrls,
			idUser: user.id,
		};

		if (groupId) {
			data.idGroup = groupId;
		}
		run(data);
	};

	const onChangeFile = async ({ fileList }: any) => {
		try {
			setLoadingImages(true);
			const uploadPromises = fileList.map((data: any) =>
				uploadFileToFirebase(data.originFileObj)
			);
			const downloadURLs = await Promise.all(uploadPromises);

			console.log(downloadURLs, 'downloadURLs');

			setImgUrls(downloadURLs);
			setLoadingImages(false);
		} catch (error) {
			console.error('Error uploading files:', error);
		}
	};
	return (
		<>
			<div onClick={showModal} style={{ width: '100%' }}>
				{children}
			</div>
			<Modal
				width={720}
				title="Tin mới"
				open={isModalOpen}
				className={styles.modal}
				footer={false}
				onCancel={handleCancel}
			>
				<div className={styles.head}>
					<img
						src={user.avatar ? user.avatar : '/avatar.jpg'}
						className={styles.avatar}
					/>
					<div className={styles.info}>
						<Text type="font-14-medium" color="--text-primary">
							{user.userName}
						</Text>
					</div>
				</div>
				<Form form={form} onFinish={onFinish}>
					<Form.Item
						name={'description'}
						rules={[{ message: 'Bạn chưa nhập thông tin', required: true }]}
					>
						<InputTextArea rows={5} placeholder="Hôm nay bạn nghĩ gì" />
					</Form.Item>
					<PreviewImages urls={imgUrls} loading={loadingImages} />
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<Upload
							customRequest={() => void 0}
							listType="picture-card"
							multiple
							maxCount={5}
							onChange={onChangeFile}
							fileList={[]}
						>
							<Images size={32} />
						</Upload>
						<Smiley
							size={32}
							onClick={onPreviewEmoji}
							style={{ cursor: 'pointer' }}
						/>
						<EmojiPicker
							open={previewEmoji}
							onEmojiClick={onEmojiClick}
							style={{
								position: 'absolute',
								bottom: '-348px',
								zIndex: 9999999,
							}}
						/>
					</div>
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
					<Skeleton.Button active />
					<Skeleton.Button active />
					<Skeleton.Button active />
					<Skeleton.Button active />
				</>
			) : (
				<>
					{urls.map((url, index) => {
						const type: any = getMediaType(url);

						return type === 'video' ? (
							<video
								key={index}
								src={url}
								style={{
									width: '300px',
									height: '300px',
									objectFit: 'cover',
									borderRadius: 12,
								}}
								controls
							/>
						) : (
							<img
								key={index}
								src={url}
								alt={`Preview ${index + 1}`}
								style={{
									width: '300px',
									height: '300px',
									objectFit: 'cover',
									borderRadius: 12,
								}}
							/>
						);
					})}
				</>
			)}
		</div>
	);
};
