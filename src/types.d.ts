export type EventType = 'reusableCup' | 'bicycle';
export type ValidatedResult = {
	eventType: EventType;
	score: number;
};

export type Post = {
	userId: string;
	imageUrl: string;
} & ValidatedResult;
