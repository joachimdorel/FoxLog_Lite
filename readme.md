# FoxLog Lite

A simple Node.js console program that monitor log files.

## Installation

Git clone the project into any folder you want (this does not have any incidence about which log will be analyzed).

Use npm to install the dependencies.
```bash
npm install
```

## Usage

To get an analysis from the default log ('/tmp/access.log'):
```bash
node app.js
```

If you want to use a specific log, you can tell the path of the log as a parameter with the following option:
```bash
node app.js --path='pathOfTheLog.log' 
```

If you want to get informations about your users, you can use the following parameter with the option true (any other option will be considered as false):
```bash
node app.js --interestingSummary=true
```

Those two previous command are combinable: 
```bash
node app.js --path='pathOfTheLog.log' --interestingSummary=true
```

## Follow Up

- Modify the interestingSummary parameter to select which kind of global summary the user wants (i.e. a global summary about all the routes where the hits are wrong...)

- More status code the get advanced statistics 

## License
[MIT](https://choosealicense.com/licenses/mit/)