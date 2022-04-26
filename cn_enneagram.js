function TestInstinctsq(num) {

    let q_list = [
        '请选择以下你最为渴求的事物',
        '你认为你现在过得不好或者将来如果过得不好会是因为什么?',
        '请选择以下你最能接受的超能力以及相应的命运',
        '我认为我已经将自身调整至最完美的，不需要为了适应其他人而改变自身，我对他人的不完美感到愤怒，纠正自身的缺陷',
        '我认为我是社交圈子中的核心人物，我喜欢以大人物的形象呈现在大家面前',
        '我渴望获得社会认可，所以我对不同的人经常会投其所好，采取不同的面目，以获得他们的认可',
        '我总是自责，带着自我厌恶的倾向与别人比较，为自己不如别人而痛苦',
        '我寻求超凡价值，追寻理想图腾，并因此间接的蔑视了凡人和普通生活',
        '我内心有一条明确的界限来区分哪些人是好的，哪些人是坏的',
        '我希望自己能作为一个乐善好施，扶危济贫的好人，然后得到大家的喝彩',
        '我对【向不公发出怒吼】有强烈的共鸣，在我的世界里，根本没有权威或者尊敬这回事，只有蔑视，对社会、规范、文化和强权阶层的蔑视！',
        '遗忘自我，忽视内心世界，随波逐流，把自己安顿在舒适的尘世中，为了满足集体的需要，投入大量的精力',
        '我对各种丑恶的现象充满愤怒，这种愤怒成为一种精神力量驱使我摧毁他们',
        '我内心里渴望获得别人，并且会在别人抛弃我之前抛弃对方以避免自己受到伤害',
        '我总是为吸引和讨好某些生活中的亲密朋友或亲人而活着',
        '我内心里总是有种情感，渴望着摧毁杀灭掉某些人，我条件反射的排斥当下，看不起像过着家畜一般日常生活的人，容易沉浸在脱离现实的幻想中',
        '我生活在理性和客观性为王的内心世界中，我认为无条件的爱是一种美好愿景，但基本不可能在现实中寻觅到这种爱，所以倾向于把自己与他人隔离起来',
        '我希望获得力量，强健体魄，喜欢表现强势的态度',
        '我对世间之事毫无兴趣，渴望着一个更高级更先进的世界，追寻着心中的梦想',
        '我喜欢追求紧张刺激，主动寻求冒险，挑战和危险，内心深处总想体会那种肾上腺素飙到峰值的感觉',
        '我感觉自己很没有激情，在人群中很没有存在感，但我渴望着和他人融合(Union)',
        '我感到自身有很多不完美之处，对此我甚至会感到愤怒，不过这种愤怒也会驱使我去纠正自己的缺陷达到完美',
        '我希望我是最重要的！我不想当成年人！希望得到大家的呵护',
        '我下决心做个普通的好人，不去沾染错误的想法，也不求闻达于诸侯',
        '我的生活中有很多悲伤痛苦的事情，觉得自己有很多缺陷，但害怕因此一些人把我视为脆弱的，我不喜欢与其他人诉苦，如果他们因为我的痛苦来关心我，我会有些无所适从，所以我习惯表现出一副坚韧不屈的样子，一个人独自去战胜这些痛苦。',
        '我倾向压低自己的欲望以获得更多个人独处的时间，因为欲望意味着需要去依赖他人，我倾向摆脱和他人的情感交流，退缩到自己头脑中的内心世界中最为舒适',
        '我渴望得到我所认可亲近的人的保护，渴望一个小小的，温暖舒适的世界',
        '我是一个机会主义者，总是寻找便利，赚取某些好处，谋求某些利益',
        '我感觉人们善良和良好的意图根本不存在，我可以慷慨的为他人提供保护，以让他们对我形成依赖，进而控制他们，为了不被他们所伤害',
        '我吃，故我在；我睡，故我在；我拥有，故我在；对我而言没有形而上的层次，只想现实安逸的度日']
    if (q_list[num]) {
        return q_list[num]
    }
    else {
        return '请选择以下最符合你的情况'
    }
}

function TestInstinctsa(num) {
    var result = false
    if (num == 0) {
        result = [
            { text: "q1s1", type: [0, "So"], value: 16, color: "Instincts_answer", color: "Instincts_answer" },
            { text: "q1s2", type: [0, "Sx"], value: 16, color: "Instincts_answer", color: "Instincts_answer" },
            { text: "q1s3", type: [0, "Sp"], value: 16, color: "Instincts_answer", color: "Instincts_answer" },
        ]
    }
    if (num == 1) {
        result = [
            { text: "q2s1", type: [0, "Sx"], value: 8, color: "Instincts_answer" },
            { text: "q2s2", type: [0, "Sp"], value: 8, color: "Instincts_answer" },
            { text: "q2s3", type: [0, "So"], value: 8, color: "Instincts_answer" },
        ]
    }
    if (num == 2) {
        result = [
            { text: "q3s1", type: [0, "Sp"], value: 20, color: "Instincts_answer" },
            { text: "q3s2", type: [0, "So"], value: 20, color: "Instincts_answer" },
            { text: "q3s3", type: [0, "Sx"], value: 20, color: "Instincts_answer" },
        ]
    }
    if (num > 2 && num < 12) {
        result = yesorno(num - 2, 'So')
    }
    if (num > 11 && num < 21) {
        result = yesorno(num - 11, 'Sx')
    }
    if (num > 20 && num < 30) {
        result = yesorno(num - 20, 'Sp')
    }
    return result
}


