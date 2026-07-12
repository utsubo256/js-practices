import fs from "node:fs";
import enquirer from "enquirer";

export class MemoApp {
  #repository;
  #arg;

  constructor(repository, arg) {
    this.#repository = repository;
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
    memos.forEach((row) => {
      console.log(row.title.split("\n")[0]);
    });
  }

  async #show() {
    const memos = await this.#repository.all();
    if (memos.length === 0) {
      console.log("No memos found");
      return;
    }
    const response = await enquirer.prompt({
      type: "select",
      name: "memoId",
      message: "メモを選択してください",
      choices: memos.map((memo) => ({
        name: String(memo.id),
        message: memo.title.split("\n")[0],
        body: memo.title,
      })),
      footer() {
        return this.focused.body;
      },
    });
    const memo = await this.#repository.find(response.memoId);
    console.log(memo.title);
  }
}
