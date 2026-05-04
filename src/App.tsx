import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import FilamentGrid from './components/FilamentGrid';
import styles from './App.module.css';

export default function App() {
	const { t } = useTranslation();

	return (
		<>
			<Header />
			<main>
				<p className={styles.subtitle}>{t('subtitle')}</p>
				<FilamentGrid />
			</main>
		</>
	);
}
