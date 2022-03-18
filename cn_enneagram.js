function TestInstinctsq(num) {
    if (num == 0) {
        return '请选择以下你最为渴求的事物'
    }
    if (num == 1) {
        return '请选择以下你最为恐惧的事物'
    }
    if (num == 2) {
        return '请选择以下最符合你的情况'
    }
    
}

function TestInstinctsa(num) {
    var result = false
    if (num == 0) {
        result = [
            {text:"很多朋友，良好的声誉，广受尊敬的社会地位",type:"So",value:5,color:"Instincts_answer",color:"Instincts_answer"},
            {text:"与某个人隐秘且亲密的关系，深入/剧烈的经历与体验，不顾艰难险阻的去实现我的理想伟业",type:"Sx",value:5,color:"Instincts_answer",color:"Instincts_answer"},
            {text:"能让我不用工作躺平不愁花光的永久稳定的金钱来源，优质且自由自在的生活",type:"Sp",value:5,color:"Instincts_answer",color:"Instincts_answer"},
        ]
    }
    if (num == 1) {
        result = [
            {text:"一生平淡无奇，没有让我感受到热烈和深入，让我焕发生命的人和事。",type:"Sx",value:6,color:"Instincts_answer"},
            {text:"失去赖以为生的收入来源，遭遇严重的生存危机",type:"Sp",value:6,color:"Instincts_answer"},
            {text:"很多人都无法认同接受我，总是无法实现我渴望的社会成就",type:"So",value:6,color:"Instincts_answer"},
        ]
    }
    if (num == 2) {
        result = [
            {text:"优先考虑维护和实现自身利益，保护自身",type:"Sp",value:7,color:"Instincts_answer"},
            {text:"优先考虑与他人的人际关系，社会评价",type:"So",value:7,color:"Instincts_answer"},
            {text:"优先为能让我焕发激情和生命的人和事所考虑",type:"Sx",value:7,color:"Instincts_answer"},
        ]
    }
    return result
}

