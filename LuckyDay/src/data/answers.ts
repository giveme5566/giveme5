// 答案之书 - 273条语料库
// 风格类型：温暖鼓励、俏皮轻松、哲学深思、谨慎提醒

export interface Answer {
  id: number
  text: string
  type: 'warm' | 'playful' | 'philosophical' | 'cautionary'
}

export const answers: Answer[] = [
  // 温暖鼓励型 (70条)
  { id: 1, text: "你已经在正确的道路上了，继续前进吧", type: 'warm' },
  { id: 2, text: "相信自己，你比想象中更有力量", type: 'warm' },
  { id: 3, text: "一切都会好起来的，只是时间问题", type: 'warm' },
  { id: 4, text: "你的努力终将被看见", type: 'warm' },
  { id: 5, text: "勇敢去做，你值得最好的", type: 'warm' },
  { id: 6, text: "别担心，有人在默默支持你", type: 'warm' },
  { id: 7, text: "今天的付出是明天的礼物", type: 'warm' },
  { id: 8, text: "你比你以为的更接近成功", type: 'warm' },
  { id: 9, text: "保持微笑，好运正在路上", type: 'warm' },
  { id: 10, text: "你的善良终将回报给你", type: 'warm' },
  { id: 11, text: "不要害怕改变，那是成长的开始", type: 'warm' },
  { id: 12, text: "你已经做得很好了，为自己骄傲", type: 'warm' },
  { id: 13, text: "相信直觉，它很少出错", type: 'warm' },
  { id: 14, text: "慢慢来，比较快", type: 'warm' },
  { id: 15, text: "你的坚持终将开花结果", type: 'warm' },
  { id: 16, text: "每一次尝试都是进步", type: 'warm' },
  { id: 17, text: "你拥有克服困难的勇气", type: 'warm' },
  { id: 18, text: "阳光总在风雨后", type: 'warm' },
  { id: 19, text: "你的未来充满无限可能", type: 'warm' },
  { id: 20, text: "做你自己，那已经足够好", type: 'warm' },
  { id: 21, text: "给自己一个拥抱，你辛苦了", type: 'warm' },
  { id: 22, text: "你的努力不会白费", type: 'warm' },
  { id: 23, text: "相信美好的事情即将发生", type: 'warm' },
  { id: 24, text: "你比你想象的更坚强", type: 'warm' },
  { id: 25, text: "每一个结束都是新的开始", type: 'warm' },
  { id: 26, text: "你的光芒终将被看见", type: 'warm' },
  { id: 27, text: "保持希望，奇迹会发生", type: 'warm' },
  { id: 28, text: "你已经走了这么远，别放弃", type: 'warm' },
  { id: 29, text: "你的梦想值得被追逐", type: 'warm' },
  { id: 30, text: "爱会找到你，在你最不经意的时候", type: 'warm' },
  { id: 31, text: "你的付出终将得到回报", type: 'warm' },
  { id: 32, text: "相信自己，你可以做到", type: 'warm' },
  { id: 33, text: "好运气正在向你靠近", type: 'warm' },
  { id: 34, text: "你的选择是正确的", type: 'warm' },
  { id: 35, text: "保持耐心，答案即将揭晓", type: 'warm' },
  { id: 36, text: "你被深深地爱着", type: 'warm' },
  { id: 37, text: "你的才华终将被认可", type: 'warm' },
  { id: 38, text: "一切都会水到渠成的", type: 'warm' },
  { id: 39, text: "你值得被温柔以待", type: 'warm' },
  { id: 40, text: "相信自己的判断", type: 'warm' },
  { id: 41, text: "你的明天会更好", type: 'warm' },
  { id: 42, text: "保持初心，方得始终", type: 'warm' },
  { id: 43, text: "你的努力正在悄悄改变一切", type: 'warm' },
  { id: 44, text: "幸福就在不远处等你", type: 'warm' },
  { id: 45, text: "你比你以为的更有价值", type: 'warm' },
  { id: 46, text: "相信时间的力量", type: 'warm' },
  { id: 47, text: "你的故事才刚刚开始", type: 'warm' },
  { id: 48, text: "保持热爱，奔赴山海", type: 'warm' },
  { id: 49, text: "你的光芒无法被掩盖", type: 'warm' },
  { id: 50, text: "美好的事情正在发生", type: 'warm' },
  { id: 51, text: "你值得所有的美好", type: 'warm' },
  { id: 52, text: "相信自己，你是最棒的", type: 'warm' },
  { id: 53, text: "你的坚持终将胜利", type: 'warm' },
  { id: 54, text: "好运即将降临", type: 'warm' },
  { id: 55, text: "你的未来一片光明", type: 'warm' },
  { id: 56, text: "做你想做的事，成为你想成为的人", type: 'warm' },
  { id: 57, text: "你的努力终将被温柔以待", type: 'warm' },
  { id: 58, text: "相信自己，奇迹会发生", type: 'warm' },
  { id: 59, text: "你拥有无限的可能", type: 'warm' },
  { id: 60, text: "保持乐观，一切都会好起来", type: 'warm' },
  { id: 61, text: "你的付出终将开花结果", type: 'warm' },
  { id: 62, text: "你比你想象的更优秀", type: 'warm' },
  { id: 63, text: "相信美好的力量", type: 'warm' },
  { id: 64, text: "你的梦想正在实现的路上", type: 'warm' },
  { id: 65, text: "你是独一无二的", type: 'warm' },
  { id: 66, text: "保持信心，胜利在望", type: 'warm' },
  { id: 67, text: "你的善良终将温暖世界", type: 'warm' },
  { id: 68, text: "相信一切都会是最好的安排", type: 'warm' },
  { id: 69, text: "你的努力正在悄悄发光", type: 'warm' },
  { id: 70, text: "幸福正在向你走来", type: 'warm' },

  // 俏皮轻松型 (70条)
  { id: 71, text: "去吃顿好的，答案就在美食里", type: 'playful' },
  { id: 72, text: "睡一觉醒来，世界就不一样了", type: 'playful' },
  { id: 73, text: "问问你家猫，它可能知道", type: 'playful' },
  { id: 74, text: "去买张彩票，万一中了呢", type: 'playful' },
  { id: 75, text: "去散步吧，答案就在风里", type: 'playful' },
  { id: 76, text: "喝杯奶茶，甜一甜就好了", type: 'playful' },
  { id: 77, text: "去逛街，购物使人快乐", type: 'playful' },
  { id: 78, text: "看一集剧，逃避虽然可耻但有用", type: 'playful' },
  { id: 79, text: "去唱K，吼出来就舒服了", type: 'playful' },
  { id: 80, text: "换个发型，换个心情", type: 'playful' },
  { id: 81, text: "去撸猫撸狗，毛孩子治愈一切", type: 'playful' },
  { id: 82, text: "买束花送给自己", type: 'playful' },
  { id: 83, text: "去吃火锅，没有什么是一顿火锅解决不了的", type: 'playful' },
  { id: 84, text: "去海边走走，大海会告诉你答案", type: 'playful' },
  { id: 85, text: "刷会儿短视频，笑一笑就好", type: 'playful' },
  { id: 86, text: "去运动，出一身汗就通透了", type: 'playful' },
  { id: 87, text: "约上闺蜜，吐槽一下就好了", type: 'playful' },
  { id: 88, text: "去吃甜品，糖分使人快乐", type: 'playful' },
  { id: 89, text: "去公园发呆，看大爷下棋", type: 'playful' },
  { id: 90, text: "整理房间，断舍离使人清爽", type: 'playful' },
  { id: 91, text: "去听一场live，音乐治愈一切", type: 'playful' },
  { id: 92, text: "去书店逛逛，闻闻书香", type: 'playful' },
  { id: 93, text: "去做个SPA，放松一下", type: 'playful' },
  { id: 94, text: "去动物园，看看可爱的动物", type: 'playful' },
  { id: 95, text: "去咖啡馆坐一下午", type: 'playful' },
  { id: 96, text: "去爬山，站得高看得远", type: 'playful' },
  { id: 97, text: "去看场电影，吃爆米花", type: 'playful' },
  { id: 98, text: "去逛夜市，感受人间烟火", type: 'playful' },
  { id: 99, text: "去博物馆，和历史对话", type: 'playful' },
  { id: 100, text: "去植物园，拥抱大自然", type: 'playful' },
  { id: 101, text: "去钓鱼，静静心", type: 'playful' },
  { id: 102, text: "去画画，不管画得好不好", type: 'playful' },
  { id: 103, text: "去烘焙，做点小饼干", type: 'playful' },
  { id: 104, text: "去拼图，专注使人平静", type: 'playful' },
  { id: 105, text: "去乐高，回归童心", type: 'playful' },
  { id: 106, text: "去跳舞，不管会不会", type: 'playful' },
  { id: 107, text: "去游泳，像鱼一样自由", type: 'playful' },
  { id: 108, text: "去骑车，感受风的速度", type: 'playful' },
  { id: 109, text: "去野餐，带上三明治", type: 'playful' },
  { id: 110, text: "去露营，看星星", type: 'playful' },
  { id: 111, text: "去逛超市，买喜欢的零食", type: 'playful' },
  { id: 112, text: "去做美甲，美美哒", type: 'playful' },
  { id: 113, text: "去按摩，放松一下肌肉", type: 'playful' },
  { id: 114, text: "去逛花市，买盆绿植", type: 'playful' },
  { id: 115, text: "去图书馆，借几本闲书", type: 'playful' },
  { id: 116, text: "去逛宜家，畅想未来的家", type: 'playful' },
  { id: 117, text: "去做瑜伽，舒展身体", type: 'playful' },
  { id: 118, text: "去溜冰，摔几跤也没关系", type: 'playful' },
  { id: 119, text: "去打保龄球，全中一次", type: 'playful' },
  { id: 120, text: "去射箭，释放压力", type: 'playful' },
  { id: 121, text: "去玩密室逃脱，刺激一下", type: 'playful' },
  { id: 122, text: "去剧本杀，演个角色", type: 'playful' },
  { id: 123, text: "去桌游吧，玩大富翁", type: 'playful' },
  { id: 124, text: "去电玩城，抓个娃娃", type: 'playful' },
  { id: 125, text: "去KTV，唱首嗨歌", type: 'playful' },
  { id: 126, text: "去脱口秀，笑到肚子疼", type: 'playful' },
  { id: 127, text: "去音乐会，感受现场", type: 'playful' },
  { id: 128, text: "去美术馆，提升审美", type: 'playful' },
  { id: 129, text: "去科技馆，玩互动装置", type: 'playful' },
  { id: 130, text: "去水族馆，看鱼游泳", type: 'playful' },
  { id: 131, text: "去游乐园，坐过山车", type: 'playful' },
  { id: 132, text: "去鬼屋，尖叫释放", type: 'playful' },
  { id: 133, text: "去蜡像馆，拍搞怪照片", type: 'playful' },
  { id: 134, text: "去采摘园，摘点水果", type: 'playful' },
  { id: 135, text: "去温泉，泡一泡", type: 'playful' },
  { id: 136, text: "去滑雪，摔进雪堆里", type: 'playful' },
  { id: 137, text: "去跳伞，如果胆子够大", type: 'playful' },
  { id: 138, text: "去潜水，看看海底世界", type: 'playful' },
  { id: 139, text: "去冲浪，被浪拍几下", type: 'playful' },
  { id: 140, text: "去攀岩，挑战自己", type: 'playful' },

  // 哲学深思型 (70条)
  { id: 141, text: "答案不在书里，在你心里", type: 'philosophical' },
  { id: 142, text: "问题本身就是答案", type: 'philosophical' },
  { id: 143, text: "停下来，听听内心的声音", type: 'philosophical' },
  { id: 144, text: "你所寻找的，也在寻找你", type: 'philosophical' },
  { id: 145, text: "放下执念，答案自现", type: 'philosophical' },
  { id: 146, text: "此刻即是永恒", type: 'philosophical' },
  { id: 147, text: "你是一切改变的主体", type: 'philosophical' },
  { id: 148, text: "接受不确定性，那是生命的本质", type: 'philosophical' },
  { id: 149, text: "过去已逝，未来未至，活在当下", type: 'philosophical' },
  { id: 150, text: "你的选择定义了你是谁", type: 'philosophical' },
  { id: 151, text: "没有对错，只有经历", type: 'philosophical' },
  { id: 152, text: "你所抗拒的，将持续存在", type: 'philosophical' },
  { id: 153, text: "改变从接纳开始", type: 'philosophical' },
  { id: 154, text: "你是自己命运的作者", type: 'philosophical' },
  { id: 155, text: "答案在行动中，不在思考里", type: 'philosophical' },
  { id: 156, text: "一切都是最好的安排", type: 'philosophical' },
  { id: 157, text: "你的存在本身就是意义", type: 'philosophical' },
  { id: 158, text: "时间会给你答案", type: 'philosophical' },
  { id: 159, text: "放下控制，顺其自然", type: 'philosophical' },
  { id: 160, text: "你所经历的，塑造了现在的你", type: 'philosophical' },
  { id: 161, text: "答案往往藏在问题背后", type: 'philosophical' },
  { id: 162, text: "不要寻找答案，要成为答案", type: 'philosophical' },
  { id: 163, text: "你的内心知道方向", type: 'philosophical' },
  { id: 164, text: "接纳不完美，那是真实的美", type: 'philosophical' },
  { id: 165, text: "生命的意义在于体验", type: 'philosophical' },
  { id: 166, text: "你所害怕的，正是需要面对的", type: 'philosophical' },
  { id: 167, text: "改变视角，世界随之改变", type: 'philosophical' },
  { id: 168, text: "真正的自由来自内心", type: 'philosophical' },
  { id: 169, text: "你不是你的过去，你可以重新选择", type: 'philosophical' },
  { id: 170, text: "答案在宁静中显现", type: 'philosophical' },
  { id: 171, text: "你所追求的，可能就在身边", type: 'philosophical' },
  { id: 172, text: "放下期待，收获惊喜", type: 'philosophical' },
  { id: 173, text: "你的价值不取决于外界评价", type: 'philosophical' },
  { id: 174, text: "痛苦是成长的催化剂", type: 'philosophical' },
  { id: 175, text: "答案在放下之后", type: 'philosophical' },
  { id: 176, text: "你所逃避的，终将追上你", type: 'philosophical' },
  { id: 177, text: "真正的力量来自柔软", type: 'philosophical' },
  { id: 178, text: "你的选择创造了你的现实", type: 'philosophical' },
  { id: 179, text: "答案在当下的觉察中", type: 'philosophical' },
  { id: 180, text: "不要等待答案，去创造答案", type: 'philosophical' },
  { id: 181, text: "你的直觉比逻辑更懂答案", type: 'philosophical' },
  { id: 182, text: "接纳无常，拥抱变化", type: 'philosophical' },
  { id: 183, text: "你所寻找的平静，一直在你心中", type: 'philosophical' },
  { id: 184, text: "答案在臣服中找到", type: 'philosophical' },
  { id: 185, text: "你不是在寻找答案，你是在寻找自己", type: 'philosophical' },
  { id: 186, text: "答案在给予中显现", type: 'philosophical' },
  { id: 187, text: "你的痛苦源于抗拒现实", type: 'philosophical' },
  { id: 188, text: "答案在连接中找到", type: 'philosophical' },
  { id: 189, text: "你所拥有的，正是你需要的", type: 'philosophical' },
  { id: 190, text: "答案在失去中获得", type: 'philosophical' },
  { id: 191, text: "你的故事由你书写", type: 'philosophical' },
  { id: 192, text: "答案在等待中成熟", type: 'philosophical' },
  { id: 193, text: "你不是孤独的，万物与你相连", type: 'philosophical' },
  { id: 194, text: "答案在爱中找到", type: 'philosophical' },
  { id: 195, text: "你的局限只是你的信念", type: 'philosophical' },
  { id: 196, text: "答案在未知中等待", type: 'philosophical' },
  { id: 197, text: "你所经历的，都是必要的", type: 'philosophical' },
  { id: 198, text: "答案在回归本源中找到", type: 'philosophical' },
  { id: 199, text: "你的灵魂知道答案", type: 'philosophical' },
  { id: 200, text: "答案在臣服于生命中显现", type: 'philosophical' },
  { id: 201, text: "你不是在寻找，你是在回忆", type: 'philosophical' },
  { id: 202, text: "答案在当下的呼吸中", type: 'philosophical' },
  { id: 203, text: "你所抗拒的，是你需要学习的", type: 'philosophical' },
  { id: 204, text: "答案在接纳中找到", type: 'philosophical' },
  { id: 205, text: "你的存在就是答案", type: 'philosophical' },
  { id: 206, text: "答案在静默中听到", type: 'philosophical' },
  { id: 207, text: "你不是你的思想，你是观察者", type: 'philosophical' },
  { id: 208, text: "答案在放手中获得", type: 'philosophical' },
  { id: 209, text: "你所追求的，一直在你之内", type: 'philosophical' },
  { id: 210, text: "答案在合一中找到", type: 'philosophical' },

  // 谨慎提醒型 (63条)
  { id: 211, text: "再等等，时机尚未成熟", type: 'cautionary' },
  { id: 212, text: "三思而后行", type: 'cautionary' },
  { id: 213, text: "不要急于做决定", type: 'cautionary' },
  { id: 214, text: "小心驶得万年船", type: 'cautionary' },
  { id: 215, text: "现在不是最好的时机", type: 'cautionary' },
  { id: 216, text: "听听反对的声音", type: 'cautionary' },
  { id: 217, text: "不要被表象迷惑", type: 'cautionary' },
  { id: 218, text: "保持警惕，有人不怀好意", type: 'cautionary' },
  { id: 219, text: "不要投入太多，保留退路", type: 'cautionary' },
  { id: 220, text: "这件事可能没你想的那么简单", type: 'cautionary' },
  { id: 221, text: "先观察，不要急于表态", type: 'cautionary' },
  { id: 222, text: "注意细节，魔鬼藏在细节里", type: 'cautionary' },
  { id: 223, text: "不要轻信承诺", type: 'cautionary' },
  { id: 224, text: "给自己留条后路", type: 'cautionary' },
  { id: 225, text: "这件事需要更多准备", type: 'cautionary' },
  { id: 226, text: "不要冲动，冷静一下", type: 'cautionary' },
  { id: 227, text: "小心身边的人", type: 'cautionary' },
  { id: 228, text: "这不是你想的那样", type: 'cautionary' },
  { id: 229, text: "再考虑一下其他选项", type: 'cautionary' },
  { id: 230, text: "不要孤注一掷", type: 'cautionary' },
  { id: 231, text: "这件事有风险", type: 'cautionary' },
  { id: 232, text: "先问问信任的人", type: 'cautionary' },
  { id: 233, text: "不要太乐观", type: 'cautionary' },
  { id: 234, text: "这件事需要更多调查", type: 'cautionary' },
  { id: 235, text: "小心陷阱", type: 'cautionary' },
  { id: 236, text: "不要被情绪左右", type: 'cautionary' },
  { id: 237, text: "这件事没那么急", type: 'cautionary' },
  { id: 238, text: "注意合同细节", type: 'cautionary' },
  { id: 239, text: "不要轻易借钱", type: 'cautionary' },
  { id: 240, text: "这件事可能是个坑", type: 'cautionary' },
  { id: 241, text: "先稳住，不要慌", type: 'cautionary' },
  { id: 242, text: "不要透露太多信息", type: 'cautionary' },
  { id: 243, text: "这件事需要专业人士", type: 'cautionary' },
  { id: 244, text: "不要被压力逼迫", type: 'cautionary' },
  { id: 245, text: "这件事没那么重要", type: 'cautionary' },
  { id: 246, text: "先保护好自己", type: 'cautionary' },
  { id: 247, text: "不要急于下结论", type: 'cautionary' },
  { id: 248, text: "这件事可能有变数", type: 'cautionary' },
  { id: 249, text: "注意身体健康", type: 'cautionary' },
  { id: 250, text: "不要熬夜做决定", type: 'cautionary' },
  { id: 251, text: "这件事需要更多资金", type: 'cautionary' },
  { id: 252, text: "小心口头承诺", type: 'cautionary' },
  { id: 253, text: "这件事可能不合法", type: 'cautionary' },
  { id: 254, text: "不要被感情冲昏头脑", type: 'cautionary' },
  { id: 255, text: "这件事需要长期投入", type: 'cautionary' },
  { id: 256, text: "不要忽视警告信号", type: 'cautionary' },
  { id: 257, text: "这件事可能伤害他人", type: 'cautionary' },
  { id: 258, text: "先完成手头的事", type: 'cautionary' },
  { id: 259, text: "不要同时做太多事", type: 'cautionary' },
  { id: 260, text: "这件事需要更多学习", type: 'cautionary' },
  { id: 261, text: "小心网络信息", type: 'cautionary' },
  { id: 262, text: "这件事可能是个误会", type: 'cautionary' },
  { id: 263, text: "不要急于表态", type: 'cautionary' },
  { id: 264, text: "这件事需要更多沟通", type: 'cautionary' },
  { id: 265, text: "小心投资陷阱", type: 'cautionary' },
  { id: 266, text: "这件事可能不道德", type: 'cautionary' },
  { id: 267, text: "不要被恐惧支配", type: 'cautionary' },
  { id: 268, text: "这件事需要更多耐心", type: 'cautionary' },
  { id: 269, text: "小心陌生人的好意", type: 'cautionary' },
  { id: 270, text: "这件事可能不现实", type: 'cautionary' },
  { id: 271, text: "不要急于改变现状", type: 'cautionary' },
  { id: 272, text: "这件事需要更多支持", type: 'cautionary' },
  { id: 273, text: "小心你的直觉，它可能错了", type: 'cautionary' }
]

