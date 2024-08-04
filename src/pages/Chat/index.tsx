import {
	DotsThree,
	MagnifyingGlass,
	PaperPlaneRight,
	User,
} from '@phosphor-icons/react';
import InputTextField from '../../components/InputTextField';
import Text from '../../components/Text';
import styles from './index.module.scss';
import InputTextArea from '../../components/InputTextArea';
const News = () => {
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
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
						<ChatItemList />
					</div>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.head}>
					<div className={styles.infoUser}>
						<img
							src="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
							className={styles.avatar}
						/>
						<Text type="font-14-medium" color="--text-primary">
							Patrick Hendricks
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
				<div className={styles.main}></div>
				<div className={styles.sendMessage}>
					<InputTextArea
						placeholder="Nhập để nhắn tin..."
						rows={2}
						maxLength={1000}
					/>
					<PaperPlaneRight size={32} weight="bold" color="blue" />
				</div>
			</div>
		</div>
	);
};

export default News;

const ChatItemList = () => {
	return (
		<div className={styles.chatItem}>
			<img
				src="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
				className={styles.avatar}
			/>
			<div className={styles.info}>
				<Text type="font-14-medium" color="--text-primary">
					Patrick Hendricks
				</Text>
				<Text type="font-12-regular" color="--text-tertiary">
					Patrick Hendricks
				</Text>
			</div>
			<Text type="font-12-regular" color="--text-tertiary">
				10:30 AM
			</Text>
		</div>
	);
};
