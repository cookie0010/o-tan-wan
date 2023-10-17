import { LogOut, User } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/client/components/ui/dropdown-menu';
import Link from 'next/link';
import useUserStore from '@/client/stores/userStore';
import { useRouter } from 'next/navigation';

export function UserDropDown({ children }: { children: React.ReactNode }) {
	const logout = useUserStore((state) => state.logout);
	const router = useRouter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href="/mypage">
						<DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
							<User className="mr-2 h-4 w-4" />
							<span>마이 페이지</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer hover:bg-gray-100"
					onClick={(e) => {
						e.preventDefault();
						console.log('logout');
						logout();
						router.refresh();
					}}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
