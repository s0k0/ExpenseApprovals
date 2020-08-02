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

### Bugs and known issue
Currently, there is few validation about user input. There are implicit restrictions however, like on the approver dropdown, which filters the existing approvers on a team from the options thus not allowing you to select twice the same approver within any team. In general validation I would like to add since I feel this is standard and valuable to the user:

1. Budget Boundaries
* intersecting upper and lower limits within an approval possible
* intersecting limits to other approvers in the same team possible

2. Edit Mode
* when selecting an approval step, the edit mode is not rendered in place but after approval list 
* drop down for approver candidates does not provide default select for the current approver


### Topics left to do
Some things are not strictly broken, but increase friction when interacting with the app or are below what I would recommend for the use case.

1. Budget Boundaries
* should be unlimted for upper or lower threshold to simplfy
* highlight gaps in the existing approval schema limits (e.g. 500- 1000 € not covered yet)

2. Edit Mode
* when deleting an approval step, confirmation should be requested from user
* improve responsiveness for small screens in general
* show how often an approver is already scheduled across teams

3. General
*  data should be fetched in the main app component, not in the ApprovalSchema component
* more test for ApprovalSchema component