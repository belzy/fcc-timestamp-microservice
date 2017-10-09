const url = require("url");
const timestamp = require("unix-timestamp");

// Parses the route into an object. Takes a url as a parameter. Returns the object.
const ParseRoute = (reqUrl) => {
    
    const months = ["January", "February", "March", "April", "May",
                    "June", "July", "August", "September", "October",
                    "November", "December"];
    let timeArr = (url.parse(reqUrl).path).substring(1).split("%20");
    let timeObj = {};
    
    // Check for natural date and parse to unix time.
    if (timeArr.length === 3) {
        for (let i in months) {
            if (timeArr[0].toLowerCase() === months[i].toLowerCase()) {
                if ((timeArr[1].substring(0, timeArr[1].length - 1).length === 2) && (Number(timeArr[1].substring(0, timeArr[1].length - 1)) > 0 && Number(timeArr[1].substring(0, timeArr[1].length - 1)) < 32)) {
                    if ((timeArr[2].length === 4) && (Number(timeArr[2]) >= 1970)) {
                        timeObj.natural = timeArr[0] + " " + timeArr[1] + " " + timeArr[2];
                        timeObj.unix = timestamp.fromDate(timeArr[2] + "-" + (Number(i) + 1).toString() + "-" + timeArr[1].substring(0, timeArr[1].length - 1)).toString();
                        return timeObj;
                    }
                }
                break;
            }
        }
        
    // Check for unix time and parse to natural date.
    } else if ((timeArr.length === 1) && timeArr[0] != "") {
        let dateArr = timestamp.toDate(Number(timeArr[0])).toString().substring(4, 15).split(" ");
        for (let i in months) {
            if (dateArr[0] === months[i].substring(0, 3)) {
                timeObj.natural = months[i] + " " + dateArr[1] + ", " + dateArr[2];
                timeObj.unix = timeArr[0];
                return timeObj;
            }
        }
    }
    
    // Return null properties.
    timeObj.natural = null;
    timeObj.unix = null;
    return timeObj;
};

module.exports = {
    "ParseRoute": ParseRoute
};
