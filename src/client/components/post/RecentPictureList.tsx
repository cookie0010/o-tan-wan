import React from 'react';
import fs from 'fs';
import Image from 'next/image';
import path from 'path';
import { API_BASE_URL } from '@/client/components/post/PictureUploadButton';

type Props = {
	urlList: string[];
};

function RecentPictureList({ urlList }: Props) {
	const list = [...urlList].reverse().slice(0, 9);
	return (
		<section className="grid w-1/2 mx-auto grid-cols-3 grid-rows-3">
			{list.map((url) => (
				<Image
					style={{
						width: 'auto',
						height: '100%',
						aspectRatio: '1/1',
						objectFit: 'cover',
						borderCollapse: 'collapse',
						// border : '1px solid black',
						padding : '0.5rem',
					}}
					key={Math.random()}
					src={url}
					width={300}
					height={300}
					alt="탄소 중립 이미지"
					unoptimized={true}
				/>
			))}
		</section>
	);
}

export default RecentPictureList;
