import { selectUser } from "@/lib/store/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useAuth() {
  const [status, setStatus] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, [user]);

  return status;
}
