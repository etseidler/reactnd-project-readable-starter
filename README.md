# Readable 

## TL;DR

To get started:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, start the frontend
    - `cd frontend`
    - `npm install`
    - `npm start`
* Visit `http://localhost:3000` in a browser

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Frontend

Information about the frontend and how to use it can be found in its [README file](frontend/README.md).

## What You're Getting

This application is a Reddit knockoff.
Users can add posts and vote on them.
Users can also add comments and vote on them as well.
Both posts and comments can be edited or deleted.

NOTE: This application does not contain any sort of authentication or authorization. So anyone can create, edit, or delete posts and comments.

## Why?

This app was developed as part of my coursework for the React Nanodegree course from Udacity. It's the second project out of three.

## How?

Udacity provided a starter repo/project that included the `api-server`. I used `create-react-app` to bootstrap the creation of the `frontend` app. For this project I wrote all the markup and styles as well as the app functionality.