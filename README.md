# Drive Clone

[![Netlify Status](https://api.netlify.com/api/v1/badges/fa5401bc-04b6-4e40-b44a-e6583c956d9a/deploy-status)](https://app.netlify.com/sites/flourishing-puffpuff-b8e436/deploys)

## TODO

- [x] Set up database and data model
- [x] Move folder open state to URL
- [x] Add Auth
- [x] Add file uploading
- [ ] Add analytics

Technologies used:

v0 : for creating component samples for us to mock up a google drive looking UI with data props
netlify: for live hsoting, live demo accross all branches and pull requests.
singlestore: does everything, high perf transactions, scalable, get analytics of rel dbs and perf of document stores. alrady have drizzle bindings. get 1 db free.
netlify: cloud storage, quick deploy from github, PR previews.
singlestore + drizzzle: database storage on sqlite and database connection library.
clerk: user management and auth. Also gives alot of pre-made components for sign-in/out stuff that helps us not to make these ourselves. we'll be in dev mode so no need to create an application specific oauth, will use the the clerk servers.
uploadthing: file uploads functionality for web apps. free 2gb storage.

## Note from 25/03/2025: just finished connected database.

- [x] update schema to show files and folders
- [x] Manually insert examples
- [x] Render onto UI
- [x] Push and make sure all works

## 26/03/2025: db rendering done

## 27/03/2025: folder urls on routes

## 28/03/2025: clerk auth, file uploads using tailwind v4

- [x] merge db pull request onto main and start onto new branch to save state.
- [x] folder views push to use router and onto URL
- [x] Change folders to link components, remove all client state
- [x] clean up the database and data fetching patterns
- [ ] Real homepage
- [ ] Add ownership to files and folders
- [ ] upload files to the correct folder
- [ ] delete files button
- [x] allow non-image file upload
