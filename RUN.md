# This file describes how to download and run application

## Installation
You need to install Node.js  and npm (the latest versions).

Windows

https://nodejs.org/en/ (npm in the set)

Linux 

```bash
sudo apt-get install npm
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```
More information here https://askubuntu.com/questions/594656/how-to-install-the-latest-versions-of-nodejs-and-npm

Verify installation:

```bash
node -v
npm -v
``` 

Clone the repository: https://github.com/TAI-EPAM/cucumber-test-generator-ui and switch to the epam-version.

Go to the cucumber-test-generator-ui directory and enter the following command:
```bash
npm install
```

Now you install dependencies specified at the package.json file.

If you want to run the app, read item 4.
If you want only to build static files, read item 5.

4. Next command runs the app in development mode:
```bash
npm start
```
Open your browser on http://localhost:3000/#/

5. Next command generates static files and put them in dist folder.
```bash
npm run build
```

## Troubleshooting

During the running:
Expected linebreaks to be 'LF' but found 'CRLF'

Solution:

```bash
    git config core.eol lf
    git config core.autocrlf input
```
Then enter:

```bash
    npm run lint -- --fix
    npm start
```
