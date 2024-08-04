import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react';
import InputTextField from '../../components/InputTextField';
import Text from '../../components/Text';
import styles from './index.module.scss';
import { Button, Col, Image, Row } from 'antd';
import { dataFake } from './friend.constants';
import { useState } from 'react';

enum EOption {
	INVITE_FRINED = 'INVITE_FRINED',
	SUGGEST = 'SUGGEST',
	ALL_FRIEND = 'ALL_FRIEND',
}
const Friends = () => {
	const [option, setOption] = useState(EOption.INVITE_FRINED);

	const changeOption = (op: EOption) => {
		setOption(op);
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
						title="Lời mời kết bạn"
						onClick={() => changeOption(EOption.INVITE_FRINED)}
					/>
					<ItemOptions
						title="Tất cả bạn bè"
						onClick={() => changeOption(EOption.ALL_FRIEND)}
					/>
					<ItemOptions
						title="Gợi ý"
						onClick={() => changeOption(EOption.SUGGEST)}
					/>
				</div>
			</div>
			<div className={styles.right}>
				<Text type="font-20-bold" color="--text-primary">
					Lời mời kết bạn
				</Text>
				<Row gutter={[16, 16]}>
					{dataFake.map((e, key: number) => {
						return (
							<Col key={key} span={6}>
								<ItemFriend {...e} option={option} />
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
	name,
	mutual_friends,
	avatar,
	option,
}: {
	name: string;
	mutual_friends: number;
	avatar: string;
	option: EOption;
}) => {
	return (
		<div className={styles.friend}>
			<Image className={styles.avatar} src={avatar} />
			<Text type="font-14-semi-bold" color="--text-primary">
				{name}
			</Text>
			<Text type="font-12-medium" color="--text-tertiary">
				{mutual_friends} bạn chung
			</Text>
			<div className={styles.grButton}>
				{option === EOption.INVITE_FRINED ? (
					<>
						<Button type="default">
							<Text type="font-14-medium" color="--text-primary">
								Huỷ
							</Text>
						</Button>
						<Button type="primary">
							<Text type="font-14-medium" color="--text-primary-white">
								Xác nhận
							</Text>
						</Button>
					</>
				) : (
					<Button type="primary">
						<Text type="font-14-medium" color="--text-primary-white">
							Kết bạn
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
