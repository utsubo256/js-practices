import fs from "node:fs";
import enquirer from "enquirer";
import sqlite3 from "sqlite3";
import { MemoRepository } from "./memo_repository.js";

export class MemoApp {
  #repository;
  #arg;

  constructor(arg) {
    const db = new (sqlite3.verbose().Database)("memos.sqlite3");
    this.#repository = new MemoRepository(db);
    this.#arg = arg;
  }

  async run() {
    try {
      await this.#repository.setup();
      if (this.#arg === undefined) {
        await this.#create();
      } else if (this.#arg === "-l") {
        await this.#index();
      } else if (this.#arg === "-r") {
        await this.#show();
      } else if (this.#arg === "-d") {
        await this.#destroy();
      } else {
        console.error("Invalid option");
      }
    } finally {
      await this.#repository.close();
    }
  }

  async #create() {
    const input = fs.readFileSync(0, "utf8").trimEnd();
    await this.#repository.create(input);
  }

  async #index() {
    const memos = await this.#repository.all();
    if (memos.length === 0) {
      console.log("No memos found");
      return;
    }
    memos.forEach((memo) => console.log(this.#extractTitle(memo)));
  }

  async #show() {
    const memos = await this.#repository.all();
    if (memos.length === 0) {
      console.log("No memos found");
      return;
    }
    const message = "Choose a memo you want to see:";
    const memoId = await this.#selectMemoId(memos, message);
    const memo = await this.#repository.find(memoId);
    console.log(memo.body);
  }

  async #destroy() {
    const memos = await this.#repository.all();
    if (memos.length === 0) {
      console.log("No memos found");
      return;
    }
    const message = "Choose a memo you want to delete:";
    const memoId = await this.#selectMemoId(memos, message);
    await this.#repository.delete(memoId);
  }

  async #selectMemoId(memos, message) {
    const response = await enquirer.prompt({
      type: "select",
      name: "memoId",
      message,
      choices: memos.map((memo) => ({
        name: String(memo.id),
        message: memo.body.split("\n")[0],
        body: memo.body,
      })),
      footer() {
        return this.focused.body;
      },
    });
    return response.memoId;
  }

  #extractTitle(memo) {
    return memo.body.split("\n")[0];
  }
}
