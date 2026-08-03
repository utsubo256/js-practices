#!/usr/bin/env node

import { MemoApp } from "./memo_app.js";

const arg = process.argv.slice(2)[0];
const app = new MemoApp(arg);
await app.run();
