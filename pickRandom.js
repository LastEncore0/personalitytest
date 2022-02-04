function pickRandomProperty(obj) {

    var prop, randomPos, pos = 0;
    
    var len = getlistlen(obj);

    randomPos = Math.floor(Math.random() * len);

    for (prop in obj) {

        if (obj.hasOwnProperty(prop)) {

            if (pos === randomPos) {

                return prop;

            }

            pos += 1;

        }

    }       

}

function calculatemax(a,b,stra,strb) {

    if (a > b) {
        return [a,stra]
    } 
    else if (b > a) {  
        return [b,strb]
    }
    else {
        return false
    }
    
}

function getlistlen(obj) {

    var prop, len = 0;
    
    for (prop in obj) {

        if (obj.hasOwnProperty(prop)) {
            len += 1;
        }

    }
    return len
    
}