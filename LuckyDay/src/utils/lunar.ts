import lunisolar from 'lunisolar'

export interface LunarInfo {
  solarDate: string
  lunarDate: string
  ganZhiYear: string
  ganZhiMonth: string
  ganZhiDay: string
  zodiac: string
  yi: string[]
  ji: string[]
  chongSha: string
  sha方位: string
 彭祖百忌: string
  节气: string | null
 节日: string[]
}

const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

const YI_LIST = [
  '祭祀', '祈福', '嫁娶', '出行', '移徙', '入宅', '安床', '开光', '针灸', '会亲友',
  '纳采', '订盟', '竖柱', '上梁', '造屋', '起基', '定磬', '纳财', '破土', '修坟',
  '安葬', '立碑', '启攒', '求医', '治病', '动土', '兴业', '开市', '交易', '立券'
]

const JI_LIST = [
  '嫁娶', '出行', '动土', '破土', '安葬', '修坟', '立碑', '迁坟', '开市', '开光',
  '针灸', '塞穴', '扫舍', '馀事', '勿取', '忌诸事不宜', '大事勿用', '诸事不利'
]

function getGanZhi(year: number, month: number, day: number): { year: string; month: string; day: string } {
  const yearCycle = (year - 4) % 60
  const monthCycle = ((year - 4) * 12 + (month + 1)) % 60
  const dayCycle = Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(1900, 0, 6)) / 86400000) % 60
  
  return {
    year: TIANGAN[yearCycle % 10] + DIZHI[yearCycle % 12],
    month: TIANGAN[monthCycle % 10] + DIZHI[monthCycle % 12],
    day: TIANGAN[dayCycle % 10] + DIZHI[dayCycle % 12]
  }
}

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function getZodiac(year: number): string {
  const cycle = (year - 1900) % 12
  return ZODIAC[cycle < 0 ? cycle + 12 : cycle]
}

function getChongSha(lunarDay: number): string {
  const chongList = ['鼠', '马', '牛', '羊', '虎', '猴', '兔', '鸡', '龙', '狗', '蛇', '猪']
  return chongList[(lunarDay - 1) % 12]
}

function getSha方位(ganZhiDay: string): string {
  const direction = ['北', '东', '南', '西', '东北', '西北', '东南', '西南']
  const idx = DIZHI.indexOf(ganZhiDay[1])
  return direction[idx % 8]
}

function getPengZu(ganZhiDay: string): string {
  const 忌 = ['嫁娶', '纳采', '订盟', '祭祀', '祈福', '开市', '交易', '立券', '出行', '移徙']
  const tianganIdx = TIANGAN.indexOf(ganZhiDay[0])
  const dizhiIdx = DIZHI.indexOf(ganZhiDay[1])
  return `${TIANGAN[tianganIdx]}不${忌[tianganIdx % 10].charAt(0)}，${DIZHI[dizhiIdx]}不${忌[dizhiIdx % 10].charAt(0 === 0 ? 1 : 0]}`
}

export function getLunarInfo(date: Date = new Date()): LunarInfo {
  const l = lunisolar(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const lunar = l.lunar
  const ganZhi = getGanZhi(year, month, day)
  const lunarDay = lunar.day
  
  const solarDate = `${year}年${month}月${day}日`
  const lunarDate = `${lunar.year}年${lunar.month}月${lunar.day}日`
  
  const 节气 = l.solarTerm || null
  
  const festivals: string[] = []
  if (lunar.month === 1 && lunar.day === 1) festivals.push('春节')
  if (lunar.month === 1 && lunar.day === 15) festivals.push('元宵节')
  if (lunar.month === 5 && lunar.day === 5) festivals.push('端午节')
  if (lunar.month === 7 && lunar.day === 7) festivals.push('七夕')
  if (lunar.month === 8 && lunar.day === 15) festivals.push('中秋节')
  if (lunar.month === 9 && lunar.day === 9) festivals.push('重阳节')
  if (month === 4 && day === 5) festivals.push('清明节')
  if (month === 10 && day === 1) festivals.push('国庆节')
  if (month === 1 && day === 1) festivals.push('元旦')
  
  return {
    solarDate,
    lunarDate,
    ganZhiYear: ganZhi.year,
    ganZhiMonth: ganZhi.month,
    ganZhiDay: ganZhi.day,
    zodiac: getZodiac(year),
    yi: getRandomItems(YI_LIST, 5),
    ji: getRandomItems(JI_LIST, 5),
    chongSha: `冲${getChongSha(lunarDay)}`,
    sha方位: `煞${getSha方位(ganZhi.day)}`,
    彭祖百忌: getPengZu(ganZhi.day),
    节气,
    节日
  }
}

export { lunisolar }
