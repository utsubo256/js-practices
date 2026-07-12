#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { MemoApp } from "./memo_app.js";
import { MemoRepository } from "./memo_repository.js";

const db = new (sqlite3.verbose().Database)("memos.sqlite3");
const repository = new MemoRepository(db);
const arg = process.argv.slice(2)[0];
const app = new MemoApp(repository, arg);
await app.run();
