'use client';

import { RecentPictureList } from '@/client/components/post';
import { useStore } from '@/client/hooks';
import { useUserStore } from '@/client/stores';

export default function MyPictureList() {
	const urlList = useStore(useUserStore, (state) => state.urlList);
	if (!urlList) return null;

	return <RecentPictureList urlList={urlList} />;
}
