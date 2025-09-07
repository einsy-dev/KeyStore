interface SessionContextI {
  isBioAvailable: boolean;
  isAuth: boolean;
  status: "success" | "error" | null;
  isCanceled: boolean;
  autoLock: boolean;
  signIn: (pin: string, newPin?: boolean) => Promise<void>;
  signInBio: () => Promise<void>;
  signOut: () => Promise<void>;
  setAutoLock: (autoLock: boolean) => Promise<void>;
  call: (cb: () => Promise<void>) => Promise<void>;
}

interface AuthI {
  isBioAvailable: boolean;
  status: "success" | "error" | null;
  isAuth: boolean;
  isCanceled: boolean;
  autoLock: boolean;
}

interface SessionStateI {
  auth: AuthI;
}
