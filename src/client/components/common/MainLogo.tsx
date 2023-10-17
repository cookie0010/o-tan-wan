import React from 'react';
import Logo from '$/image/main_logo.png';
import Image from 'next/image';

function MainLogo() {
	return (
		<Image
			src={Logo}
			alt="로고"
			style={{
				width: '20%',
				height: 'auto',
				margin: '0 auto',
			}}
		/>
	);
}

export default MainLogo;
