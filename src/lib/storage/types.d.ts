interface GroupI {
  id: string;
  name: string;
  icon: string;
  keys: KeyI[];
}

interface KeyI {
  id: string;
  name: KeyNameI;
  value: KeyValueI;
}

interface KeyNameI {
  label: string;
  value: string;
  hide: boolean;
}
interface KeyValueI {
  label: string;
  value: string;
  hide: boolean;
}

type Require<T, K extends keyof T> = T & Required<Pick<T, K>>;
type Optinal<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
