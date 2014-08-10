function renameProperties(sourceObj, replaceList, destObj) {
    destObj = destObj || {};
    // for each property in source object
    for(var prop in sourceObj) {
        // if the property really exist
        if(sourceObj.hasOwnProperty(prop)) {
            
            // if the property is object
            if(typeof sourceObj[prop] === 'object') {
                // if it in the replace List (as property)
                if(replaceList[prop]) {
                    var strName = replaceList[prop];
                    destObj[strName] = {};
                    // send it to replaceAttrNames() function (recursively)
                    renameProperties(sourceObj[prop], replaceList, destObj[strName]);
                // if its NOT in the replace List (as property)
                } else if(!replaceList[prop]) {
                    destObj[prop] = {};
                    renameProperties(sourceObj[prop], replaceList, destObj[prop]);
                }
                
            // if the property is not object
            } else if (typeof sourceObj[prop] != 'object') {
                // if it in the replace List (as property)
                if(replaceList[prop]) {
                    var strName = replaceList[prop];
                    destObj[strName] = sourceObj[prop];
                // if its NOT in the replace List (as property)
                } else if(!replaceList[prop]) {
                    destObj[prop] = sourceObj[prop];
                }
            }
        }
    } 
    return destObj;
}


/*
=== usage: ===
var obj = {foo: 'word a', bar: {some: 'word b', thing: 'word c'}};
var replacedObj = renameProperties(obj, {foo: 'baz', bar: 'qux'});
// the output will be (as JSON): {"obj": {"baz": "word a", "qux": {"some": "word b", "thing": "word c"}} }
*/
