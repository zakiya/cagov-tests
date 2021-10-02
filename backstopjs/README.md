# Using this package

## Before first use.

1. clone repo
3. cd cagov-tests/backstopjs
4. `npm install`
5. cp example.env

## Run tests

1. Run covid locally
    a.  Go to covid19 repo root. (`z covid19`)
    b.  `git pull` (optional)
    c.  `npm run start`
5.  Go back to this project root in another terminal window. (`z backstopjs`)
6.  Verify the url of the local site matches value in .env
7.  Generate references with `npm run covid:init` 
8.  

### Run interactive text

`DOTENV_CONFIG_TEST_TYPE=interactive npm run covid`

# Notes for starting a BackstopJS project from scratch.

- If you want to take advantage of the helpful backstop_data/engine_scripts,
  in addition to the commands above, add `"init": "backstop init"` to package.json
  scripts and run `npm run init`

# @todo

- backstop.json is automatically generated with backstop init. Do we need it? want it?
- be more thoughtful generally about where to store test-specific variables.
