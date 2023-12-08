'use client';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/client/components/ui';
import React, { FormEvent, useRef, useState } from 'react';
import useUserStore from '@/client/stores/userStore';
import Image from 'next/image';
import { useStore } from '@/client/hooks';
import { useRouter } from 'next/navigation';
import { getTimeStamp } from '@/utils/time';
import { EventType, ValidatedResult } from '@/types';
import uploadPosts from '@/client/firebase/uploadPosts';
import uploadImages from '@/client/firebase/uploadImages';
import getValidateResult from '@/client/api/getValidateResult';
import { validateType } from '@/client/constant/validateType';

export default function PictureUploadButton() {
	const isLogin = useStore(useUserStore, (state) => state.isLogin);
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const addUrl = useUserStore((state) => state.addUrl);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [eventType, setEventType] = useState('reusableCup' as EventType);

	const handleSubmit = async (e: FormEvent) => {
		try {
			e.preventDefault();
			if (!file) {
				alert('업로드할 파일을 선택해주세요.');
				return;
			}
			setIsLoading(true);

			const validatedResult: ValidatedResult = await getValidateResult(
				file,
				eventType,
			);

			const imgUrl = await uploadImages({
				file,
				url: `images/${getTimeStamp()}_${file.name}`,
				addUrl,
				previewUrl,
				setFile,
				inputRef,
				setPreviewUrl,
			});
			router.refresh();

			await uploadPosts({
				userId: 'cookie0010@gmail.com',
				imageUrl: imgUrl,
				...validatedResult,
			});

			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
		}
	};

	if (!isLogin) return null;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const url = URL.createObjectURL(file);
		setPreviewUrl(url);
		setFile(file);
	};
	const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setEventType(e.target.value as EventType);
	};

	return (
		<div className="mx-auto felx flex-col">
			<div className="mb-2 border-2 rounded-lg flex justify-end">
				<select
					id="eventType"
					value={eventType}
					onChange={handleEventTypeChange}
					className="w-full p-1 bg-transparent outline-none"
				>
					{validateType.map((t) => (
						<option value={t.value}>{t.label}</option>
					))}
				</select>
			</div>
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
		</div>
	);
}
