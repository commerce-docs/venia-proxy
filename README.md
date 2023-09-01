# Minimal proxy server app for testing

This is the simplest React app I could come up with to test how proxy-server apps (in general) behave or misbehave within [codesandbox.io](https://codesandbox.io) and [stackblitz](https://stackblitz.com) sandboxes — specifically, proxy server apps that make graphql server calls to bypass an endpoint's CORS policies.

For my use case, this app performs one simple graphql query — to the Venia graphql endpoint [https://venia.magento.com/graphql](https://venia.magento.com/graphql) — when a button on the screen is clicked. The app uses a node-based express server to proxy the queries from the UI to Venia's endpoint. Using a server that runs on a different port from the local dev server, effectively bypasses the browser-based CORS policies.

## Run the app

To run the app locally:

1. Clone the repo: `git clone git@github.com:commerce-docs/venia-proxy.git`
2. Change directories: `cd venia-proxy`
3. Run `yarn` to install dependencies.
4. Run `yarn dev` to start the project's proxy server and dev server.

You should see a single button at the top of the screen: **Fetch Categories from Venia**.
Click it to fetch the product categories from the Venia graphql endpoint via the proxy server.

<img width="500" alt="image" src="https://github.com/commerce-docs/venia-proxy/assets/1828494/677e5c56-39d5-42ed-afc8-34bbef5456e9">
