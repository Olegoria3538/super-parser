import { superParser } from "./parser";
import { stringToRegExp } from "./string-to-regexp";

const pars = superParser({
  date: stringToRegExp("99.99.9999"),
  time: /([0-1][0-9]|2[0-3]):[0-5][0-9]/g,
});

const input = document.querySelector<HTMLInputElement>("#text");
input.onchange = (e) => {
  const target = e.currentTarget as HTMLInputElement;
  const { date, time } = pars(target.value);
  if (date && time) target.value = `${date} / ${time}`;
};
