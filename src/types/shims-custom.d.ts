// https://github.com/svgstore/svgstore/blob/master/src/svgstore.js
type SvgstoreOptionsType = { [key: string]: boolean };
type SvgstoreType = {
  element: string;
  add: (id: string, file: string, options?: SvgstoreOptionsType) => void;
  toString: <T>(options?: SvgstoreOptionsType) => T;
};
declare module 'svgstore' {
  export default function svgstore(options?: SvgstoreOptionsType): SvgstoreType;
}
