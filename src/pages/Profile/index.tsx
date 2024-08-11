/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMount, useRequest } from 'ahooks';
import { Avatar, Button, Collapse, Spin } from 'antd';
import { CollapseProps } from 'antd/lib';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import Text from '../../components/Text';
import { atomUser } from '../../store/user.store';
import ModalAddNews from '../News/ModalAddNews/ModalAddNews';
import NewItem from '../News/NewItem';
import { searchPost } from '../News/service';
import styles from './index.module.scss';

const Profile = () => {
	const user = useAtomValue(atomUser);
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

	useMount(() => {
		run({
			pBeginRecord: 1,
			pTotalRecordInPage: 1000,
			idUser: user.id,
		});
	});
	const items: CollapseProps['items'] = [
		{
			key: '1',
			label: 'Giới thiệu',
			children: (
				<p>
					{user.introduce ||
						'Hãy viết gì đó để cho trang cá nhân của bạn trở nên thật tuyệt vời'}
				</p>
			),
		},
		{
			key: '2',
			label: 'Học vấn',
			children: (
				<p>
					{user.education ||
						'Hãy viết gì đó để cho trang cá nhân của bạn trở nên thật tuyệt vời'}
				</p>
			),
		},
		{
			key: '3',
			label: 'Nghề nghiệp',
			children: (
				<p>
					{user.job ||
						'Hãy viết gì đó để cho trang cá nhân của bạn trở nên thật tuyệt vời'}
				</p>
			),
		},
		{
			key: '4',
			label: 'Giới tính',
			children: (
				<p>
					{user.sex ||
						'Hãy viết gì đó để cho trang cá nhân của bạn trở nên thật tuyệt vời'}
				</p>
			),
		},
	];

	const news = useMemo(() => {
		return data?.data?.source?.datas ?? [];
	}, [data?.data?.source?.datas]);
	return (
		<div className={styles.news}>
			<div className={styles.left}>
				<div className={styles.top}>
					<Text type="font-20-semi-bold" color="--text-primary">
						Trang cá nhân
					</Text>
					<div className={styles.info}>
						<Avatar
							src="http://chatvia-light.react.themesbrand.com/static/media/avatar-1.3921191a8acf79d3e907.jpg"
							size={140}
						/>
						<Text type="font-16-semi-bold" color="--text-primary">
							{user.userName}
						</Text>
						{/* <Text type="font-14-medium" color="--text-primary">
							04/03/2002
						</Text> */}
					</div>
					<Collapse
						items={items}
						defaultActiveKey={['1']}
						style={{ flex: 1 }}
					/>
					;
					<div className={styles.button}>
						<ModalAddNews reload={onRefreshData}>
							<Button>Đăng tin</Button>
						</ModalAddNews>
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
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Profile;
