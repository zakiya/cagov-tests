# Using this package

## Before first use.

1. clone repo `gh repo clone zakiya/cagov-tests`
2. `cd cagov-tests/backstopjs`
3. `npm install`
4. `cp example.env .env`

## Run tests

1. Run covid locally
   a. Go to covid19 repo root. (`z covid19`*)
   b. `git pull` (optional)
   c. `npm run start`
2. Go back to this project root in another terminal window. (`z backstopjs`)
3. Verify the url of the local site matches value in .env

## Test command

Initiate backstop and generate reference files for main test: `npm run covid:init`
Test local against stored references: `npm run covid`
Generate reference files for interactive test: `covid:interactive:init`
Test local against stored interactive references: `covid:interactive`

# Notes for starting a BackstopJS project from scratch.

- If you want to take advantage of the helpful backstop_data/engine_scripts,
  in addition to the commands above, add `"init": "backstop init"` to package.json
  scripts and run `npm run init`

# @todo

- Split init and reference into separate scripts?
- backstop.json is automatically generated with backstop init. Do we need it? want it?
- be more thoughtful generally about where to store test-specific variables.


*`z` is the command (z-sh)[https://github.com/agkozak/zsh-z] . `cd` also works!