function TestEnneagrama(Instincts, num) {
    var result = false
    if (Instincts == 'So') {
        if (num == 0) {
            result = [
                { text: "q4sos1", type: [1, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sos2", type: [2, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sos3", type: [3, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sos4", type: [4, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sos5", type: [5, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sos6", type: [6, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sos7", type: [7, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sos8", type: [8, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sos9", type: [9, ""], value: 16, color: "Instincts_answer" },
                { text: "qsno", type: [6, ""], value: 10, color: "Instincts_answer" },
                { text: "qsall", type: [9, ""], value: 10, color: "Instincts_answer" },
            ]
        }
    }
    if (Instincts == 'Sx') {
        if (num == 0) {
            result = [
                { text: "q4sxs1", type: [1, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sxs2", type: [2, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sxs3", type: [3, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sxs4", type: [4, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sxs5", type: [5, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sxs6", type: [6, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sxs7", type: [7, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sxs8", type: [8, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sxs9", type: [9, ""], value: 16, color: "Instincts_answer" },
                { text: "qsno", type: [6, ""], value: 10, color: "Instincts_answer" },
                { text: "qsall", type: [9, ""], value: 10, color: "Instincts_answer" },
            ]
        }
    }
    if (Instincts == 'Sp') {
        if (num == 0) {
            result = [
                { text: "q4sps1", type: [1, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sps2", type: [2, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sps3", type: [3, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sps4", type: [4, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sps5", type: [5, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sps6", type: [6, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sps7", type: [7, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sps8", type: [8, ""], value: 16, color: "Instincts_answer" },
                { text: "q4sps9", type: [9, ""], value: 16, color: "Instincts_answer" },
                { text: "qsno", type: [9, ""], value: 16, color: "Instincts_answer" },
                { text: "qsall", type: [9, ""], value: 10, color: "Instincts_answer" },
            ]
        }
    }
    if (num == 1) {
        if (Instincts == 'So') {
            result = [
                { text: "q5sos2", type: [2, ""], value: 10, color: "Ired_answer" },
                { text: "q5sos3", type: [3, ""], value: 10, color: "Ired_answer" },
                { text: "q5sos4", type: [4, ""], value: 10, color: "Ired_answer" },
                { text: "qsall", type: [3, ""], value: 6, color: "Ired_answer" },
            ]
        }
        if (Instincts == 'Sx') {
            result = [
                { text: "q5sxs2", type: [2, ""], value: 10, color: "Ired_answer" },
                { text: "q5sxs3", type: [3, ""], value: 10, color: "Ired_answer" },
                { text: "q5sxs4", type: [4, ""], value: 10, color: "Ired_answer" },
                { text: "qsall", type: [3, ""], value: 6, color: "Ired_answer" },
            ]
        }
        if (Instincts == 'Sp') {
            result = [
                { text: "q5sps2", type: [2, ""], value: 10, color: "Ired_answer" },
                { text: "q5sps3", type: [3, ""], value: 10, color: "Ired_answer" },
                { text: "q5sps4", type: [4, ""], value: 10, color: "Ired_answer" },
                { text: "qsall", type: [3, ""], value: 6, color: "Ired_answer" },
            ]
        }
    }
    if (num == 2) {
        if (Instincts == 'So') {
            result = [
                { text: "q6sos5", type: [5, ""], value: 10, color: "Instincts_answer" },
                { text: "q6sos6", type: [6, ""], value: 10, color: "Instincts_answer" },
                { text: "q6sos7", type: [7, ""], value: 10, color: "Instincts_answer" },
                { text: "qsall", type: [6, ""], value: 6, color: "Instincts_answer" },
            ]
        }
        if (Instincts == 'Sx') {
            result = [
                { text: "q6sxs5", type: [5, ""], value: 10, color: "Instincts_answer" },
                { text: "q6sxs6", type: [6, ""], value: 10, color: "Instincts_answer" },
                { text: "q6sxs7", type: [7, ""], value: 10, color: "Instincts_answer" },
                { text: "qsall", type: [6, ""], value: 6, color: "Instincts_answer" },
            ]
        }
        if (Instincts == 'Sp') {
            result = [
                { text: "q6sps5", type: [5, ""], value: 10, color: "Instincts_answer" },
                { text: "q6sps6", type: [6, ""], value: 10, color: "Instincts_answer" },
                { text: "q6sps7", type: [7, ""], value: 10, color: "Instincts_answer" },
                { text: "qsall", type: [6, ""], value: 6, color: "Instincts_answer" },
            ]
        }
    }
    if (num == 3) {
        if (Instincts == 'So') {
            result = [
                { text: "q7sos8", type: [8, ""], value: 10, color: "Igreen_answer" },
                { text: "q7sos9", type: [9, ""], value: 10, color: "Igreen_answer" },
                { text: "q7sos1", type: [1, ""], value: 10, color: "Igreen_answer" },
                { text: " qsall", type: [9, ""], value: 6, color: "Igreen_answer" },
            ]
        }
        if (Instincts == 'Sx') {
            result = [
                { text: "q7sxs8", type: [8, ""], value: 10, color: "Igreen_answer" },
                { text: "q7sxs9", type: [9, ""], value: 10, color: "Igreen_answer" },
                { text: "q7sxs1", type: [1, ""], value: 10, color: "Igreen_answer" },
                { text: "qsall", type: [9, ""], value: 6, color: "Igreen_answer" },
            ]
        }
        if (Instincts == 'Sp') {
            result = [
                { text: "q7sps8", type: [8, ""], value: 10, color: "Igreen_answer" },
                { text: "q7sps9", type: [9, ""], value: 10, color: "Igreen_answer" },
                { text: "q7sps1", type: [1, ""], value: 10, color: "Igreen_answer" },
                { text: "qsall", type: [9, ""], value: 6, color: "Igreen_answer" },
            ]
        }
    }
    return result
}

function SelectEnneagrama(selected, commondata) {
    var result = []
    var tvalue = 8 - selected.length
    console.log(selected, tvalue)
    if (commondata.startorder == false) {
        commondata.startorder = true
    }
    if (selected.indexOf(2) === -1) {
        result.push({ text: "q8s2", type: [2, ""], value: tvalue, color: "Igreen_answer" })
    }
    if (selected.indexOf(3) === -1) {
        result.push({ text: "q8s3", type: [3, ""], value: tvalue, color: "Igreen_answer" })
    }
    if (selected.indexOf(4) === -1) {
        result.push({ text: "q8s4", type: [4, ""], value: tvalue, color: "Igreen_answer" })
    }
    if (selected.indexOf(5) === -1) {
        result.push({ text: "q8s5", type: [5, ""], value: tvalue, color: "Igreen_answer" })
    }
    if (selected.indexOf(6) === -1) {
        result.push({ text: "q8s6", type: [6, ""], value: tvalue, color: "Igreen_answer" })
    }
    if (selected.indexOf(7) === -1) {
        result.push({ text: "q8s7", type: [7, ""], value: tvalue, color: "Igreen_answer" })
    }
    if (selected.indexOf(8) === -1) {
        result.push({ text: "q8s8", type: [8, ""], value: tvalue, color: "Igreen_answer" })
    }
    if (selected.indexOf(9) === -1) {
        result.push({ text: "q8s9", type: [9, ""], value: tvalue, color: "Igreen_answer" })
    }
    if (selected.indexOf(1) === -1) {
        result.push({ text: "q8s1", type: [1, ""], value: tvalue, color: "Igreen_answer" })
    }
    if (result == []) {
        return false
    }
    return result
}

function CheckEnneagrama(Instincts, num, value) {
    if (num == 1) {
        if (Instincts == 'So' || Instincts == 'Sx') {
            return ['q4or1sosx',[{ text: "yesthis", type: [4, 1], value: value, color: "yes" },{ text: "notthis", type: [1, ""], value: 0, color: "no" }]]
        }
        if (Instincts == 'Sp') {
            return ['q4or1sp',[{ text: "yesthis", type: [4, 1], value: value, color: "yes" },{ text: "notthis", type: [1, ""], value: 0, color: "no" }]]
        }
    }
    if (num == 2) {
        return ['q3or2',[{ text: "yesthis", type: [3, 2], value: value, color: "yes" },{ text: "notthis", type: [2, ''], value: 0, color: "no" }]]
    }
    if (num == 4) {
        return ['q3or4',[{ text: "yesthis", type: [3, 4], value: value, color: "yes" },{ text: "notthis", type: [4, ''], value: 0, color: "no" }]]
    }
    if (num == 5) {
        if (Instincts == 'So' || Instincts == 'Sx') {
            return ['q6or5',[{ text: "yesthis", type: [6, 5], value: value, color: "yes" },{ text: "notthis", type: [5, ''], value: 0, color: "no" }]]
        }
        if (Instincts == 'Sp') {
            return ['q6or5',[{ text: "yesthis", type: [6, 5], value: value, color: "yes" },{ text: "notthis", type: [5, ''], value: 0, color: "no" }]]
        }
    }
    if (num == 62) {
        return ['q6or2',[{ text: "yesthis", type: [6, 2], value: value, color: "yes" },{ text: "notthis", type: [2, ''], value: 0, color: "no" }]]
    }
    if (num == 48) {
        if (Instincts == 'So') {
            return ['q8or4so',[{ text: "yesthis", type: [8, 4], value: value, color: "yes" },{ text: "notthis", type: [4, 8], value: 0, color: "no" }]]
        }
        if (Instincts == 'Sx') {
            return ['q8or4sx',[{ text: "yesthis", type: [8, 4], value: value, color: "yes" },{ text: "notthis", type: [4, 8], value: 0, color: "no" }]]
        }
        if (Instincts == 'Sp') {
            return ['q8or4sp',[{ text: "yesthis", type: [8, 4], value: value, color: "yes" },{ text: "notthis", type: [4, 8], value: 0, color: "no" }]]
        }
    }
    if (num == 26) {
        if (Instincts == 'So') {
            return ['q2or6so',[{ text: "yesthis", type: [2, 6], value: value, color: "yes" },{ text: "notthis", type: [6, 2], value: 0, color: "no" }]]
        }
        if (Instincts == 'Sx') {
            return ['q2or6sx',[{ text: "yesthis", type: [2, 6], value: value, color: "yes" },{ text: "notthis", type: [6, 2], value: 0, color: "no" }]]
        }
        if (Instincts == 'Sp') {
            return ['q2or6sp',[{ text: "yesthis", type: [2, 6], value: value, color: "yes" },{ text: "notthis", type: [6, 2], value: 0, color: "no" }]]
        }
    }
    if (num == 7) {
        return ['q5or7',[{ text: "yesthis", type: [5, 7], value: value, color: "yes" },{ text: "notthis", type: [7, ''], value: 0, color: "no" }]]
    }
    if (num == 14) {
        return ['q2or7',[{ text: "yesthis", type: [2, 7], value: value, color: "yes" },{ text: "notthis", type: [7, ''], value: 0, color: "no" }]]
    }
    if (num == 8) {
        if (Instincts == 'So') {
            return ['q4or8sosp',[{ text: "yesthis", type: [4, 8], value: value, color: "yes" },{ text: "notthis", type: [4, ''], value: 0, color: "no" }]]
        }
        if (Instincts == 'Sx') {
            return ['q4or8sx',[{ text: "yesthis", type: [4, 8], value: value, color: "yes" },{ text: "notthis", type: [4, ''], value: 0, color: "no" }]]
        }
        if (Instincts == 'Sp') {
            return ['q4or8sosp',[{ text: "yesthis", type: [4, 8], value: value, color: "yes" },{ text: "notthis", type: [4, ''], value: 0, color: "no" }]]
        }
    }
    if (num == 16) {
        return ['q1or8',[{ text: "yesthis", type: [1, 8], value: value, color: "yes" },{ text: "notthis", type: [1, ''], value: 0, color: "no" }]]
    }
    if (num == 9) {
        return ['q5or9',[{ text: "yesthis", type: [5, 9], value: value, color: "yes" },{ text: "notthis", type: [9, ''], value: 0, color: "no" }]]
    }
    if (num == 18) {
        return ['q6or9',[{ text: "yesthis", type: [6, 9], value: value, color: "yes" },{ text: "notthis", type: [6, ''], value: 0, color: "no" }]]
    }
    if (num == 10) {
        return ['q6or5',[{ text: "yesthis", type: [6, 5], value: value, color: "yes" },{ text: "notthis", type: [5, ''], value: 0, color: "no" }]]
    }
    if (num == 15) {
        return ['q7or5',[{ text: "yesthis", type: [7, 5], value: value, color: "yes" },{ text: "notthis", type: [5, ''], value: 0, color: "no" }]]
    }
    return ['error',[{ text: "click", type: [0, 0], value: 0, color: "yes" },{ text: "error", type: [0, 0], value: 0, color: "no" }]]
}

function yesorno(num, Instinct) {
    etype = num
    result = [
        { text: "more_yes_text", type: [etype, Instinct], value: 3, color: "more_yes" },
        { text: "yes_text", type: [etype, Instinct], value: 2, color: "yes" },
        { text: "little_yes_text", type: [etype, Instinct], value: 1, color: "little_yes" },
        { text: "netural_text", type: [etype, Instinct], value: 0, color: "netural" },
        { text: "little_no_text", type: [etype, Instinct], value: -1, color: "little_no" },
        { text: "no_text", type: [etype, Instinct], value: -2, color: "no" },
        { text: "more_no_text", type: [etype, Instinct], value: -3, color: "more_no" },
    ]
    return result
}

function getecharacter(type) {
    if (type == 'So1') {
        return [["Gilgamesh", "Gilgamesh_quote", "<img src='./img/So/101.png' alt='01 pic'>"]]
    }
    if (type == 'Sx1') {
        return [["Yakami", "Yakami_quote", "<img src='./img/Te-N/02.png' alt='02 pic'>"], ["Tanya", "Tanya_quote", "<img src='./img/Te-S/03.png' alt='02 pic'>"]]
    }
    if (type == 'Sp1') {
        return [["Yukino", "Yukino_quote", "<img src='./img/Sp/101.png' alt='02 pic'>"],["Erwin", "Erwin_quote", "<img src='./img/Te-N/01.png' alt='02 pic'>"]]
    }
    if (type == 'So2') {
        return [["Mami", " ", "<img src='./img/Fe-N/02.png' alt='01 pic'>"]]
    }
    if (type == 'Sx2') {
        return [["Jonathan", "Jonathan_quote", "<img src='./img/Fe-N/01.png' alt='02 pic'>"]]
    }
    if (type == 'Sp2') {
        return [["Kinomoto", " ", "<img src='./img/Sp/201.png' alt='02 pic'>"]]
    }
    if (type == 'So3') {
        return [["Reinhard", "Reinhard_quote", "<img src='./img/Te-N/03.png' alt='01 pic'>"]]
    }
    if (type == 'Sx3') {
        return [["Roswaal", " ", "<img src='./img/Sx/301.png' alt='01 pic'>"]]
    }
    if (type == 'Sp3') {
        return [["Saki", " ", "<img src='./img/Fe-S/03.png' alt='01 pic'>"]]
    }
    if (type == 'So4') {
        return [["Omashu", "Omashu_quote", "<img src='./img/So/401.png' alt='01 pic'>"],["Illiya", "Illiya_quote", "<img src='./img/So/402.png' alt='02 pic'>"]]
    }
    if (type == 'Sx4') {
        return [["Lelouch", "Lelouch_quote", "<img src='./img/Ni-T/01.png' alt='01 pic'>"],["Suigintou", "Suigintou_quote", "<img src='./img/Sx/401.png' alt='02 pic'>"], ["Kuroyuki", "Kuroyuki_quote", "<img src='./img/Ni-F/01.png' alt='03 pic'>"]]
    }
    if (type == 'Sp4') {
        return [["Hei", "Hei_quote", "<img src='./img/sp/402.png' alt='01 pic'>"],["Shana", "Shana_quote", "<img src='./img/Ni-T/02.png' alt='02 pic'>"]]
    }
    if (type == 'So5') {
        return [["Bondorudo", "Bondorudo_quote", "<img src='./img/So/501.png' alt='01 pic'>"], ["Shougo", "Shougo_quote", "<img src='./img/Ne-T/02.png' alt='02 pic'>"]]
    }
    if (type == 'Sx5') {
        return [["CC", "CC_quote", "<img src='./img/Ti-N/01.png' alt='01 pic'>"], ["Shiki", "Shiki_quote", "<img src='./img/Ti-S/01.png' alt='02 pic'>"], ["Yuuji", "Yuuji_quote", "<img src='./img/Sx/501.png' alt='02 pic'>"]]
    }
    if (type == 'Sp5') {
        return [["Yang", "Yang_quote", "<img src='./img/Ti-N/02.png' alt='01 pic'>"], ["Shiraori", " ", "<img src='./img/Ti-N/03.png' alt='01 pic'>"]]
    }
    if (type == 'So6') {
        return [["Suzaku", "Suzaku_quote", "<img src='./img/So/601.png' alt='01 pic'>"]]
    }
    if (type == 'Sx6') {
        return [["Floch", " ", "<img src='./img/Sx/601.png' alt='01 pic'>"], ["Shinji", "Shinji_quote", "<img src='./img/Fi-N/03.png' alt='03 pic'>"]]
    }
    if (type == 'Sp6') {
        return [["Homura", "Homura_quote", "<img src='./img/Fi-N/01.png' alt='01 pic'>"], ["Anna", "Anna_quote", "<img src='./img/Sp/601.png' alt='01 pic'>"]]
    }
    if (type == 'So7') {
        return [["Naruto", "Naruto_quote", "<img src='./img/Se-F/01.png' alt='01 pic'>"], ["Yoh", "Yoh_quote", "<img src='./img/So/701.png' alt='01 pic'>"]]
    }
    if (type == 'Sx7') {
        return [["Haruhi", "Haruhi_quote", "<img src='./img/Sx/701.png' alt='01 pic'>"], ["Elaina", " ", "<img src='./img/Ne-T/03.png' alt='03 pic'>"]
    ]
    }
    if (type == 'Sp7') {
        return [["Joseph", "Joseph_quote", "<img src='./img/Sp/701.png' alt='01 pic'>"],["Kenny", " ", "<img src='./img/Se-T/03.png' alt='01 pic'>"]]
    }
    if (type == 'So8') {
        return [["Eren", "Eren_quote", "<img src='./img/Ne-F/01.png' alt='01 pic'>"]]
    }
    if (type == 'Sx8') {
        return [["Meliodas", "Meliodas_quote", "<img src='./img/Sx/801.png' alt='01 pic'>"],["Askeladd", " ", "<img src='./img/Sx/802.png' alt='02 pic'>"]]
    }
    if (type == 'Sp8') {
        return [["GioGio", "GioGio_quote", "<img src='./img/Sp/801.png' alt='02 pic'>"]]
    }
    if (type == 'So9') {
        return [["Altria", "Altria_quote", "<img src='./img/Si-T/02.png' alt='01 pic'>"],["Shirou", "Shirou_quote", "<img src='./img/So/901.png' alt='02 pic'>"]]
    }
    if (type == 'Sx9') {
        return [["Schwi", "Schwi_quote", "<img src='./img/Si-F/01.png' alt='01 pic'>"],["Yubel", " ", "<img src='./img/Sx/901.png.png' alt='01 pic'>"]]
    }
    if (type == 'Sp9') {
        return [["Kanade", "Kanade_quote", "<img src='./img/Si-F/03.png' alt='01 pic'>"]]
    }
}

function getetext(type) {
    if (type == 'So1') {
        return ["关键词:不适感", "憤怒之罪", "1号的侧翼是9和1，所以可能会表现出9或1表面特征，如果表现出9的特征过于明显则称为1w9,同理，2的特征过于明显则称为1w2，1号的整合解离方向是7和4，所以1号可能表现出向4和7变化的特征，并且1号的内涵与荣格八型的外倾思考(Te)最为接近。1号号作为围绕自身欲望和存在边界的腹区能量缺乏的类型，会为了服从自身所认同的规则或信条来压抑自身的欲望，纠正自身的错误，因此其有着一种愤怒作为内心的驱动力量来纠正其所认为错误的事情。So1即1号社群型认为自己已经达到完美状态，所以经常会采取一种完美无可挑剔的状态，并且认为【我是对的，你是错的】，不会愿意去适应对方的做法和腔调。"]
    }
    if (type == 'Sx1') {
        return ["关键词:热忱", "憤怒之罪", "1号的侧翼是9和1，所以可能会表现出9或1表面特征，如果表现出9的特征过于明显则称为1w9,同理，2的特征过于明显则称为1w2，1号的整合解离方向是7和4，所以1号可能表现出向4和7变化的特征，并且1号的内涵与荣格八型的外倾思考(Te)最为接近。1号号作为围绕自身欲望和存在边界的腹区能量缺乏的类型，会为了服从自身所认同的规则或信条来压抑自身的欲望，纠正自身的错误，因此其有着一种愤怒作为内心的驱动力量来纠正其所认为错误的事情。1sx即愤怒与性本能结合的1号性本能型，我们可能会认为1号性本能型的特点是欲望特别强烈，并进而导致他们急迫、易恐。如果想了解为什么性领域的愤怒会引发热仇，那么可以说是因为欲望从锁怒中得到了侵略性、 攻击性，从而使自身得到加强。换句话说，馈怒赋予欲望一种特殊的力量或者说紧张感，使得人不仅感到自己被拉向满足欲望的方向，而且觉得理直气壮。结果便是造成有些人会具有强烈的精神意志力和征服欲。我用下面这个集体行为的例子来加以解释：当南非翡翠和钻石矿石的开采被欧洲人垄断时，许多人提出反对，认为这些财富属于非洲人。但是一些人反问道（他们对此深信不疑）：“放到他们手里有什么好处？他们又没有文化！”在他们看来，既然欧洲人是文明人，而非洲人则被认为是原始的野蛮人，钻石自然应该属于欧洲人。"]
    }
    if (type == 'Sp1') {
        return ["关键词:担忧", "憤怒之罪", "1号的侧翼是9和1，所以可能会表现出9或1表面特征，如果表现出9的特征过于明显则称为1w9,同理，2的特征过于明显则称为1w2，1号的整合解离方向是7和4，所以1号可能表现出向4和7变化的特征，并且1号的内涵与荣格八型的外倾思考(Te)最为接近。1号号作为围绕自身欲望和存在边界的腹区能量缺乏的类型，会为了服从自身所认同的规则或信条来压抑自身的欲望，纠正自身的错误，因此其有着一种愤怒作为内心的驱动力量来纠正其所认为错误的事情。Sp代表着自保的本能，追求完美的愤怒的能量与审视自身的自保的本能结合后，当其在自己心目中的形象太不完美时，他的愤怒常常会转化成一种持续的自我改进的能量，就好像上了瘾一样。并且他的愤怒，会隐藏在与其愤怒和埋怨截然相反的彬彬有礼的善行和乐于助人的态度背后。换言之，他将愤怒转换成了善意。"]
    }
    if (type == 'So2') {
        return ["关键词:野心", "傲慢之罪", "2号的侧翼是1和3，所以可能会表现出1或3表面特征，如果表现出1的特征过于明显则称为2w1,同理，3的特征过于明显则称为2w3，2号的整合解离方向是8和4，所以2号可能表现出向4和8变化的特征，并且2号的内涵与荣格八型的外倾情感(Fe)最为接近。2号作为围绕价值评价的心区能量过剩的类型，内心非常自我中心给自己较高的评价，2号很愿意对他人释放善意，摆出友善关爱的态度，不过其核心动机是希望对方也能以同等的友好来回报他们，其心中认为自己做的很优秀，所有人都应该对其友好，因此2号被称为傲慢。在So2即2号社群型身上，傲慢最明显的表现就是通过赢得观众的瞩目所获得的满足感。或许并不是智力高的人才能激发出更强的野心，甚至表面聪明都不需要。但尽管如此，2号社群型绝不会满足于做一个花瓶。他们想要的是出人头地，而出人头地就需要动脑子。凡是为了满足自己的虚荣心而渴望变得举足轻重的人，必须要具备吸引公众目光的能力。要成为一个群体诱惑者，一个卓越出众的人不仅各方面必须优于常人，而且要具备成为领导者的天赋。伊查素曾说到过野心，但是我们这里所说的野心，明确来说指的是一股希望强过其他人的热情，一种对影响力和特权的渴望。这种类型的人总是让自己以某种了不起的大人物的形象呈现在世界面前"]
    }
    if (type == 'Sx2') {
        return ["关键词:征服", "傲慢之罪", "2号的侧翼是1和3，所以可能会表现出1或3表面特征，如果表现出1的特征过于明显则称为2w1,同理，3的特征过于明显则称为2w3，2号的整合解离方向是8和4，所以2号可能表现出向4和8变化的特征，并且2号的内涵与荣格八型的外倾情感(Fe)最为接近。2号作为围绕价值评价的心区能量过剩的类型，内心非常自我中心给自己较高的评价，2号很愿意对他人释放善意，摆出友善关爱的态度，不过其核心动机是希望对方也能以同等的友好来回报他们，其心中认为自己做的很优秀，所有人都应该对其友好，因此2号被称为傲慢。Sx2即2号性本能型，渴望着吸引他人，内心需要完全获得他人，不仅是性方面，其真实想法是最大限度激发对方的热情，为其带来生活的改善。"]
    }
    if (type == 'Sp2') {
        return ["关键词:特权", "傲慢之罪", "2号的侧翼是1和3，所以可能会表现出1或3表面特征，如果表现出1的特征过于明显则称为2w1,同理，3的特征过于明显则称为2w3，2号的整合解离方向是8和4，所以2号可能表现出向4和8变化的特征，并且2号的内涵与荣格八型的外倾情感(Fe)最为接近。2号作为围绕价值评价的心区能量过剩的类型，内心非常自我中心给自己较高的评价，2号很愿意对他人释放善意，摆出友善关爱的态度，不过其核心动机是希望对方也能以同等的友好来回报他们，其心中认为自己做的很优秀，所有人都应该对其友好，因此2号被称为傲慢。2号自保型是反2，自保型与心区能量的冲突，即自保本能与傲慢相冲突，导致Sp2喜欢放低自己把自己打扮成小孩子，虽然看上去是温柔稚气的，但实际上是一种幼稚的自我中心主义，其有着对爱的赤裸裸的渴望，渴望用表现的像幼稚的儿童那样吸引他人，尤其是带有母性气质的人。"]
    }
    if (type == 'So3') {
        return ["关键词:声誉", "虚荣之罪", "3号的侧翼是2和4，所以可能会表现出2或4的表面特征，如果表现出2的特征过于明显则称为3w2,同理，4的特征过于明显则称为3w4，2号的整合解离方向是9和6，所以3号可能表现出向9和6变化的特征。3号是与自身的围绕价值评价的心区隔离的类型，也就是不在乎自己内心对自己的评价，而极度迎合讨好他人的评价的类型，为此其在社会竞争中往往会不择手段的去竞争获得优胜，获取虚名，因此其被定义为七原罪之外的虚荣。So3即3号社群型，So3追求的不仅是特定人的赞赏，而是所有人的喝彩，为此So3是最变幻无常的，对不同的人换上不同面孔获取肯定，也是自负者中最自负的。"]
    }
    if (type == 'Sx3') {
        return ["关键词:吸引力", "虚荣之罪", "3号的侧翼是2和4，所以可能会表现出2或4的表面特征，如果表现出2的特征过于明显则称为3w2,同理，4的特征过于明显则称为3w4，2号的整合解离方向是9和6，所以3号可能表现出向9和6变化的特征。3号是与自身的围绕价值评价的心区隔离的类型，也就是不在乎自己内心对自己的评价，而极度迎合讨好他人的评价的类型，为此其在社会竞争中往往会不择手段的去竞争获得优胜，获取虚名，因此其被定义为七原罪之外的虚荣。Sx3即3号性本能型，是一种过度的讨好型人格，尤其是在父权制下，Sx3的女性可能变成过度讨好男性的，而失去为自己获得愉悦的能力，这类型的病态在于他们的行为并非出自本能而是把所有热情都投入到对爱的渴望以及诱惑他人的行径上。"]
    }
    if (type == 'Sp3') {
        return ["关键词:安全感", "虚荣之罪", "3号的侧翼是2和4，所以可能会表现出2或4的表面特征，如果表现出2的特征过于明显则称为3w2,同理，4的特征过于明显则称为3w4，2号的整合解离方向是9和6，所以3号可能表现出向9和6变化的特征。3号是与自身的围绕价值评价的心区隔离的类型，也就是不在乎自己内心对自己的评价，而极度迎合讨好他人的评价的类型，为此其在社会竞争中往往会不择手段的去竞争获得优胜，获取虚名，因此其被定义为七原罪之外的虚荣。sp的自保本能与3的虚荣相冲突的，所以Sp3是反虚荣的反3，虽然其内心渴望虚荣与名誉，但是其表面上非常拒绝虚荣低调行事，希望做一个大家认可的好人。"]
    }
    if (type == 'So4') {
        return ["关键词:羞耻", "嫉妒之罪", "4号的侧翼是3和4，所以可能会表现出3或5的表面特征，如果表现出3的特征过于明显则称为4w3,同理，5的特征过于明显则称为4w5，4号的整合解离方向是2和1，所以4号可能表现出向2和1变化的特征，并且4号的内涵与荣格八型的内倾直觉(Ni)最为接近。4号作为围绕价值评价的心区能量缺乏的类型，其核心是认为自己不如他人，所以4号的嫉妒是与他人的对比中感受到自身价值的缺失，从而容易陷入痛苦之中，为保护自身的情感远离他人。4号社群型总是自怨自艾，泪眼婆娑，把自己放在一个受害者的位置上。"]
    }
    if (type == 'Sx4') {
        return ["关键词:仇恨", "嫉妒之罪", "4号的侧翼是3和4，所以可能会表现出3或5的表面特征，如果表现出3的特征过于明显则称为4w3,同理，5的特征过于明显则称为4w5，4号的整合解离方向是2和1，所以4号可能表现出向2和1变化的特征，并且4号的内涵与荣格八型的内倾直觉(Ni)最为接近。4号作为围绕价值评价的心区能量缺乏的类型，其核心是认为自己不如他人，所以4号的嫉妒是与他人的对比中感受到自身价值的缺失，从而容易陷入痛苦之中，为保护自身的情感远离他人。不过由于4号偏向脑区，激情的Sx与脑区的理性相冲突，于是Sx4成了极度扭曲的拒绝嫉妒的反4，虽然他们深层意识里认为自己不如他人，但他们拒绝这一点，所以喜欢摆出远在他人之上的态度，并对某一类人充满仇恨,蔑视普通的日常生活。"]
    }
    if (type == 'Sp4') {
        return ["关键词:坚韧", "嫉妒之罪", "4号的侧翼是3和4，所以可能会表现出3或5的表面特征，如果表现出3的特征过于明显则称为4w3,同理，5的特征过于明显则称为4w5，4号的整合解离方向是2和1，所以4号可能表现出向2和1变化的特征，并且4号的内涵与荣格八型的内倾直觉(Ni)最为接近。4号作为围绕价值评价的心区能量缺乏的类型，其核心是认为自己不如他人，所以4号的嫉妒是与他人的对比中感受到自身价值的缺失，从而容易陷入痛苦之中，为保护自身的情感远离他人。Sp的自保本能与心区冲突，虽然4号都是痛苦的，但是Sp4是抗拒痛苦最坚韧的4号，因为自保本能要求4号必须学会抗拒克服痛苦才能保护自己的生存，这甚至可能导致部分极端的Sp4享受痛苦带来的快感。"]
    }
    if (type == 'So5') {
        return ["关键词:图腾", "贪婪之罪", "5号的侧翼是4和6，所以可能会表现出4或6的表面特征，如果表现出4的特征过于明显则称为5w4,同理，6的特征过于明显则称为5w6，5号的整合解离方向是7和8，所以5号可能表现出向7和8变化的特征，并且5号的内涵与荣格八型的内倾思考(Ti)最为接近。5号作为围绕思维和安全需求的脑区能量过剩的类型，非常容易沉浸到思维世界之中，所以5号的贪婪指的是5号容易贪婪的汲取某一领域的事物提升自己的思维和能力以应对可能潜在的危险与安全焦虑，例如贪婪的汲取时间，知识，信息等，并且可能为此不惜牺牲其他方面的需求，节衣缩食过着低欲望的远离他人的简朴生活，不惜代价的追求某一件事物才是真正的贪婪。5号是实质上最为理性的类型，但5号的思考往往不会基于主流价值的独立思考，所以看起来往往是魔怔且容易被认为是非理性的。5号社群型追求镜花水月般的理想图腾，虽然这一点和Sx7相似，但其更为脱离现实，其追求的理想就如虚幻中的图腾，其渴望与最杰出最有声望的个体结交。"]
    }
    if (type == 'Sx5') {
        return ["关键词:秘密", "贪婪之罪", "5号的侧翼是4和6，所以可能会表现出4或6的表面特征，如果表现出4的特征过于明显则称为5w4,同理，6的特征过于明显则称为5w6，5号的整合解离方向是7和8，所以5号可能表现出向7和8变化的特征，并且5号的内涵与荣格八型的内倾思考(Ti)最为接近。5号作为围绕思维和安全需求的脑区能量过剩的类型，非常容易沉浸到思维世界之中，所以5号的贪婪指的是5号容易贪婪的汲取某一领域的事物提升自己的思维和能力以应对可能潜在的危险与安全焦虑，例如贪婪的汲取时间，知识，信息等，并且可能为此不惜牺牲其他方面的需求，节衣缩食过着低欲望的远离他人的简朴生活，不惜代价的追求某一件事物才是真正的贪婪。5号是实质上最为理性的类型，但5号的思考往往不会基于主流价值的独立思考，所以看起来往往是魔怔且容易被认为是非理性的。不过由于Sx与脑区冲突，所以Sx5是反5，其并非像一般的5号那样因为贪婪而退缩，Sx渴望着激烈深入的体验，尽管拒绝远离他人，但内心深处渴望着一个极度理想的伴侣"]
    }
    if (type == 'Sp5') {
        return ["关键词:避难所", "贪婪之罪", "5号的侧翼是4和6，所以可能会表现出4或6的表面特征，如果表现出4的特征过于明显则称为5w4,同理，6的特征过于明显则称为5w6，5号的整合解离方向是7和8，所以5号可能表现出向7和8变化的特征，并且5号的内涵与荣格八型的内倾思考(Ti)最为接近。5号作为围绕思维和安全需求的脑区能量过剩的类型，非常容易沉浸到思维世界之中，所以5号的贪婪指的是5号容易贪婪的汲取某一领域的事物提升自己的思维和能力以应对可能潜在的危险与安全焦虑，例如贪婪的汲取时间，知识，信息等，并且可能为此不惜牺牲其他方面的需求，节衣缩食过着低欲望的远离他人的简朴生活，不惜代价的追求某一件事物才是真正的贪婪。5号是实质上最为理性的类型，但5号的思考往往不会基于主流价值的独立思考，所以看起来往往是魔怔且容易被认为是非理性的。退缩的5号与退缩的自保型结合在一起就演变为最为退缩的类型，该类型会彻底退缩回自己的内心世界的避难所，构建起严实的堡垒隔绝与他人的交流，对他们而言可能会有一种【他人即地狱】的感觉，不过由于这种特性其内心世界是极其丰富的，其往往有着较强的想象力去构建出让自己沉浸式体验回避现实的内心世界。"]
    }
    if (type == 'So6') {
        return ["关键词:责任", "恐惧之罪", "6号的侧翼是5和7，所以可能会表现出5或7的表面特征，如果表现出5的特征过于明显则称为6w5,同理，7的特征过于明显则称为6w7，6号的整合解离方向是3和9，所以6号可能表现出向3和9变化的特征，并且6号的内涵与荣格八型的内倾情感(Fi)最为接近，不过So6一定程度上也接近荣格八型中的外倾思考(Te)。6号作为围绕思维和安全需求的脑区隔离的类型，虽然有着丰富的思考，但与自己的脑区隔离，很难真正做到自己的思考，以基于某些前人或他人的理论或说法来进行思考，恐惧自身是错误的是邪恶的，希望确信自己是正义且正确的，往往他们会捍卫着主流的价值观或说法，因此容易被认为是非常理性的类型被误认为5号，他们内心有着捍卫他们所认可的价值观的激烈的情绪，又容易被误认为4号或8号，但548都是黑暗类型，而6号充满对光明与正义的追求，因为其恐惧黑暗，恐惧邪恶，恐惧错误，恐惧一切不正确的东西想通过依附于某一权威的羽翼之下得到保护放弃自身的思考来应对安全感的焦虑，所以其是七原罪之外衍生的恐惧。社群型6是最为黑白分明的，严于律己的普鲁士人格，这种人格多出现在纳粹军官上（不过希特勒本人应该是Sx4而非So6），他们心中有一条明确的界限来区分哪些人是好的，哪些人是同志，哪些人可以统战，哪些人应该被肃清，他们的思考就在于用外来的标准去清清楚楚的区分形形色色的人。"]
    }
    if (type == 'Sx6') {
        return ["关键词:力量", "恐惧之罪", "6号的侧翼是5和7，所以可能会表现出5或7的表面特征，如果表现出5的特征过于明显则称为6w5,同理，7的特征过于明显则称为6w7，6号的整合解离方向是3和9，所以6号可能表现出向3和9变化的特征，并且6号的内涵与荣格八型的内倾情感(Fi)最为接近。6号作为围绕思维和安全需求的脑区隔离的类型，虽然有着丰富的思考，但与自己的脑区隔离，很难真正做到自己的思考，以基于某些前人或他人的理论或说法来进行思考，恐惧自身是错误的是邪恶的，希望确信自己是正义且正确的，往往他们会捍卫着主流的价值观或说法，因此容易被认为是非常理性的类型被误认为5号，他们内心有着捍卫他们所认可的价值观的激烈的情绪，又容易被误认为4号或8号，但548都是黑暗类型，而6号充满对光明与正义的追求，因为其恐惧黑暗，恐惧邪恶，恐惧错误，恐惧一切不正确的东西，想通过依附于某一权威的羽翼之下得到保护放弃自身的思考来应对安全感的焦虑，所以其是七原罪之外衍生的恐惧。Sx与脑区能量相冲突，形成了作为反6反恐惧的Sx6，他们往往不愿意承认自己恐惧，为此故意去从事英雄般的事业，虽然这看上去可能像8，但8是拥有真正的勇敢的内心，而Sx6的内心仍然是非常恐惧的，所以其非常渴望力量来战胜恐惧。"]
    }
    if (type == 'Sp6') {
        return ["关键词:温暖", "恐惧之罪", "6号的侧翼是5和7，所以可能会表现出5或7的表面特征，如果表现出5的特征过于明显则称为6w5,同理，7的特征过于明显则称为6w7，6号的整合解离方向是3和9，所以6号可能表现出向3和9变化的特征，并且6号的内涵与荣格八型的内倾情感(Fi)最为接近。6号作为围绕思维和安全需求的脑区隔离的类型，虽然有着丰富的思考，但与自己的脑区隔离，很难真正做到自己的思考，以基于某些前人或他人的理论或说法来进行思考，恐惧自身是错误的是邪恶的，希望确信自己是正义且正确的，往往他们会捍卫着主流的价值观或说法，因此容易被认为是非常理性的类型被误认为5号，他们内心有着捍卫他们所认可的价值观的激烈的情绪，又容易被误认为4号或8号，但548都是黑暗类型，而6号充满对光明与正义的追求，因为其恐惧黑暗，恐惧邪恶，恐惧错误，恐惧一切不正确的东西，想通过依附于某一权威的羽翼之下得到保护放弃自身的思考来应对安全感的焦虑，所以其是七原罪之外衍生的恐惧。6号自保型与其他6号差异巨大，他们追求着温暖，希望得到大家的关爱和保护，渴望得到家人的拥抱，喜欢呆在舒适安逸的地方，渴望没有敌人的环境。"]
    }
    if (type == 'So7') {
        return ["关键词:牺牲", "暴食之罪", "7号的侧翼是6和8，所以可能会表现出6或8的表面特征，如果表现出6的特征过于明显则称为7w6,同理，8的特征过于明显则称为7w8，7号的整合解离方向是5和1，所以7号可能表现出向5和1变化的特征，并且7号的内涵与荣格八型的外倾感觉(Se)最为接近。7号作为围绕思维和安全需求的脑区能量缺乏的类型，总是容易忽略安全感上的焦虑，狼吞虎咽般的追求着获取自身独特的愉悦，因此被赋予了七原罪之中的暴食。由于7号表面上偏向腹区，So与腹区能量相冲突，产生表面上的反7，So7并不会追求自身的快乐，而是追求牺牲自己帮助他人为自己带来的快乐，助人为乐这一词很好的体现了社群型7号的特征。"]
    }
    if (type == 'Sx7') {
        return ["关键词:易受暗示", "暴食之罪", "7号的侧翼是6和8，所以可能会表现出6或8的表面特征，如果表现出6的特征过于明显则称为7w6,同理，8的特征过于明显则称为7w8，7号的整合解离方向是5和1，所以7号可能表现出向5和1变化的特征，并且7号的内涵与荣格八型的外倾感觉(Se)最为接近，不过Sx7也较为接近外倾直觉(Ne)。7号作为围绕思维和安全需求的脑区能量缺乏的类型，总是容易忽略安全感上的焦虑，狼吞虎咽般的追求着获取自身独特的愉悦，因此被赋予了七原罪之中的暴食。由于Sx与脑区的冲突，Sx7在7号中是最为特别的，其他7号都追求现世的快乐与成就，但Sx7追逐非世俗的梦想来忘却痛苦，拒绝触碰庸俗的现实。由于Sx7可能表现出更为明显的特征，导致错误的形成了7号是理想型的认知，实质上除了Sx7以外7号是非常现实的人格。"]
    }
    if (type == 'Sp7') {
        return ["关键词:家庭", "暴食之罪", "7号的侧翼是6和8，所以可能会表现出6或8的表面特征，如果表现出6的特征过于明显则称为7w6,同理，8的特征过于明显则称为7w8，7号的整合解离方向是5和1，所以7号可能表现出向5和1变化的特征，并且7号的内涵与荣格八型的外倾感觉(Se)最为接近。7号作为围绕思维和安全需求的脑区能量缺乏的类型，总是容易忽略安全感上的焦虑，狼吞虎咽般的追求着获取自身独特的愉悦，因此被赋予了七原罪之中的暴食。sp的自保需求和7号的暴食需求结合后，形成了最为现实主义以及机会主义的自保型7号人格，这一人格不会放过任何赚取利益的机会，像个推销员一样敏锐的在与他人的交谈中捕捉着商机，寻找着对方的弱点，是世俗意义上最为聪明的类型，或者说最为滑头的类型。"]
    }
    if (type == 'So8') {
        return ["关键词:同盟", "纵欲之罪", "8号的侧翼是7和9，所以可能会表现出7或9的表面特征，如果表现出7的特征过于明显则称为8w7,同理，9的特征过于明显则称为8w9，8号的整合解离方向是5和2，所以8号可能表现出向5和1变化的特征，并且8号的内涵与荣格八型的外倾直觉(Ne)最为接近。8号作为围绕自身欲望和存在边界的腹区能量过剩的类型，有着很强的欲望，这种欲望会促使他们去破坏和无视社会规则，其与1号的区别就在于1号是秩序的守护者或建立者，而其是秩序的破坏者，因此被赋予七原罪的纵欲。8号社群型是一种叛逆者，他们愤世嫉俗，简单粗暴，坚韧而又粗鲁，友谊和同盟是他们的核心议题，与朋友同生共死打倒强权共赴胜利是他们最为渴望的事情。"]
    }
    if (type == 'Sx8') {
        return ["关键词:占有欲", "纵欲之罪", "8号的侧翼是7和9，所以可能会表现出7或9的表面特征，如果表现出7的特征过于明显则称为8w7,同理，9的特征过于明显则称为8w9，8号的整合解离方向是5和2，所以8号可能表现出向5和1变化的特征，并且8号的内涵与荣格八型的外倾直觉(Ne)最为接近。8号作为围绕自身欲望和存在边界的腹区能量过剩的类型，有着很强的欲望，这种欲望会促使他们去破坏和无视社会规则，其与1号的区别就在于1号是秩序的守护者或建立者，而其是秩序的破坏者，因此被赋予七原罪的纵欲。Sx8即8号性本能型是所有类型中最为叛逆的最为反社会的类型，他们有着极强的占有欲和吸引力，这种占有欲并非对某种物品，而是对他人的占有欲，对场面的占有欲，渴望把整个场面的注意力都吸引到自己身上来。"]
    }
    if (type == 'Sp8') {
        return ["关键词:满足感", "纵欲之罪", "8号的侧翼是7和9，所以可能会表现出7或9的表面特征，如果表现出7的特征过于明显则称为8w7,同理，9的特征过于明显则称为8w9，8号的整合解离方向是5和2，所以8号可能表现出向5和1变化的特征，并且8号的内涵与荣格八型的外倾直觉(Ne)最为接近。8号作为围绕自身欲望和存在边界的腹区能量过剩的类型，有着很强的欲望，这种欲望会促使他们去破坏和无视社会规则，其与1号的区别就在于1号是秩序的守护者或建立者，而其是秩序的破坏者，因此被赋予七原罪的纵欲。Sp8即8号自保型，是所有8中最会隐藏自己散发出的反社会气息，他们是最能在历史剧变中生存下来的类型，他们很容易认同【善良和良好的意图根本不存在】，他们会像社会主义者一样向他人慷慨的提供保护，但真正目的是借此控制和奴役他人，使他人无法威胁到他们自身。"]
    }
    if (type == 'So9') {
        return ["关键词:参与/归属", "怠惰之罪", "9号的侧翼是8和1，所以可能会表现出8或1的表面特征，如果表现出8的特征过于明显则称为9w8,同理，1的特征过于明显则称为9w1，9号的整合解离方向是3和6，所以9号可能表现出向3和6变化的特征，并且9号的内涵与荣格八型的内倾感觉(Si)最为接近。9号作为围绕自身欲望和存在边界的腹区能量隔离的类型，可能会看似有着很强烈的理想的表现，实则只是从他人那里借来的理想，9号在灵性上是迟钝的，可能日复一日的做着相同的事不求改变，虽然他们可能会不求回报的服务于他人，但这根本上是一种灵性上的怠惰，因此被赋予了七原罪的怠惰之名。由于社群本能与腹区能量相冲突，形成作为反9的So9即社群9，与9号的怠惰原罪相反，So9是最为勤奋的类型，由于他们非常渴望融入群体，又因为灵性上的怠惰不容易感知到自身已经融入群体，所以他们经常会表现的积极奉献，勤奋工作，成为一个工作狂为争取集体的认可。"]
    }
    if (type == 'Sx9') {
        return ["关键词:共生", "怠惰之罪", "9号的侧翼是8和1，所以可能会表现出8或1的表面特征，如果表现出8的特征过于明显则称为9w8,同理，1的特征过于明显则称为9w1，9号的整合解离方向是3和6，所以9号可能表现出向3和6变化的特征，并且9号的内涵与荣格八型的内倾感觉(Si)最为接近。9号作为围绕自身欲望和存在边界的腹区能量隔离的类型，可能会看似有着很强烈的理想的表现，实则只是从他人那里借来的理想，9号在灵性上是迟钝的，可能日复一日的做着相同的事不求改变，虽然他们可能会不求回报的服务于他人，但这根本上是一种灵性上的怠惰，因此被赋予了七原罪的怠惰之名。Sx9即性本能9通过与他人融合共生体验存在感，他们可能极度的违背了自己的需求去满足自己的融合对象的需求，甚至自己已经饱受摧残仍然注意不到自身的需求。"]
    }
    if (type == 'Sp9') {
        return ["关键词:食欲", "怠惰之罪", "9号的侧翼是8和1，所以可能会表现出8或1的表面特征，如果表现出8的特征过于明显则称为9w8,同理，1的特征过于明显则称为9w1，9号的整合解离方向是3和6，所以9号可能表现出向3和6变化的特征，并且9号的内涵与荣格八型的内倾感觉(Si)最为接近。9号作为围绕自身欲望和存在边界的腹区能量隔离的类型，可能会看似有着很强烈的理想的表现，实则只是从他人那里借来的理想，9号在灵性上是迟钝的，可能日复一日的做着相同的事不求改变，虽然他们可能会不求回报的服务于他人，但这根本上是一种灵性上的怠惰，因此被赋予了七原罪的怠惰之名。Sp9即自保型9，是最为接近9号的怠惰的字面意义的9，【我吃，故我在】这句话很好的表现了Sp9的特点，他们可以日复一日的沉浸在一成不变的吃喝拉撒睡中不去谋求改变，就像一个躺在沙发上毫无兴致的看着索然无味的电视节目而不会想着切换频道。"]
    }
    return [" ", " ", " "]
}