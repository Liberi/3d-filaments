import { useTranslation } from 'react-i18next';
import type { Filament, BarKey } from '../../types/filament';
import ProgressBar from '../ProgressBar';
import styles from './styles.module.css';

const BAR_KEYS: BarKey[] = ['strength', 'flexibility', 'rigidity', 'tempResistance', 'printEase'];

interface Props {
	filament: Filament;
	isActive: boolean;
	onClick: () => void;
}

export default function FilamentCard({ filament, isActive, onClick }: Props) {
	const { t } = useTranslation();

	return (
		<button
			className={`${styles.card} ${isActive ? styles.active : ''}`}
			style={
				{
					'--accent': filament.accent,
					'--accent-dim': filament.accentDim,
					borderColor: isActive ? filament.accent : undefined,
				} as React.CSSProperties
			}
			onClick={onClick}
			aria-pressed={isActive}
		>
			<div className={styles.name}>{filament.name}</div>
			<div className={styles.sub}>{t(`filaments.${filament.id}.sub`)}</div>

			<div className={styles.tags}>
				{filament.tagKeys.map(key => (
					<span
						key={key}
						className={styles.tag}
						style={{ background: filament.tagBg, color: filament.tagColor }}
					>
						{t(key)}
					</span>
				))}
			</div>

			<div className={styles.bars}>
				{BAR_KEYS.map((key, i) => (
					<ProgressBar
						key={key}
						label={t(`bars.${key}`)}
						value={filament.bars[key]}
						accent={filament.accent}
						delay={i * 60}
					/>
				))}
			</div>
		</button>
	);
}
