# iReporter
[![Build Status](https://travis-ci.com/leksyib/iReporter.svg?branch=develop)](https://travis-ci.com/leksyib/iReporter)
[![Maintainability](https://api.codeclimate.com/v1/badges/de0518f48aab44aac87b/maintainability)](https://codeclimate.com/github/leksyib/iReporter/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/de0518f48aab44aac87b/test_coverage)](https://codeclimate.com/github/leksyib/iReporter/test_coverage)

iReporter is a web app that enables citizens bring any form of corruption to the notice of appropriate authorities and the general public.


## 📖 Getting started

`$ git clone https://github.com/leksyib/iReporter.git` <br/>
`$ yarn` <br/>
`$ yarn start` <br/>

## Features
Below are the features of iReporter.

Users can signup and login<br/>
Users can post intervention and red-flag records<br/>
Users can edit the comment and location of their records<br/>
Admins can edit the status of records<br/>
Users can see email notifications when admins change the status of their records<br/>

## Technologies used

Modern JavaScript technologies were adopted for this project

ES2015: Also known as ES6 or ES2015 or ECMASCRIPT 6, is a new and widely used version of Javascript
that makes it compete healthily with other languages.

NodeJS: Node.js is an open-source, cross-platform JavaScript run-time for writing javascript server side applications

ExressJS: This is the web application framework for Node.js

Postgresql: This is an open source database.

## Installation
1. Clone this repository into your local machine:
```
git clone https://github.com/leksyib/ireporter.git
```
2. Install dependencies
```
yarn
```
3. Create a `.env` file in the project copy keys added in the `env.sample` file and fill with your own env details.

4 Test endpoints with postman


## Testing
- To run server side test, run `yarn test`
