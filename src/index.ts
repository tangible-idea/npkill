#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { realpathSync } from 'fs';
import main from './main.js';

// Check if flutterkill is called directly from the command line. If so, start the
// cli. If not, the module is being imported by another module, so don't start.
// realpathSync resolves symlinks (e.g. npm global bin symlinks) so both paths match.
const shouldStartCli =
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
if (shouldStartCli) {
  main();
}

export * from './core/index.js';
