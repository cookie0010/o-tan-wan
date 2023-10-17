import React from 'react';
import { Gamja_Flower } from 'next/font/google';

const gamjaFlower = Gamja_Flower({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-gamja-flower',
});

function Title() {
	return (
		<h2 className={`mx-auto text-9xl text-[#1D2CBE] ${gamjaFlower.className}`}>
			My Page
		</h2>
	);
}

export default Title;
