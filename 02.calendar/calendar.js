#!/usr/bin/env node
import minimist from "minimist";

function center(targetString, targetLength) {
  const spaceNumber = (targetLength - targetString.length) / 2;
  return (
    " ".repeat(Math.ceil(spaceNumber)) +
    targetString +
    " ".repeat(Math.floor(spaceNumber))
  );
}

const options = minimist(process.argv.slice(2));

const today = new Date();
const year = options.y ?? today.getFullYear();
const month = options.m ? options.m - 1 : today.getMonth();

const firstDate = new Date(year, month, 1);
const lastDate = new Date(year, month + 1, 0);
const targetMonth = new Intl.DateTimeFormat("en", { month: "long" }).format(
  firstDate,
);
const days = "Su Mo Tu We Th Fr Sa";

console.log(center(`${targetMonth} ${year}`, days.length));
console.log(days);

process.stdout.write("   ".repeat(firstDate.getDay()));
for (
  let date = new Date(firstDate);
  date <= lastDate;
  date.setDate(date.getDate() + 1)
) {
  let day = date.getDate().toString();
  if (day.length === 1) {
    day = " " + day;
  }
  process.stdout.write(day);
  date.getDay() === 6 ? console.log() : process.stdout.write(" ");
  if (date.getDate() === lastDate.getDate() && date.getDay() !== 6) {
    console.log();
  }
}

console.log();
