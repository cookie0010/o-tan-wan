import { Button } from '@/client/components/ui';
import Link from 'next/link';

export default function LoginButton() {
	return (
		<Button asChild>
			<Link href="/login">로그인</Link>
		</Button>
	);
}
