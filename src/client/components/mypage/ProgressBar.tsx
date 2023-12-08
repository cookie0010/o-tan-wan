'use client';

import * as React from 'react';
import { Progress } from '@/client/components/ui/progress';
import { clsx } from 'clsx';
import { Triangle } from 'lucide-react';
import { RecentPictureList } from '@/client/components/post';

export default function ProgressBar() {
	const PERCENTAGE = 66;
	const [progress, setProgress] = React.useState(13);

	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(PERCENTAGE), 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="items-center flex flex-col w-3/5 gap-y-2">
			<h3 className="text-lg font-semibold">탄소 중립 기여도</h3>
			<Progress value={progress} className="w-full" />
			<div className="flex justify-between w-full">
				{['10점', '60점', '80점', '100점', '200점'].map((item, index) => (
					<div
						key={index}
						className={clsx(
							'font-semibold text-sm flex flex-col items-center',
							{
								'-translate-x-1/2': index === 0,
								'translate-x-1/2': index === 3,
							},
						)}
					>
						<Triangle className="w-3 h-3 fill-black" />
						<span>{item}</span>
					</div>
				))}
			</div>
		</div>
	);
}
