# TypeScript Action

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/nickolashkraus/typescript-action/blob/master/LICENSE)

An example TypeScript Action with compilation, tests, linting, workflow, publishing, and versioning.

## Overview

### About custom actions

There are two<sup>†</sup> types of actions. **JavaScript** and **Docker** actions:
* **JavaScript**: JavaScript actions run on the host machine. The unit of work is decoupled from the environment.
* **Docker container**: A container action is a container which carries both the unit of work along with the environment and its dependencies packaged up as a container.

<sup>†</sup>: There is a third action type **Composite Actions**, which allows you to combine multiple workflow steps within one action. See [Creating a composite action](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action).

JavaScript actions, and by extension TypeScript actions, run directly on the host machine or VM and will run on any environment its runtime, Node, is supported.

## Creating a JavaScript Action using TypeScript

This repository provides a walkthrough and template for creating a JavaScript Action using TypeScript.

This template includes compilation support, tests, a validation workflow, publishing, and versioning guidance.

This repository attempts to be as verbose as possible in explaining the various components of a JavaScript action. For additional documentation, see GitHub's [Creating a JavaScript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action).

### Prerequisites

1. Download and install Node.js 16.x, which includes npm.

**NOTE**: JavaScript actions can use Node.js v12 or Node.js v16. This repository uses v16.19.0 installed via nvm:

```bash
$ nvm install 16.19.0
```

2. Run `npm init` to create a `package.json` file.

### Step 1: Creating an action metadata file

Actions require a metadata file that uses YAML syntax. The metadata filename must be either `action.yml` or `action.yaml`. The data in the metadata file defines the inputs, outputs, and runs configuration for your action.

For metadata file syntax, see [Metadata syntax for GitHub Actions](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions).

See [action.yml](./action.yml) for this actions metadata file.

### Step 2: Add GitHub Actions Toolkit packages

The GitHub Actions ToolKit ([actions/toolkit](https://github.com/actions/toolkit)) provides a set of packages to make creating actions easier. It is a collection of Node.js packages that allow you to quickly build JavaScript actions with more consistency.

For a full list of packages provided by the GitHub Actions Toolkit, see the [`README`](https://github.com/actions/toolkit).

This action leverages [@actions/core](https://github.com/actions/toolkit/blob/main/packages/core), which provides functions for inputs, outputs, results, logging, secrets and variables.

```bash
$ npm install @actions/core
```

Modules are installed to the `node_modules` directory and a `package-lock.json` file is generated with the installed module dependencies and the versions of each installed module.

### Step 3: Writing the action code

Action code is contained in `src/main.ts`.

#### ESLint

[ESLint](https://eslint.org/) statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.

**Files**:
* `.eslintignore`: [Ignore file](https://eslint.org/docs/latest/use/configure/ignore) to ignore certain files and directories while linting.
* `.eslintrc.json`: [Configuration file](https://eslint.org/docs/latest/use/configure/configuration-files) containing ESLint configuration.

#### Prettier

Prettier is an opinionated code formatter. It removes all original styling and ensures that all outputted code conforms to a consistent style.

**Files**:
* `.prettierignore`: [Ignore file](https://prettier.io/docs/en/ignore.html) to ignore (i.e. not reformat) certain files and folders completely.
* `.prettierrc.json`: [Configuration file](https://prettier.io/docs/en/configuration.html) containing Prettier configuration.

### Step 4: Commit, tag, and push your action to GitHub

GitHub downloads each action in a workflow during runtime and executes it as a complete package of code before you can use workflow commands like `run` to interact with the runner machine.

**NOTE**: The official GitHub documentation instructs the reader to include any package dependencies required to run the code with the action (such as `node_modules`). However, committing the `node_modules` directory can cause issues, therefore, as an alternative, you can use a tool called [@vercel/ncc](https://github.com/vercel/ncc) to compile your code and modules into one file used for distribution.

#### ncc

[ncc](https://github.com/vercel/ncc) is simple CLI for compiling a Node.js module into a single file, together with all its dependencies, gcc-style.

Install vercel/ncc:

```bash
$ npm i -g @vercel/ncc
```

Compile TypeScript (`src/main.ts`):

```
# Compiles the current project (tsconfig.json in the working directory) and
# outputs to lib/main.js.
npx tsc
```

Compile `index.js` file:

```bash
$ ncc build --source-map --license licenses.txt
```

You will see a new `dist/index.js` file with your code and the compiled modules. You will also see an accompanying `dist/licenses.txt` file containing all the licenses of the Node modules you are using.

**NOTE**: You will receive the following error if the TypeScript has not been compiled:

```
Error: Cannot find module '[...]/lib/main.js'. Please verify that the package.json has a valid "main" entry
```

### Step 5: Testing out your action in a workflow

Public actions can be used by workflows in any repository.

**Example Usage**

```yaml
on:
  # Allow workflow to be manually triggered.
  workflow_dispatch:

jobs:
  typescript-action:
    runs-on: ubuntu-latest
    steps:
      - uses: nickolashkraus/typescript-action@v1
        id: typescript-action
        with:
          input: 'This is some input.'
      # Use the output from the `typescript-action` step.
      - run: echo "${{ steps.typescript-action.outputs.output }}"
```

---

## Development

Install dependencies:

```bash
$ npm install
```

Compile the TypeScript to JavaScript:

```bash
$ npm run build
```

**NOTE**: You can also run `npx tsc`.

Run tests:

```bash
$ npm run test
```

Compile the JavaScript into a single file with its dependencies (`index.js`):

```bash
$ npm run package
```
