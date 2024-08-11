/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react';
import { useRequest } from 'ahooks';
import { Button, Empty, Spin } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import InputTextField from '../../components/InputTextField';
import Text from '../../components/Text';
import ModalAddNews from '../News/ModalAddNews/ModalAddNews';
import NewItem from '../News/NewItem';
import { searchPost } from '../News/service';
import styles from './index.module.scss';
import ModalAddGroup from './ModalAddGroup/ModalAddGroup';
import { searchGroup } from './service';
import { useAtomValue } from 'jotai';
import { atomUser } from '../../store/user.store';
const Groups = () => {
	const user = useAtomValue(atomUser);
	const [groupId, setGroupId] = useState<number | undefined>(undefined);
	const { data, loading, mutate: mutateGroup } = useRequest(searchGroup);
	const {
		data: myGroup,
		loading: loadingMyGroup,
		mutate: mutateMyGroup,
		run: getMyGroup,
	} = useRequest(searchGroup, { manual: true });

	const { run: onRefreshGroup } = useRequest(searchGroup, {
		manual: true,
		onSuccess(res) {
			mutateGroup(res);
		},
	});
	const { run: onRefreshMyGroup } = useRequest(searchGroup, {
		manual: true,
		onSuccess(res) {
			mutateMyGroup(res);
		},
	});

	const onRefreshGr = () => {
		onRefreshMyGroup({
			idCreatedUser: user.id,
		});
		onRefreshGroup({});
	};

	const {
		data: dataNews,
		loading: loadingNews,
		mutate,
		run: onGetNews,
	} = useRequest(searchPost, { manual: true });

	const { run: onRefresh, loading: loadingRefresh } = useRequest(searchPost, {
		manual: true,
		onSuccess(res) {
			mutate(res);
		},
	});
	const onRefreshData = () => {
		onRefresh({
			idGroup: groupId,
		});
	};

	const news = useMemo(() => {
		return dataNews?.data?.source?.datas ?? [];
	}, [dataNews?.data?.source?.datas]);

	const publicGroups = useMemo(() => {
		return data?.data?.source?.datas || [];
	}, [data?.data?.source?.datas]);
	const myGroups = useMemo(() => {
		return myGroup?.data?.source?.datas || [];
	}, [myGroup?.data?.source?.datas]);

	const onClickGuild = (id: number) => {
		setGroupId(id);
		onGetNews({
			idGroup: id,
		});
	};

	useEffect(() => {
		if (user.id) {
			getMyGroup({
				idCreatedUser: user.id,
			});
		}
	}, [user, getMyGroup]);
	return (
		<div className={styles.news}>
			<div className={styles.left}>
				<div className={styles.top}>
					<Text type="font-20-semi-bold" color="--text-primary">
						Nhóm
					</Text>
					<InputTextField
						placeholder="Tìm kiếm nhóm"
						prefix={<MagnifyingGlass size={24} weight="regular" />}
					/>
				</div>
				<div className={styles.bottom}>
					<div className={styles.recents}>
						<div className={styles.group}>
							<Text type="font-16-semi-bold" color="--text-primary">
								Nhóm của bạn
							</Text>
							{loadingMyGroup && <Spin />}
							{!loadingMyGroup &&
								myGroups?.map((group: any, key: number) => {
									return (
										<ItemGroup
											key={key + 'group'}
											{...group}
											setGroupId={onClickGuild}
										/>
									);
								})}
						</div>
					</div>
				</div>
				<div className={styles.button}>
					<ModalAddGroup reload={onRefreshGr}>
						<Button>Tạo nhóm mới</Button>
					</ModalAddGroup>
					{groupId && (
						<ModalAddNews groupId={groupId} reload={onRefreshData}>
							<Button type="primary">Đăng bài</Button>
						</ModalAddNews>
					)}
				</div>
			</div>
			<div className={styles.right}>
				{loading && <Spin />}
				{!loading &&
					!groupId &&
					publicGroups?.map((group: any, key: number) => {
						return (
							<ItemGroup
								key={key + 'group'}
								{...group}
								setGroupId={onClickGuild}
							/>
						);
					})}
				{loadingNews && <Spin />}
				{!loadingNews &&
					news.length > 0 &&
					news.map((n: any, key: number) => {
						return (
							<NewItem
								{...n}
								key={key}
								onRefreshData={onRefreshData}
								loadingRefresh={loadingRefresh}
							/>
						);
					})}
				{!loadingNews && (
					<Empty description="Hãy đăng tin để mọi người tương tác với bạn" />
				)}
			</div>
		</div>
	);
};

export default Groups;

const ItemGroup = ({
	backGround,
	groupName,
	createDate,
	setGroupId,
	id,
}: any) => {
	return (
		<div className={styles.groupItem} onClick={() => setGroupId(id)}>
			<img src={backGround} className={styles.avatar} />
			<div className={styles.info}>
				<Text type="font-14-medium" color="--text-primary">
					{groupName}
				</Text>
				<Text type="font-12-regular" color="--text-tertiary">
					{dayjs(createDate).format('HH:mm')}
				</Text>
			</div>
			<ArrowRight size={24} color="#000000" />
		</div>
	);
};
