'use client';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/client/components/ui';
import { FormEvent, useRef, useState } from 'react';
import useUserStore from '@/client/stores/userStore';
import Image from 'next/image';
import { useStore } from '@/client/hooks';
import { useRouter } from 'next/navigation';

type Req = {
	data: FormData;
};

type Res = {
	url: string;
};

export const API_BASE_URL =
	process.env.NODE_ENV === 'production'
		? '버셀 주소 입력'
		: 'http://localhost:3000';

export default function PictureUploadButton() {
	const isLogin = useStore(useUserStore, (state) => state.isLogin);
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const addUrl = useUserStore((state) => state.addUrl);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!file) {
			alert('업로드할 파일을 선택해주세요.');
			return;
		}

		const formData = new FormData();
		formData.set('photo', file);

		const response = await fetch(`${API_BASE_URL}/api/upload`, {
			method: 'POST',
			body: formData,
		});

		const data = await response.json();

		addUrl(data.url);
		setFile(null);
		inputRef.current!.value = '';

		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}

		router.refresh();
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
			{file && <Button type="submit">업로드</Button>}
		</form>
	);
}
