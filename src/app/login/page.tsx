'use client';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/client/components/ui/card';
import { Button } from '@/client/components/ui';
import { Label } from '@/client/components/ui/label';
import { Input } from '@/client/components/ui/input';
import React from 'react';
import useUserStore from '@/client/stores/userStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const login = useUserStore((state) => state.login);
	const router = useRouter();

	return (
		<Card className="w-1/3 mx-auto">
			<CardHeader>
				<CardTitle className="font-bold">로그인</CardTitle>
			</CardHeader>
			<CardContent className="pb-4">
				<form>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">아이디</Label>
							<Input id="name" placeholder="아이디를 입력해주세요." />
						</div>{' '}
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">비밀번호</Label>
							<Input id="name" placeholder="비밀번호를 입력해주세요." />
						</div>
						<Button
							className="w-full"
							onClick={(e) => {
								e.preventDefault();
								login();
								router.push('/');
							}}
						>
							로그인
						</Button>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex justify-center">
				<Button className="w-full" variant="secondary">
					회원가입
				</Button>
			</CardFooter>
		</Card>
	);
}