function TestEnneagramq(Instincts,num) {
    if (num < 4 || num > 12) {
        return '请选择以下最符合你的情况'
    }
    if (num == 4) {
        if (Instincts == 'So') {
            return '我认为我已经将自身调整至最完美的，不需要为了适应其他人而改变自身，我对他人的不完美感到愤怒，纠正自身的缺陷'
        }
        if (Instincts == 'Sx') {
            return '我对各种丑恶的现象充满愤怒，这种愤怒成为一种精神力量驱使我摧毁他们'
        }
        if (Instincts == 'Sp') {
            return '我感到自身有很多不完美之处，对此我甚至会感到愤怒，不过这种愤怒也会驱使我去纠正自己的缺陷达到完美'
        }
    }
    if (num == 5) {
        if (Instincts == 'So') {
            return '我认为我是社交圈子中的核心人物，我喜欢以大人物的形象呈现在大家面前'
        }
        if (Instincts == 'Sx') {
            return '我内心里渴望获得别人，并且会在别人抛弃我之前抛弃对方以避免自己受到伤害'
        }
        if (Instincts == 'Sp') {
            return '我是最重要的！我不想当成年人！'
        }
    }
    if (num == 6) {
        if (Instincts == 'So') {
            return '我渴望获得社会认可，热爱权力，为了取得成就我可以不择手段的不断变换自己的假面'
        }
        if (Instincts == 'Sx') {
            return '我总是为吸引和讨好某些生活中的亲密朋友或亲人而活着'
        }
        if (Instincts == 'Sp') {
            return '我注重提升做事的效率，只对最实际最有用的东西感兴趣'
        }
    }
    if (num == 7) {
        if (Instincts == 'So') {
            return '我总是自责，带着自我厌恶的倾向与别人比较，为自己不如别人而痛苦'
        }
        if (Instincts == 'Sx') {
            return '我内心里总是有种情感，渴望着摧毁杀灭掉某些人，我条件反射的排斥当下，看不起像过着家畜一般日常生活的人，容易沉浸在脱离现实的幻想中'
        }
        if (Instincts == 'Sp') {
            return '我能享受着沉浸在痛苦之中，欣赏那些悲剧性的角色，我渴望实现我那遥不可及的悲愿，不过一旦实现有可能去追逐新的理想，因为实质上是为了弥补我那无法弥补的内心缺失'
        }
    }
    if (num == 8) {
        if (Instincts == 'So') {
            return '我寻求超凡价值，追寻理想图腾吗，并因此间接的蔑视了凡人和普通生活'
        }
        if (Instincts == 'Sx') {
            return '我生活在理性和客观性为王的内心世界中，我认为无条件的爱是一种美好愿景，但基本不可能在现实中寻觅到这种爱，所以倾向于把自己与他人隔离起来'
        }
        if (Instincts == 'Sp') {
            return '我倾向压低自己的欲望以获得更多个人独处的时间，因为欲望意味着需要去依赖他人，我喜欢彻底摆脱外界干扰，退缩到自己头脑中的内心世界中最为舒适'
        }
    }
    if (num == 9) {
        if (Instincts == 'So') {
            return '我内心有一条明确的界限来区分哪些人是好的，哪些人是坏的'
        }
        if (Instincts == 'Sx') {
            return '我希望获得力量，强健体魄，喜欢表现强势的态度'
        }
        if (Instincts == 'Sp') {
            return '我渴望得到他人的严密保护，渴望一个小小的，温暖舒适的世界'
        }
    }
    if (num == 10) {
        if (Instincts == 'So') {
            return '我希望自己能作为一个乐善好施，扶危济贫的好人，然后得到大家的喝彩'
        }
        if (Instincts == 'Sx') {
            return '我对世间之事毫无兴趣，渴望着一个更高级更先进的世界，追寻着心中的梦想'
        }
        if (Instincts == 'Sp') {
            return '我是一个机会主义者，总是寻找便利，赚取某些好处，谋求某些利益'
        }
    }
    if (num == 11) {
        if (Instincts == 'So') {
            return '我对【向不公发出怒吼】有强烈的共鸣，在我的世界里，根本没有权威或者尊敬这回事，只有蔑视，对社会、规范、文化和强权阶层的蔑视！'
        }
        if (Instincts == 'Sx') {
            return '我喜欢追求紧张刺激，主动寻求冒险，挑战和危险，内心深处总想体会那种肾上腺素飙到峰值的感觉'
        }
        if (Instincts == 'Sp') {
            return '我感觉人们善良和良好的意图根本不存在，我可以慷慨的为他人提供保护，以让他们对我形成依赖，进而控制他们，为了不被他们所伤害'
        }
    }
    if (num == 12) {
        if (Instincts == 'So') {
            return '遗忘自我，忽视内心世界，随波逐流，把自己安顿在舒适的尘世中，为了满足集体的需要，投入大量的精力'
        }
        if (Instincts == 'Sx') {
            return '我感觉自己很没有激情，在人群中很没有存在感，但我渴望着和他人融合(Union)'
        }
        if (Instincts == 'Sp') {
            return '我吃，故我在；我睡，故我在；我拥有，故我在；对我而言没有形而上的层次，只想现实安逸的度日'
        }
    }
}

