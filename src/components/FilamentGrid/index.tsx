import { useState, useEffect, useRef } from 'react';
import { filaments } from '../../constants/filaments';
import FilamentCard from '../FilamentCard';
import FilamentDetail from '../FilamentDetail';
import styles from './styles.module.css';

export default function FilamentGrid() {
	const [activeId, setActiveId] = useState<string | null>(null);
	const detailRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
	const scrollBackTo = useRef<string | null>(null);

	const activeFilament = filaments.find(f => f.id === activeId) ?? null;

	const handleToggle = (id: string) => {
		setActiveId(prev => (prev === id ? null : id));
	};

	const handleClose = () => {
		scrollBackTo.current = activeId;
		setActiveId(null);
	};

	useEffect(() => {
		if (activeFilament && detailRef.current && window.innerWidth <= 860) {
			detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [activeFilament]);

	useEffect(() => {
		if (!activeId && scrollBackTo.current) {
			const card = cardRefs.current.get(scrollBackTo.current);
			scrollBackTo.current = null;
			if (card && window.innerWidth <= 860) {
				card.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		}
	}, [activeId]);

	return (
		<section>
			<div className={styles.grid}>
				{filaments.map(f => (
					<div
						key={f.id}
						ref={el => {
							if (el) cardRefs.current.set(f.id, el);
							else cardRefs.current.delete(f.id);
						}}
					>
						<FilamentCard
							filament={f}
							isActive={activeId === f.id}
							onClick={() => handleToggle(f.id)}
						/>
					</div>
				))}
			</div>

			{activeFilament && (
				<div ref={detailRef}>
					<FilamentDetail filament={activeFilament} onClose={handleClose} />
				</div>
			)}
		</section>
	);
}
