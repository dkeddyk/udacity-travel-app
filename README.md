# Travel App

This project is the capstone of the Udacity Nanodegree 'Front End Developer'. It takes advantage of a handful apis to gather travel informations and presents those for the user.

## Getting Started

Follow the guide below, to install and run the project.

### 1. Install

Clone the repository or download the zip via Github.

> `git clone https://github.com/dkeddyk/udacity-travel-app`

Install project dependencies with npm.

> `npm install`

### 2. Setting up Environment (dotenv)

By security reasons, this project uses the [dotenv](https://www.npmjs.com/package/dotenv) package. It is already install after Step 1, but you need to add your own api key like describes below.

1. Create a file name `.env` in the `root`-directory of the project.
2. Add the following lines to the file and replace the placeholders with your own API key.
   > GEONAMES_USERNAME=\<your-username\><br>
   > WEATHERBIT_KEY=\<your-api-key\><br>
   > PIXABAY_KEY=\<your-api-key\>

### 3. Build

The project has two modes. There is a development mode [(3.1)](#31-development-mode) which uses the webpack-dev-server. Due to this, there has to be run a second instance of the server, which than serves with the request of the client-side app. In the production mode [(3.2)](#32-production-mode) you only need one instance, as it can serve all client requests parallely.

#### 3.1 Development Mode

Run the serve script in order to build the project and run it in development mode. This will use `port 9000` by default and should be used for the client side application.

> `npm run serve`

**Note:** There is no need to refresh the page in the browser or even re-run this command. The webpack-dev-server will apply changes to the client side application. Only when changing the `.scss`-stylesheets, it might be necessary to reload the page with `Ctrl + F5`.

**Note:** After changes on the server-side scripts (e.g. `src/server/index.js`), you need to cancel this command and **re-run** it, in order **to see the changes**.

#### 3.2 Production Mode

Run the build script in order to build the project in production mode. This will create the deployable build in the `dist` folder of the project. As the `dist` folder is cleaned during this process, there is _no need_ to delete its content manually.

> `npm run build`

There is _no need_ to open it in the browser. Just leave it running in the background. The server will send the `index.html` in the `dist` folder.

> `npm run start`

**Note:** After any every change (client and server side), you need to cancel this command and **re-build** it, in order **to see the changes**.

Both commands can be run with one command as well.

> `npm run build-start`

### 4. Testing

Run the test script, in order to test all the test in this project. For more information see: [Jest](https://jestjs.io/).

> `npm run test`

## Additional features

Additionally to the basic requirements the following features have been implemented.

- Add `end date` and display `length of trip`.
- Pull in an `image for the country` from Pixabay API when the entered location brings up no results (good for obscure localities).
- Allow the user to `remove the trip`.
- Use `Local Storage` to save the data so that when they close, then revisit the page, their information is still there.
- Incorporate `icons into forecast`.
- Allow the user to add `additional trips` (this may take some heavy reworking, but is worth the challenge).
  - Automatically `sort` additional trips `by countdown`.
