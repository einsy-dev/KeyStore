type IndexI = Map<string, Set<string>>;

interface GroupI {
  id: string;
  name: string;
  icon: string;
  keys: { [id: string]: KeyI };
}

interface KeyI {
  id: string;
  name: KeyNameI;
  value: KeyValueI;
}

type KeyNameI = {
  label: string;
  value: string;
  hide: boolean;
};
type KeyValueI = KeyNameI;

type Require<T, K extends keyof T> = T & Required<Pick<T, K>>;
type Optinal<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
//  function set<V extends keyof ConfigI>(key: V, value: ConfigI[V])
