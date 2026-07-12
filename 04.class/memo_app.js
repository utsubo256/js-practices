import fs from "node:fs";

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
      }
    } finally {
      await this.#repository.close();
    }
  }

  async #create() {
    const input = fs.readFileSync(0, "utf8").trimEnd();
    await this.#repository.create(input);
  }
}
