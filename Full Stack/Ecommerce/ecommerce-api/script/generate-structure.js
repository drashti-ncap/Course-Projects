#!/usr/bin/env node

/**
 * Reads structure.md and generates the project folder/file tree under src/.
 *
 * Usage:
 *   node script/generate-structure.js
 *   node script/generate-structure.js --force   # overwrite existing files
 */

const fs = require('fs');
const path = require('path');
const { getTemplate } = require('./file-templates');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const STRUCTURE_FILE = path.join(PROJECT_ROOT, 'structure.md');
const OUTPUT_ROOT = path.join(PROJECT_ROOT, 'src');
const FORCE = process.argv.includes('--force');

/**
 * Parse the ASCII tree in structure.md into { type, relativePath } entries.
 */
function parseStructure(content) {
  const lines = content.split(/\r?\n/);
  const entries = [];
  let rootDir = null;
  const stack = [];

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, '    ');

    if (!line.trim() || line.trim() === '│') {
      continue;
    }

    const rootMatch = line.match(/^([^\s│├└].+\/)\s*$/);
    if (rootMatch && !line.includes('├──') && !line.includes('└──')) {
      rootDir = rootMatch[1].replace(/\/$/, '');
      stack.length = 0;
      entries.push({ type: 'dir', relativePath: rootDir });
      continue;
    }

    const nodeMatch = line.match(/(?:├──|└──)/);
    if (!nodeMatch || !rootDir) {
      continue;
    }

    const connectorIndex = nodeMatch.index;
    const depth = Math.floor(connectorIndex / 4) + 1;
    const name = line.slice(connectorIndex + 4).trim();
    const isDir = name.endsWith('/');
    const segment = isDir ? name.slice(0, -1) : name;

    stack.length = depth;
    stack[depth - 1] = segment;

    const relativePath = path.posix.join(rootDir, ...stack.filter(Boolean));

    entries.push({
      type: isDir ? 'dir' : 'file',
      relativePath,
    });
  }

  return entries;
}

function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFile(relativePath, content) {
  const absolutePath = path.join(PROJECT_ROOT, relativePath.replace(/\//g, path.sep));
  ensureDirectory(path.dirname(absolutePath));

  if (fs.existsSync(absolutePath) && !FORCE) {
    return { action: 'skipped', path: relativePath };
  }

  fs.writeFileSync(absolutePath, content, 'utf8');
  return { action: FORCE && fs.existsSync(absolutePath) ? 'updated' : 'created', path: relativePath };
}

function generate() {
  if (!fs.existsSync(STRUCTURE_FILE)) {
    console.error(`Structure file not found: ${STRUCTURE_FILE}`);
    process.exit(1);
  }

  const content = fs.readFileSync(STRUCTURE_FILE, 'utf8');
  const entries = parseStructure(content);

  if (entries.length === 0) {
    console.error('No entries parsed from structure.md. Check the file format.');
    process.exit(1);
  }

  const stats = { created: 0, updated: 0, skipped: 0, dirs: 0 };
  const seenDirs = new Set();

  console.log(`Generating project structure from ${path.basename(STRUCTURE_FILE)}...\n`);

  for (const entry of entries) {
    const absolutePath = path.join(PROJECT_ROOT, entry.relativePath.replace(/\//g, path.sep));

    if (entry.type === 'dir') {
      if (!seenDirs.has(entry.relativePath)) {
        ensureDirectory(absolutePath);
        seenDirs.add(entry.relativePath);
        stats.dirs += 1;
        console.log(`[dir]  ${entry.relativePath}/`);
      }
      continue;
    }

    const template = getTemplate(entry.relativePath);
    const result = writeFile(entry.relativePath, template);

    if (result.action === 'skipped') {
      stats.skipped += 1;
      console.log(`[skip] ${entry.relativePath}`);
    } else if (result.action === 'updated') {
      stats.updated += 1;
      console.log(`[file] ${entry.relativePath} (updated)`);
    } else {
      stats.created += 1;
      console.log(`[file] ${entry.relativePath}`);
    }
  }

  console.log('\nDone.');
  console.log(`Directories: ${stats.dirs}`);
  console.log(`Files created: ${stats.created}`);
  console.log(`Files updated: ${stats.updated}`);
  console.log(`Files skipped: ${stats.skipped}`);

  if (stats.skipped > 0) {
    console.log('\nTip: run with --force to overwrite existing files.');
  }
}

generate();
