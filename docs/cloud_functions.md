# What are Firebase Cloud Functions?

Cloud Functions for Firebase is a serverless framework that lets you automatically run backend code in response to events triggered by Firebase features and HTTPS requests. Your TypeScript code is stored in Google's cloud and runs in a managed environment. There's no need to manage and scale your own servers.

`functions/` contains all the code for the Firebase Cloud Functions. Since this directory gets packaged and stored in the cloud, anything that is used in the functions must be included in this directory.

# How to write a Cloud Function

`functions/src` contains individual functions. You can create your own `onCall`, `onRequest`, or trigger function here. 

Make sure to include them in `functions/src/index.ts` so that they get exported.

# How to deploy a Cloud Function

Make sure you are located in the root directory of the project.

Run the following command to deploy all functions:

```
yarn functions:deploy
```

# Testing

- [Unit Testing Cloud Functions](https://firebase.google.com/docs/functions/unit-testing)