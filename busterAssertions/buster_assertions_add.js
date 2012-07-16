/**
 * User: ryuone
 * Date: 12/07/16
 * Time: 23:38
 * License: MIT License
 */
if (typeof require === "function" && typeof module !== "undefined") {
    var ba = require("buster-assertions");
    var assert = ba.assert;
    var refute = ba.refute;
    var expect = ba.expect;
}

function localAssert(){
    str = new String("100");
    try{
        assert.isString(str);
        refute.isString(1);
        expect(str).toBeString();
        console.log("Passed");
    }catch(ex){
        console.log(ex.message);
        console.log("Not passed");
    }
}

var class2type = {};
function makeClass2Type(){
    function setObjectArray(name, index, array) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    }
    "Boolean Number String Function Array Date RegExp Object".split(" ").forEach(setObjectArray);
}

// new String("")に対して、buster.assert.isStringはErrorとなる。
localAssert();
makeClass2Type();

/**
 * buster.assert.isStringを上書き。
 */
ba.add("isString", {
    assert: function (actual) {
        return  class2type[toString.call(actual)] == "string";
    },
    assertMessage: "Expected ${0} (${actualType}) to be string",
    refuteMessage: "Expected not to be string",
    expectation: "toBeString"
});

// new String("")に対して、自作のisStringはOKとなる。
localAssert();
console.log(ba.count);

/** 結果
 [assert.isString] Expected 100 (object) to be string
 Not passed
 Passed
 4
 */