function TestEnneagrama(Instincts,num) {
    var result = false
    if (Instincts == 'So') {
        if (num == 0) {
            result = [
                {text:"我更重视自身价值认同和社会认可，我认为我自己是很完美的，没必要改造自己的习惯做法适应他人，得到他人的尊重是理所当然的。",type:"1",value:8,color:"Instincts_answer"},
                {text:"我更重视自身价值认同和社会认可，我试图做到比其他人更为热情，希望以此别人也能回报我，以增进我的影响力和社会地位。",type:"2",value:8,color:"Instincts_answer"},
                {text:"我更重视自身价值认同和社会认可，我甚至可能用夸大的说辞来提高大家对我的评价，并尽可能隐瞒自己的缺点和失败的经历。",type:"3",value:8,color:"Instincts_answer"},
                {text:"我习惯于把精力投入到内心世界中，我感到自己不如他人，所以有远离他人的倾向，并且容易一个人沉浸到痛苦和悲伤之中无法自拔。",type:"4",value:8,color:"Instincts_answer"},
                {text:"我习惯于把精力投入到内心世界中，我喜欢去追逐如镜花水月般的理想，根本上我不喜欢与人交往，但需要人际关系来为理想的实现所服务。",type:"5",value:8,color:"Instincts_answer"},
                {text:"我习惯于把精力投入到内心世界中，但又不信任自己的内心想法，习惯于遵循黑白分明的法律，道德或个人固有理念来判断事物。",type:"6",value:8,color:"Instincts_answer"},
                {text:"我以实现自己的欲望优先，但这种欲望往往是为了博取良好的社会名誉去帮助他人，并且我时常感受到自己考虑的过少。",type:"7",value:8,color:"Instincts_answer"},
                {text:"我以实现自己的欲望优先，但这种欲望往往是和我的朋友结成同盟，保护弱小的朋友，一起去挑战强大的敌人或者完成艰难的项目共赴胜利。",type:"8",value:8,color:"Instincts_answer"},
                {text:"我以实现自己的欲望优先，但这种欲望往往是对我所在的社区，家庭或朋友圈去做出贡献，往往没意识到自身真正的需求去忘我的工作。",type:"9",value:8,color:"Instincts_answer"},
                {text:"我觉得以上描述都不符合。",type:"6",value:5,color:"Instincts_answer"},
                {text:"我觉得以上描述都有部分符合，很难选择。",type:"9",value:5,color:"Instincts_answer"},
            ]
        }
    }  
    if (Instincts == 'Sx') {
        if (num == 0) {
            result = [
                {text:"我更重视自身价值认同和他人认可，但也重视实现自己的目的，我会以狂热的信仰和高尚的口号去驱动自己达成目标，就如同宗教热情驱动下殖民美洲的西班牙人那样。",type:"1",value:8,color:"Instincts_answer"},
                {text:"我更重视自身价值认同和他人认可，我希望能用我深厚的情感彻底去征服我所爱的人。",type:"2",value:8,color:"Instincts_answer"},
                {text:"我更重视自身价值认同和他人认可，我希望自己充满性吸引力来引诱别人认可接受我，并借此从他们那里得到好处。",type:"3",value:8,color:"Instincts_answer"},
                {text:"我习惯于把精力投入到内心世界中，因为那些活在虚假的和平中的人是多么的低劣，世人愚昧不堪无法相处，我蔑视常人的生活，他们永远无法理解我的痛苦，杀杀杀杀杀杀杀！",type:"4",value:8,color:"Instincts_answer"},
                {text:"我习惯于把精力投入到内心世界中，世界上大多数人都是难以相处的，与其与人类交流不如自己去探索知识或宅在家玩，但我希望我能找到我所能与之交流的人。",type:"5",value:8,color:"Instincts_answer"},
                {text:"我习惯于把精力投入到内心世界中，我必须克服内心的恐惧变得更强大，为了让内心的勇气战胜恐惧我甚至愿意去从事危险的事业去锻炼自身。",type:"6",value:8,color:"Instincts_answer"},
                {text:"我以实现自己的欲望优先，这种欲望往往是追求一些梦幻般的理想，想都不想的去踏入未知领域。",type:"7",value:8,color:"Instincts_answer"},
                {text:"我以实现自己的欲望优先，我非常叛逆，喜欢成为大家关注的焦点，如果有人令我不爽我就可能向其发起挑衅。",type:"8",value:8,color:"Instincts_answer"},
                {text:"我以实现自己的欲望优先，但这种欲望往往是对我所爱的那个人全心全力的付出，以致于在这一过程中忘却了自身的欲望。",type:"9",value:8,color:"Instincts_answer"},
                {text:"我觉得以上描述都不符合。",type:"6",value:5,color:"Instincts_answer"},
                {text:"我觉得以上描述都有部分符合，很难选择。",type:"9",value:5,color:"Instincts_answer"},
            ]
        }
    } 
    if (Instincts == 'Sp') {
        if (num == 0) {
            result = [
                {text:"我更重视自身价值认同和自我认可，我希望我能不断改善自身，达到完美的状态。",type:"1",value:8,color:"Instincts_answer"},
                {text:"我更重视自身价值认同和自我认可，我内心不想长大，希望像小孩子一样被大家怜爱。",type:"2",value:8,color:"Instincts_answer"},
                {text:"我更重视自身价值认同和自我认可，我希望在与他人的竞争中获胜，取得社会成就，提升社会地位。",type:"3",value:8,color:"Instincts_answer"},
                {text:"我习惯于把精力投入到内心世界中，苦苦追逐遥不可及的理想，无论付出多少代价我都要实现他，那里仿佛有我内心缺失的东西，我甚至认为也许人生来就是要承受痛苦，历经磨难才能修得正果的。",type:"4",value:8,color:"Instincts_answer"},
                {text:"我习惯于把精力投入到内心世界中，在内心世界中我能用我的想象力构建出现实世界难以体验的内心世界，如果不影响我的物质生活，我希望能建立起厚厚的堡垒隔绝与他人的交流。",type:"5",value:8,color:"Instincts_answer"},
                {text:"我习惯于把精力投入到内心世界中，很没安全感，这个世界上有很多人都是不怀好意的，光靠我自己无法保护好自己，我是弱势群体，渴望能得到外界以及社会公义的保护。",type:"6",value:8,color:"Instincts_answer"},
                {text:"我以实现自己的欲望优先，为此我可以不择手段，让自己学会越来越狡猾的生活，因为只有这样才能保护我以及我的家庭。",type:"7",value:8,color:"Instincts_answer"},
                {text:"我以实现自己的欲望优先，我虽然有很强的反抗他人的欲望，但我学会了收敛这种欲望，为了不被他人控制，我总想着如何先下手为强把周围的人尽可能控制。",type:"8",value:8,color:"Instincts_answer"},
                {text:"我以实现自己的欲望优先，我希望我能躺平过着吃喝玩乐的安逸生活。",type:"9",value:8,color:"Instincts_answer"},
                {text:"我觉得以上描述都有部分符合，很难选择。",type:"9",value:5,color:"Instincts_answer"},
            ]
        }
    } 
    if (num == 1) {
        if (Instincts == 'So') {
            result = [
                {text:"我希望赢的观众瞩目，成为大家所爱戴的卓越出众的人。",type:"2",value:5,color:"Ired_answer"},
                {text:"我很在乎他人对我的看法，渴望得到社会认可，希望所有人为我喝彩。",type:"3",value:5,color:"Ired_answer"},
                {text:"我希望他人能听我诉苦，也认为自己不如他人，与他人相处时总是喜欢把自己放在受害者的位置上。",type:"4",value:5,color:"Ired_answer"},
                {text:"我觉得以上描述都有部分符合，很难选择。",type:"3",value:3,color:"Ired_answer"},
            ]
        }  
        if (Instincts == 'Sx') {
            result = [
                {text:"我希望得到他人的爱，所以会想办法诱惑他人。",type:"2",value:5,color:"Ired_answer"},
                {text:"我很在乎他人对我的看法，所以会尽可能掩饰自己的攻击性，但如果遭到他人拒绝，可能就无法容忍而爆发",type:"3",value:5,color:"Ired_answer"},
                {text:"我看不起日常的日子人，轻视日常生活，我很有对这类普通人表达内心的怒气的冲动，并且内心深处认为自己很特殊高于常人。",type:"4",value:5,color:"Ired_answer"},
                {text:"我觉得以上描述都有部分符合，很难选择。",type:"3",value:3,color:"Ired_answer"},
            ]
        } 
        if (Instincts == 'Sp') {
            result = [
                {text:"我内心认为自己是最重要的，渴望得到大家的关爱。",type:"2",value:5,color:"Ired_answer"},
                {text:"我很在乎他人对我的看法，所以尽可能把自己做到最好。",type:"3",value:5,color:"Ired_answer"},
                {text:"我不怎么在乎他人的评价，也认为自己不如他人，我更愿意尽可能一个人独自承受痛苦，羞于启齿寻求他人的关爱。",type:"4",value:5,color:"Ired_answer"},
                {text:"我觉得以上描述都有部分符合，很难选择。",type:"3",value:3,color:"Ired_answer"},
            ]
        } 
    }
    if (num == 2) {
        if (Instincts == 'So') {
            result = [
                {text:"我担忧和一般人沟通会浪费我的时间，所以渴望只去结交最杰出最有声望的人来帮助我实现我思维世界中的终极理想。",type:"5",value:5,color:"Instincts_answer"},
                {text:"我恐惧模糊的原则造成的隐患，所以我喜欢黑白分明的思考，严格要求自己，绝不容许模棱两可的做法。",type:"6",value:5,color:"Instincts_answer"},
                {text:"我害怕自己的感官快乐和实现自己利益给我带来负面影响，所以希望像苦行僧一样尽可能的去帮助他人，虽然这实际上也有一部分让他人欠我人情的动机。",type:"7",value:5,color:"Instincts_answer"},
                {text:"我觉得以上描述都有部分符合，很难选择。",type:"6",value:3,color:"Instincts_answer"},
            ]
        }  
        if (Instincts == 'Sx') {
            result = [
                {text:"我对他人不抱期待，倾向把自己和他人隔离开来，回到自己的内心思维中。",type:"5",value:5,color:"Instincts_answer"},
                {text:"我时常思考如何能获得力量，变得更为强大。",type:"6",value:5,color:"Instincts_answer"},
                {text:"我总是理想化的看待世界，习惯性的忽略了去思考一些问题，把生活想象的更为美好。",type:"7",value:5,color:"Instincts_answer"},
                {text:"我觉得以上描述都不完全符合，很难选择。",type:"6",value:3,color:"Instincts_answer"},
            ]
        } 
        if (Instincts == 'Sp') {
            result = [
                {text:"我恐惧与他人沟通，害怕自己做出行动时能力和知识不足，所以尽可能在现实中避免与他人的交流沉浸在自己的思维世界之中。",type:"5",value:5,color:"Instincts_answer"},
                {text:"我很没有安全感，害怕自己被别人落下而得不到集体的保护，所以更会去接近他人，渴望得到家庭的温暖，希望在一个没有敌人的家庭环境中。",type:"6",value:5,color:"Instincts_answer"},
                {text:"我担忧无法保护我或我的家人朋友的安全和利益，所以会尽可能去抓住机会，与人达成协议，即使这可能是具有很大风险的交易。",type:"7",value:5,color:"Instincts_answer"},
                {text:"我觉得以上描述都不完全符合，很难选择。",type:"6",value:3,color:"Instincts_answer"},
            ]
        } 
    }
    if (num == 3) {
        if (Instincts == 'So') {
            result = [
                {text:"我有很强烈的自身欲求，对世俗标准持反对态度，喜欢简单粗暴的做事。",type:"8",value:5,color:"Igreen_answer"},
                {text:"我非常善于满足他人的要求，为集体奉献，乃至于成为了忽视自己欲求的工作狂。",type:"9",value:5,color:"Igreen_answer"},
                {text:"我会压抑自己的欲求，表现出一种完美的无可挑剔的态度。",type:"1",value:5,color:"Igreen_answer"},
                {text:"我觉得以上描述都有部分符合，很难选择。",type:"9",value:3,color:"Igreen_answer"},
            ]
        }  
        if (Instincts == 'Sx') {
            result = [
                {text:"我有很强烈的自身欲求，因此表现的个性浮夸，十分叛逆。",type:"8",value:5,color:"Igreen_answer"},
                {text:"我时常忽略自身的欲求，牺牲自己的生活来和我所爱的某个人或团体，甚至可能只是自己融为一体。",type:"9",value:5,color:"Igreen_answer"},
                {text:"我可能会狂热的信仰某些东西或教条规制自身的欲求，但也可能会以此为借口来满足自己的欲求。",type:"1",value:5,color:"Igreen_answer"},
                {text:"我觉得以上描述都不完全符合，很难选择。",type:"9",value:3,color:"Igreen_answer"},
            ]
        } 
        if (Instincts == 'Sp') {
            result = [
                {text:"我有很强烈的欲求，我渴望得到一切，接受不了得不到想要的东西的挫败感，但为了我自己的安全我会尽可能收敛这一点。",type:"8",value:5,color:"Igreen_answer"},
                {text:"我自己的想法不多，只想吃饱喝足，平静安逸的过日子。",type:"9",value:5,color:"Igreen_answer"},
                {text:"我倾向压制自己的欲求，让自己尽可能的接近完美。",type:"1",value:5,color:"Igreen_answer"},
                {text:"我觉得以上描述都不完全符合，很难选择。",type:"9",value:3,color:"Igreen_answer"},
            ]
        } 
    }
    if (num > 3 && num < 13) {
        result = yesorno(num - 3)
    }
    return result
}

