'use client';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import Text from '../../components/Text';

const AuthLayout = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.auth}>
			<div className={styles.header} onClick={() => navigate('/')}>
				<img src="http://chatvia-light.react.themesbrand.com/static/media/logo.e41f6087382055646c1c02d0a63583d5.svg" />
				<Text
					type="font-20-bold"
					fontFamily="font-inknut-antiqua"
					color="--text-primary"
				>
					ViConnect
				</Text>
			</div>
			{<Outlet />}
		</div>
	);
};

export default AuthLayout;
