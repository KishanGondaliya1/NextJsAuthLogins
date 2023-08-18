# Next.Js Authantication Logins

In this project You will find the different Authantication methods that is provided by popular Authnatication provider

## Project Structure
Folder structure :

    |____jsconfig.json
    |____tailwind.config.js
    |____app
    | |____layout.js
    | |____page.js
    | |____src
    | | |____styles
    | | | |____login.module.css
    | | |____api
    | | | |____context
    | | | | |____AuthContext.js
    | | | |____config
    | | | | |____firebase.js
    | | |____assets
    | | |____pages
    | | | |____page.js
    | | | |____Signup
    | | | | |____page.js
    | | | |____Dashboard
    | | | | |____page.js
    | | | |____Login
    | | | | |____page.js
    |____next.config.js
    |____.gitignore
    |____package-lock.json
    |____package.json
    |____postcss.config.js

<details>
<summary>Project structure is explained as below</summary>

| Name                           | Description                                                                                      |
| ------------------------------ | -------------------------------------------------------------------------------------------------|
| **jsconfig.json**               |Configuration file for JavaScript|
| **tailwind.config.js**               |Configuration file for Tailwind CSS|
| **app**                   |Application source folder|
| **app/layout.js**       |Default Layout file|
| **app/page.js**               |Defuault routing page|
| **app/src**        |Application source folder|
| **app/src/styles**        |Styles main folder|
| **app/src/styles/login.module.css**  |Login page styles|
| **app/src/api**  |API folder|
| **app/src/api/context**                |Context folder for api|
| **app/src/api/context/AuthContext.js**                  |Auth context contains all api call|
| **app/src/api/config**  |Configuration file|
| **app/src/api/config/firebase.js** |Firebase configuration file|
| **assets**     |Contain accets like images|
| **pages**     |Main Routing - Pages folder|
| **Signup**     |Signup page folder routing|
| **page.js**     |Signup page file contains Signup option|
| **Dashboard**     |Dashboard page folder routing|
| **page.js**     |Dashboard page file contains dashbord data|
| **Login**     |Login page folder routing|
| **page.js**     |Login page file contains login options|
| **next.config.js**     |Configuration file for Next.js|
| **.gitignore**     |Git files and folders to ignore|
| **package-lock.json**     |Mange project dependancy version |
| **package.json**     |Project dependencies and scripts|
| **postcss.config.js**     |Configuration file for Tailwind CSS|
</details>

## Pre-requisites

For development, you will Need to install all the required envirement setup for the Next.JS

* #### Please Follow the steps from this link:  
   https://nextjs.org/docs/getting-started/installation

* #### Install Git
   Make sure there is installed Git in your envirement

## Getting started
 
`Please follow the Project setup instructions on a development environment`

* ### Clone the repository
    ```
    Clone this repo by running
    git clone https://github.com/KishanGondaliya1/NextJsAuthLogins.git
    ```
* ### Setup Configuration file
    ```
    Edit the .env.local file to add your own keys
    ```

* ### Install dependencies
  First of all please go to project’s path on root folder in terminal window

    ```
    cd [Project path / root directory]
    npm install
    ```

    Start packager 
    ```
    cd [Project path / root directory]
    npm run dev
    Starts local development server at http://localhost:3000
    ```


* ### Comman Commands
   Some comman commands that you can use durring the devlopment
    
   ```
   npm run
   dev:   runs next dev to start Next.js in development mode.
   build: runs next build to build the application for production usage.
   start: runs next start to start a Next.js production server.
   lint:  runs next lint to set up Next.js' built-in ESLint configuration.
   ```
