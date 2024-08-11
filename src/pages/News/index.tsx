/* eslint-disable @typescript-eslint/no-explicit-any */
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useDebounceFn, useRequest } from 'ahooks';
import { Button, Spin } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo } from 'react';
import InputTextField from '../../components/InputTextField';
import Text from '../../components/Text';
import { atomUser } from '../../store/user.store';
import styles from './index.module.scss';
import ModalAddNews from './ModalAddNews/ModalAddNews';
import NewItem from './NewItem';
import { searchPost } from './service';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../constants/routers.constant';
const News = () => {
	const user = useAtomValue(atomUser);
	const { data, loading, mutate, run } = useRequest(searchPost);
	const {
		data: relatedPost,
		loading: loadingRelated,
		run: onGetRelated,
	} = useRequest(searchPost, { manual: true });

	const { run: onRefreshData, loading: loadingRefresh } = useRequest(
		searchPost,
		{
			manual: true,
			onSuccess(res) {
				mutate(res);
			},
		}
	);

	useEffect(() => {
		if (user) {
			onGetRelated({
				pTotalRecordInPage: 5,
				pBeginRecord: 1,
				idUser: user.id,
			});
		}
	}, [user, onGetRelated]);
	const news = useMemo(() => {
		return data?.data?.source?.datas ?? [];
	}, [data?.data?.source?.datas]);
	const relatedPosts = useMemo(() => {
		return relatedPost?.data?.source?.datas ?? [];
	}, [relatedPost?.data?.source?.datas]);

	const onSearch = useDebounceFn(
		(event: any) => {
			run({
				description: event.target.value,
			});
		},
		{
			wait: 300,
		}
	);
	return (
		<div className={styles.news}>
			<div className={styles.left}>
				<div className={styles.top}>
					<Text type="font-20-semi-bold" color="--text-primary">
						Bảng tin
					</Text>
					<InputTextField
						placeholder="Tìm kiếm bài viết"
						prefix={<MagnifyingGlass size={24} weight="regular" />}
						onChange={onSearch.run}
					/>
				</div>
				<div className={styles.bottom}>
					<Text
						type="font-20-medium"
						color="--text-primary"
						fontFamily="font-mono-sans"
					>
						Tin đăng gần đây
					</Text>
					<div className={styles.recents}>
						{loadingRelated && <Spin />}
						{!loadingRelated &&
							relatedPosts.map((n: any, key: number) => {
								return (
									<ItemComment
										title={n.displayName}
										content={n.description}
										avatar={n.avatar}
										idUser={n.idUser}
										key={'related' + key}
										ellipse
									/>
								);
							})}
					</div>
				</div>
				<div className={styles.button}>
					<ModalAddNews reload={onRefreshData}>
						<Button>Đăng tin</Button>
					</ModalAddNews>
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

export default News;

export const ItemComment = ({
	title,
	content,
	date,
	ellipse,
	avatar,
	idUser,
}: {
	title?: string;
	content?: string;
	date?: string;
	ellipse?: boolean;
	avatar?: string;
	idUser?: any;
}) => {
	const navigate = useNavigate();
	const goProfile = () => {
		navigate({
			pathname: ROUTE_PATH.PROFILE,
			search: `?${createSearchParams({
				userId: String(idUser),
			})}`,
		});
	};
	return (
		<div className={styles.chatItem}>
			<img
				src={avatar ? avatar : '/avatar.jpg'}
				className={styles.avatar}
				onClick={() => goProfile()}
			/>
			<div className={styles.info}>
				<Text
					type="font-14-medium"
					color="--text-primary"
					onClick={() => goProfile()}
				>
					{title}
				</Text>
				<div
					className={clsx(styles.richTextComment, {
						['text-ellipse']: ellipse,
					})}
					dangerouslySetInnerHTML={{
						__html: content || '',
					}}
				/>
			</div>
			<Text type="font-12-regular" color="--text-tertiary">
				{dayjs(date).add(7, 'hour').format('HH:mm')}
			</Text>
		</div>
	);
};
