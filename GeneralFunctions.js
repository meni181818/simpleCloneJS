// for each object OR Array, run the CallBack function
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
        
    // if we got somthing is not an Object and not an array
    } else {
        callBack(objOrArr);
    }
    
}
