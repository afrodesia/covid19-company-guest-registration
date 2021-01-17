# Covid19 Guest Registration for Companies (or your private party)
The Corona pandemic is creating new rules and regultions for everyone to stay on top which people are together at what time. Companies are using different methods for tracking this. Some use pen and paper to track their visitors, others let their visitors write the information in an excel file. All of this does not show a that companies are digitized and they bring a rat-tail of follow-up work with it due to GDPR regulations. Also if a positive case is reported, the effort of finding who was in the office at that day is pretty inefficient.

This project aims to digitize the guest registration process and brings efficiency in the process for identifying whos was in the office, including the GDPR compliant deletion of the data. 

Technically this project is build on a React frontend and [Cockpit CMS}(https://getcockpit.com/) as backend.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation from source

### Install Cockpit CMS
Download Cockpit CMS and install it on your fav. Web Server:
* `git clone https://github.com/agentejo/cockpit.git`

Navigate to http://<your_url>/cockpit, log in a generate an API Key.
Create a collection called ConnectedMACs with the fields: date (Text) and mac (Text)

### Install the client
Clone this repository.
Change the 'xxxtokenxxx' string in Config.js to the API key you have created.
* `npm install`
* `npm run build`

Copy the build to your Web Server.

### Assumptions
* React app will be deployed at /.
* The path to cockpit is <url of your react app>/cockpit

## Needed packages

Formik: For the input form
### `npm install formik`

Yup: For the form validations
### `npm install yup`

Bootstrap: For the styles
### `npm install react-bootstrap bootstrap`

Universal-Cookie: For the cookie handling
### `npm install universal-cookie`

React-Router-Dom: For the routing in the app
### `npm install react-router-dom`

HTML-react-parser:: For parsing html code
### `npm install html-react-parser`

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

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Site note
This is my first React project, so please don't be too hard with me. I am looking for feedback on how to improve things, though. 