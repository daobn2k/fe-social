/* eslint-disable @typescript-eslint/no-explicit-any */
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useDebounceFn, useMount, useRequest } from 'ahooks';
import { Button, Spin } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import InputTextField from '../../components/InputTextField';
import Text from '../../components/Text';
import styles from './index.module.scss';
import ModalAddNews from './ModalAddNews/ModalAddNews';
import NewItem from './NewItem';
import { searchPost } from './service';
import { useAtomValue } from 'jotai';
import { atomUser } from '../../store/user.store';
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

	useMount(() => {
		onGetRelated({
			pTotalRecordInPage: 5,
			pBeginRecord: 1,
			idUser: user.id,
		});
	});
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
						Tin gần đây
					</Text>
					<div className={styles.recents}>
						{loadingRelated && <Spin />}
						{!loadingRelated &&
							relatedPosts.map((n: any, key: number) => {
								return (
									<ItemComment
										title={n.displayName}
										content={n.description}
										key={'related' + key}
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
				{loading ? (
					<Spin />
				) : (
					news.map((n: any, key: number) => {
						return (
							<NewItem
								{...n}
								key={key}
								onRefreshData={onRefreshData}
								loadingRefresh={loadingRefresh}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};

export default News;

export const ItemComment = ({
	title,
	content,
	date,
}: {
	title?: string;
	content?: string;
	date?: string;
}) => {
	return (
		<div className={styles.chatItem}>
			<img src="/avatar.jpg" className={styles.avatar} />
			<div className={styles.info}>
				<Text type="font-14-medium" color="--text-primary">
					{title}
				</Text>
				<div
					className={styles.richTextComment}
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
