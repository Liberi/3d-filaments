import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	REACTIONS,
	getVoted,
	toggleReaction,
	subscribeCounts,
	type Counts,
	type ReactionKey,
} from '../../lib/reactions';
import { isConfigured } from '../../lib/firebase';
import styles from './styles.module.css';

const OTHER_FILAMENTS = ['PC', 'PP', 'PLA+', 'HIPS', 'PVA', 'Wood-fill', 'Metal-fill', 'PEEK', 'SBS', 'SEBS'];

const ZERO: Counts = { fire: 0, like: 0, target: 0, rocket: 0 };

export default function Footer() {
	const { t } = useTranslation();
	const [counts, setCounts] = useState<Counts>(ZERO);
	const [voted, setVoted] = useState(() => getVoted());
	const [loading, setLoading] = useState<ReactionKey | null>(null);

	useEffect(() => {
		return subscribeCounts(setCounts);
	}, []);

	const handleReaction = async (key: ReactionKey) => {
		if (loading) return;
		setLoading(key);

		// optimistic update
		const hasVoted = voted.has(key);
		setCounts(prev => ({
			...prev,
			[key]: Math.max(0, prev[key] + (hasVoted ? -1 : 1)),
		}));

		const next = await toggleReaction(key, voted);
		setVoted(next);
		setLoading(null);
	};

	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.reactions}>
					{REACTIONS.map(({ key, emoji }) => (
						<button
							key={key}
							className={`${styles.btn} ${voted.has(key) ? styles.btnActive : ''}`}
							onClick={() => handleReaction(key)}
							aria-label={t(`footer.reactions.${key}`)}
							disabled={loading === key}
						>
							<span className={styles.emoji}>{emoji}</span>
							{isConfigured && counts[key] > 0 && (
								<span className={styles.count}>{counts[key]}</span>
							)}
						</button>
					))}
				</div>

				<p className={styles.hint}>{t('footer.hint')}</p>

				<div className={styles.otherSection}>
					<div className={styles.otherTitle}>{t('footer.otherTitle')}</div>
					<div className={styles.chips}>
						{OTHER_FILAMENTS.map(name => (
							<span key={name} className={styles.chip}>{name}</span>
						))}
					</div>
					<p className={styles.otherBody}>{t('footer.otherBody')}</p>
				</div>

				<p className={styles.disclaimer}>{t('footer.disclaimer')}</p>

				<div className={styles.credits}>
					<span>{t('footer.madeBy')}</span>
					<a
						href='https://makerworld.com/@Lib_int'
						target='_blank'
						rel='noopener noreferrer'
						className={styles.link}
					>
						Lib_int
					</a>
					<span className={styles.dot}>·</span>
					<a
						href='https://github.com/Liberi/3d-filaments'
						target='_blank'
						rel='noopener noreferrer'
						className={styles.link}
					>
						GitHub
					</a>
					<span className={styles.dot}>·</span>
					<span>2026</span>
				</div>
			</div>
		</footer>
	);
}
