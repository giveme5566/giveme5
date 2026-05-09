// 求支签数据 - 观音灵签（100签）
// 后续可扩展：关帝灵签、月老灵签、诸葛神签等

export interface Qian {
  id: number; // 签号 1-100
  xuhao: string; // 序号（如"第一签"）
  qianming: string; // 签名
  gongwei: string; // 宫位
  qianwen: string; // 签文
  jieyue: string; // 解曰
  xianji: string; // 仙机
  diangu: string; // 典故
  type: 'shang' | 'shangzhong' | 'zhong' | 'zhongxia' | 'xia'; // 签级
}

// 签级标签
export const QIAN_TYPE_LABELS: Record<string, string> = {
  shang: '上上签',
  shangzhong: '上中签',
  zhong: '中平签',
  zhongxia: '中下签',
  xia: '下下签'
};

// 签级颜色
export const QIAN_TYPE_COLORS: Record<string, string> = {
  shang: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  shangzhong: 'text-orange-600 bg-orange-50 border-orange-200',
  zhong: 'text-gray-600 bg-gray-50 border-gray-200',
  zhongxia: 'text-blue-600 bg-blue-50 border-blue-200',
  xia: 'text-gray-700 bg-gray-100 border-gray-300'
};

// 观音灵签100签（精选部分）
export const guanyinQian: Qian[] = [
  {
    id: 1,
    xuhao: '第一签',
    qianming: '锺离成道',
    gongwei: '子宫',
    qianwen: '天开地辟结良缘，日吉时良万事全；若得此签非小可，人行中正帝王宣。',
    jieyue: '上上签。此卦大吉昌。诸事吉庆。百事从心。名利双收。婚姻成合。求财吉庆。交易可宜。出行大吉利。家宅安泰。病即安痊。六甲生男。六畜兴旺。田蚕大熟。寻人得见。诉讼有理。贵人接引。谋为称意。万事亨通。',
    xianji: '家宅→吉，自身→顺利，求财→有，交易→宜，婚姻→成，六甲→生男，行人→动，田蚕→好，六畜→兴，寻人→至，公讼→吉，移徙→吉，失物→见，疾病→安，山坟→大吉',
    diangu: '锺离成道。东汉时人姓锺名权字云房。号正阳子。咸阳人。仕汉为将。后遇东华帝君授道成仙。',
    type: 'shang'
  },
  {
    id: 2,
    xuhao: '第二签',
    qianming: '苏秦不第',
    gongwei: '子宫',
    qianwen: '鲸鲨脱却葛藤罗，脱却之时运未和；得遇江湖风浪稳，悠然游到岸头波。',
    jieyue: '中平签。此卦鲸鲨脱却网罗。凡事先难后易。劳心劳力。终可有成。初时阻滞。后来方得如意。求财宜缓。婚姻迟成。家宅旧门庭。事业必复兴。',
    xianji: '家宅→安，自身→吉，求财→有，交易→可，婚姻→合，六甲→安，行人→迟，田蚕→旺，六畜→损，寻人→见，公讼→有理，移徙→吉，失物→见，疾病→解，山坟→吉',
    diangu: '苏秦不第。战国时苏秦往说秦王。秦王不纳。乃归家。妻不下机。嫂不为炊。苏秦发愤读书。引锥刺股。终于身佩六国相印。',
    type: 'zhong'
  },
  {
    id: 3,
    xuhao: '第三签',
    qianming: '董永遇仙',
    gongwei: '子宫',
    qianwen: '鲤鱼变化在池中，未得风云莫化龙；遇着一雷消息动，一跃直上九霄宫。',
    jieyue: '上上签。此卦鲤鱼跃龙门。凡事大吉大利。事业步步高升。贵人相助。前程光明。婚姻美满。财运亨通。',
    xianji: '家宅→祈保，自身→许愿，求财→有，交易→宜，婚姻→合，六甲→生男，行人→至，田蚕→好，六畜→兴，寻人→至，公讼→吉，移徙→吉，失物→见，疾病→祈保，山坟→吉',
    diangu: '董永遇仙。东汉时董永。家贫卖身葬父。孝心感动玉帝。命七仙女下凡配董永。织女下凡与董永结为夫妇。一月织成三百匹。赎董永。后升天而去。',
    type: 'shang'
  },
  {
    id: 4,
    xuhao: '第四签',
    qianming: '姜太公钓鱼',
    gongwei: '子宫',
    qianwen: '天开地辟作良缘，日吉时良万事全；若得此签非小可，人行中正帝王宣。',
    jieyue: '上中签。此卦太公钓鱼。愿者上钩。凡事待时。不可强求。耐心等待。机会自然来临。',
    xianji: '家宅→吉，自身→守旧，求财→有，交易→待时，婚姻→迟，六甲→祈保，行人→阻，田蚕→不利，六畜→平，寻人→阻，公讼→和，移徙→吉，失物→空，疾病→祈保，山坟→吉',
    diangu: '姜太公钓鱼。周朝姜子牙。年八十。隐于渭水之滨。常钓。钓竿直钩。不设饵。人问其故。曰愿者上钩。后文王访贤。请姜太公出山。拜为太师。辅助文王兴周。',
    type: 'shangzhong'
  },
  {
    id: 5,
    xuhao: '第五签',
    qianming: '刘晨遇仙',
    gongwei: '丑宫',
    qianwen: '一锥草地求泉出，泉水依然在下方；不遇贵人难着脚，时人莫作等闲看。',
    jieyue: '中平签。此卦平地生波。凡事劳心费力。难遂心愿。需待贵人。方可有成。',
    xianji: '家宅→欠利，自身→守，求财→阻，交易→待，婚姻→阻，六甲→惊，行人→迟，田蚕→宜早，六畜→损，寻人→遇，公讼→亏，移徙→守旧，失物→不见，疾病→祈保，山坟→吉',
    diangu: '刘晨遇仙。汉朝时刘晨阮肇。入天台山采药。迷路不得归。遇二仙女邀至家。食仙桃饮仙酒。住半年。归家。子孙已七世矣。',
    type: 'zhong'
  },
  {
    id: 6,
    xuhao: '第六签',
    qianming: '仁贵遇主',
    gongwei: '丑宫',
    qianwen: '他乡遇友喜气多，须知运气两相和；从今交得清平安，任君去住不须疑。',
    jieyue: '上上签。此卦他乡遇友。凡事大吉。贵人接引。事业有成。财运亨通。',
    xianji: '家宅→安，自身→吉，求财→宜，交易→成，婚姻→成，六甲→男，行人→至，田蚕→好，六畜→兴，寻人→见，公讼→胜，移徙→吉，失物→见，疾病→安，山坟→吉',
    diangu: '仁贵遇主。唐朝薛仁贵。初时贫困。后遇唐太宗。拜为大将。东征西讨。建立奇功。封平辽王。',
    type: 'shang'
  },
  {
    id: 7,
    xuhao: '第七签',
    qianming: '苏娘走难',
    gongwei: '丑宫',
    qianwen: '奔波阻隔重重险，待得时来亦未迟；不遇贵人难着力，谁知身自有扶持。',
    jieyue: '中平签。此卦遇险得救。先难后易。凡事有惊无险。贵人相助。',
    xianji: '家宅→祈保，自身→祈福，求财→有，交易→待，婚姻→阻，六甲→祈保，行人→动，田蚕→平，六畜→平，寻人→至，公讼→胜，移徙→吉，失物→见，疾病→祈保，山坟→吉',
    diangu: '苏娘走难。唐朝苏娘避难。受尽辛苦。得遇贵人相助。终得平安。',
    type: 'zhong'
  },
  {
    id: 8,
    xuhao: '第八签',
    qianming: '姚能遇仙',
    gongwei: '丑宫',
    qianwen: '青云有路任君行，出入求谋大吉昌；若遇贵人相指引，如弹如指笑还乡。',
    jieyue: '上上签。此卦青云得路。凡事大吉。贵人相助。事业有成。衣锦还乡。',
    xianji: '家宅→安，自身→吉，求财→有，交易→成，婚姻→成，六甲→生男，行人→至，田蚕→好，六畜→兴，寻人→见，公讼→胜，移徙→吉，失物→见，疾病→安，山坟→吉',
    diangu: '姚能遇仙。姚能遇仙人指点。功成名就。',
    type: 'shang'
  },
  {
    id: 9,
    xuhao: '第九签',
    qianming: '孔明点将',
    gongwei: '寅宫',
    qianwen: '烦君勿作私心事，古训昭昭不可忘；一理明通百事通，此心平处路皆通。',
    jieyue: '中平签。此卦心地光明。做事公正。自然通达。',
    xianji: '家宅→吉，自身→安，求财→有，交易→宜，婚姻→成，六甲→生男，行人→动，田蚕→好，六畜→兴，寻人→见，公讼→有理，移徙→吉，失物→见，疾病→解，山坟→吉',
    diangu: '孔明点将。三国时诸葛亮。神机妙算。指挥三军。点将遣兵。百战百胜。',
    type: 'zhong'
  },
  {
    id: 10,
    xuhao: '第十签',
    qianming: '古城相会',
    gongwei: '寅宫',
    qianwen: '石藏美玉在中心，得指引者始见金；一朝得遇高人识，贵气洋洋福自临。',
    jieyue: '上上签。此卦玉藏石中。待时发掘。贵人赏识。事业有成。',
    xianji: '家宅→祈福，自身→许愿，求财→有，交易→宜，婚姻→合，六甲→生男，行人→至，田蚕→好，六畜→兴，寻人→至，公讼→吉，移徙→吉，失物→见，疾病→祈保，山坟→吉',
    diangu: '古城相会。三国时刘关张。徐州失散。后在古城相会。兄弟重逢。',
    type: 'shang'
  }
];

