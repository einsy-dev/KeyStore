import { Confirm } from "@/components/confirm";
import { setModal } from "@/lib/store/app";
import { useDispatch } from "react-redux";

export function useMenu() {
  const dispatch = useDispatch();
  return [
    {
      name: "Edit",
      callback: () => {}
    },
    {
      name: "Delete",
      callback: () => {
        dispatch(
          setModal({
            active: true,
            component: <Confirm title="Are you sure?" onSubmit={() => {}} />
          })
        );
      }
    }
  ];
}
