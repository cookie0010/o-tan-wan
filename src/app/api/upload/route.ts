import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { getTimeStamp } from '@/utils/time';

export async function POST(
	req: NextRequest,
): Promise<NextResponse<{ url: string } | { msg: string }>> {
	const formData = await req.formData();
	const file: File | null = formData.get('photo') as File;

	if (!file) {
		return NextResponse.json({ msg: '파일이 없습니다.' }, { status: 400 });
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const url = `/image/upload/${getTimeStamp()}-${file.name}`;
	await writeFile(`public${url}`, buffer);

	return NextResponse.json({ url });
}
