This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is the code for the tray.io React Engineer application [technical test](https://gist.github.com/DavidJSimpsonEsq/3c092dfeba83cf10f3043555470f0e38) (April 2018).

## Running the application
First you will need to clone it (`git clone https://github.com/tomoakley/trayio-technical-test`), then run `npm install`. Next, run `npm run start` and it will build the app. If the browser doesn't open, go to http://localhost:3000.

## Notes
- I haven't been able to write any tests for the application, I simply didn't have enough time. If you want me to, I can write the tests but it will take a few more days.
- I have slightly mis-implemented the spec - it says to list the patches of dirt to generate in the room, however my application simply generates them randomly. Again, with more time I could fix this
- There is a console warning from React - this is due to how I have generated the room tiles. I used the Lodash.fill method to fill an array of rows, where each row contains the number of tiles specified as the x co-ordinate of the room size. However, the fill method has no iterable value, which I could use as the important `key` value to assist in React's change detection. I can change how these tiles are generated if necessary.
- The design is quite bad, sorry. I chose to focus on the JavaScript and functionality side of the application rather than the CSS/aesthetics/UX
- In some places the code is a little rough, sorry. I hope you understand I had limited time to work on this and would implement some further linters to improve the code quality. Also, I would chose to implement either Flow.js or TypeScript for better type-checking.
- The error checking for the initial setup of the room, robot and dirt is quite poor. I would endeavour to improve this and stop some actions getting through to Redux, instead using more client/browser validation

I hope it's good enough! Thank you for taking the time to evaluate my code.