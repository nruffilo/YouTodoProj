# YouTodo (working title) is an open-source task management app that gamifies task management!

We have a discord: https://discord.gg/kjTqYFtTYz Feel free to join and chat with other collaborators, get code help, etc.

## Code of Conduct
This project is dedicated to ensuring equity and equality.  We adopt the following [Code of Conduct](https://read20.pubpub.org/code).  The quality of your character will speak louder than the quality of your code, hate will not be tolerated.  Additionally, remember to build up other contributors. 

## This project was originally created using the TodoApp example from Supabase.  You can find that original project here https://github.com/supabase/supabase/tree/master/examples/nextjs-todo-list


- Frontend:
    - [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html). React Framework for building single-page applications.
    - [Tailwind](https://tailwindcss.com/) for styling and layout.
    - [Supabase.js](https://supabase.io/docs/library/getting-started) for user management and realtime data syncing.
- Backend:
    - [app.supabase.io/](https://app.supabase.io/): hosted Postgres database with restful API for usage with Supabase.js.


## Demo

-not added-

## Getting Started.
Anyone is welcome to contribute to this project.  To do so, you will need a SupaBase.io account (free), as well as Node JS, and NPM installed on your computer.  This project will contain everything you need to set up your own test DB/API with SupaBase so that you can test and merge back into the master branch to be deployed on the official website.  

## Build from scratch
### 1. Create new project
Sign up to Supabase - [https://app.supabase.io](https://app.supabase.io) and create a new project. Wait for your database to start.

### 2. Run "Todo List" Quickstart
Once your database has started, Click "SQL" in the left menu.  Then "+ New Query"  Copy the contents of "StartQuery.sql" and click "run" at the bottom of the SQL window.  This will set up the database/API. 

### 3. Get the URL and Key
Go to the Project Settings (the cog icon), open the API tab, and find your API URL and `anon` key, you'll need these in the next step.

The `anon` key is your client-side API key. It allows "anonymous access" to your database, until the user has logged in. Once they have logged in, the keys will switch to the user's own login token. This enables row level security for your data. 

### 4. Clone the REPO and set it up
Clone this repo (git clone https://github.com/nruffilo/YouTodoProj.git) into the directory you want to be working out of.  Create a file named ".env.local" in the root directory.  You will need to add 2 keys to it.
REACT_APP_SUPABASE_KEY=(YOUR_SUPABASE_KEY)
REACT_APP_SUPABASE_URL=(YOUR_SUPABASE_URL)

Once that is saved, you'll need to get all the NPM packages.  You can do this by running:
"npm install"
You'll also need to install tailwind
"npm install tailwindcss"

(remember to run these from the YouTodoProj directory where the files are, not the directory you initially cloned into.)

Once you have this set up, you can run "npm run start" to run a test application and see your code in action!

## Contributing
Contributions are welcome to all.  I do ask that you look at the issues and attempt to address one of them, but if you see a typo, style, or have an idea for an awesome feature, you're welcome to create a pull request.  For those who are less familiar with git, below is a simple primer on how to create a branch, commit your code, and create a pull request.

"git pull origin main": This will take the latest codebase in the main branch
"git checkout -b YourNewBranchName" If you're pulling an issue, use the issue #, (Issue-1) otherwise try to use something unique and descriptive.  This will create a new branch for you to create code from.
"git commit -a -m 'Your Message'" this will commit your changes (to your branch) back to the repository.  This saves changes to the branch.
"git push origin YourNewBranchName" this will push all committed changes and files to the repository.  They will still be in the branch, and not merged, but it lets others review your code or try out your branch.



## Note on Supabase
- [Supabase](https://supabase.io)
Supabase is open source, we'd love for you to follow along and get involved at https://github.com/supabase/supabase
