interface DataI {
	[key: string]: { [key: string]: string };
}

interface ModalI {
	active?: boolean
	dataKey?: string
	type?: 'Intro' | 'IntroItem' | "Confirm"
}