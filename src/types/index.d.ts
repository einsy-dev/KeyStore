type IconI = React.FC<SvgProps>;

type KeyModeT = "single" | "double";

type Require<T, K extends keyof T> = T & Required<Pick<T, K>>;
type Optinal<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type Join<K, P> = K extends string | number ? (P extends string | number ? `${K}.${P}` : never) : never; //key1.key2
type Paths<T> = T extends (infer U)[]
  ? `${Paths<U>}`
  : T extends object
    ? {
        [K in keyof T & (string | number)]: K extends string ? `${K}` | `${K}.${Paths<T[K]>}` : never;
      }[keyof T & (string | number)]
    : never;

//  function set<V extends keyof ConfigI>(key: V, value: ConfigI[V])
// type Paths<T> = T extends object
//   ? {
//       [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K]>> : never;
//     }[keyof T]
//   : "";

// Object.defineProperty(String.prototype, "capitalize", {
//   value: function () {
//     return this.charAt(0).toUpperCase() + this.slice(1);
//   },
//   enumerable: false
// });

// declare global {
//   interface String {
//     capitalize(): string;
//   }
// }
