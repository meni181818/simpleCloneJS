function renameProperties(sourceObj, replaceList, destObj) {
    destObj = destObj || {};
    // for each property in source object
    each(sourceObj, function(key) {
        // if the property really exist
        if(sourceObj.hasOwnProperty(key)) {
            
            // if the child key is array
            if(sourceObj[key] instanceof Array) {
                // if it in the replace List (as property)
                if(replaceList[key]) {
                    var newName = replaceList[key];
                    destObj[newName] = [];
                    // send it to replaceAttrNames() function (recursively)
                    renameProperties(sourceObj[key], replaceList, destObj[newName]);
                    
                // if its NOT in the replace List (as property)
                } else if(!replaceList[key]) {
                    destObj[key] = [];
                    renameProperties(sourceObj[key], replaceList, destObj[key]);
                }
                
            // if the child key is object
            } else if(typeof sourceObj[key] === 'object') {
                // if it in the replace List (as property)
                if(replaceList[key]) {
                    var newName = replaceList[key];
                    // create new property in the destObj named as the new name
                    destObj[newName] = {};
                    // send it to replaceAttrNames() function (recursively)
                    renameProperties(sourceObj[key], replaceList, destObj[newName]);
                    
                // if its NOT in the replace List (as property)
                } else if(!replaceList[key]) {
                    destObj[key] = {};
                    renameProperties(sourceObj[key], replaceList, destObj[key]);
                }
                
            // if the child key is NOT object and NOT Array
            } else {
                // if it in the replace List (as property)
                if(replaceList[key]) {
                    var newName = replaceList[key];
                    destObj[newName] = sourceObj[key];
                // if its NOT in the replace List (as property)
                } else if(!replaceList[key]) {
                    destObj[key] = sourceObj[key];
                }
            }
            
        }
    });
    
    return destObj;
}

// NOTE: If you are using Jquery OR underscore.js Or another library that has 'each()' function, you can use it Instead This function,
// (You will need to replace the call to 'each()' in 'renameProperties()' to your 'each()'.)
function each(objOrArr, callBack) {
    // if we got Array
    if(objOrArr instanceof Array) {
        for(var i = 0; i < objOrArr.length; i++) {
            callBack(i);
        }
        
    // if we got an Object
    } else if(typeof objOrArr === 'object') {
        for(var prop in objOrArr) {
            // if the property really exist
            if(objOrArr.hasOwnProperty(prop)) {
                callBack(prop);
            }
        }
    }
    
}



/*
=== usage: ===
var obj = {foo: 'word a', bar: {some: 'word b', thing: 'word c'}};
var replacedObj = renameProperties(obj, {foo: 'baz', bar: 'qux'});
// the output will be (as JSON): {"obj": {"baz": "word a", "qux": {"some": "word b", "thing": "word c"}} }
*/
