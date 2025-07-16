type KeyI = {
	id?: number
	name: string
	value: string
}

type DataI = {
	id?: number
	name: string
	keys?: KeyI[]
}

interface ModalI {
	active?: boolean
	type?: ModalType
	data?: DataI
}

type ModalType = 'Intro' | 'EditIntro' | 'IntroItem' | 'EditIntroItem' | "Confirm"