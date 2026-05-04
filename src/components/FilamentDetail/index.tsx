import { useTranslation } from 'react-i18next';
import { Thermometer, Layers, Flame, Sun, Droplets, Tag, X, Wrench } from 'lucide-react';
import type { Filament } from '../../types/filament';
import styles from './styles.module.css';

const PROP_KEYS = ['print', 'bed', 'hdt', 'uv', 'moisture', 'price'] as const;

const PROP_ICONS: Record<string, React.ElementType> = {
	print: Thermometer,
	bed: Layers,
	hdt: Flame,
	uv: Sun,
	moisture: Droplets,
	price: Tag,
};

interface Props {
	filament: Filament;
	onClose: () => void;
}

export default function FilamentDetail({ filament, onClose }: Props) {
	const { t } = useTranslation();

	const pros = Array.from({ length: filament.prosCount }, (_, i) =>
		t(`filaments.${filament.id}.pros.${i}`),
	);
	const cons = Array.from({ length: filament.consCount }, (_, i) =>
		t(`filaments.${filament.id}.cons.${i}`),
	);

	return (
		<div className={styles.panel} style={{ borderTopColor: filament.accent }}>
			{/* Header */}
			<div className={styles.header}>
				<div className={styles.accentBar} style={{ background: filament.accent }} />
				<div>
					<div className={styles.title}>{filament.name}</div>
					<div className={styles.subtitle}>{t(`filaments.${filament.id}.sub`)}</div>
				</div>
			</div>

			{/* Tech props */}
			<div className={styles.body}>
				<div className={styles.propsGrid}>
					{PROP_KEYS.map(key => {
						const raw = filament.props[key];
						const val =
							raw.startsWith('uv.') ||
							raw.startsWith('moist.') ||
							raw.startsWith('price.')
								? t(raw)
								: raw;
						const Icon = PROP_ICONS[key];
						return (
							<div key={key} className={styles.propChip}>
								<div className={styles.propKey}>
									{Icon && <Icon size={13} strokeWidth={2} className={styles.propIcon} />}
									{t(`propLabels.${key}`)}
								</div>
								<div className={styles.propVal}>{val}</div>
							</div>
						);
					})}
				</div>

				{/* Pros / Cons */}
				<div className={styles.prosConsGrid}>
					<div className={styles.pros}>
						<div className={styles.prosTitle}>{t('detail.pros')}</div>
						<ul className={styles.list}>
							{pros.map((p, i) => (
								<li key={i}>{p}</li>
							))}
						</ul>
					</div>
					<div className={styles.cons}>
						<div className={styles.consTitle}>{t('detail.cons')}</div>
						<ul className={styles.list}>
							{cons.map((c, i) => (
								<li key={i}>{c}</li>
							))}
						</ul>
					</div>
				</div>

				{/* Use cases */}
				<div className={styles.useCases}>
					<span className={styles.useLabel}>
						<Wrench size={12} strokeWidth={2} className={styles.propIcon} />
						{t('detail.usage')}
					</span>
					{t(`filaments.${filament.id}.use`)}
				</div>
			</div>

			{/* Close */}
			<button className={styles.closeBtn} onClick={onClose}>
				<X size={13} strokeWidth={2} />
				{t('closeHint')}
			</button>
		</div>
	);
}
