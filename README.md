# Drive Clone

[![Netlify Status](https://api.netlify.com/api/v1/badges/fa5401bc-04b6-4e40-b44a-e6583c956d9a/deploy-status)](https://app.netlify.com/sites/flourishing-puffpuff-b8e436/deploys)

## TODO

- [x] Set up database and data model
- [x] Move folder open state to URL
- [ ] Add Auth
- [ ] Add file uploading
- [ ] Add analytics

Technologies used:

v0 : for creating component samples for us to mock up a google drive looking UI with data props
netlify: for live hsoting, live demo accross all branches and pull requests.
singlestore: does everything, high perf transactions, scalable, get analytics of rel dbs and perf of document stores. alrady have drizzle bindings. get 1 db free.

## Note from 25/03/2025: just finished connected database.

- [x] update schema to show files and folders
- [x] Manually insert examples
- [x] Render onto UI
- [x] Push and make sure all works

## Note from 26/03/2025 + 27/03/2025: db rendering done.

- [x] merge db pull request onto main and start onto new branch to save state.
- [x] folder views push to use router and onto URL
- [x] Change folders to link components, remove all client state
- [ ] clean up the database and data fetching patterns
- [ ] Real homepage