function SelectEnneagrama(selected) {
    var result = []
    var tvalue = 8 - selected.length
    console.log(selected,tvalue)
    if (selected.indexOf(2)===-1) {
        result.push({text:"我是一个热情、有爱心、热情好客的人，会关心他人的人，渴望从他人那里得到爱",type:"2",value:tvalue,color:"Igreen_answer"})
    }
    if (selected.indexOf(3)===-1) {
        result.push({text:"我是一个有效率、有成效、有动力的人，需要设定并实现自己的目标，渴望竞争超越他人的人",type:"3",value:tvalue,color:"Igreen_answer"})
    }
    if (selected.indexOf(4)===-1) {
        result.push({text:"我是一个情绪化，敏感，想法奇异，沉浸于痛苦中的人，需要发现美，探索我的内心世界，渴望自己有与众不同的特点，并倾向远离他人",type:"4",value:tvalue,color:"Igreen_answer"})
    }
    if (selected.indexOf(5)===-1) {
        result.push({text:"我是一个容易沉浸于内心的想象世界，喜欢以奇特的角度思考提出奇异观点的人，需要时间远离他人独自处理事实和信息，提升自己的知识和技能应对焦虑",type:"5",value:tvalue,color:"Igreen_answer"})
    }
    if (selected.indexOf(6)===-1) {
        result.push({text:"我是一个友好的，敏感的，正义的，正确的人，信奉公理，理性和普遍认可的逻辑，依靠调整自己的想法接近于大家所认同的观点来应对焦虑",type:"6",value:tvalue,color:"Igreen_answer"})
    }
    if (selected.indexOf(7)===-1) {
        result.push({text:"我是一个即兴和乐观的人，需要新的想法，选择，可能性和令人兴奋的计划，喜欢现实物质享受，会习惯性的忽视了自己所焦虑的问题",type:"7",value:tvalue,color:"Igreen_answer"})
    }
    if (selected.indexOf(8)===-1) {
        result.push({text:"我是一个自信、果断、愤世嫉俗的人，我不能容忍强者以强权压迫我或者欺凌其他弱者，如果现秩序与我的理想和欲求产生冲突，我就会竭尽全力将其摧毁殆尽！",type:"8",value:tvalue,color:"Igreen_answer"})
    }
    if (selected.indexOf(9)===-1) {
        result.push({text:"我是一个善良，随和，老实的人，需要避免冲突，看到所有的观点，能为集体或朋友同事竭尽所能的做事，满足他们的要求",type:"9",value:tvalue,color:"Igreen_answer"})
    }
    if (selected.indexOf(1)===-1) {
        result.push({text:"我是一个有责任心、恰当、勤奋的人，做正确的事情服从于秩序安排的人，我严于律己，克制自己的欲望，希望其他人也是如此，这个世界才会更好",type:"1",value:tvalue,color:"Igreen_answer"})
    }
    if (result == []) {
        return false 
    }
    return result
}

