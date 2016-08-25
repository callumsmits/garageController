[![Build Status](https://travis-ci.org/callumsmits/garageController.svg?branch=master)](https://travis-ci.org/callumsmits/garageController)
# garageController
garageController is a single page web application that controls a garage door. It is designed to work in conjunction with a [garageOpener](https://github.com/callumsmits/garageOpener) and will turn on and off the garage door opener and open or close the garage door as desired.

The initial state is with the garage door closed and the garage door opener switched off (secured). When the 'Open door' button is pushed, the garage door opener is switched on (unsecured), then the door opening is triggered. If the door is open, pushing the 'Close door' button will trigger the door closing and then switch the garage door opener off. At any time the state shown in the app will relect the physical door state.

## Installation
Clone this repository and install using `npm install`. Update the constants located in constants/index.js and then compile the app using `npm run build`.

