import styles from './styles.module.css';

interface Props {
	label: string;
	value: number;
	accent: string;
	delay?: number;
}

export default function ProgressBar({ label, value, accent, delay = 0 }: Props) {
	return (
		<div className={styles.row}>
			<div className={styles.labelRow}>
				<span className={styles.label}>{label}</span>
				<span className={styles.value}>{value}%</span>
			</div>
			<div className={styles.track}>
				<div
					className={styles.fill}
					style={{
						width: `${value}%`,
						background: accent,
						animationDelay: `${delay}ms`,
					}}
				/>
			</div>
		</div>
	);
}
