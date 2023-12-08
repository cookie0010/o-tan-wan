import React from 'react';

export default function HowToUse() {
    return (
        <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-md shadow-md w-2/3">
            <h1 className="text-3xl font-semibold mb-6">재사용컵 활용 사진 업로드 방법</h1>

            <ol className="list-decimal pl-6 mb-8">
                <li>홈페이지에 접속하여 회원가입을 합니다.</li>
                <li>로그인 후, 재사용컵 인증하기 페이지로 이동합니다.</li>
                <li>사진 업로드 버튼을 클릭하여 사진을 선택합니다.</li>
                <li>사진의 제목과 설명을 입력합니다.</li>
                <li>인증하기 버튼을 클릭합니다.</li>
            </ol>

            <p className="mb-6">
                사진 업로드 시 유의사항은 다음과 같습니다.
            </p>

            <ul className="list-disc pl-6 mb-8">
                <li>사진의 크기는 10MB 이하로 제한됩니다.</li>
                <li>사진의 해상도는 300dpi 이상으로 권장됩니다.</li>
                <li>사진의 가로/세로 비율은 16:9로 권장됩니다.</li>
                <li>사진은 재사용컵을 포함하여야 합니다.</li>
                <li>사진이 인증되면, 인증 페이지에 게시됩니다. 인증된 사진은 다른 회원들이 확인하고 응원할 수 있습니다.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-6">재사용컵 활용 사진 업로드 팁</h2>

            <ol className="list-decimal pl-6 mb-8">
                <li>재사용컵 활용 사진을 업로드할 때에는 다음과 같은 팁을 참고하시면 좋습니다.</li>
                <li>재사용컵을 사용한 장소나 상황을 잘 표현할 수 있는 사진을 선택하세요.</li>
                <li>재사용컵이 잘 보이는 구도로 사진을 찍으세요.</li>
                <li>사진의 제목과 설명을 통해 재사용컵을 사용한 이유나 느낌을 전달하세요.</li>
            </ol>

            <p>
                재사용컵 사용을 인증하고, 다른 사람들에게도 재사용컵 사용을 독려하세요!
            </p>
        </div>
    );
}