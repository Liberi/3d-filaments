export type BarKey = 'strength' | 'flexibility' | 'rigidity' | 'tempResistance' | 'printEase';

export interface FilamentTechProps {
	print: string;
	bed: string;
	hdt: string;
	uv: string;
	moisture: string;
	price: string;
}

export interface Filament {
	id: string;
	name: string;
	accent: string;
	accentDim: string;
	tagBg: string;
	tagColor: string;
	tagKeys: string[];
	bars: Record<BarKey, number>;
	props: FilamentTechProps;
	prosCount: number;
	consCount: number;
}
