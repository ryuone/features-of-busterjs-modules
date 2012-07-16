/**
 * User: ryuone
 * Date: 12/07/17
 * Time: 0:52
 * License: MIT License
 */
var buster = require("buster");
var format=require("buster-format");
console.log(buster.format === format);     // => true

format.quoteStrings = true;

var object = {
    name: "ryuone"
};

console.log(format.ascii(object));    // { name: "ryuone" }

var developer = {
    name: "ryuone",
    interests: ["Programming", "JavaScript", "TV"],

    location: {
        language: "Japanese",
        city: "Osaka",

        getCity: function getCity() {
            return this.city;
        }
    },

    speak: function () {
        return "こんにちは。 It's " + this.location.language;
    }
};

console.log(format.ascii(developer));    // { 長いので省略.... }

console.log(format.ascii.func(developer.speak));
console.log(format.ascii.func(developer.location.getCity));
console.log(format.ascii("Some \\ string"));
