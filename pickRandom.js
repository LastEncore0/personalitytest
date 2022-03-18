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

function getmax(result_arr,add) {
    let maxenneagram = [0, 0]
    for (let index = 0; index < result_arr.length; index++) {
        const element = result_arr[index];
        if (element > maxenneagram[0]) {
            maxenneagram[0] = element
            maxenneagram[1] = index + add
        }
    }
    if (maxenneagram[1] > 9) {
        maxenneagram[1] = 1
    }
    return maxenneagram
}