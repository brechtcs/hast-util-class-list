export default ClassList;
export type Element = import('hast').Element;
/**
 * @typedef {import('hast').Element} Element
 */
/**
 * Classlist
 * @param {Element} node
 */
declare function ClassList(node: Element): {
    add: (token: string) => void;
    remove: (token: string) => void;
    contains: (token: string) => boolean;
    toggle: (token: string, force: (() => boolean) | boolean) => boolean;
    replace: (a: string, b: string) => void;
    item: (index: number) => string | null;
    length: number;
    forEach: (callback: (value: string, index: number, array: string[]) => void, thisArg?: any) => void;
    entries: () => IterableIterator<[number, string]>;
    keys: () => IterableIterator<number>;
    values: () => IterableIterator<string>;
    toString: () => string;
};
