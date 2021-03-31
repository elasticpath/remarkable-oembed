# Remarkable oEmbed Plugin

This repository builds a plugin for embedding external contents, e.g. videos, to Markdown documents. Utilizing the [oEmbed API](https://oembed.com/) and the [Rmarkable markdown parser](https://github.com/jonschlinkert/remarkable), the plugin in this repo provides a custom Markdown syntax that you can use in your Markdown document to embed external contents.

## Usage

## Development

### Pre-requisites

#### Git

Git is required if you would like to work with this repository on your local machine or would like to contribute changes to this repository.

#### EditorConfig

This repository is also configured with "EditorConfig" to make sure everyone's favourite editor is configured the same way, such as: using spaces for indentation, new line at the end of file, etc. Some editors have built-in support for EditorConfig. Please [download and install EditorConfig plugin for your Editor](https://editorconfig.org/#download), if you're using one of the editors that does not have this support out of the box.

### Working with this repo

Below are some useful commands that can be executed from the root of this repository in your terminal.

- `./gradlew clean`: Removes `build` directory so that you have a fresh build result.

- `./gradlew unit_test`: Runs the mocha unit tests for the source files in `src` directory. Generates reports in `build/test-report` and `build/coverage-report` directories as well as your terminal.

-  `./gradlew lint`: Runs the eslint for all `.js` files. Generates reports in `build/lint-report` directory as well as your terminal.

- `./gradlew test`: Runs all test related gradle tasks, including `unit_test` and `lint`.
