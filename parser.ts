type PartsType = {
  [x: string]: RegExp | RegExp[];
};

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type ResultFind<T> = {
  [K in keyof T]: null | string;
};

export const superParser = <Parts extends PartsType>(parts: Parts) => {
  const partsArray = Object.entries(parts) as Entries<Parts>;

  //   const getEntriesValue = (x: Entries<Parts>[0]) => x[1];
  const getNullParts = (x: Entries<Parts>) =>
    x.reduce((acc, x) => ({ ...acc, [x[0]]: null }), {} as ResultFind<Parts>);

  const checkText = (
    text: string,
    reg: RegExp
  ): { findText: string | null; sliceText: string } => {
    if (reg.test(text)) {
      const findText = text.match(reg)[0];
      return { findText, sliceText: text.replace(findText, "") };
    }
    return { findText: null, sliceText: text };
  };

  const main = (_text: string) => {
    const text = _text;
    const res = getNullParts(partsArray);

    const parseText = (text: string, index: number): void => {
      if (!partsArray.length || partsArray.length <= index) return;
      const [key, reg] = partsArray[index];
      if (Array.isArray(reg)) {
        for (let j = 0; j < reg.length; j++) {
          const { sliceText, findText } = checkText(text, reg[j]);
          if (findText !== null) {
            res[key] = findText;
            parseText(sliceText, index + 1);
            break;
          }
          if (j === reg.length - 1) parseText(sliceText, index + 1);
        }
      } else {
        const { sliceText, findText } = checkText(text, reg as RegExp);
        if (findText !== null) res[key] = findText;
        parseText(sliceText, index + 1);
      }
    };

    parseText(text, 0);

    return res;
  };

  return main;
};
