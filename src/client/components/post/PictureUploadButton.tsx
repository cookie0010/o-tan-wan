'use client';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/client/components/ui';
import { FormEvent, useRef, useState } from 'react';
import useUserStore from '@/client/stores/userStore';
import Image from 'next/image';
import { useStore } from '@/client/hooks';
import { useRouter } from 'next/navigation';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/client/config/firebase';
import { getTimeStamp } from '@/utils/time';

export default function PictureUploadButton() {
	const isLogin = useStore(useUserStore, (state) => state.isLogin);
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const addUrl = useUserStore((state) => state.addUrl);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!file) {
			alert('업로드할 파일을 선택해주세요.');
			return;
		}

		setIsLoading(true);

		const imageRef = ref(storage, `images/${getTimeStamp()}_${file.name}`);
		const uploadTask = uploadBytesResumable(imageRef, file);

		uploadTask.on(
			'state_changed',
			() => {},
			() => {
				alert('업로드에 실패했습니다.');
				setIsLoading(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log('File available at', downloadURL);
					addUrl(downloadURL);
					setFile(null);
					inputRef.current!.value = '';

					if (previewUrl) {
						URL.revokeObjectURL(previewUrl);
						setPreviewUrl(null);
					}
					setIsLoading(false);
					router.refresh();
				});
			},
		);
	};

	if (!isLogin) return null;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const url = URL.createObjectURL(file);
		setPreviewUrl(url);
		setFile(file);
	};

	return (
		<form onSubmit={handleSubmit} className="mx-auto flex flex-col gap-y-4">
			{previewUrl ? (
				<Image
					src={previewUrl}
					alt="사진 미리보기"
					width={300}
					height={300}
					style={{
						aspectRatio: '1/1',
						objectFit: 'cover',
					}}
				/>
			) : (
				<Button
					onClick={(e) => {
						e.preventDefault();
						inputRef.current?.click();
					}}
					asChild
					variant="secondary"
					className="w-fit p-10 cursor-pointer"
				>
					<div className="flex flex-col h-fit">
						<PlusCircleIcon className="w-10 h-10" />
						<div className="mx-auto mt-4 text-lg font-semibold">
							사진 업로드
						</div>
					</div>
				</Button>
			)}
			<input
				ref={inputRef}
				className="hidden"
				type="file"
				onChange={handleFileChange}
			/>
			{file && (
				<Button type="submit" disabled={isLoading}>
					{isLoading ? '업로드 중...' : '업로드'}
				</Button>
			)}
		</form>
	);
}
