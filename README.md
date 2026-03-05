<p align="center">
  <img src="./docs/npkill-text-clean.svg" width="380" alt="flutterkill logo" />
</p>
<p align="center">
<img alt="npm" src="https://img.shields.io/npm/dy/flutterkill.svg">
<img alt="npm version" src="https://img.shields.io/npm/v/flutterkill.svg">
<img alt="NPM" src="https://img.shields.io/npm/l/flutterkill.svg">
</p>

### Easily find and **remove** old and heavy Flutter build artifacts :sparkles:

This tool allows you to list Flutter/Dart build directories (`build`, `.dart_tool`, `.gradle`, `Pods`, etc.) in your system, as well as the space they take up. You can then select which ones you want to erase to free up space.

> Based on **npkill** ([github.com/voidcosmos/npkill](https://github.com/voidcosmos/npkill))

## i18n

We're making an effort to internationalize the Flutterkill docs. Here's a list of the available translations:

- [Español](./README.es.md)
- [Indonesian](./README.id.md)
- [한국어](./README.ko.md)
- [Português](./README.pt.md)
- [Turkish](./README.tr.md)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Multi-Select Mode](#multi-select-mode)
  - [Options](#options)
  - [Examples](#examples)
  - [JSON Output](#json-output)
- [Set Up Locally](#setup-locally)
- [API](#API)
- [Roadmap](#roadmap)
- [Known bugs](#known-bugs)
- [Contributing](#contributing)
- [Buy us a coffee](#donations)
- [License](#license)

<a name="features"></a>

# :heavy_check_mark: Features

- **Clear space:** Get rid of old and dusty Flutter build artifacts cluttering up your machine.

- **Flutter-aware scanning:** Only scans directories with `pubspec.yaml` (real Flutter projects). Automatically excludes the Flutter SDK itself.

- **Last Workspace Usage**: Check when was the last time you modified a file in the workspace (indicated in the **last_mod** column).

- **Very fast:** Flutterkill is written in TypeScript, but searches are performed at a low level, improving performance greatly.

- **Easy to use:** Say goodbye to lengthy commands. Using flutterkill is as simple as reading a list of your build folders, and pressing Del to get rid of them. Could it be any easier? ;)

- **Minified:** It barely has any dependencies.

<a name="installation"></a>

# :cloud: Installation

You don't really need to install it to use it!
Simply use the following command:

```bash
$ npx flutterkill
```

Or if for some reason you really want to install it:

```bash
$ npm i -g flutterkill
# Unix users may need to run the command with sudo. Go carefully
```

<a name="usage"></a>

# :clipboard: Usage

```bash
$ npx flutterkill
# or just flutterkill if installed globally
```

By default, flutterkill will scan for Flutter build artifacts starting at the path where `flutterkill` command is executed.

Move between the listed folders with <kbd>↓</kbd> <kbd>↑</kbd>, and use <kbd>Space</kbd> or <kbd>Del</kbd> to delete the selected folder.
You can also use <kbd>j</kbd> and <kbd>k</kbd> to move between the results.

You can open the directory where the selected result is placed by pressing <kbd>o</kbd>.

To exit, <kbd>Q</kbd> or <kbd>Ctrl</kbd> + <kbd>c</kbd> if you're brave.

**Important!** Deleting `build` or `.dart_tool` folders means the next build will require `flutter pub get` and a full rebuild. Flutterkill will highlight sensitive directories by displaying a :warning: to be careful.

## Search Mode

Search mode allows you to filter results. This can be particularly useful for limiting the view to a specific route or ensuring that only those results that meet the specified condition are “selected all.”

For example, you can use this expression to limit the results to those that are in the `work` directory and that include `data` somewhere in the path: `/work/.*/data`.

Press <kbd>/</kbd> to enter search mode. You can type a regex pattern to filter results.

Press <kbd>Enter</kbd> to confirm the search and navigate the filtered results, or <kbd>Esc</kbd> to clear and exit.

To exit from this mode, leave empty.

## Multi-Select Mode

This mode allows you to select and delete multiple folders at once, making it more efficient when cleaning up many directories.

### Entering Multi-Select Mode

Press <kbd>T</kbd> to toggle multi-select mode. When active, you'll see a selection counter and additional instructions at the top of the results.

### Controls

- **<kbd>Space</kbd>**: Toggle selection of the current folder.
- **<kbd>V</kbd>**: Start/end range selection mode.
- **<kbd>A</kbd>**: Toggle select/unselect all folders.
- **<kbd>Enter</kbd>**: Delete all selected folders.
- **<kbd>T</kbd>**: Unselect all and back to normal mode.

### Range Selection

After pressing <kbd>V</kbd> to enter range selection mode:

- Move the cursor with arrow keys, <kbd>j</kbd>/<kbd>k</kbd>, <kbd>Home</kbd>/<kbd>End</kbd>, or page up/down
- All folders between the starting position and current cursor position will be selected/deselected
- Press <kbd>V</kbd> again to exit range selection mode

<a name="options"></a>

## Options

| ARGUMENT                | DESCRIPTION                                                                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -p, --profiles          | Allows you to select the [profile](./docs/profiles.md) (set of targets) to use. If no option is specified, the available ones will be listed _(**flutter** by default)_.    |
| --config                | Path to a custom .flutterkillrc configuration file. By default, flutterkill looks first for `./.flutterkillrc` and then for `~/.flutterkillrc`.                             |
| -d, --directory         | Set the directory from which to begin searching. By default, starting-point is .                                                                                            |
| -D, --delete-all        | Automatically delete all folders that are found. Suggested to be used together with `-x`.                                                                                   |
| -e, --hide-errors       | Hide errors if any                                                                                                                                                          |
| -E, --exclude           | Exclude directories from search (directory list must be inside double quotes "", each directory separated by ',' ) Example: "ignore1, ignore2"                              |
| -f, --full              | Start searching from the home of the user (example: "/home/user" in linux)                                                                                                  |
| --size-unit             | Set the unit for displaying folder sizes. _(Available: **auto**, mb, gb)_. With auto, sizes < 1024MB are shown in MB (rounded), larger sizes in GB (with decimals).         |
| -h, --help, ?           | Show help page                                                                                                                                                              |
| -nu, --no-check-update  | Don't check for updates on startup                                                                                                                                          |
| -s, --sort              | Sort results by: `size`, `path` or `age`                                                                                                                                    |
| -t, --targets           | Disable profiles feature and specify the name of the directories you want to search for. You can define multiple targets separating with comma. E.g. `-t build,.dart_tool`. |
| -x, --exclude-sensitive | Exclude sensitive directories.                                                                                                                                              |
| -y                      | Avoid displaying a warning when executing --delete-all.                                                                                                                     |
| --dry-run               | It does not delete anything (will simulate it with a random delay).                                                                                                         |
| --json                  | Output results in JSON format at the end of the scan. Useful for automation and scripting.                                                                                  |
| --json-stream           | Output results in streaming JSON format (one JSON object per line as results are found). Useful for real-time processing.                                                   |
| -v, --version           | Show flutterkill version                                                                                                                                                    |

<a name="examples"></a>

## Examples

- Show help and available options:

```bash
flutterkill --help
```

- Show current version:

```bash
flutterkill --version
```

- Search Flutter build directories in your _projects_ directory:

```bash
flutterkill -d ~/projects

# other alternative:
cd ~/projects
flutterkill
```

- Exclude specific directories from search:

```bash
flutterkill -d ~/projects --exclude "flutter_sdk, ignore-this"
```

- Automatically delete all Flutter build artifacts in your backups:

```bash
flutterkill -d ~/backups/ --delete-all
```

- Get results in JSON format for automation or further processing:

```bash
flutterkill --json > results.json
```

- Stream results in real-time as JSON (useful for monitoring or piping to other tools):

```bash
flutterkill --json-stream | jq '.'
```

- Save only successful results to a file, ignoring errors:

```bash
flutterkill --json-stream 2>/dev/null | jq -s '.' > clean-results.json
```

<a name="json-output"></a>

## JSON Output

Flutterkill supports JSON output formats for automation and integration with other tools:

- **`--json`**: Output all results as a single JSON object at the end of the scan
- **`--json-stream`**: Output each result as a separate JSON object in real-time

For detailed documentation, examples, and TypeScript interfaces, see [JSON Output Documentation](./docs/json-output.md).

**Quick Examples:**

```bash
# Get all results as JSON
flutterkill --json > results.json

# Process results in real-time
flutterkill --json-stream | jq '.result.path'

# Find directories larger than 100MB
flutterkill --json | jq '.results[] | select(.size > 104857600)'
```

<a name="setup-locally"></a>

# :pager: Set Up Locally

```bash
# -- First, clone the repository
git clone https://github.com/tangible-idea/npkill.git

# -- Navigate to the dir
cd npkill

# -- Install dependencies
npm install

# -- And run!
npm run start


# -- If you want to run it with some parameter, you will have to add "--" as in the following example:
npm run start -- -f -e
```

<a name="API"></a>

# :bookmark_tabs: API

The API allows you to interact with flutterkill from Node.js to create your own implementations in your scripts (automations, for example).

You can check the basic API [here](./API.md) or on the web (comming soon).

<a name="roadmap"></a>

# :crystal_ball: Roadmap

- [x] Release 0.1.0 !
- [x] Improve code
  - [x] Improve performance
  - [ ] Improve performance even more!
- [x] Sort results by size and path
- [x] Allow the search for other types of directories (targets)
- [ ] Reduce dependencies to be a more minimalist module
- [ ] Allow to filter by directories that have not been used in a period of time
- [ ] Create option for displaying directories in tree format
- [x] Add some menus
- [x] Add log service
- [ ] Periodic and automatic cleaning (?)

<a name="known-bugs"></a>

# :bug: Known bugs :bug:

- Sometimes, CLI is blocked while folder is deleting.
- Sorting, especially by routes, can slow down the terminal when there are many results at the same time.
- Sometimes, size calculations are higher than they should be.
- (SOLVED) Performance issues when searching from high level directories (like / in linux).
- (SOLVED) Sometimes text collapses when updating the cli.
- (SOLVED) Analyzing the size of the directories takes longer than it should.

> If you find any bugs, don't hesitate and open an issue :)

<a name="contributing"></a>

# :revolving_hearts: Contributing

If you want to contribute check the [CONTRIBUTING.md](.github/CONTRIBUTING.md)

<a name="donations"></a>

# :coffee: Buy us a coffee

<img align="right" width="300" src="https://npkill.js.org/img/cat-donation-cup.png">
Original npkill was developed by [Nya García Gallardo](https://github.com/NyaGarcia) and [Juan Torres Gómez](https://github.com/zaldih). Flutterkill is a Flutter-focused fork by [Mark Choi](https://github.com/tangible-idea).

<a name="license"></a>

# :scroll: License

MIT © [Mark Choi](https://github.com/tangible-idea)

> Original npkill: MIT © [Nya García Gallardo](https://github.com/NyaGarcia) and [Juan Torres Gómez](https://github.com/zaldih)

---
