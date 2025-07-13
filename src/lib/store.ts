import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect } from "react";

const MyContext = createContext<DataI>({});

interface useMyContextI {
	context: DataI,
	setIntro: (name: string) => void,
	setIntroItem: (intro: string, name: string, value: string) => void,
	delIntro: (name: string) => void,
	delIntroItem: (intro: string, name: string) => void
}

function useMyContext(): useMyContextI {
	const context = useContext<DataI>(MyContext)

	useEffect(() => {
		context.data = (JSON.parse(SecureStore.getItem("data") || "{}"))
	}, [context])


	function setIntro(intro: string) {
		context[intro] = {}
		saveStore(context)
	};

	function setIntroItem(intro: string, introItem: string, value: string) {
		context[intro] = Object.assign(context[intro], { [introItem]: value })
		saveStore(context)
	};

	function delIntro(name: string) {
		delete context[name]
		saveStore(context)
	};
	function delIntroItem(intro: string, introItem: string) {
		delete context[intro][introItem]
		saveStore(context)
	};


	return { context, setIntro, setIntroItem, delIntro, delIntroItem }
};
export { MyContext, useMyContext };

function saveStore(context: DataI) {
	SecureStore.setItem("data", JSON.stringify(context))
};