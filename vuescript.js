// import Vue from 'vue';
// import VueI18n from 'vue-i18n';

// Vue.use(VueI18n)

// const i18n = new VueI18n({
//     locale: 'zh', // 设置语言环境
//     messages: {
//         en: {vue init webpack my_project
//           message: {
//             test_title: 'Personality type Test'
//           }
//         },
//         zh: {
//             message: {
//               test_title: '人格心理类型测试'
//             }
//         }
//     }
//   })


const { createApp } = Vue;
const { createI18n } = VueI18n;

const i18n = createI18n({
  locale: "zh",
  messages: {
    zh: {
      message: {
        test_title: '人格心理类型测试',
        Question_1: '我在不知不觉中经常会陷入长时期沉浸式的思考，甚至会一度察觉不到周边的情况。',
      }
    },
    hk: {
      message: {
        test_title: '人格心理類型測試'
      }
    },
    en: {
      message: {
        test_title: 'Personality type Test'
      }
    }
  }

});


var app = createApp ({
  el: '#app',
  data() {
    return {
      nostart: true,
      result_page: false,
      enneagram_question: false,
      enneagram_result: false,
      no_result: false,
      enneagram_test_result: '',
      select: 'no_select_button',
      bclass: 'start_button',
      eclass: 'e_start_button',
      Question_list: {},
      question_data: {},
      question_slect: {},
      question_text: '',
      question_key: '',
      list_len: 0,
      current_len: 0,
      result: '',
      sin: '',
      enneagram_keyword: '',
      result_text: '',
      enneagram_result_dec: '',
      img1: "/01.png' alt='01 pic'>",
      img2: "/02.png' alt='02 pic'>",
      img3: "/03.png' alt='03 pic'>",
      sound: new Audio('./sound/click.wav'),
      C1: '',
      C2: '',
      C1text: '',
      C2text: '',
      C3: '',
      C3text: '',
      e_check: true,
      check_data: [],
      user_data: {
        ti: 30,
        fe: 30,
        fi: 30,
        te: 30,
        ni: 30,
        se: 30,
        si: 30,
        ne: 30,
        T: 30,
        F: 30,
        N: 30,
        S: 30,
        I: 30,
        E: 30,
      },
      question_enneagram: '',
      trifix: '',
      startorder: false,
      answer_enneagram: [],
      selected_enneagram: [],
      e_maybe: [],
      enneagram_num: 0,
      enneagram_num2: 0,
      check_num: 0,
      e_result_value: 0,
      enneagram_data: {
        Instincts: '',
        so: 0,
        sx: 0,
        sp: 0,
        I: 20,
        II: 20,
        III: 20,
        IV: 20,
        V: 20,
        VI: 20,
        VII: 20,
        VIII: 20,
        IX: 20,
      },
    };
  },
  methods: {
    start: function () {
      var that = this

      var url = 'cn.json'

      var request = new XMLHttpRequest()

      request.open('get', url)

      request.send(null)

      request.onload = function () {
        var plist = JSON.parse(request.responseText)
        
        // get question list
        that.Question_list = plist
        // start test
        that.nostart = false
        // get random question
        that.question_slect = pickRandomProperty(that.Question_list)
        console.log(that.question_slect)
        // set first question
        that.question_key = that.question_slect
        
        that.question_data = that.Question_list[that.question_slect]
        that.question_text = that.Question_list[that.question_slect].question
        that.list_len = getlistlen(that.Question_list)
        that.current_len = getlistlen(that.Question_list)
      }
    },
    estart: function () {
      this.question_enneagram = TestInstinctsq(this.enneagram_num)
      this.answer_enneagram = TestInstinctsa(this.enneagram_num)
      this.nostart = false
      this.enneagram_question = true
      this.enneagram_num += 1
    },

    eanswer: function (type, value) {
      if (type[0] == 1) {
        this.enneagram_data.I += value
      }
      if (type[0] == 2) {
        this.enneagram_data.II += value
      }
      if (type[0] == 3) {
        this.enneagram_data.III += value
      }
      if (type[0] == 4) {
        this.enneagram_data.IV += value
      }
      if (type[0] == 5) {
        this.enneagram_data.V += value
      }
      if (type[0] == 6) {
        this.enneagram_data.VI += value
      }
      if (type[0] == 7) {
        this.enneagram_data.VII += value
      }
      if (type[0] == 8) {
        this.enneagram_data.VIII += value
      }
      if (type[0] == 9) {
        this.enneagram_data.IX += value
      }
      if (type[1] == 1) {
        this.enneagram_data.I -= value * 0.5
      }
      if (type[1] == 2) {
        this.enneagram_data.II -= value * 0.5
      }
      if (type[1] == 3) {
        this.enneagram_data.III -= value * 0.5
      }
      if (type[1] == 4) {
        this.enneagram_data.IV -= value * 0.5
      }
      if (type[1] == 5) {
        this.enneagram_data.V -= value * 0.5
      }
      if (type[1] == 6) {
        this.enneagram_data.VI -= value * 0.5
      }
      if (type[1] == 7) {
        this.enneagram_data.VII -= value * 0.5
      }
      if (type[1] == 8) {
        this.enneagram_data.VIII -= value * 0.5
      }
      if (type[1] == 9) {
        this.enneagram_data.IX -= value * 0.5
      }
      if (type[1] == 'So') {
        this.enneagram_data.so += value
      }
      if (type[1] == 'Sx') {
        this.enneagram_data.sx += value
      }
      if (type[1] == 'Sp') {
        this.enneagram_data.sp += value
      }
      console.log(this.enneagram_data)

      this.sound.play()
      if (this.enneagram_data.Instincts == '') {
        if (TestInstinctsa(this.enneagram_num)) {
          this.question_enneagram = TestInstinctsq(this.enneagram_num)
          this.answer_enneagram = TestInstinctsa(this.enneagram_num)
        } else {
          if (
            this.enneagram_data.so > this.enneagram_data.sx &&
            this.enneagram_data.so > this.enneagram_data.sp
          ) {
            this.enneagram_data.Instincts = 'So'
            this.question_enneagram = TestInstinctsq(this.enneagram_num)
            this.answer_enneagram = TestEnneagrama(
              this.enneagram_data.Instincts,
              this.enneagram_num2
            )
            this.enneagram_num2 += 1
          } else if (
            this.enneagram_data.sx > this.enneagram_data.so &&
            this.enneagram_data.sx > this.enneagram_data.sp
          ) {
            this.enneagram_data.Instincts = 'Sx'
            this.question_enneagram = TestInstinctsq(this.enneagram_num)
            this.answer_enneagram = TestEnneagrama(
              this.enneagram_data.Instincts,
              this.enneagram_num2
            )
            this.enneagram_num2 += 1
          } else if (
            this.enneagram_data.sp > this.enneagram_data.sx &&
            this.enneagram_data.sp > this.enneagram_data.so
          ) {
            this.enneagram_data.Instincts = 'Sp'
            this.question_enneagram = TestInstinctsq(this.enneagram_num)
            this.answer_enneagram = TestEnneagrama(
              this.enneagram_data.Instincts,
              this.enneagram_num2
            )
            this.enneagram_num2 += 1
          } else if (
            this.enneagram_data.sx > this.enneagram_data.so &&
            this.enneagram_data.sx == this.enneagram_data.sp
          ) {
            this.enneagram_data.Instincts = 'Sx'
            this.question_enneagram = TestInstinctsq(this.enneagram_num)
            this.answer_enneagram = TestEnneagrama(
              this.enneagram_data.Instincts,
              this.enneagram_num2
            )
            this.enneagram_num2 += 1
          } else if (
            this.enneagram_data.so == this.enneagram_data.sx &&
            this.enneagram_data.so > this.enneagram_data.sp
          ) {
            this.enneagram_data.Instincts = 'So'
            this.question_enneagram = TestInstinctsq(this.enneagram_num)
            this.answer_enneagram = TestEnneagrama(
              this.enneagram_data.Instincts,
              this.enneagram_num2
            )
            this.enneagram_num2 += 1
          } else if (
            this.enneagram_data.sp > this.enneagram_data.sx &&
            this.enneagram_data.sp == this.enneagram_data.so
          ) {
            this.enneagram_data.Instincts = 'Sp'
            this.question_enneagram = TestInstinctsq(this.enneagram_num)
            this.answer_enneagram = TestEnneagrama(
              this.enneagram_data.Instincts,
              this.enneagram_num2
            )
            this.enneagram_num2 += 1
          } else {
            this.enneagram_question = false
            this.no_result = true
          }
        }
        console.log(this.enneagram_num)
      } else {
        if (
          TestEnneagrama(this.enneagram_data.Instincts, this.enneagram_num2)
        ) {
          this.question_enneagram = TestInstinctsq(this.enneagram_num)
          this.answer_enneagram = TestEnneagrama(
            this.enneagram_data.Instincts,
            this.enneagram_num2
          )
          this.enneagram_num2 += 1
        } else if (this.selected_enneagram.length < 6) {
          var commondata = this
          this.question_enneagram = TestInstinctsq(this.enneagram_num)
          if (this.startorder) {
            if (type[0] == 1) {
              this.selected_enneagram.push(1)
            }
            if (type[0] == 2) {
              this.selected_enneagram.push(2)
            }
            if (type[0] == 3) {
              this.selected_enneagram.push(3)
            }
            if (type[0] == 4) {
              this.selected_enneagram.push(4)
            }
            if (type[0] == 5) {
              this.selected_enneagram.push(5)
            }
            if (type[0] == 6) {
              this.selected_enneagram.push(6)
            }
            if (type[0] == 7) {
              this.selected_enneagram.push(7)
            }
            if (type[0] == 8) {
              this.selected_enneagram.push(8)
            }
            if (type[0] == 9) {
              this.selected_enneagram.push(9)
            }
            this.answer_enneagram = SelectEnneagrama(
              this.selected_enneagram,
              commondata
            )
          } else {
            this.answer_enneagram = SelectEnneagrama([], commondata)
          }
        } else if (this.e_check) {
          //检测是否除籍
          if (
            this.enneagram_data.IV > this.enneagram_data.III &&
            this.enneagram_data.III + 15 > this.enneagram_data.IV
          ) {
            let difference = this.enneagram_data.IV - this.enneagram_data.III
            this.check_data.push([4, difference])
          }
          if (
            this.enneagram_data.IV > this.enneagram_data.VIII &&
            this.enneagram_data.VIII + 15 > this.enneagram_data.IV
          ) {
            let difference = this.enneagram_data.IV - this.enneagram_data.VIII
            this.check_data.push([48, difference])
          }
          if (
            this.enneagram_data.I > this.enneagram_data.IV &&
            this.enneagram_data.IV + 15 > this.enneagram_data.I
          ) {
            let difference = this.enneagram_data.I - this.enneagram_data.IV
            this.check_data.push([1, difference])
          }
          if (
            this.enneagram_data.II > this.enneagram_data.III &&
            this.enneagram_data.III + 15 > this.enneagram_data.II
          ) {
            let difference = this.enneagram_data.II - this.enneagram_data.III
            this.check_data.push([2, difference])
          }
          //检测是否除6籍
          if (
            this.enneagram_data.VI > this.enneagram_data.II &&
            this.enneagram_data.II + 15 > this.enneagram_data.VI
          ) {
            let difference = this.enneagram_data.VI - this.enneagram_data.II
            this.check_data.push([26, difference])
          }
          //检测是否除2籍
          if (
            this.enneagram_data.II > this.enneagram_data.VI &&
            this.enneagram_data.II + 15 > this.enneagram_data.VI
          ) {
            let difference = this.enneagram_data.II - this.enneagram_data.VI
            this.check_data.push([62, difference])
          }
          if (
            this.enneagram_data.VII > this.enneagram_data.V &&
            this.enneagram_data.V + 15 > this.enneagram_data.VII
          ) {
            let difference = this.enneagram_data.VII - this.enneagram_data.V
            this.check_data.push([7, difference])
          }
          if (
            this.enneagram_data.V > this.enneagram_data.VI &&
            this.enneagram_data.VI + 15 > this.enneagram_data.V
          ) {
            let difference = this.enneagram_data.V - this.enneagram_data.VI
            this.check_data.push([10, difference])
            this.check_data.push([5, difference])
          }
          if (
            this.enneagram_data.VII > this.enneagram_data.II &&
            this.enneagram_data.II + 15 > this.enneagram_data.VII
          ) {
            let difference = this.enneagram_data.VII - this.enneagram_data.II
            this.check_data.push([14, difference])
          }
          if (
            this.enneagram_data.VIII > this.enneagram_data.IV &&
            this.enneagram_data.IV + 15 > this.enneagram_data.VIII
          ) {
            let difference = this.enneagram_data.VIII - this.enneagram_data.IV
            this.check_data.push([8, difference])
          }
          if (
            this.enneagram_data.VIII > this.enneagram_data.I &&
            this.enneagram_data.I + 15 > this.enneagram_data.VIII
          ) {
            let difference = this.enneagram_data.VIII - this.enneagram_data.I
            this.check_data.push([16, difference])
          }
          if (
            this.enneagram_data.V > this.enneagram_data.VII &&
            this.enneagram_data.VII + 15 > this.enneagram_data.V
          ) {
            let difference = this.enneagram_data.V - this.enneagram_data.VII
            this.check_data.push([15, difference])
          }
          if (
            this.enneagram_data.IX > this.enneagram_data.V &&
            this.enneagram_data.V + 15 > this.enneagram_data.IX
          ) {
            let difference = this.enneagram_data.IX - this.enneagram_data.V
            this.check_data.push([9, difference])
          }
          if (
            this.enneagram_data.IX > this.enneagram_data.VI &&
            this.enneagram_data.VI + 15 > this.enneagram_data.IX
          ) {
            let difference = this.enneagram_data.IX - this.enneagram_data.VI
            this.check_data.push([18, difference])
          }
          if (this.check_data.length > this.check_num) {
            this.question_enneagram = CheckEnneagrama(
              this.enneagram_data.Instincts,
              this.check_data[this.check_num][0],
              this.check_data[this.check_num][1]
            )[0]
            this.answer_enneagram = CheckEnneagrama(
              this.enneagram_data.Instincts,
              this.check_data[this.check_num][0],
              this.check_data[this.check_num][1]
            )[1]
          }
          this.check_num += 1
          this.e_check = false
        } else if (this.check_data.length > this.check_num) {
          this.question_enneagram = CheckEnneagrama(
            this.enneagram_data.Instincts,
            this.check_data[this.check_num][0],
            this.check_data[this.check_num][1]
          )[0]
          this.answer_enneagram = CheckEnneagrama(
            this.enneagram_data.Instincts,
            this.check_data[this.check_num][0],
            this.check_data[this.check_num][1]
          )[1]
          this.check_num += 1
        } else {
          this.enneagram_question = false
          var result_arr = [
            this.enneagram_data.I,
            this.enneagram_data.II,
            this.enneagram_data.III,
            this.enneagram_data.IV,
            this.enneagram_data.V,
            this.enneagram_data.VI,
            this.enneagram_data.VII,
            this.enneagram_data.VIII,
            this.enneagram_data.IX,
          ]
          var brain = [
            this.enneagram_data.V,
            this.enneagram_data.VI,
            this.enneagram_data.VII,
          ]
          var heart = [
            this.enneagram_data.II,
            this.enneagram_data.III,
            this.enneagram_data.IV,
          ]
          var gut = [
            this.enneagram_data.VIII,
            this.enneagram_data.IX,
            this.enneagram_data.I,
          ]
          var maxenneagram = getmax(result_arr, 1)
          var maxbrain = getmax(brain, 5, true)
          var maxheart = getmax(heart, 2, true)
          var maxgut = getmax(gut, 8, true)

          if (
            maxenneagram[1] == 2 ||
            maxenneagram[1] == 3 ||
            maxenneagram[1] == 4
          ) {
            if (maxbrain[0] > maxgut[0]) {
              this.trifix =
                this.trifix + maxenneagram[1] + maxbrain[1] + maxgut[1]
            } else {
              this.trifix =
                this.trifix + maxenneagram[1] + maxgut[1] + maxbrain[1]
            }
          }

          if (
            maxenneagram[1] == 5 ||
            maxenneagram[1] == 6 ||
            maxenneagram[1] == 7
          ) {
            if (maxheart[0] > maxgut[0]) {
              this.trifix =
                this.trifix + maxenneagram[1] + maxheart[1] + maxgut[1]
            } else {
              this.trifix =
                this.trifix + maxenneagram[1] + maxgut[1] + maxheart[1]
            }
          }

          if (
            maxenneagram[1] == 8 ||
            maxenneagram[1] == 9 ||
            maxenneagram[1] == 1
          ) {
            if (maxbrain[0] > maxheart[0]) {
              this.trifix =
                this.trifix + maxenneagram[1] + maxbrain[1] + maxheart[1]
            } else {
              this.trifix =
                this.trifix + maxenneagram[1] + maxheart[1] + maxbrain[1]
            }
          }
          this.e_result_value = maxenneagram[1]
          this.e_maybe = getclose(result_arr, maxenneagram[1])
          this.enneagram_test_result =
            this.enneagram_data.Instincts + maxenneagram[1]
          var that = this
          get_e_result(this.enneagram_test_result, that)
          this.enneagram_result = true
        }
      }
      this.enneagram_num += 1
    },

    emayberesult: function (type, value) {
      this.e_maybe[value] = this.e_result_value
      this.e_result_value = type
      this.enneagram_test_result = this.enneagram_data.Instincts + type
      var that = this
      get_e_result(this.enneagram_test_result, that)
    },

    etest: function () {
      this.e_result_value = 4
      this.enneagram_data.Instincts = 'Sx'
      this.enneagram_test_result =
        this.enneagram_data.Instincts + this.e_result_value
      this.e_maybe = [5, 3, 1, 7]
      var that = this
      get_e_result(this.enneagram_test_result, that)
      this.nostart = false
      this.enneagram_result = true
    },
    refresh: function () {
      location.reload()
    },
    test: function () {
      // this.no_result = true
      this.nostart = false
      this.result = 'Fe-N'
      this.result_text += getresulttext('Fi', 'N')
      this.C1 = getcharacter(this.result)[0]
      this.C2 = getcharacter(this.result)[1]
      this.C3 = getcharacter(this.result)[2]
      this.img1 = "<img src='./img/" + this.result + this.img1
      this.img2 = "<img src='./img/" + this.result + this.img2
      this.img3 = "<img src='./img/" + this.result + this.img3
      this.result_page = true
      this.user_data.ti = 110
      this.user_data.te = 30
      this.user_data.fi = 20
      this.user_data.fe = 5
      this.user_data.ni = 56
      this.user_data.ne = 70
      this.user_data.si = 20
      this.user_data.se = 1
      this.user_data.T = 5
      this.user_data.F = 1
      this.user_data.N = 1
      this.user_data.S = 3
      this.user_data.I = 60
      this.user_data.E = 10
    },

    answer: function (value) {
      var current_question = this.question_data
      var current_key = this.question_key
      var list = this.Question_list
      this.sound.play()
      // calculate result
      this.user_data.ti += value * current_question.ti
      this.user_data.te += value * current_question.te
      this.user_data.fi += value * current_question.fi
      this.user_data.fe += value * current_question.fe
      this.user_data.ni += value * current_question.ni
      this.user_data.ne += value * current_question.ne
      this.user_data.si += value * current_question.si
      this.user_data.se += value * current_question.se
      this.user_data.T += value * current_question.T
      this.user_data.F += value * current_question.F
      this.user_data.N += value * current_question.N
      this.user_data.S += value * current_question.S
      this.user_data.I += value * current_question.I
      this.user_data.E += value * current_question.E
      console.log(this.user_data)
      if (this.current_len > 1) {
        // delete the question that was answered
        delete list[current_key]
        // pick a new random question
        this.question_slect = pickRandomProperty(this.Question_list)
        this.question_key = this.question_slect
        this.question_data = this.Question_list[this.question_slect]
        this.question_text = this.question_data.question
        // update numbers of current questions
        this.current_len = getlistlen(this.Question_list)
      } else {
        // calculate index
        let ti = this.user_data.ti - this.user_data.fe
        let te = this.user_data.te - this.user_data.fi
        let fi = this.user_data.fi - this.user_data.te
        let fe = this.user_data.fe - this.user_data.ti
        let ni = this.user_data.ni - this.user_data.se
        let ne = this.user_data.ne - this.user_data.si
        let si = this.user_data.si - this.user_data.ne
        let se = this.user_data.se - this.user_data.ni
        let T = this.user_data.T
        let F = this.user_data.F
        let N = this.user_data.N
        let S = this.user_data.S
        let I = this.user_data.I
        let E = this.user_data.E
        // let ilist = [ti,si,ni,fi]
        // let elist = [te,se,ne,fe]
        // ilist.sort(function(a,b){return b-a});
        // elist.sort(function(a,b){return b-a});
        // var maxi = ilist[0]
        // var maxe = elist[0]

        //GET the significant result
        var trovet = calculatemax(E, I, 'e', 'i')
        var P = calculatemax(N, S, 'N', 'S')
        var J = calculatemax(T, S, 'T', 'F')
        var Ji = calculatemax(ti, fi, 'Ti', 'Fi')
        var Je = calculatemax(te, fe, 'Te', 'Fe')
        var Pi = calculatemax(ni, si, 'Ni', 'Si')
        var Pe = calculatemax(ne, se, 'Ne', 'Se')
        var maxi, maxe
        var random_aux1 = ''
        var random_aux2 = ''
        var result_check = []
        if (Ji && Pi) {
          maxi = calculatemax(Ji[0], Pi[0], Ji[1], Pi[1])
        } else if (Ji) {
          maxi = Ji
        } else if (Pi) {
          maxi = Pi
        }
        if (Je && Pe) {
          maxe = calculatemax(Je[0], Pe[0], Je[1], Pe[1])
        } else if (Je) {
          maxe = Je
        } else if (Pe) {
          maxe = Pe
        }
        console.log(trovet, P, J, Ji, Je, Pi, Pe)
        if (trovet) {
          if (trovet[1] == 'e') {
            if (maxe) {
              this.result += maxe[1]
              result_check.splice(0, 1, maxe[1])
              if (maxe[1] == Je[1] && P) {
                this.result = this.result + '-' + P[1]
                result_check.splice(1, 1, P[1])
              } else if (maxe[1] == Je[1]) {
                random_aux1 = '-N'
                random_aux2 = '-S'
              }
              if (maxe[1] == Pe[1] && J) {
                this.result = this.result + '-' + J[1]
                result_check.splice(1, 1, J[1])
              } else if (maxe[1] == Pe[1]) {
                random_aux1 = '-F'
                random_aux2 = '-T'
              }
            } else {
              this.no_result = true
            }
          } else if (trovet[1] == 'i') {
            if (maxi) {
              this.result += maxi[1]
              result_check.splice(0, 1, maxi[1])
              if (maxi[1] == Ji[1] && P) {
                this.result = this.result + '-' + P[1]
                result_check.splice(1, 1, P[1])
              } else if (maxe[1] == Ji[1]) {
                random_aux1 = '-N'
                random_aux2 = '-S'
              }
              if (maxi[1] == Pi[1] && J) {
                this.result = this.result + '-' + J[1]
                result_check.splice(1, 1, J[1])
              } else if (maxe[1] == Pi[1]) {
                random_aux1 = '-F'
                random_aux2 = '-T'
              }
            } else {
              this.no_result = true
            }
          } else {
            this.no_result = true
          }
        }
        // if i = e then get a e result first
        else {
          if (maxe) {
            this.result += maxe[1]
            result_check.splice(0, 1, maxe[1])
            if (maxe[1] == Je[1] && P) {
              this.result = this.result + '-' + P[1]
              result_check.splice(1, 1, P[1])
            } else if (maxe[1] == Je[1]) {
              random_aux1 = '-N'
              random_aux2 = '-S'
            }
            if (maxe[1] == Pe[1] && J) {
              this.result = this.result + '-' + J[1]
              result_check.splice(1, 1, J[1])
            } else if (maxe[1] == Pe[1]) {
              random_aux1 = '-F'
              random_aux2 = '-T'
            }
          } else if (maxi) {
            this.result += maxi[1]
            result_check.splice(0, 1, maxi[1])
            if (maxi[1] == Ji[1] && P) {
              this.result = this.result + '-' + P[1]
              result_check.splice(1, 1, P[1])
            } else if (maxe[1] == Ji[1]) {
              random_aux1 = '-N'
              random_aux2 = '-S'
            }
            if (maxi[1] == Pi[1] && J) {
              this.result = this.result + '-' + J[1]
              result_check.splice(1, 1, J[1])
            } else if (maxe[1] == Pi[1]) {
              random_aux1 = '-F'
              random_aux2 = '-T'
            }
          } else {
            this.no_result = true
          }
        }
        var result1 = this.result + random_aux1
        var result2 = this.result + random_aux2
        var result3 = this.result + random_aux1
        console.log(result1, result2, result3)
        this.img1 = "<img src='./img/" + result1 + this.img1
        this.img2 = "<img src='./img/" + result2 + this.img2
        this.img3 = "<img src='./img/" + result3 + this.img3
        this.C1 = getcharacter(result1)[0]
        this.C2 = getcharacter(result2)[1]
        this.C3 = getcharacter(result3)[2]
        this.result_text += getresulttext(result_check[0], result_check[1])
        this.result_page = true
      }
    },
    // expandbutton: function () {
    //     this.select = "select_button"
    //     console.log(this.select);
    // },
    // rebutton: function () {
    //     this.select = "no_select_button"
    //     console.log(this.select);
    // },

    transbutton: function () {
      this.bclass = 'start_button_mouseover'
    },
    outbutton: function () {
      this.bclass = 'start_button'
    },
  },
})

app.use(i18n);
app.mount("#app");
