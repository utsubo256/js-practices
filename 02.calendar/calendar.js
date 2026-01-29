#!/usr/bin/env node
import minimist from "minimist";

const SATURDAY = 6;

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
  process.stdout.write(date.getDate().toString().padStart(2));
  process.stdout.write(date.getDay() === SATURDAY ? "\n" : " ");
}

process.stdout.write("\n".repeat(lastDate.getDay() === SATURDAY ? 1 : 2));
