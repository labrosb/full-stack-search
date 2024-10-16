# Accommodation Search

## Technical Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated with [vite](https://vitejs.dev/).

## Install and run

From the project root:

```
npm install
```

### Run

Once install has finished, you can use the following to run both the API and UI:

```
npm run start
```

### API

To run the API separately, navigate to the `./packages/api` folder

```
$ cd packages/api
```

And run the `api` server with

```
$ npm run dev
```

The API should start at http://localhost:3001

### Client

To run the `client` server separately, navigate to the `./packages/client` folder

```
$ cd ./packages/client
```

And run the `client` with

```
$ npm run start
```

The UI should start at http://localhost:3000

### Database connection & environment variables

By default, the code is set up to start and seed a MongoDB in-memory server, which should be sufficient for the test. The database URL will be logged on startup, and the seed data can be found at ./packages/api/db/seeds.

If this setup does not work for you or if you prefer to use your own MongoDB server, you can create a .env file. In the ./packages/api folder, create a .env file (or rename the existing .env.sample) and fill in the environment variables.

## Task at hand

When the project is up and running, you should see a search-bar on the screen. This one is currently hooked up to the `/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignment is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the word `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

Clicking the close button within the search field should clear out the field and results.

When clicking on one of the `Hotels`, `Cities` or `Countries` links, the application should redirect to the relevant page and render the selected `Hotel`, `City` or `Country` as a heading.

### Limitations

Given the time constraints, we do not expect a fully production-ready solution. We're primarily interested in the approach and the overall quality of the solution. 
Feel free to modify the current codebase as needed, including adding or removing dependencies. 
For larger or more time-intensive changes, you're welcome to outline your ideas in the write-up section below and discuss them further during the call.

<img src="./assets/search-example.png" width="400px" />

### Write-up

<!-- Write-up/conclusion section -->
When all the behaviour is implemented, feel free to add some observations or conclusions you like to share in the section
***
### Write-up : Further Improvements

**Backend:**
- The server can be more robust: Implement a MongoDB reconnect mechanism, etc.
- Security mechanisms, particularly protecting against dangerous inputs, can be added, using third-party libraries.

**Frontend:**
- A global state to store data for hotels, cities or countries when clicked in the search list, would be beneficial. It would eliminate the need for additional queries to retrieve them on their respective pages when navigating directly from the search page.
- The `AccommodationSearchPage` component can be broken down into smaller components, to follow React best practices for modularity.

### Write-up : Considerations
Due to lack of unique identifiers in the hotels and cities datasets, I used MongoDB's `_id` for searching for a specific hotel or city. This could be problematic if the server restarts, as the `_id` values will change, and the links with the previous IDs will no longer be accessible.

### Write-up : Dataset Observations

**Hotels:**
- The naming conventions could be improved. Some keys use snake_case while others do not. It would be best if all keys followed the same pattern, preferably **not camelCase**, to avoid confusion and potential mistakes, as well as to prevent the need to map the response to a front-end-friendly format.

- The `chain_name` contains both "No chain" values and empty strings (`''`). It would be better if these were normalized to a common pattern. Empty values are preferred because "No chain" would need explicit handling for certain cases (e.g., a search term containing "No chain" would return hotels labeled as such).

- The `state` field sometimes refers to an actual state (e.g., in the US), while in other cases it refers to a district or the city itself, and at times it is empty. This inconsistency could lead to logical errors.

- I noticed a `zip code` value as `zipcode: '                    '`. If such values aren't handled explicitly, they could lead to bugs.

- The `addressline2` value is mostly empty. It may be better to include the key only when there is a value present.

- The `country` value could be excluded since it exists in the `countries` dataset and could be joined using `countryisocode`.

**Cities:**
- It would be beneficial to include a unique identifier, like an ISO code for cities or some ID, for consistency and to avoid duplicates.

**Countries:**
- It would be more consistent if the `country` key were renamed to `name`, aligning it with the pattern used for `cities`.
***

### Database structure

#### Hotels Collection

```json
[
  {
    "chain_name": "Samed Resorts Group",
    "hotel_name": "Sai Kaew Beach Resort",
    "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressline2": "",
    "zipcode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryisocode": "TH",
    "star_rating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  { "name": "Auckland" },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryisocode": "BE"
  },
  {
    /* ... */
  }
]
```
