import { Container } from '@/client/components/ui';
import { LoginButton, UserAvatar } from '@/client/components/user';
import Logo from '$/image/main_logo.png';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function Header() {
	return (
		<header className="py-4 border-b shadow-sm ">
			<Container>
				<div className="flex items-center h-12">
					<Link href="/">
						<Image
							src={Logo}
							alt="로고"
							style={{
								width: 'fit-content',
								height: '3rem',
							}}
						/>
					</Link>
					<div className="ml-auto flex items-center gap-x-12">
						<Link
							href="/reward"
							className="hover:bg-gray-200 font-bold text-lg cursor-pointer px-4 py-2 rounded"
						>
							Reward
						</Link>
						<UserAvatar />
					</div>
				</div>
			</Container>
		</header>
	);
}
