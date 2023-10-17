import {
	PictureUploadButton,
	RecentPictureList,
} from '@/client/components/post';
import { MainLogo } from '@/client/components/common';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '@/client/config/firebase';

export const revalidate = 0;

export default async function Home() {
	const imageRef = ref(storage, 'images');
	const files = await listAll(imageRef);
	const responses = files.items.map((file) =>
		getDownloadURL(ref(storage, file.fullPath)),
	);
	const urlList = await Promise.all(responses);

	return (
		<main className="grid gap-y-20">
			<MainLogo />
			<PictureUploadButton />
			<RecentPictureList urlList={urlList} />
		</main>
	);
}
