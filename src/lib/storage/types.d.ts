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
