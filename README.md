# Remarkable oEmbed Plugin

This repository builds a plugin for embedding external contents, e.g. videos, to Markdown documents. Utilizing the [oEmbed API](https://oembed.com/) and the [Rmarkable markdown parser](https://github.com/jonschlinkert/remarkable), the plugin in this repo provides a custom Markdown syntax that you can use in your Markdown document to embed external contents.

## Usage
1. Add `remarkable` and `remarkable-oembed` to your project using a package manager:

    ```
    yarn add -D remarkable remarkable-oembed
    ```

2. Enable the `remarkable` and `remarkable-oembed` plugin:

    ``` js
    const { Remarkable } = require('remarkable')
    const remarkableOembed = require('remarkable-oembed')

    let md = new Remarkable().use(remarkableOembed)
    ```

3. Use the oEmbed remarkable syntax like following:

    - With an alternative text and title:
      ```
      !oembed[alternative text](source url "title")

      !oembed[A Youtube video about Elastic Path Commerce Cloud](https://www.youtube.com/watch?v=7ALwNmwYxBg "What is Elastic Path Commerce Cloud")
      ```

    - With an alternative text only:
      ```
      !oembed[alternative text](source url)

      !oembed[A Youtube video about Elastic Path Commerce Cloud](https://www.youtube.com/watch?v=7ALwNmwYxBg)
      ```
      **Note:** Please make sure that there is no space between your source URL and the closing bracket.
      ```
      !oembed[A Youtube video about Elastic Path Commerce Cloud](https://www.youtube.com/watch?v=7ALwNmwYxBg     )
      ```
      The Markdown above will not work.

    - With a title only:
      ```
      !oembed[](source url "title")

      !oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg "What is Explains Elastic Path Commerce Cloud")
      ```

    - With no alternative text or title:
      ```
      !oembed[](source url)

      !oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg)
      ```

4. Render the Markdown to get corresponding HTML ouput:

    ```js
    md.render('!oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg)')
    ```

    This will give you the output:

    ```js
    '<iframe width="200" height="113" src="https://www.youtube.com/embed/7ALwNmwYxBg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n'
    ```


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
