/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRequest } from 'ahooks';
import { Avatar, Button, Collapse, message, Spin } from 'antd';
import { CollapseProps } from 'antd/lib';
import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Text from '../../components/Text';
import { createZoomChat, getProfile, getZoomChatById } from '../Chat/service';
import ModalAddNews from '../News/ModalAddNews/ModalAddNews';
import NewItem from '../News/NewItem';
import { searchPost } from '../News/service';
import styles from './index.module.scss';
import { useAtomValue } from 'jotai';
import { atomUser } from '../../store/user.store';
import { ROUTE_PATH } from '../../constants/routers.constant';

const Profile = () => {
	const navigate = useNavigate();
	const aUser = useAtomValue(atomUser);
	const [params] = useSearchParams();

	const userId = params.get('userId');

	const { data: dataUser, run: getUserInfo } = useRequest(getProfile, {
		manual: true,
	});

	const { runAsync: getZoomChat } = useRequest(getZoomChatById, {
		manual: true,
	});

	useEffect(() => {
		if (userId) {
			getUserInfo(+userId);
		}
	}, [userId, getUserInfo]);

	const user = useMemo(() => {
		return dataUser?.data?.source;
	}, [dataUser]);

	const { data, loading, mutate, run } = useRequest(searchPost, {
		manual: true,
	});
	const { run: onRefresh, loading: loadingRefresh } = useRequest(searchPost, {
		manual: true,
		onSuccess(res) {
			mutate(res);
		},
	});

	const onRefreshData = () => {
		onRefresh({
			pBeginRecord: 1,
			pTotalRecordInPage: 1000,
			idUser: user.id,
		});
	};

	useEffect(() => {
		if (user) {
			run({
				pBeginRecord: 1,
				pTotalRecordInPage: 1000,
				idUser: user.id,
			});
		}
	}, [user, run]);
	const items: CollapseProps['items'] = [
		{
			key: '2',
			label: 'Học vấn',
			children: (
				<p>
					{user?.education ||
						'Hãy viết gì đó để cho trang cá nhân của bạn trở nên thật tuyệt vời'}
				</p>
			),
		},
		{
			key: '3',
			label: 'Nghề nghiệp',
			children: (
				<p>
					{user?.job ||
						'Hãy viết gì đó để cho trang cá nhân của bạn trở nên thật tuyệt vời'}
				</p>
			),
		},
		{
			key: '4',
			label: 'Giới tính',
			children: (
				<p>
					{user?.gender ||
						'Hãy viết gì đó để cho trang cá nhân của bạn trở nên thật tuyệt vời'}
				</p>
			),
		},
	];

	const news = useMemo(() => {
		return data?.data?.source?.datas ?? [];
	}, [data?.data?.source?.datas]);

	const onSendMessage = async () => {
		const result: any = await getZoomChat(+aUser.id);

		const hasChat: any = result?.data?.source?.find(
			(s: any) => s.idPartner === user.id
		);

		if (hasChat) {
			navigate(
				`${ROUTE_PATH.CHAT}?zoom=${hasChat.id}&user_receive=${hasChat.idPartner}`
			);
		} else {
			const res = await createZoomChat({
				idCreatedUser: aUser.id,
				toIdUser: user.id,
				roomName: '',
			});

			if (res?.data?.code > 0) {
				navigate(
					`${ROUTE_PATH.CHAT}?zoom=${res?.data?.code}&user_receive=${user.id}`
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
						Trang cá nhân
					</Text>
					<div className={styles.info}>
						<Avatar src={user?.avatar} size={140} />
						<Text type="font-16-semi-bold" color="--text-primary">
							{user?.userName}
						</Text>
						{/* <Text type="font-14-medium" color="--text-primary">
							04/03/2002
						</Text> */}
					</div>
					<Collapse
						items={items}
						defaultActiveKey={['2,3,4']}
						style={{ flex: 1 }}
					/>
					;
					<div className={styles.button}>
						<ModalAddNews reload={onRefreshData}>
							<Button>Đăng tin</Button>
						</ModalAddNews>
						{user?.id !== aUser.id && (
							<Button type="primary" onClick={() => onSendMessage()}>
								Nhắn tin
							</Button>
						)}
					</div>
				</div>
			</div>
			<div className={styles.right}>
				{loading && <Spin />}
				{!loading &&
					news.length > 0 &&
					news.map((n: any, key: number) => {
						return (
							<NewItem
								{...n}
								key={key}
								onRefreshData={onRefreshData}
								loadingRefresh={loadingRefresh}
								data={n}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Profile;
