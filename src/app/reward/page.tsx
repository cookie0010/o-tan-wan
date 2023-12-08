export default function Reward() {
	return (
		<div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-md shadow-md">
			<h1 className="text-3xl font-semibold mb-6">포인트 리워드</h1>

			<div className="flex flex-col space-y-4 mb-8">
				<div className="flex justify-between items-center">
					<span className="text-xl">100 포인트</span>
					<span>친환경 텀블러</span>
					<span>친환경 화장품</span>
					<span>친환경 식품</span>
				</div>

				<div className="flex justify-between items-center">
					<span className="text-xl">500 포인트</span>
					<span>환경 관련 교육 프로그램</span>
					<span>탄소중립 여행</span>
					<span>친환경 제품 할인 쿠폰</span>
				</div>

				<div className="flex justify-between items-center">
					<span className="text-xl">1,000 포인트</span>
					<span>탄소중립 기부</span>
					<span>친환경 공공시설 이용권</span>
					<span>탄소중립 관련 이벤트 참여 기회</span>
				</div>

				<div className="flex justify-between items-center">
					<span className="text-xl">5,000 포인트</span>
					<span>탄소중립 관련 인증서 발급</span>
					<span>친환경 제품 무료 증정</span>
					<span>탄소중립 관련 행사 초청</span>
				</div>
			</div>
		</div>
	);
}
