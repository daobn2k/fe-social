/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react';
import { useRequest } from 'ahooks';
import { Button, Col, Image, message, Row, Spin } from 'antd';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import InputTextField from '../../components/InputTextField';
import Text from '../../components/Text';
import { atomUser } from '../../store/user.store';
import styles from './index.module.scss';
import {
	approveFriend,
	EFriendOption,
	getFriendsRequest,
	makeFriend,
	RejectFriend,
} from './service';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../constants/routers.constant';

const Friends = () => {
	const user = useAtomValue(atomUser);
	const [option, setOption] = useState(EFriendOption.FRIEND);
	const {
		data: dataRequest,
		run: runRequest,
		loading: loadingRequest,
	} = useRequest(getFriendsRequest, {
		manual: true,
	});
	const changeOption = (op: EFriendOption) => {
		setOption(op);
		runRequest({
			isFriend: op,
			currentId: user.id,
		});
	};

	useEffect(() => {
		if (user.id > 0) {
			runRequest({
				isFriend: option,
				currentId: user.id,
			});
		}
	}, [user]);

	const users = useMemo(() => {
		if (dataRequest?.data?.source?.datas) {
			if (option === EFriendOption.ALL) {
				return (
					dataRequest?.data?.source?.datas?.filter(
						(z: any) => z.friendStatus === '0'
					) || []
				);
			}
			return dataRequest?.data?.source?.datas || [];
		}

		return [];
	}, [dataRequest, option]);

	const onReload = () => {
		runRequest({
			isFriend: option,
			currentId: user.id,
		});
	};

	return (
		<div className={styles.news}>
			<div className={styles.left}>
				<div className={styles.top}>
					<Text type="font-20-semi-bold" color="--text-primary">
						Kết nối bạn bè
					</Text>
					<InputTextField
						placeholder="Tìm kiếm người dùng"
						prefix={<MagnifyingGlass size={24} weight="regular" />}
					/>
				</div>
				<div className={styles.options}>
					<ItemOptions
						title="Tất cả bạn bè"
						onClick={() => changeOption(EFriendOption.FRIEND)}
					/>
					<ItemOptions
						title="Lời mời kết bạn"
						onClick={() => changeOption(EFriendOption.REQ)}
					/>
					<ItemOptions
						title="Chờ phê duyệt"
						onClick={() => changeOption(EFriendOption.WAITING)}
					/>

					<ItemOptions
						title="Chưa kết bạn"
						onClick={() => changeOption(EFriendOption.ALL)}
					/>
				</div>
			</div>
			<div className={styles.right}>
				<Text type="font-20-bold" color="--text-primary">
					{option === EFriendOption.FRIEND
						? 'Tất cả ban bè'
						: option === EFriendOption.REQ
						? 'Lời mời kết bạn'
						: option === EFriendOption.WAITING
						? 'Chờ phê duyệt'
						: 'Chưa kết bạn'}
				</Text>
				<Row gutter={[16, 16]}>
					{loadingRequest && (
						<div
							style={{
								padding: 16,
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Spin size={'large'} />
						</div>
					)}
					{!loadingRequest &&
						users.map((e: any, key: number) => {
							return (
								<Col key={key} span={6}>
									<ItemFriend {...e} option={option} reload={onReload} />
								</Col>
							);
						})}
				</Row>
			</div>
		</div>
	);
};

export default Friends;

const ItemFriend = ({
	displayName,
	avatar,
	reload,
	id,
	option,
	idFriendData,
}: {
	displayName: string;
	avatar: string;
	type: string;
	reload: any;
	id: number;
	option: EFriendOption;
	idFriendData: number;
}) => {
	const navigate = useNavigate();
	const user = useAtomValue(atomUser);
	const { runAsync: onMakeFriend } = useRequest(makeFriend, {
		manual: true,
		onSuccess(data) {
			if (data.data.code >= 0) {
				reload();
				message.success('Gửi lời mời kết bạn thành công');
			} else {
				message.error('Gửi lời mời kết bạn không thành công');
			}
		},
	});
	const { runAsync: onApprove } = useRequest(approveFriend, {
		manual: true,
		onSuccess(data) {
			if (data.data.code >= 0) {
				reload();
				message.success('Đồng ý kết bạn thành công');
			} else {
				message.error('Đồng ý kết bạn không thành công');
			}
		},
	});
	const { runAsync: onReject } = useRequest(RejectFriend, {
		manual: true,
		onSuccess(data) {
			if (data.data.code >= 0) {
				reload();
				message.success('Từ chối kết bạn thành công');
			} else {
				message.error('Từ chối kết bạn không thành công');
			}
		},
	});
	const goProfile = () => {
		navigate({
			pathname: ROUTE_PATH.PROFILE,
			search: `?${createSearchParams({
				userId: String(id),
			})}`,
		});
	};
	return (
		<div className={styles.friend}>
			<Image
				className={styles.avatar}
				src={avatar}
				onClick={() => goProfile()}
			/>
			<Text
				type="font-14-semi-bold"
				color="--text-primary"
				onClick={() => goProfile()}
			>
				{displayName}
			</Text>

			<div className={styles.grButton}>
				{option === EFriendOption.REQ && (
					<>
						<Button type="default" onClick={() => onReject(idFriendData)}>
							<Text type="font-14-medium" color="--text-primary">
								Huỷ
							</Text>
						</Button>
						<Button type="primary" onClick={() => onApprove(idFriendData)}>
							<Text type="font-14-medium" color="--text-primary-white">
								Xác nhận
							</Text>
						</Button>
					</>
				)}
				{option === EFriendOption.ALL && (
					<Button
						type="primary"
						onClick={() => {
							onMakeFriend({
								idUser: user.id,
								idFriend: id,
							});
						}}
					>
						<Text type="font-14-medium" color="--text-primary-white">
							Kết bạn
						</Text>
					</Button>
				)}
				{option === EFriendOption.FRIEND && (
					<>
						<Button type="default">
							<Text type="font-14-medium" color="--text-primary">
								Đã kết bạn
							</Text>
						</Button>
					</>
				)}
				{option === EFriendOption.WAITING && (
					<Button type="primary">
						<Text type="font-14-medium" color="--text-primary-white">
							Chờ phê duyệt
						</Text>
					</Button>
				)}
			</div>
		</div>
	);
};

const ItemOptions = ({
	title,
	onClick,
}: {
	title: string;
	onClick: () => void;
}) => {
	return (
		<div className={styles.option} onClick={onClick}>
			<Text type="font-16-medium" color="--text-primary">
				{title}
			</Text>
			<ArrowRight size={24} weight="bold" color="#000000" />
		</div>
	);
};
