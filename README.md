# Harry Potter Wizard ( React + TypeScript + Vite )

### Prerequisites

- Install pnpm as global dependency.
- Node 20 and above only.
- Only PNPM.

### Initiate the Project

1. To install dependency, do `pnpm install`
2. `pnpm start:dev` to start the development server

### Document Notes

1. This test project is built using React.js with the `vite-ts` template.
2. I haven't used any third party packages
3. The project's main focus is on the logic and functionality, so I kept the UI basic and didn’t prioritize a fancy design.

### Overview of Configuration Files

1. `prettier.config.mjs` - Configures `prettier` for code formatting.
2. `eslint.config.js` - Sets up `eslint` for linting.
3. `.nvmrc` - Specifies the Node.js version used in this project.
4. `.npmrc` - Forces the use of `pnpm` and restricts the shell to `bash` on all operating systems.
5. `.gitattribute` - Manages line ending consistency across Windows, macOS and Linux.
6. `*.module.css` - Used for component-specific CSS and `index.css` holds global styles.
7. `main.tsx` - Entry file that renders the `App` component to the root element using ReactDOM.
8. `App.tsx` - Contains the main `Elixirs` component.

### Folder structure

1. `api` - Provides API endpoint configurations and methods for API calls.
2. `components` - Gives you the ability to use the components which is used by the `page` but in this project there are no routes so the main page required components are here.
3. `components/UI` - Contains custom UI components required by the project.
4. `constants` - Stores constants used in the project.
5. `features` - Organizes `API hooks` and groups it by endpoints in the folder structure.
6. `shared` - Contains shared components that can be reused across the app.
7. `types` - Holds `type` definitions used throughout the project.
