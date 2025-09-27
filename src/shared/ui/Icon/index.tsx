import * as Icons from "@/assets/icons/user";
import { TouchableNativeFeedback, View } from "react-native";
export function Icon({ iconId, disabled = false, onPressIn }: { iconId: string; disabled?: boolean; onPressIn?: () => void }) {
	const Icon: IconI = (Icons as any)[iconId];
	return (
		<TouchableNativeFeedback onPressIn={onPressIn} disabled={disabled}>
			<View className="items-center justify-center p-2">
				<Icon width={40} height={40} />
			</View>
		</TouchableNativeFeedback>
	);
}
