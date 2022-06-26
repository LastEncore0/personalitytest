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
        return [result_arr[0], 1 + add]
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
// get enneagarm's connections and wings
function getclose(result_arr, type) {
    let close_arr = []
    let distance = 10
    let left, right, up, down
    let few = [1, 4, 2, 8, 5, 7]
    let mainstream = [3, 6, 9]
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
    if (checkclose(type, few)[0] && checkclose(type, few)[1]) {
        up = checkclose(type, few)[0]
        down = checkclose(type, few)[1]
    }
    if (checkclose(type, mainstream)[0] && checkclose(type, mainstream)[1]) {
        up = checkclose(type, mainstream)[0]
        down = checkclose(type, mainstream)[1]
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
function checkclose(type, list) {
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
// get enneagarm's result
function get_e_result(enneagram_test_result, that) {

    that.enneagram_keyword = enneagram_test_result + '[0]'
    that.sin = enneagram_test_result + '[1]'
    that.enneagram_result_dec = enneagram_test_result + '[2]'
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
    if (getecharacter(enneagram_test_result)[2]) {
        that.C3 = getecharacter(enneagram_test_result)[2][0]
        that.C3text = getecharacter(enneagram_test_result)[2][1]
        that.img3 = getecharacter(enneagram_test_result)[2][2]
    }
    else {
        that.C3 = false
    }
}
// create for enneagarm progress-bar
function createbar(that) {
    that.tibar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.ti + '%"></div>'
    that.tebar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.te + '%"></div>'
    that.fibar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-danger" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.fi + '%"></div>'
    that.febar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-danger" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.fe + '%"></div>'
    that.nibar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.ni + '%"></div>'
    that.nebar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.ne + '%"></div>'
    that.sibar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.si + '%"></div>'
    that.sebar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.se + '%"></div>',
    that.Fbar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-danger" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.F + '%"></div>'
    that.Tbar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.T + '%"></div>'
    that.Nbar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.N + '%"></div>'
    that.Sbar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.S + '%"></div>'
    that.Ibar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 purple" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.I + '%"></div>'
    that.Ebar = '<div class="progress-bar progress-bar-striped progress-bar-animated p-0 pinkyellow" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ' + that.user_data.E + '%"></div>'
}
// set for enneagarm progress-bar
function setvalue(that) {
    console.log("setvalue")
    if (that.enneagram_data.II > 50) {
        that.eright.II = '180deg'
        that.eleft.II = (that.enneagram_data.II - 50) / 50 * 180 + 'deg'
    }
    else {
        that.eright.II = that.enneagram_data.II / 50 * 180 + 'deg'
    }
    if (that.enneagram_data.III > 50) {
        that.eright.III = '180deg'
        that.eleft.III = (that.enneagram_data.III - 50) / 50 * 180 + 'deg'
    }
    else {
        that.eright.III = that.enneagram_data.III / 50 * 180 + 'deg'
    }
    if (that.enneagram_data.IV > 50) {
        that.eright.IV = '180deg'
        that.eleft.IV = (that.enneagram_data.IV - 50) / 50 * 180 + 'deg'
    }
    else {
        that.eright.IV = that.enneagram_data.IV / 50 * 180 + 'deg'
    }
    if (that.enneagram_data.V > 50) {
        that.eright.V = '180deg'
        that.eleft.V = (that.enneagram_data.V - 50) / 50 * 180 + 'deg'
    }
    else {
        that.eright.V = that.enneagram_data.V / 50 * 180 + 'deg'
    }
    if (that.enneagram_data.VI > 50) {
        that.eright.VI = '180deg'
        that.eleft.VI = (that.enneagram_data.VI - 50) / 50 * 180 + 'deg'
    }
    else {
        that.eright.VI = that.enneagram_data.VI / 50 * 180 + 'deg'
    }
    if (that.enneagram_data.VII > 50) {
        that.eright.VII = '180deg'
        that.eleft.VII = (that.enneagram_data.VII - 50) / 50 * 180 + 'deg'
    }
    else {
        that.eright.VII = that.enneagram_data.VII / 50 * 180 + 'deg'
    }
    if (that.enneagram_data.VIII > 50) {
        that.eright.VIII = '180deg'
        that.eleft.VIII = (that.enneagram_data.VIII - 50) / 50 * 180 + 'deg'
    }
    else {
        that.eright.VIII = that.enneagram_data.VIII / 50 * 180 + 'deg'
    }
    if (that.enneagram_data.IX > 50) {
        that.eright.IX = '180deg'
        that.eleft.IX = (that.enneagram_data.IX - 50) / 50 * 180 + 'deg'
    }
    else {
        that.eright.IX = that.enneagram_data.IX / 50 * 180 + 'deg'
    }
    if (that.enneagram_data.I > 50) {
        that.eright.I = '180deg'
        that.eleft.I = (that.enneagram_data.I - 50) / 50 * 180 + 'deg'
    }
    else {
        that.eright.I = that.enneagram_data.I / 50 * 180 + 'deg'
    }
}