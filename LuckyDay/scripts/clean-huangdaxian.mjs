import { readFileSync, writeFileSync } from 'fs';

const rawData = JSON.parse(readFileSync('./huangdaxian.json', 'utf-8'));

function cleanText(text) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/　/g, '')
    .replace(/"\s*\/>/g, '')
    .replace(/抽签网\s*/g, '')
    .replace(/加载全文/g, '')
    .replace(/热门推荐.*相关推荐/g, '')
    .replace(/section_icon\(\).*section_link\(\)/g, '')
    .replace(/Copyright.*$/g, '')
    .replace(/\(function \(\).*$/gs, '')
    .replace(/观音灵签.*$/g, '')
    .replace(/本站所有内容仅供.*$/g, '')
    .replace(/ 防骗提示.*$/g, '')
    .replace(/远离要求.*$/g, '')
    .replace(/section_link\(\)/g, '')
    .replace(/section_icon\(\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractPoem(qianwen) {
  const cleaned = cleanText(qianwen);
  let poem = '';
  
  if (cleaned.includes('|')) {
    const parts = cleaned.split('|');
    const poemLines = [];
    
    for (let i = 0; i < parts.length; i++) {
      let line = parts[i].trim();
      
      if (line.includes('释义') || line.includes('签解') || line.includes('周朝') || 
          line.includes('当时') || line.includes('此是') || line.includes('晋朝')) {
        break;
      }
      
      line = line.replace(/黄大仙灵签\s*/g, '').replace(/第\d+签\s*/g, '');
      line = line.replace(/上上|上吉|中吉|中平|下下|下吉\s*/g, '').replace(/【签词】\s*/g, '');
      
      if (line.length >= 4) {
        poemLines.push(line);
      }
      
      if (poemLines.length === 4) break;
    }
    
    poem = poemLines.slice(0, 4).join('|');
  } else if (cleaned.includes('、')) {
    const idx = cleaned.indexOf('。');
    if (idx > 0) {
      const firstSentence = cleaned.substring(0, idx);
      if (firstSentence.includes('、')) {
        poem = firstSentence.replace(/　/g, '').trim();
      } else {
        poem = firstSentence;
      }
    } else {
      poem = cleaned;
    }
  } else {
    const idx = cleaned.indexOf('释义');
    if (idx > 0) {
      poem = cleaned.substring(0, idx).trim();
    } else {
      const sentences = cleaned.split('。').filter(s => s.trim().length > 0);
      poem = sentences.slice(0, 4).join('|');
    }
  }
  
  return poem;
}

function extractDiangu(dianguRaw) {
  const cleaned = cleanText(dianguRaw);
  let story = '';
  let analysis = '';
  
  const storyMatch = cleaned.match(new RegExp('^([^〖]*?)(?:〖释义〗|〖签解〗)', 's'));
  if (storyMatch) {
    story = storyMatch[1].trim();
  }
  
  const shiyiMatch = cleaned.match(new RegExp('〖释义〗(.*?)(?:〖签解〗|$)', 's'));
  const qianjieMatch = cleaned.match(new RegExp('〖签解〗(.*?)$', 's'));
  
  if (shiyiMatch) {
    analysis += shiyiMatch[1].trim();
  }
  if (qianjieMatch) {
    if (analysis) analysis += '\n';
    analysis += qianjieMatch[1].trim();
  }
  
  return { story, analysis };
}

const cleanedSticks = rawData.sticks.map((stick, index) => {
  const qianming = stick.qianming.replace(/ - 抽签网$/, '').trim();
  const poem = extractPoem(stick.qianwen);
  const { story, analysis } = extractDiangu(stick.diangu);
  
  return {
    xuhao: stick.xuhao || `${index + 1}签`,
    qianming,
    qianwen: poem,
    jieyue: story,
    xianji: analysis,
    diangu: ''
  };
});

const cleanedData = {
  type: 'huangdaxian',
  name: '黄大仙灵签',
  count: cleanedSticks.length,
  sticks: cleanedSticks
};

writeFileSync('./huangdaxian-clean.json', JSON.stringify(cleanedData, null, 2), 'utf-8');
writeFileSync('../src/data/huangdaxian.json', JSON.stringify(cleanedData, null, 2), 'utf-8');
console.log(`Cleaned ${cleanedSticks.length} sticks. Saved to huangdaxian-clean.json and ../src/data/huangdaxian.json`);
console.log('\nSample (first 2):');
for (let i = 0; i < 2; i++) {
  console.log(`\n=== ${cleanedSticks[i].xuhao} ${cleanedSticks[i].qianming} ===`);
  console.log('签诗:', cleanedSticks[i].qianwen);
  console.log('解曰:', cleanedSticks[i].jieyue ? cleanedSticks[i].jieyue.substring(0, 60) : '(empty)');
  console.log('仙机:', cleanedSticks[i].xianji ? cleanedSticks[i].xianji.substring(0, 60) : '(empty)');
}
