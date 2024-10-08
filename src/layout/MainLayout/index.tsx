'use client';
import {
	ChatCenteredDots,
	Gear,
	NewspaperClipping,
	User,
	UserPlus,
	// UserPlus,
	Users,
} from '@phosphor-icons/react';
import { Button } from 'antd';
import {
	createSearchParams,
	Outlet,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import Text from '../../components/Text';
import { ROUTE_PATH } from '../../constants/routers.constant';
import styles from './styles.module.scss';
import ModalSettingProfile from './ModalSettingProfile/ModalSettingProfile';
import { useAtomValue } from 'jotai';
import { atomUser } from '../../store/user.store';

const MainLayout = () => {
	const user = useAtomValue(atomUser);
	const navigate = useNavigate();

	const { pathname } = useLocation();
	const redirect = (path: string) => {
		if (path === ROUTE_PATH.PROFILE) {
			navigate({
				pathname: path,
				search: `?${createSearchParams({
					userId: String(user.id),
				})}`,
			});
		} else {
			navigate(path);
		}
	};
	return (
		<div className={styles.auth}>
			<div className={styles.header}>
				<div className={styles.logo} onClick={() => navigate('/')}>
					<img src="/ic-logo.svg" />
					<Text
						type="font-20-bold"
						fontFamily="font-inknut-antiqua"
						color="--text-primary"
					>
						ViConnect
					</Text>
				</div>

				<div className={styles.menu}>
					<div
						className={styles.menuItem}
						onClick={() => navigate(ROUTE_PATH.NEWS)}
					>
						<NewspaperClipping
							size={24}
							weight={pathname === ROUTE_PATH.NEWS ? 'bold' : 'regular'}
							color="#00000"
						/>
						<Text
							type={
								pathname === ROUTE_PATH.NEWS ? 'font-16-bold' : 'font-16-medium'
							}
							color="--text-primary"
						>
							Bảng Tin
						</Text>
					</div>
					<div
						className={styles.menuItem}
						onClick={() => {
							redirect(ROUTE_PATH.CHAT);
						}}
					>
						<ChatCenteredDots
							size={24}
							weight={pathname === ROUTE_PATH.CHAT ? 'bold' : 'regular'}
							color="#00000"
						/>
						<Text
							type={
								pathname === ROUTE_PATH.CHAT ? 'font-16-bold' : 'font-16-medium'
							}
							color="--text-primary"
						>
							Đoạn chat
						</Text>
					</div>
					<div
						className={styles.menuItem}
						onClick={() => redirect(ROUTE_PATH.FRIENDS)}
					>
						<UserPlus size={24} color="#00000" />
						<Text type="font-16-medium" color="--text-primary">
							Kết bạn
						</Text>
					</div>
					<div
						className={styles.menuItem}
						onClick={() => redirect(ROUTE_PATH.GROUPS)}
					>
						<Users size={24} weight="regular" color="#00000" />
						<Text type="font-16-medium" color="--text-primary">
							Hội nhóm
						</Text>
					</div>
					<div
						className={styles.menuItem}
						onClick={() => redirect(ROUTE_PATH.PROFILE)}
					>
						<User size={24} weight="regular" color="#00000" />
						<Text type="font-16-medium" color="--text-primary">
							Trang cá nhân
						</Text>
					</div>
					<ModalSettingProfile>
						<div className={styles.menuItem}>
							<Gear size={24} weight="regular" color="#00000" />
							<Text type="font-16-medium" color="--text-primary">
								Cài đặt
							</Text>
						</div>
					</ModalSettingProfile>
				</div>
				<div className={styles.profile}>
					<Button
						className={styles.button}
						onClick={() => {
							localStorage.clear();
							navigate(ROUTE_PATH.SIGN_IN);
						}}
					>
						Đăng xuất
					</Button>
				</div>
			</div>
			<div className={styles.main}>{<Outlet />}</div>
		</div>
	);
};

export default MainLayout;
