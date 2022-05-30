# Remarkable oEmbed Plugin

This repository builds a plugin for [Remarkable markdown parser](https://github.com/jonschlinkert/remarkable) that allows embedding external contents, e.g. videos, to Markdown documents.

The plugin provides a custom Markdown syntax that can be used in Markdown document to embed external contents using a URL, like embedding an image. It expects external contents to be available from the provided URL following the [oEmbed specs](https://oembed.com/).


## Installation

Add `remarkable-oembed` to your project using a package manager. For example:

Using `yarn`:

```sh
yarn add https://github.com/elasticpath/remarkable-oembed#v1.0.0 --dev
```

Using `npm`:

```sh
npm install https://github.com/elasticpath/remarkable-oembed#v1.0.0 --save-dev
```

**Note**: The above examples show adding the package using the source repo's URL. The version number at the end is a git tag. Ideally it should be installed from npm registry but this plugin is not published to npm registry yet.

## Usage

Enable the `remarkable-oembed` plugin and let Remarkable parse the markdown content:

``` js
const { Remarkable } = require('remarkable')
const remarkableOembed = require('remarkable-oembed')

let md = new Remarkable().use(remarkableOembed)
md.render('!oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg)')
```

Above markdown content will be parsed and give you following html:

```html
<div class="oembed oembed-video"><iframe src="https://www.youtube.com/embed/7ALwNmwYxBg?feature=oembed" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="200" height="113" frameborder="0"></iframe></div>
```

See the next section for more details on the syntax.

### Markdown syntax processed by remarkable-oembed

- With an alternative text and title:

    ```md
    !oembed[alternative text](source url "title")

    !oembed[A Youtube video about Elastic Path Commerce Cloud](https://www.youtube.com/watch?v=7ALwNmwYxBg "What is Elastic Path Commerce Cloud")
    ```

- With an alternative text only:

    ```md
    !oembed[alternative text](source url)

    !oembed[A Youtube video about Elastic Path Commerce Cloud](https://www.youtube.com/watch?v=7ALwNmwYxBg)
    ```
    **Note:** Please make sure that there is no space between your source URL and the closing bracket.

    ```md
    !oembed[A Youtube video about Elastic Path Commerce Cloud](https://www.youtube.com/watch?v=7ALwNmwYxBg     )
    ```

    The Markdown above will not work.

- With a title only:

    ```md
    !oembed[](source url "title")

    !oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg "What is Explains Elastic Path Commerce Cloud")
    ```

- With no alternative text or title:

    ```md
    !oembed[](source url)

    !oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg)
    ```

You can add extra configuration to the oEmbed URL by adding extra query parameters to the end of the source url.

For instance, `maxwidth` and `maxheight` are two valid request parameters for `rich` and `video` type according to section *2.3.4.2. The video type* and *2.3.4.4. The rich type* from [oembed](https://oembed.com/). You can specify the width and height by adding `&maxwidth=` and `&maxheight=` to the end of the source url:

```md
!oembed[](https://www.youtube.com/watch?v=7ALwNmwYxBg&maxwidth=100&maxheight=500)
```

There are also custom options implemented by each provider, e.g. `theme` option for [codesandbox](https://codesandbox.io/docs/embedding). According to its documentation, you could trigger the light theme by adding `?theme=light` to the end of the source url:

```md
!oembed[](https://codesandbox.io/s/react-new?theme=light)
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


## Maintenance

This plugin currently is not published it to an npm registry. This section of the document is for maintainers of this repo on process for maintaining changes and release process.

### Release

[Semantic Versioning](https://semver.org/) must be followed. When a new release is required, create a Git Tag and a release in GitHub following semantic versioning schema.

- In GitHub repo, click "Create a new release"
- In the "New Release" page:
    - From the "Choose a tag" dropdown, type a new release version; for example: `v1.0.0`.
    - Type the same version number as "Release Title"
    - Give a brief description in the text box. Ideally a list of PRs with features/fixes added and the corresponding contributor's name.
    - Click "Publish Release".

The above steps will create a new git tag as well as create a new GitHub release.

Ideally we'd have the above steps automated and is taken care of through GitHub Actions as part of CI CD process.

test
