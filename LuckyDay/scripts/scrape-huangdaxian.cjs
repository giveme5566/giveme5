const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://m.51chouqian.com/huangdaxianlingqian';

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

    const titleMatch = html.match(/黄大仙灵签\s*第(\d+)签[：:]\s*([^\s<]+)\s*([^<\n]+)/);
    if (titleMatch) {
      result.qianming = titleMatch[3]?.trim() || '';
    }

    const qianciMatch = html.match(/【签词】([\s\S]*?)【典故】/);
    if (qianciMatch) {
      result.qianwen = qianciMatch[1].trim().replace(/\n/g, '|');
    }

    const dianguMatch = html.match(/【典故】([\s\S]*?)【释义】/);
    if (dianguMatch) {
      result.diangu = dianguMatch[1].trim();
    }

    const shiyiMatch = html.match(/【释义】([\s\S]*?)【签解】/);
    if (shiyiMatch) {
      result.xianji = shiyiMatch[1].trim().replace(/\n/g, '|');
    }

    const jieyueMatch = html.match(/【签解】([\s\S]*?)$/);
    if (jieyueMatch) {
      result.jieyue = jieyueMatch[1].trim().replace(/\n/g, '|');
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
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const output = {
    type: 'huangdaxian',
    name: '黄大仙灵签',
    count: sticks.length,
    sticks: sticks,
  };

  fs.writeFileSync(
    path.join(__dirname, 'huangdaxian.json'),
    JSON.stringify(output, null, 2)
  );

  console.log(`\nDone! Saved ${sticks.length} Huangdaxian lottery slips to huangdaxian.json`);
}

scrapeAll();
