This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Open Discussion

### Bugs and known issues
Currently, there is few validation about user input. There are implicit restrictions however; like for instance on the approver selection dropdown which excludes existing approvers on a team thus not allowing you to select twice the same approver within same team. In general, following validations and fixes I would like to add since I feel these are standards or add valuable for the user:

1. Budget Boundaries
* disbable intersecting upper and lower limits within an approval
* forbid intersecting limits accross approve steps in the same team 

2. Edit Mode
* when selecting an approval step, the edit mode is not rendered in place but after approval list 
* drop down containing approver candidates does not provide default value for the current selected approver


### Topics left to do
Some things are not strictly broken, but increase friction when interacting with the app or are below what I would recommend for the use case.

1. Budget Boundaries
* should be possible to select unlimted for upper or lower threshold to simplfy approval
* highlight gaps in the existing approval step limits (e.g. 500- 1000 € not covered yet -> recommend to user)

2. Edit Mode
* when deleting an approval step, confirmation should be requested from user
* improve responsiveness for small screens in general, especially labels line break and buttons alignment
* show how often an approver candidate is already scheduled across teams to balance assignments

3. General
* user and team data should be fetched in the main app component, not in the ApprovalSchema component
* more test for ApprovalSchema component as well as mock data
* break down ApprovalSchema component into sub components to modularize further, thus improving readability and testing