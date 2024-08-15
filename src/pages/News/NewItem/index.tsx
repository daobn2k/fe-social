/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	ChatCentered,
	NotePencil,
	ShareFat,
	ThumbsUp,
	Trash,
} from '@phosphor-icons/react';
import { useRequest } from 'ahooks';
import { Button, Image, Popconfirm } from 'antd';
import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';
import styles from './index.module.scss';
// import { localStorageUtils } from '../../../components/utils/local-storage-utils';
import dayjs from 'dayjs';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { ItemComment } from '..';
import InputTextArea from '../../../components/InputTextArea';
import Text from '../../../components/Text';
import { ROUTE_PATH } from '../../../constants/routers.constant';
import { atomUser } from '../../../store/user.store';
import {
	createFullLink,
	getMediaType,
	linkifyText,
} from '../../../utils/common';
import ModalAddNews from '../ModalAddNews/ModalAddNews';
import { createComment, deletePost, IComment, likePost } from '../service';

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
	avatar,
	data,
}: any) => {
	const navigate = useNavigate();
	// const likeds = localStorageUtils.get('liked') || [];
	// const [isLiked, setIsLiked] = useState(likeds.includes(id));
	const user = useAtomValue(atomUser);
	const [textComment, setTextComment] = useState('');
	const { run: onCreateComment, loading } = useRequest(createComment, {
		manual: true,
		onSuccess() {
			setTextComment('');
			onRefreshData && onRefreshData();
		},
	});
	const { run: onLikePost } = useRequest(likePost, {
		manual: true,
		onSuccess() {
			onRefreshData && onRefreshData();
		},
	});
	const { run: onDeletePost } = useRequest(deletePost, {
		manual: true,
		onSuccess() {
			onRefreshData && onRefreshData();
		},
	});

	const onLike = () => {
		// const modifyLiked = localStorageUtils.get('liked') || [];
		// if (modifyLiked.includes(id)) {
		// 	const newLikes = modifyLiked.filter((like: any) => like !== id);

		// 	localStorageUtils.set('liked', newLikes);
		// 	setIsLiked(false);
		// } else {
		// 	modifyLiked.push(id);
		// 	localStorageUtils.set('liked', modifyLiked);
		// 	setIsLiked(true);
		// }

		onLikePost({ id });
	};
	const onComment = () => {
		const ref = document.getElementById(`text-area-${id}`);

		ref?.focus();
	};

	const goProfile = () => {
		navigate({
			pathname: ROUTE_PATH.PROFILE,
			search: `?${createSearchParams({
				userId: String(idUser),
			})}`,
		});
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

	const { videos, images } = useMemo(() => {
		const videos =
			listImage?.length > 0
				? listImage.filter((image: any) => getMediaType(image.url) !== 'image')
				: [];

		const images =
			listImage?.length > 0
				? listImage.filter((image: any) => getMediaType(image.url) === 'image')
				: [];
		return {
			videos,
			images,
		};
	}, [listImage]);

	const onShare = () => {
		createFullLink(`?news_id=${id}`);
	};

	const onDelete = () => {
		onDeletePost({
			idPost: id,
			idUser: idUser,
		});
	};
	return (
		<div className={styles.newItem}>
			<div className={styles.head}>
				<img
					src={avatar ? avatar : '/avatar.jpg'}
					className={styles.avatar}
					onClick={() => goProfile()}
				/>
				<div className={styles.info} onClick={() => goProfile()}>
					<Text type="font-14-medium" color="--text-primary">
						{displayName}
					</Text>
					<Text type="font-12-regular" color="--text-tertiary">
						{dayjs(createDate).format('HH:mm')}
					</Text>
				</div>

				{(user.role === 'admin' || user.id === idUser) && (
					<>
						<ModalAddNews data={data} reload={onRefreshData}>
							<NotePencil
								size={24}
								color="#00000"
								className={styles.editIcon}
							/>
						</ModalAddNews>
						<Popconfirm
							title="Delete the task"
							description="Are you sure to delete this task?"
							onConfirm={onDelete}
							okText="Yes"
							cancelText="No"
						>
							<Trash size={24} color="#df4343" className={styles.removeIcon} />
						</Popconfirm>
					</>
				)}
			</div>
			<div
				className={styles.richText}
				dangerouslySetInnerHTML={{
					__html: linkifyText(description as any) || '',
				}}
			/>
			<div className={styles.previewImages}>
				{videos?.map((video: any, key: number) => {
					return (
						<video
							src={video.url}
							controls
							key={key}
							style={{ width: 300, height: 300 }}
						/>
					);
				})}
				<Image.PreviewGroup
					preview={{
						onChange: (current, prev) =>
							console.log(`current index: ${current}, prev index: ${prev}`),
					}}
				>
					{images?.length > 0 ? (
						images.map((image: any, key: number) => {
							return <Image src={image.url} key={key + 'image'} />;
						})
					) : (
						<></>
					)}
				</Image.PreviewGroup>
			</div>
			<div className={styles.reaction}>
				<div className={styles.item} onClick={() => onLike()}>
					<ThumbsUp size={24} color={'blue'} weight="bold" />
					<Text type="font-14-regular" color="--text-primary">
						{data?.totalLike} Thích
					</Text>
				</div>
				<div className={styles.item} onClick={() => onComment()}>
					<ChatCentered size={24} color="#00000" weight="bold" />
					<Text type="font-14-regular" color="--text-primary">
						{listComment?.length} Bình luận
					</Text>
				</div>
				<div className={styles.item}>
					<ShareFat
						size={24}
						color="#00000"
						weight="bold"
						onClick={() => onShare()}
					/>
					<Text type="font-14-regular" color="--text-primary">
						Chia sẻ
					</Text>
				</div>
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
							idUser={comment.idUser}
							avatar={comment.avatar}
							title={comment?.userName}
							content={comment.description}
							date={comment.createdDate}
							totalLike={comment.totalLike}
							id={comment?.id}
							key={key + 'commented'}
							ellipse
							refresh={onRefreshData}
							showLike
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
