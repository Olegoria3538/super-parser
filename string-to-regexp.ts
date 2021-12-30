const chars = {
  "9": "\\d{1}",
  ".": ".",
};

export const stringToRegExp = (str: string) => {
  const regStaff = str
    .split("")
    .map((x) => {
      if (x in chars) return chars[x as keyof typeof chars];
      return x;
    })
    .join("");

  const reg = new RegExp(regStaff, "igm");

  return reg;
};
