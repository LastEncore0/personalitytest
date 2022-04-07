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

function getmax(result_arr, add, trifix) {
    if (result_arr[0] == result_arr[1] && result_arr[2] == result_arr[1] && trifix) {
        return [result_arr[0],1 + add]
    }
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

function getclose(result_arr, type) {
    let close_arr = []
    let distance = 10
    let left, right, up ,down
    let few = [1,4,2,8,5,7]
    let mainstream = [3,6,9]
    if (type + 1 > 9) {
        right = 1
    }
    else {
        right = type + 1
    }
    if (left - 1 < 1) {
        left = 9
    }
    else {
        left = type - 1
    }
    if (checkclose(type,few)[0] && checkclose(type,few)[1]) {
        up = checkclose(type,few)[0]
        down = checkclose(type,few)[1]
    }
    if (checkclose(type,mainstream)[0] && checkclose(type,mainstream)[1]) {
        up = checkclose(type,mainstream)[0]
        down = checkclose(type,mainstream)[1]
    }
    if (Math.abs(result_arr[type - 1] - result_arr[left - 1]) < distance) {
        close_arr.push(left)
    }
    if (Math.abs(result_arr[type - 1] - result_arr[right - 1]) < distance) {
        close_arr.push(right)
    }
    if (Math.abs(result_arr[type - 1] - result_arr[up - 1]) < distance) {
        close_arr.push(up)
    }
    if (Math.abs(result_arr[type - 1] - result_arr[down - 1]) < distance) {
        close_arr.push(down)
    }
    return close_arr
}
function checkclose(type,list) {
    let result = []
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (type == list[index]) {
            result.push(list[index - 1])
            if (index + 1 < list.length) {
                result.push(list[index + 1])
            }
            else {
                result.push(list[0])
            }
        }
    }
    return result
}

function get_e_result(enneagram_test_result,that) {

    that.enneagram_keyword = getetext(enneagram_test_result)[0]
    that.sin = getetext(enneagram_test_result)[1]
    that.enneagram_result_dec = getetext(enneagram_test_result)[2]
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