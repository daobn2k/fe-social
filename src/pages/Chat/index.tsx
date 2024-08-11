/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	DotsThree,
	MagnifyingGlass,
	PaperPlaneRight,
	User,
} from '@phosphor-icons/react';
import { useRequest } from 'ahooks';
import { Avatar, message, Spin } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputTextArea from '../../components/InputTextArea';
import InputTextField from '../../components/InputTextField';
import Text from '../../components/Text';
import { atomUser } from '../../store/user.store';
import styles from './index.module.scss';
import {
	createZoomChat,
	getListUser,
	getMessageInZoom,
	getProfile,
	getZoomChatById,
	sendMessage,
} from './service';
import { ROUTE_PATH } from '../../constants/routers.constant';
const News = () => {
	const navigate = useNavigate();
	const user = useAtomValue(atomUser);
	const [text, setText] = useState('');
	const [searchParams] = useSearchParams();

	const zoom_id = searchParams.get('zoom');
	const userReceive = searchParams.get('user_receive');

	const { data: dataUser, run: getUserInfo } = useRequest(getProfile, {
		manual: true,
	});

	const { data: dataListUsers, run: getUsers } = useRequest(getListUser, {
		manual: true,
	});
	const { data: dataZoom, run: getZoomChat } = useRequest(getZoomChatById, {
		manual: true,
	});

	useEffect(() => {
		if (userReceive) {
			getUserInfo(+userReceive);
		}
	}, [userReceive, getUserInfo]);
	const { run, data, mutate, loading } = useRequest(getMessageInZoom, {
		manual: true,
	});

	const { run: onRefresh } = useRequest(getMessageInZoom, {
		manual: true,
		onSuccess(res) {
			mutate(res);
		},
	});

	const { runAsync: send, loading: loadingSend } = useRequest(sendMessage, {
		manual: true,
	});

	useEffect(() => {
		if (zoom_id) {
			run(+zoom_id);
		}
	}, [zoom_id, run]);

	useEffect(() => {
		if (user.id) {
			getZoomChat(+user.id);
			getUsers(+user.id);
		}
	}, [getZoomChat, user]);

	useEffect(() => {
		if (!zoom_id) return;
		const fetchMessages = async () => {
			onRefresh(+zoom_id);
		};

		// Initial fetch
		fetchMessages();

		// Set up interval to fetch messages every 2 seconds
		const intervalId = setInterval(fetchMessages, 2000);

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, [zoom_id]);

	const onSendMessage = async () => {
		if (!zoom_id || !userReceive || !text) {
			message.error('Nhập tin nhắn để gửi');
			return;
		}
		const res = await send({
			idUserRecieve: +userReceive,
			idUserSend: user.id,
			message: text,
			idRoom: +zoom_id,
		});

		if (res?.data?.code > 0) {
			onRefresh(+zoom_id);
			setText('');
		}
	};

	const messages = useMemo(() => {
		return data?.data?.source || [];
	}, [data]);
	const zooms = useMemo(() => {
		const newZooms =
			dataZoom?.data?.source?.filter((z: any) => z.idPartner !== user.id) || [];

		console.log(newZooms, 'newZooms');

		return newZooms;
	}, [dataZoom, user]);
	const users = useMemo(() => {
		return dataListUsers?.data?.source || [];
	}, [dataListUsers]);

	const onClick = (e: any) => {
		if (e) {
			navigate(`${ROUTE_PATH.CHAT}?zoom=${e.id}&user_receive=${e.idPartner}`);
		} else {
			message.error('Tạo  chat thất bại ');
		}
	};

	const onSendMessageToUser = async (u: any) => {
		const result: any = dataZoom;

		if (!result?.data?.source) return;
		const hasChat: any = result?.data?.source.find(
			(s: any) => s.idPartner === u.id
		);

		console.log(hasChat, 'hasChat');

		if (hasChat) {
			navigate(
				`${ROUTE_PATH.CHAT}?zoom=${hasChat.id}&user_receive=${hasChat.idPartner}`
			);
		} else {
			const res = await createZoomChat({
				idCreatedUser: user.id,
				toIdUser: u.id,
				roomName: '',
			});

			if (res?.data?.code > 0) {
				getZoomChat(+user.id);
				navigate(
					`${ROUTE_PATH.CHAT}?zoom=${res?.data?.code}&user_receive=${u.id}`
				);
			} else {
				message.error('Tạo  chat thất bại ');
			}
		}
	};
	return (
		<div className={styles.news}>
			<div className={styles.left}>
				<div className={styles.top}>
					<Text type="font-20-semi-bold" color="--text-primary">
						Đoạn chat
					</Text>
					<InputTextField
						placeholder="Tìm kiếm người dùng"
						prefix={<MagnifyingGlass size={24} weight="regular" />}
					/>

					<div
						style={{
							display: 'flex',
							gap: 8,
							overflow: 'auto',
							width: '100%',
						}}
					>
						{users?.map((user: any, key: number) => {
							return (
								<div
									key={`user + ${key}`}
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}
									onClick={() => onSendMessageToUser(user)}
								>
									<Avatar src={user.avatar} size={72} />
									<Text
										type="font-14-medium"
										color="--text-primary"
										element="p"
									>
										{user.displayName}
									</Text>
								</div>
							);
						})}
					</div>
				</div>
				<div className={styles.bottom}>
					<Text
						type="font-16-medium"
						color="--text-primary"
						fontFamily="font-mono-sans"
					>
						Gần đây
					</Text>
					<div className={styles.chatList}>
						{zooms.map((e: any, key: number) => {
							return (
								<ChatItemList
									data={{
										displayNameRecieve: e?.displayName,
										avatarUserRecieve: e?.avatar,
										message: e?.lastMessage || '',
										createdDate: e?.lastTimeSend,
									}}
									key={key + 'chat-related'}
									onClick={() => onClick(e)}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.head}>
					<div className={styles.infoUser}>
						<img
							src={
								dataUser?.data?.source?.avatar
									? dataUser?.data?.source?.avatar
									: '/avatar.jpg'
							}
							className={styles.avatar}
						/>
						<Text type="font-14-medium" color="--text-primary">
							{dataUser?.data?.source?.displayName}
						</Text>
					</div>
					<div className={styles.actions}>
						<div className={styles.item}>
							<User size={20} weight="bold" color="#000" />
						</div>
						<div className={styles.item}>
							<DotsThree size={20} weight="bold" color="#000" />
						</div>
					</div>
				</div>
				<div className={styles.main}>
					{loading && <Spin />}
					{!loading &&
						messages?.length > 0 &&
						messages.map((m: any, key: number) => {
							const isOwner = m.idUserSend === user.id;
							const isFriend = m.idUserRecieve === user.id;
							return (
								<ChatItemList
									key={key}
									isOwner={isOwner}
									isFriend={isFriend}
									data={m}
								/>
							);
						})}
				</div>
				<div className={styles.sendMessage}>
					<InputTextArea
						placeholder="Nhập để nhắn tin..."
						rows={2}
						maxLength={1000}
						value={text}
						onChange={(e) => setText(e.target.value)}
						disabled={loadingSend}
					/>
					{loadingSend ? (
						<Spin />
					) : (
						<PaperPlaneRight
							size={32}
							weight="bold"
							color="blue"
							onClick={() => onSendMessage()}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default News;

const ChatItemList = ({
	isOwner,
	isFriend,
	data,
	onClick,
}: {
	isOwner?: boolean;
	isFriend?: boolean;
	data?: any;
	onClick?: any;
}) => {
	const name = isOwner ? data?.displayNameSend : data?.displayNameRecieve;
	const avatar = isOwner ? data?.avatarUserSend : data?.avatarUserRecieve;
	return (
		<div
			onClick={onClick}
			className={clsx(styles.chatItem, {
				[styles.owner]: isOwner,
				[styles.friend]: isFriend,
			})}
		>
			<img src={avatar ?? '/avatar.jpg'} className={styles.avatar} />
			<div className={styles.info}>
				<Text type="font-14-medium" color="--text-primary">
					{name}
				</Text>
				<Text type="font-14-regular" color="--text-tertiary">
					{data?.message}
				</Text>
			</div>
			<Text type="font-12-regular" color="--text-tertiary">
				{dayjs(data?.createdDate).add(7, 'hours').format('HH:mm')}
			</Text>
		</div>
	);
};
