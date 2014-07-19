//  recursively clone The Source Object to a target object with 'but this' filter (as Array of strings)
function clone_object(obj, but_this) {
    // if 'but_this' is array
    if (but_this instanceof Array) {
        // take it to 'filterNo'
        var filterNo = but_this;
    // if 'but_this' is not array
    } else {
        // 'filterNo' null = array
        var filterNo = [];
    }
    console.log(filterNo);

    function cloner(obj, dest) {
        // for each property in source object
        for(var prop in obj) {
            // if the property really exist
            if(obj.hasOwnProperty(prop)) {
                
                // if the property is object
                if(typeof obj[prop] === 'object') {
                    // check that the property is not in 'filterNo'
                    if(filterNo.indexOf(prop) === -1) {
                        // create null property in the destanation
                        dest[prop] = {};
                        // send it to cloner function (recursively)
                        cloner(obj[prop], dest[prop]);
                    }
                    
                    // if the property is not object
                } else if (typeof obj[prop] !== 'object') {
                    // check that the property is not in 'filterNo'
                    if(filterNo.indexOf(prop) === -1) {
                        dest[prop] = obj[prop];
                    }
                }
                
            }
        } 
        return dest;
    }
  
  
    return cloner(obj, {});
}

/* usage:
var some_obj = {prop1: {prop1_1: {prop1_2: "i am prop1_2"}},
                prop2: "i am prop2",
                prop3: {prop3_1: "i am prop3_1",
                        prop3_1_2: "i am prop3_1_2"}
                };
var second_obj = clone_object(o, ['prop1_2', 'prop3_1']);

'second_obj' will not contain the properties 'prop1_2' and 'prop3_1'.
*/