// 完整100签可通过API获取后补充
// 目前先生成基础结构供开发使用

// 获取随机签
export function getRandomQian(): Qian {
  return guanyinQian[Math.floor(Math.random() * guanyinQian.length)];
}

// 根据签号获取
export function getQianById(id: number): Qian | undefined {
  return guanyinQian.find(q => q.id === id);
}

// 签文场景映射
export const SCENE_QIAN_MAP: Record<string, {
  primary: string[];
  secondary: string[];
  label: string;
  icon: string;
}> = {
  love: {
    primary: ['yuelao'],
    secondary: ['guanyin'],
    label: '姻缘/感情/婚姻',
    icon: '❤️'
  },
  career: {
    primary: ['guandi'],
    secondary: ['leiyushi'],
    label: '事业/功名/官运',
    icon: '💼'
  },
  wealth: {
    primary: ['guandi'],
    secondary: ['wulucaishen'],
    label: '财运/经商/生意',
    icon: '💰'
  },
  study: {
    primary: ['wenqu'],
    secondary: ['guandi'],
    label: '学业/考试/升学',
    icon: '📚'
  },
  family: {
    primary: ['guanyin'],
    secondary: ['tudigong'],
    label: '家宅/全家平安',
    icon: '🏠'
  },
  travel: {
    primary: ['mazu'],
    secondary: ['guanyin'],
    label: '出行/航海/迁移',
    icon: '🚢'
  },
  lawsuit: {
    primary: ['leiyushi'],
    secondary: ['chenghuang'],
    label: '诉讼/官非/是非',
    icon: '⚖️'
  },
  child: {
    primary: ['zhusheng'],
    secondary: ['guanyin'],
    label: '求子/孕产/育儿',
    icon: '🍼'
  },
  health: {
    primary: ['baosheng'],
    secondary: ['guanyin'],
    label: '健康/疾病/医药',
    icon: '❤️‍🩹'
  },
  decision: {
    primary: ['zhuge'],
    secondary: ['leiyushi'],
    label: '特定事项决疑/迷茫',
    icon: '🔮'
  },
  general: {
    primary: ['guanyin'],
    secondary: ['mazu'],
    label: '综合/日常/随缘',
    icon: '🎲'
  },
  familyFortune: {
    primary: ['chenghuang'],
    secondary: ['tudigong'],
    label: '家运/阴德/根基',
    icon: '🏛️'
  },
  agriculture: {
    primary: ['mazu'],
    secondary: ['liushijiazi'],
    label: '农渔/畜牧/自然',
    icon: '🌾'
  },
  childGrow: {
    primary: ['wenqu'],
    secondary: ['zhusheng'],
    label: '孩子成长/学业',
    icon: '👶'
  },
  ancestor: {
    primary: ['chenghuang'],
    secondary: [],
    label: '祖先/阴宅/祭祀',
    icon: '⚰️'
  }
};
