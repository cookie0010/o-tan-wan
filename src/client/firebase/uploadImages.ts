import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/client/config/firebase';
import useUserStore from '../stores/userStore';
import { useState } from 'react';

export default async function uploadImages({
	file,
	url,
	addUrl,
	previewUrl,
	setFile,
	inputRef,
	setPreviewUrl,
}: {
	file: File;
	url: string;
	addUrl: (url: string) => void;
	previewUrl: string | null;
	setFile: (file: File | null) => void;
	inputRef: React.RefObject<HTMLInputElement>;
	setPreviewUrl: (url: string | null) => void;
}): Promise<string> {
	try {
		const imageRef = ref(storage, `${url}`);
		const uploadTask = uploadBytesResumable(imageRef, file);

		uploadTask.on(
			'state_changed',
			() => {},
			() => {
				alert('업로드에 실패했습니다.');
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
				});
			},
		);

		return imageRef.fullPath;
	} catch (e) {
		alert('업로드에 실패했습니다.');
		throw e;
	}
}
