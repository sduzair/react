# React Practice Repo

- [React Practice Repo](#react-practice-repo)
  - [Dev Setup in VSCode](#dev-setup-in-vscode)
    - [React Workspace](#react-workspace)
    - [Comparison of CSS Class Completion and Navigation Extensions](#comparison-of-css-class-completion-and-navigation-extensions)

## Dev Setup in VSCode

### React Workspace

To enhance your React development experience in Visual Studio Code, instal the following extensions:

1. React Refactor (planbcoding.vscode-react-refactor)
   1. Good refactorsings like extracting components.
2. React TypeScript CSS Modules (viijay-kr.react-ts-css)
   1. For intellisense with imported CSS moduless
   2. Use this import statement `import styles from \<ComponentName\>.module.css
3. Abracadabra (nicoespeon.abracadabra)
   1. Generic Typescript/Javascript refactorings
4. Template String Converter (meganrogge.template-string-converter)
   1. Ease of life feature
5. CSS Nesting Syntax Highlighting (jacobcassidy.css-nesting-syntax-highlighting)
   1. The native CSS language server does not syntax highlight modern CSS nesting.
6. For CSS variables, use CSS Variable Autocomplete (vunguyentuan.vscode-css-variables) or CSS Var Complete (willofindie.vscode-cssvar)
   1. To make CSS variable intellisense possible with CSS variables available in workspace
7. CSS Class Intellisense (tarrow.css-class-intellisense)
   1. Intellisense for CSS styles available in workspace
   2. See below table for comparison with other similar css styles extensions.

### Comparison of CSS Class Completion and Navigation Extensions

| Extension                                | Official VSCode Name                         | Parses Modern CSS | Go to Definition | Peek | Autocomplete in Template Literals | Comments                                                                                                     |
| ---------------------------------------- | -------------------------------------------- | :---------------: | :--------------: | :--: | :-------------------------------: | ------------------------------------------------------------------------------------------------------------ |
| HTML CSS Support                         | `ecmel.vscode-html-css`                      |        ✅         |        ✅        |  ❌  |                ❌                 | Parses modern CSS, configures lint rules, but lacks peek functionality and autocomplete in template literals |
| CSS Class Intellisense                   | `tarrow.css-class-intellisense`              |        ✅         |        ✅        |  ❌  |                ❌                 | Parses modern CSS, but lacks peek functionality and autocomplete in template literals                        |
| CSS Navigation                           | `pucelle.vscode-css-navigation`              |        ❌         |        ✅        |  ✅  |                ✅                 | Does not parse modern CSS, but offers peek and autocomplete in template literals                             |
| HTML-Slim-SCSS-CSS Class Completion      | `gencer.html-slim-scss-css-class-completion` |        ✅         |        ❌        |  ❌  |                ❌                 | Parses modern CSS, but lacks go to definition, peek, and autocomplete in template literals                   |
| IntelliSense for CSS class names in HTML | `zignd.html-css-class-completion`            |        ✅         |        ❌        |  ❌  |                ❌                 | Parses modern CSS, but lacks go to definition, peek, and autocomplete in template literals                   |

### TODO

- [ ] Change merge strat to Subtree
- [ ] Configure urls to be unique to branches
