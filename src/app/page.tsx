import {
	PictureUploadButton,
	RecentPictureList,
} from '@/client/components/post';
import { MainLogo } from '@/client/components/common/';
import fs from 'fs';

export default function Home() {
	const files = fs.readdirSync('./public/image/upload');
	const urlList = files.map((url) => `/image/upload/${url}`);
	return (
		<main className="grid gap-y-20">
			<MainLogo />
			<PictureUploadButton />
			<RecentPictureList urlList={urlList} />
		</main>
	);
}
