# [Cloud Phone](https://www.cloudfone.com/) - React Sample Widget

:beginner: This is a beginner guide on [Cloud Phone](https://www.cloudfone.com/) widget development, created using [Vite](https://vite.dev/guide/), as a sample repository.

## Prerequisites

* [Node & npm](https://nodejs.org/en/download/)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* A [GitHub](https://github.com/signup) account :octocat:

## Components

### `<Header />`

A header displayed at the top of the screen. Includes a fixed logo and a `title` property that updates both `document.title` and an `h1` tag displaying the title on screen.

### `<OptionsMenu />`

A modal containing a list of menu items. Supports T9 keyboard navigation. Focus is moved using `ArrowUp` and `ArrowDown`. Menu items are selected using `Enter`.

### `<SoftKeyBar />`

An on-screen menu bar with three actions in the positions `start` (left), `center`, and `end` (right). Supports both icon and text actions triggered via a global `keydown` event listener.

On Cloud Phone, soft keys are mapped as follows:

| Name                  | Key           | Function          |
| --------------------- | ------------- | ----------------- |
| Left Soft Key (LSK)   | `Escape`      | Programmable      |
| Right Soft Key (RSK)  | N/A           | `history.back()`  |
| Enter                 | `Enter`       | Programmable      |

Because developers cannot override the RSK behavior, clicking RSK also calls `history.back()` to reproduce the same behavior on desktop browsers.

## Deploy to GitHub Pages

[GitHub Pages](https://pages.github.com/) offers free hosting for public open-source repositories.

## License

Licensed under the [Apache 2.0](./LICENSE) license
