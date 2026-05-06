import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FilamentSpool } from '../../assets/svg';
import styles from './styles.module.css';

export default function Header() {
	const { t, i18n } = useTranslation();
	const currentLang = i18n.language.startsWith('ru') ? 'ru' : 'en';

	useEffect(() => {
		document.title = t('siteTitle');
	}, [i18n.language, t]);

	const toggle = () => {
		i18n.changeLanguage(currentLang === 'ru' ? 'en' : 'ru');
	};

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<div className={styles.brand}>
					<FilamentSpool className={styles.icon} width={20} height={20} />
					<span className={styles.title}>{t('siteTitle')}</span>
				</div>

				<button className={styles.langBtn} onClick={toggle} aria-label='Switch language'>
					<span
						className={`${styles.pill} ${currentLang === 'en' ? styles.pillRight : ''}`}
					/>
					<span
						className={`${styles.langOption} ${currentLang === 'ru' ? styles.langActive : styles.langInactive}`}
					>
						RU
					</span>
					<span
						className={`${styles.langOption} ${currentLang === 'en' ? styles.langActive : styles.langInactive}`}
					>
						EN
					</span>
				</button>
			</div>
		</header>
	);
}
