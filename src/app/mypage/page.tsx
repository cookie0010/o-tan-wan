import { Container } from '@/client/components/ui';
import { Title, ProgressBar, MyPictureList } from '@/client/components/mypage';
import * as React from 'react';

export default function MyPage() {
	return (
		<div>
			<Container>
				<div className="flex flex-col items-center gap-y-20">
					<Title />
					<ProgressBar />
					<MyPictureList />
				</div>
			</Container>
		</div>
	);
}
