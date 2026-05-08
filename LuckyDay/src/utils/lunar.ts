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
  '纳采', '订盟', '竖柱', '上梁', '造屋', '起基', '定磬', '纳财', '破土', '修坟'
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
    year: TIANGAN[Math.abs(yearCycle) % 10] + DIZHI[Math.abs(yearCycle) % 12],
    month: TIANGAN[Math.abs(monthCycle) % 10] + DIZHI[Math.abs(monthCycle) % 12],
    day: TIANGAN[Math.abs(dayCycle) % 10] + DIZHI[Math.abs(dayCycle) % 12]
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
  const tianganIdx = TIANGAN.indexOf(ganZhiDay[0])
  const dizhiIdx = DIZHI.indexOf(ganZhiDay[1])
  const tianganChar = TIANGAN[tianganIdx]
  const dizhiChar = DIZHI[dizhiIdx]
  const char1 = tianganIdx === 0 ? '嫁' : tianganIdx === 1 ? '纳' : tianganIdx === 2 ? '嫁' : tianganIdx === 3 ? '祈' : tianganIdx === 4 ? '开' : tianganIdx === 5 ? '开' : tianganIdx === 6 ? '出' : tianganIdx === 7 ? '开' : tianganIdx === 8 ? '开' : '移'
  const char2 = dizhiIdx === 0 ? '嫁' : dizhiIdx === 1 ? '动' : dizhiIdx === 2 ? '动' : dizhiIdx === 3 ? '开' : dizhiIdx === 4 ? '动' : dizhiIdx === 5 ? '动' : dizhiIdx === 6 ? '开' : dizhiIdx === 7 ? '动' : dizhiIdx === 8 ? '开' : dizhiIdx === 9 ? '开' : dizhiIdx === 10 ? '动' : '开'
  return `${tianganChar}不${char1}，${dizhiChar}不${char2}`
}

async function getLunar(date: Date) {
  try {
    const lunisolar = (await import('lunisolar')).default
    const l = lunisolar(date)
    // solarTerm 可能是对象，需要转换为字符串
    const solarTermValue = l.solarTerm
    const solarTermStr = solarTermValue ? String(solarTermValue) : null
    return {
      year: l.lunar.year,
      month: l.lunar.month,
      day: l.lunar.day,
      solarTerm: solarTermStr
    }
  } catch (e) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      solarTerm: null
    }
  }
}

export async function getLunarInfo(date: Date = new Date()): Promise<LunarInfo> {
  const lunar = await getLunar(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const ganZhi = getGanZhi(year, month, day)
  const lunarDay = lunar.day
  
  const solarDate = `${year}年${month}月${day}日`
  const lunarDate = `${lunar.year}年${lunar.month}月${lunar.day}日`
  
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
    节气: lunar.solarTerm,
    节日: festivals
  }
}
