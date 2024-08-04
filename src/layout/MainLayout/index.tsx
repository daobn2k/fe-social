'use client';
import {
	ChatCenteredDots,
	Gear,
	NewspaperClipping,
	User,
	UserPlus,
	Users,
} from '@phosphor-icons/react';
import { Button } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Text from '../../components/Text';
import { ROUTE_PATH } from '../../constants/routers.constant';
import styles from './styles.module.scss';

const MainLayout = () => {
	const navigate = useNavigate();

	const { pathname } = useLocation();

	const redirect = (path: string) => {
		console.log(path, 'path');

		navigate({
			pathname: '/sign-in',
		});
	};
	return (
		<div className={styles.auth}>
			<div className={styles.header} onClick={() => navigate('/')}>
				<div className={styles.logo}>
					<img src="http://chatvia-light.react.themesbrand.com/static/media/logo.e41f6087382055646c1c02d0a63583d5.svg" />
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
					<div
						className={styles.menuItem}
						onClick={() => redirect(ROUTE_PATH.SETTINGS)}
					>
						<Gear size={24} weight="regular" color="#00000" />
						<Text type="font-16-medium" color="--text-primary">
							Cài đặt
						</Text>
					</div>
				</div>
				<div className={styles.profile}>
					<Button className={styles.button}>Đăng xuất</Button>
				</div>
			</div>
			<div className={styles.main}>{<Outlet />}</div>
		</div>
	);
};

export default MainLayout;
