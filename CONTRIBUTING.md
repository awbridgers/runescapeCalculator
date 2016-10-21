# Contributing to the Runescape Calculator

##Pre-requisites
* To contribute to this repository, you must have a [github account](https://help.github.com/articles/signing-up-for-a-new-github-account/), [git](https://git-scm.com/), and [NodeJS](https://nodejs.org/en/)

## Forking and Cloning this repository
* In the top right of this repo, click **fork**
* You should be redirected to a new repository, which is your forked version of this repository
* Here, click on branch, and type the name of the new branch you wish to use for your contribution, for example `ranged` if you're making a ranged calculator
* Click **Clone or Download** on the right side of this repository page, and copy the link
* In your command prompt or terminal, cd to the directory where you want this project to reside, and type `git clone <url>` where `<url>` is the copied link.
* Type `cd runescapeCalculator` to move to the directory of the newly cloned folder
* Be sure to set a reference to the original repository, so you can pull changes to your repository:

```
git remote add upstream https://github.com/awbridgers/runescapeCalculator.git
```

## Running and testing this repository locally:

1. Type `npm install` and press **Enter**
2. To run the app, type `npm run start` and press **Enter**
3. Copy the localhost address into your browser to view the running app
4. When you change files in the `public` directory, reload the page in browser to see the updates
5. When changing files such as `app.js` that are outside the public folder, you will need to restart the app by typing `ctrl + c` to close and `npm run start` to start it back up.

## Contributing your changes
* Before contributing your changes, always make sure you have pulled the latest changes from the original repository:

```
git fetch origin upstream
git merge upstream/master
```

* In the event that there is a merge conflict, open the files that have conflicts, and resolve the issues by removing the parts of the code that you don't want to keep.
* When you are satisfied with your changes, push them to your forked repository:

```
git add .
git commit -m "commit message describing what you did"
git push origin <name of your branch>
```

* When you have pushed your changes, click