function yesorno(num) {
    etype = "" + num
    result = [
        {text:"非常符合",type:etype ,value:10,color:"more_yes"},
        {text:"基本符合",type:etype,value:5,color:"yes"},
        {text:"部分符合",type:etype,value:1,color:"little_yes"},
        {text:"不确定。",type:etype,value:0,color:"netural"},
        {text:"较不符合",type:etype,value:-1,color:"little_no"},
        {text:"基本不符合",type:etype,value:-5,color:"no"},
        {text:"完全不符合",type:etype,value:-10,color:"more_no"},
    ]
    console.log(etype);
    return result
}

function getecharacter(type) {
    if (type == 'So1') {
        return [["吉尔加美什","王来允许，王来承认，王来背负整个世界!","<img src='./img/So/101.png' alt='01 pic'>"]]
    }
    if (type == 'Sx1') {
        return [["夜神月","我将成为神，制裁这个世界，代表正义。","<img src='./img/Te-N/02.png' alt='02 pic'>"],["谭雅","对方是康米，是侵害个人自由的极权主义者，我无法和康米仰望同一片天空，即使为了在安全的后方，过着一帆风顺的人生，也得拿起枪，绝不容许共产主义者猖狂跋扈!","<img src='./img/Te-S/03.png' alt='02 pic'>"]]
    }
    if (type == 'Sp1') {
        return [["夏娜"," ","<img src='./img/Ni-T/02.png' alt='02 pic'>"],["阿尔托莉雅"," ","<img src='./img/Si-T/02.png' alt='02 pic'>"]]
    }
    if (type == 'So2') {
        return [["夜神月","我将成为神，制裁这个世界，代表正义。","<img src='./img/Te-N/02.png' alt='02 pic'>"],["谭雅","对方是康米，是侵害个人自由的极权主义者，我无法和康米仰望同一片天空，即使为了在安全的后方，过着一帆风顺的人生，也得拿起枪，绝不容许共产主义者猖狂跋扈!","<img src='./img/Te-S/03.png' alt='02 pic'>"]]
    }
    if (type == 'Sx2') {
        return [["夜神月","我将成为神，制裁这个世界，代表正义。","<img src='./img/Te-N/02.png' alt='02 pic'>"],["谭雅","对方是康米，是侵害个人自由的极权主义者，我无法和康米仰望同一片天空，即使为了在安全的后方，过着一帆风顺的人生，也得拿起枪，绝不容许共产主义者猖狂跋扈!","<img src='./img/Te-S/03.png' alt='02 pic'>"]]
    }
    if (type == 'Sp2') {
        return [["夜神月","我将成为神，制裁这个世界，代表正义。","<img src='./img/Te-N/02.png' alt='02 pic'>"],["谭雅","对方是康米，是侵害个人自由的极权主义者，我无法和康米仰望同一片天空，即使为了在安全的后方，过着一帆风顺的人生，也得拿起枪，绝不容许共产主义者猖狂跋扈!","<img src='./img/Te-S/03.png' alt='02 pic'>"]]
    }
    if (type == 'So3') {
        return [["夜神月","我将成为神，制裁这个世界，代表正义。","<img src='./img/Te-N/02.png' alt='02 pic'>"],["谭雅","对方是康米，是侵害个人自由的极权主义者，我无法和康米仰望同一片天空，即使为了在安全的后方，过着一帆风顺的人生，也得拿起枪，绝不容许共产主义者猖狂跋扈!","<img src='./img/Te-S/03.png' alt='02 pic'>"]]
    }
    if (type == 'Sx3') {
        return [["夜神月","我将成为神，制裁这个世界，代表正义。","<img src='./img/Te-N/02.png' alt='02 pic'>"],["谭雅","对方是康米，是侵害个人自由的极权主义者，我无法和康米仰望同一片天空，即使为了在安全的后方，过着一帆风顺的人生，也得拿起枪，绝不容许共产主义者猖狂跋扈!","<img src='./img/Te-S/03.png' alt='02 pic'>"]]
    }
    if (type == 'Sp3') {
        return [["夜神月","我将成为神，制裁这个世界，代表正义。","<img src='./img/Te-N/02.png' alt='02 pic'>"],["谭雅","对方是康米，是侵害个人自由的极权主义者，我无法和康米仰望同一片天空，即使为了在安全的后方，过着一帆风顺的人生，也得拿起枪，绝不容许共产主义者猖狂跋扈!","<img src='./img/Te-S/03.png' alt='02 pic'>"]]
    }
}

function getetext(type) {
    if (type == 'Sx1') {
        return ["关键词:热忱","我们可能会认为 1 号性本能型的特点是欲望特别强烈，并进而导致他们急迫、易恐。如果想了解为什么性领域的愤怒会引发热仇，那么可以说是因为欲望从锁怒中得到了侵略性、 攻击性，从而使自身得到加强。换句话说，馈怒赋予欲望一种特殊的力量或者说紧张感，使得人不仅感到自己被拉向满足欲望的方向，而且觉得理直气壮。结果便是造成有些人会具有强烈的精神意志力和征服欲。我用下面这个集体行为的例子来加以解释：当南非翡翠和钻石矿石的开采被欧洲人垄断时，许多人提出反对，认为这些财富属于非洲人。但是一些人反问道（他们对此深信不疑）：“放到他们手里有什么好处？他们又没有文化！”在他们看来，既然欧洲人是文明人，而非洲人则被认为是原始的野蛮人，钻石自然应该属于欧洲人。"]
    }
}