import { ref, runTransaction, onValue, off } from 'firebase/database';
import { db, isConfigured } from './firebase';

export type ReactionKey = 'fire' | 'like' | 'target' | 'rocket';

export const REACTIONS: { key: ReactionKey; emoji: string }[] = [
	{ key: 'fire', emoji: '🔥' },
	{ key: 'like', emoji: '👍' },
	{ key: 'target', emoji: '🎯' },
	{ key: 'rocket', emoji: '🚀' },
];

const LS_KEY = 'filaments_reactions_voted';

export function getVoted(): Set<ReactionKey> {
	try {
		return new Set(JSON.parse(localStorage.getItem(LS_KEY) || '[]'));
	} catch {
		return new Set();
	}
}

function saveVoted(voted: Set<ReactionKey>) {
	localStorage.setItem(LS_KEY, JSON.stringify([...voted]));
}

export async function toggleReaction(
	key: ReactionKey,
	voted: Set<ReactionKey>,
): Promise<Set<ReactionKey>> {
	const hasVoted = voted.has(key);
	const next = new Set(voted);

	if (hasVoted) {
		next.delete(key);
	} else {
		next.add(key);
	}

	saveVoted(next);

	if (isConfigured && db) {
		const delta = hasVoted ? -1 : 1;
		await runTransaction(ref(db, `reactions/${key}`), (cur) => Math.max(0, (cur ?? 0) + delta));
	}

	return next;
}

export type Counts = Record<ReactionKey, number>;

const ZERO_COUNTS: Counts = { fire: 0, like: 0, target: 0, rocket: 0 };

export function subscribeCounts(cb: (counts: Counts) => void): () => void {
	if (!isConfigured || !db) {
		cb(ZERO_COUNTS);
		return () => {};
	}

	const r = ref(db, 'reactions');
	onValue(r, (snap) => {
		const data = snap.val() ?? {};
		cb({
			fire: data.fire ?? 0,
			like: data.like ?? 0,
			target: data.target ?? 0,
			rocket: data.rocket ?? 0,
		});
	});

	return () => off(r);
}
