/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatCentered, ThumbsUp, Trash } from '@phosphor-icons/react';
import { useRequest } from 'ahooks';
import { Button, Image } from 'antd';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import styles from './index.module.scss';
import { localStorageUtils } from '../../../components/utils/local-storage-utils';
import { atomUser } from '../../../store/user.store';
import { createComment, IComment } from '../service';
import Text from '../../../components/Text';
import InputTextArea from '../../../components/InputTextArea';
import { ItemComment } from '..';
import dayjs from 'dayjs';

const NewItem = ({
	displayName,
	description,
	listImage,
	id,
	listComment = [],
	onRefreshData,
	loadingRefresh,
	idUser,
	createDate,
}: any) => {
	const likeds = localStorageUtils.get('liked') || [];
	const [isLiked, setIsLiked] = useState(likeds.includes(id));
	const user = useAtomValue(atomUser);
	const [textComment, setTextComment] = useState('');
	const { run: onCreateComment, loading } = useRequest(createComment, {
		manual: true,
		onSuccess() {
			setTextComment('');
			onRefreshData && onRefreshData();
		},
	});

	const onLike = () => {
		const modifyLiked = localStorageUtils.get('liked') || [];
		if (modifyLiked.includes(id)) {
			const newLikes = modifyLiked.filter((like: any) => like !== id);

			localStorageUtils.set('liked', newLikes);
			setIsLiked(false);
		} else {
			modifyLiked.push(id);
			localStorageUtils.set('liked', modifyLiked);
			setIsLiked(true);
		}
	};
	const onComment = () => {
		const ref = document.getElementById(`text-area-${id}`);

		ref?.focus();
	};

	// const onShare = () => {
	// 	navigator.clipboard
	// 		.writeText(link)
	// 		.then(() => {
	// 			alert('Link copied to clipboard!');
	// 		})
	// 		.catch((err) => {
	// 			console.error('Failed to copy: ', err);
	// 		});
	// };
	return (
		<div className={styles.newItem}>
			<div className={styles.head}>
				<img src="/avatar.jpg" className={styles.avatar} />
				<div className={styles.info}>
					<Text type="font-14-medium" color="--text-primary">
						{displayName}
					</Text>
					<Text type="font-12-regular" color="--text-tertiary">
						{dayjs(createDate).add(7, 'hour').format('HH:mm')}
					</Text>
				</div>

				{(user.role === 'admin' || user.id === idUser) && (
					<Trash size={24} color="#df4343" className={styles.removeIcon} />
				)}
			</div>
			<div
				className={styles.richText}
				dangerouslySetInnerHTML={{
					__html: description,
				}}
			/>
			<div className={styles.previewImages}>
				<Image.PreviewGroup
					preview={{
						onChange: (current, prev) =>
							console.log(`current index: ${current}, prev index: ${prev}`),
					}}
				>
					{listImage?.length > 0 ? (
						listImage.map((image: any, key: number) => {
							return <Image src={image.url} key={key + 'image'} />;
						})
					) : (
						<></>
					)}
				</Image.PreviewGroup>
			</div>
			<div className={styles.reaction}>
				<div className={styles.item} onClick={() => onLike()}>
					<ThumbsUp
						size={24}
						color={isLiked ? 'blue' : '#00000'}
						weight="bold"
					/>
					<Text type="font-14-regular" color="--text-primary">
						Thích
					</Text>
				</div>
				<div className={styles.item} onClick={() => onComment()}>
					<ChatCentered size={24} color="#00000" weight="bold" />
					<Text type="font-14-regular" color="--text-primary">
						{listComment?.length} Bình luận
					</Text>
				</div>
				{/* <div className={styles.item}>
					<ShareFat size={24} color="#00000" weight="bold" onClick={() => onShare()}/>
					<Text type="font-14-regular" color="--text-primary">
						Chia sẻ
					</Text>
				</div> */}
			</div>

			<div className={styles.listComments}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
					<InputTextArea
						id={`text-area-${id}`}
						placeholder="Hãy bình luận gì đó"
						disabled={loading || loadingRefresh}
						onChange={(e) => setTextComment(e.target.value)}
						value={textComment}
					/>
					<Button
						type="primary"
						size="small"
						style={{
							width: 'fit-content',
							padding: 8,
							height: 36,
							alignSelf: 'end',
						}}
						loading={loading || loadingRefresh}
						disabled={loading || loadingRefresh}
						onClick={() =>
							onCreateComment({
								description: textComment,
								idUser: user.id,
								idPost: id,
							})
						}
					>
						Gửi bình luận
					</Button>
				</div>
				{listComment?.map((comment: IComment, key: number) => {
					return (
						<ItemComment
							title={comment?.userName}
							content={comment.description}
							date={comment.createdDate}
							key={key + 'commented'}
						/>
					);
				})}
			</div>
			{/* <Text
				type="font-14-semi-bold"
				color="--text-primary"
				style={{ textAlign: 'center', cursor: 'pointer' }}
			>
				Xem thêm bình luận
			</Text> */}
		</div>
	);
};

export default NewItem;
