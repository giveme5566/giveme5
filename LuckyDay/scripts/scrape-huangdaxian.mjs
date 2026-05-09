import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://m.51chouqian.com/huangdaxianlingqian';

function extractText(html, startTag, endTag) {
  const startIndex = html.indexOf(startTag);
  if (startIndex === -1) return '';
  const contentStart = startIndex + startTag.length;
  let contentEnd = html.indexOf(endTag, contentStart);
  if (contentEnd === -1) contentEnd = html.length;
  return html.slice(contentStart, contentEnd).trim();
}

function cleanHtml(text) {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchPage(number) {
  try {
    const response = await fetch(`${BASE_URL}/${number}.html`);
    const html = await response.text();

    const result = {
      xuhao: `${number}签`,
      qianming: '',
      qianwen: '',
      jieyue: '',
      xianji: '',
      diangu: '',
    };

    const titleMatch = html.match(/黄大仙灵签\s*第(\d+)签[：:]\s*[\u4e00-\u9fa5]*\s*([^\n<]+)/);
    if (titleMatch) {
      result.qianming = cleanHtml(titleMatch[2]);
    }

    const qianciStart = '【签词】';
    const dianguStart = '【典故】';
    const shiyiStart = '【释义】';
    const jieyueStart = '【签解】';

    let qianciEnd = html.indexOf(dianguStart);
    if (qianciEnd === -1) qianciEnd = html.indexOf(shiyiStart);
    if (qianciEnd === -1) qianciEnd = html.indexOf(jieyueStart);
    if (qianciEnd === -1) qianciEnd = html.length;

    const qianciContent = extractText(html, qianciStart, dianguStart);
    if (qianciContent) {
      result.qianwen = cleanHtml(qianciContent).replace(/[：:]/g, '|').replace(/\|+/g, '|');
    }

    const dianguContent = extractText(html, dianguStart, shiyiStart);
    if (dianguContent) {
      result.diangu = cleanHtml(dianguContent);
    }

    const shiyiContent = extractText(html, shiyiStart, jieyueStart);
    if (shiyiContent) {
      result.xianji = cleanHtml(shiyiContent).replace(/[：:]/g, '|').replace(/\|+/g, '|');
    }

    const jieyueContent = extractText(html, jieyueStart, '</p>');
    if (jieyueContent) {
      result.jieyue = cleanHtml(jieyueContent);
    }

    console.log(`Fetched #${number}: ${result.qianming}`);
    return result;
  } catch (error) {
    console.error(`Error fetching #${number}:`, error.message);
    return null;
  }
}

async function scrapeAll() {
  const sticks = [];

  for (let i = 1; i <= 100; i++) {
    const stick = await fetchPage(i);
    if (stick) {
      sticks.push(stick);
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  const output = {
    type: 'huangdaxian',
    name: '黄大仙灵签',
    count: sticks.length,
    sticks: sticks,
  };

  const outputPath = path.join(__dirname, 'huangdaxian.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`\nDone! Saved ${sticks.length} Huangdaxian lottery slips to huangdaxian.json`);
}

scrapeAll();
