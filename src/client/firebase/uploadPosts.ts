import { Post } from '@/types';
import { db } from '@/client/config/firebase';
import { ref, set } from '@firebase/database';

export default async function uploadPosts(post: Post): Promise<void> {
	try {
		set(ref(db, 'posts/123123'), {
			userId: post.userId,
			eventType: post.eventType,
			score: post.score,
			imageUrl: post.imageUrl,
		});
	} catch (e) {
		alert('업로드에 실패했습니다.');
		throw e;
	}
}
