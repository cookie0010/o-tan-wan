'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/client/components/ui';
import { LoginButton } from '@/client/components/user/index';
import React from 'react';
import useUserStore from '@/client/stores/userStore';
import { useStore } from '@/client/hooks';
import ProfileImage from '$/image/profile.png';
import { useRouter } from 'next/navigation';
import { UserDropDown } from '@/client/components/user/UserDropDown';
import Link from 'next/link';

export default function UserAvatar() {
	const isLogin = useStore(useUserStore, (state) => state.isLogin);
	const router = useRouter();
	return isLogin ? (
		<UserDropDown>
			<Avatar className="cursor-pointer">
				<AvatarImage src="/image/profile.png" alt="@shadcn" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</UserDropDown>
	) : (
		<LoginButton />
	);
}
