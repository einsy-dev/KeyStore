type KeyI = {
	id?: number
	name: string
	value: string
}

interface DataI {
	id?: number
	name: string
	keys: KeyI[]
}


interface ContextMenuI {
	active?: boolean
	menu?: ContextMenuItemI[]
}
interface ContextMenuItemI {
	name: string
	callback: (param?: any) => void
}

interface ModalI {
	active: boolean
	onSubmit?: (data: any) => void
	data?: any
}

interface PopupI {
  active: boolean;
  message?: string;
}