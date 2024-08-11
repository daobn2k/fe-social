/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react';
import { Button, Spin } from 'antd';
import InputTextField from '../../components/InputTextField';
import Text from '../../components/Text';
import styles from './index.module.scss';
import ModalAddGroup from './ModalAddGroup/ModalAddGroup';
import ModalAddNews from '../News/ModalAddNews/ModalAddNews';
import { useRequest } from 'ahooks';
import { searchGroup } from './service';
import { useMemo } from 'react';
const Groups = () => {
	const { data, loading, run } = useRequest(searchGroup);

	const publicGroups = useMemo(() => {
		return data?.data?.source?.datas || [];
	}, [data?.data?.source?.datas]);
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
							{loading && <Spin />}
							{!loading &&
								publicGroups?.map((group: any, key: number) => {
									return <ItemGroup key={key + 'group'} {...group} />;
								})}
						</div>
					</div>
				</div>
				<div className={styles.button}>
					<ModalAddGroup reload={run}>
						<Button>Tạo nhóm mới</Button>
					</ModalAddGroup>
					<ModalAddNews groupId={0}>
						<Button type="primary">Đăng bài</Button>
					</ModalAddNews>
				</div>
			</div>
			<div className={styles.right}>
				{loading && <Spin />}
				{!loading &&
					publicGroups?.map((group: any, key: number) => {
						return <ItemGroup key={key + 'group'} {...group} />;
					})}
			</div>
		</div>
	);
};

export default Groups;

const ItemGroup = ({ backGround, groupName }: any) => {
	return (
		<div className={styles.groupItem}>
			<img src={backGround} className={styles.avatar} />
			<div className={styles.info}>
				<Text type="font-14-medium" color="--text-primary">
					{groupName}
				</Text>
			</div>
			<ArrowRight size={24} color="#000000" />
		</div>
	);
};
