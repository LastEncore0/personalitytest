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

function calculatemax(a, b, stra, strb) {

    if (a > b) {
        return [a, stra]
    }
    else if (b > a) {
        return [b, strb]
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

function getmax(result_arr, add) {
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

function get_e_result(enneagram_test_result,that) {

    that.enneagram_keyword = getetext(enneagram_test_result)[0]
    that.sin = getetext(enneagram_test_result)[1]
    that.enneagram_result_dec += getetext(enneagram_test_result)[2]
    that.C1 = getecharacter(enneagram_test_result)[0][0]
    that.C1text = getecharacter(enneagram_test_result)[0][1]
    that.img1 = getecharacter(enneagram_test_result)[0][2]
    if (getecharacter(enneagram_test_result)[1]) {
        that.C2 = getecharacter(enneagram_test_result)[1][0]
        that.C2text = getecharacter(enneagram_test_result)[1][1]
        that.img2 = getecharacter(enneagram_test_result)[1][2]
    }
    else {
        that.C2 = false
    }
}