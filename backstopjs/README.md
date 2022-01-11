# Using this package

## Requirements

- Nodejs
- git

## Before first use.

1. clone repo `gh repo clone zakiya/cagov-tests` or `git@github.com:zakiya/cagov-tests.git`
2. `cd cagov-tests/backstopjs`
3. `npm install`
4. `cp example.env .env`

## Run tests

1. Run site locally
   a. Go to project repo root. (`z covid19`\*)
   b. `git pull` (optional)
   c. `npm run start` (or equivalent)
2. Go back to this project root in another terminal window. (`z backstopjs`)
3. Verify the url of live and local sites match value in .env
4. Initiate backstop with `npm run backstop`


### Test commands - cannabis

- Generate reference files for main test: `npm run cannabis:ref`

- Test local against stored references: `npm run cannabis:test`



### Test commands - covid

- Generate reference files for main test: `npm run covid:ref`

- Test local against stored references: `npm run covid:test`

- Generate reference files for interactive test: `covid:interactive:ref`

- Test local against stored interactive references: `covid:interactive:test`


# Notes for starting a BackstopJS project from scratch.

- If you want to take advantage of the helpful backstop_data/engine_scripts,
  in addition to the commands above, add `"init": "backstop init"` to package.json
  scripts and run `npm run init`

# @todo

- backstop.json is automatically generated with backstop init. Do we need it? want it?

\*`z` is the command (z-sh)[https://github.com/agkozak/zsh-z] . `cd` also works!
