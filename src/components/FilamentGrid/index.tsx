import { useState } from 'react';
import { filaments } from '../../constants/filaments';
import FilamentCard from '../FilamentCard';
import FilamentDetail from '../FilamentDetail';
import styles from './styles.module.css';

export default function FilamentGrid() {
	const [activeId, setActiveId] = useState<string | null>(null);

	const activeFilament = filaments.find(f => f.id === activeId) ?? null;

	const handleToggle = (id: string) => {
		setActiveId(prev => (prev === id ? null : id));
	};

	return (
		<section>
			<div className={styles.grid}>
				{filaments.map(f => (
					<FilamentCard
						key={f.id}
						filament={f}
						isActive={activeId === f.id}
						onClick={() => handleToggle(f.id)}
					/>
				))}
			</div>

			{activeFilament && (
				<FilamentDetail filament={activeFilament} onClose={() => setActiveId(null)} />
			)}
		</section>
	);
}
