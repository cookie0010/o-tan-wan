import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
	isLogin: boolean;
	urlList: string[];
};

type UserAction = {
	login: () => void;
	logout: () => void;
	addUrl: (url: string) => void;
};

const useUserStore = create<UserState & UserAction>()(
	persist(
		(set, get) => ({
			isLogin: false,
			urlList: [],
			login: () =>
				set({
					isLogin: true,
				}),
			logout: () =>
				set({
					isLogin: false,
				}),
			addUrl: (url: string) =>
				set((state) => ({
					urlList: [...state.urlList, url],
				})),
		}),
		{
			name: 'user',
		},
	),
);

export default useUserStore;