// 历史记录（用于控制连续同类型次数）
let recentTypes: Answer['type'][] = []
const MAX_SAME_TYPE_COUNT = 3 // 同类型最多连续出现3次

// 获取随机答案（控制连续同类型次数）
export function getRandomAnswer(): Answer {
  // 检查最近是否已经连续3次同类型
  const lastType = recentTypes.length > 0 ? recentTypes[recentTypes.length - 1] : null
  const sameTypeCount = lastType 
    ? recentTypes.filter(t => t === lastType).length 
    : 0
  
  let selectedType: Answer['type']
  
  if (lastType && sameTypeCount >= MAX_SAME_TYPE_COUNT) {
    // 已经连续3次同类型，第4次必须换类型
    const otherTypes = (['warm', 'playful', 'philosophical', 'cautionary'] as const)
      .filter(type => type !== lastType)
    selectedType = otherTypes[Math.floor(Math.random() * otherTypes.length)]
  } else {
    // 允许继续同类型或换类型，完全随机
    const allTypes = ['warm', 'playful', 'philosophical', 'cautionary'] as const
    selectedType = allTypes[Math.floor(Math.random() * allTypes.length)]
  }
  
  // 从选定的类型中随机选择一条答案
  const typeAnswers = answers.filter(a => a.type === selectedType)
  const randomAnswer = typeAnswers[Math.floor(Math.random() * typeAnswers.length)]
  
  // 更新历史记录（只保留最近3次，用于判断连续次数）
  recentTypes.push(selectedType)
  if (recentTypes.length > MAX_SAME_TYPE_COUNT) {
    recentTypes.shift()
  }
  
  return randomAnswer
}

// 重置历史记录（用于测试或新会话）
export function resetAnswerHistory() {
  recentTypes = []
}

// 根据类型获取答案
export function getAnswerByType(type: Answer['type']): Answer {
  const typeAnswers = answers.filter(a => a.type === type)
  const randomIndex = Math.floor(Math.random() * typeAnswers.length)
  return typeAnswers[randomIndex]
}

// 获取答案类型标签
export function getAnswerTypeLabel(type: Answer['type']): string {
  const labels: Record<string, string> = {
    warm: '温暖鼓励',
    playful: '俏皮轻松',
    philosophical: '哲学深思',
    cautionary: '谨慎提醒'
  }
  return labels[type] || '未知'
}

// 获取答案类型颜色
export function getAnswerTypeColor(type: Answer['type']): string {
  const colors: Record<string, string> = {
    warm: 'text-rose-500 bg-rose-50 border-rose-100',
    playful: 'text-amber-500 bg-amber-50 border-amber-100',
    philosophical: 'text-indigo-500 bg-indigo-50 border-indigo-100',
    cautionary: 'text-slate-500 bg-slate-50 border-slate-100'
  }
  return colors[type] || 'text-gray-500 bg-gray-50 border-gray-100'
}
