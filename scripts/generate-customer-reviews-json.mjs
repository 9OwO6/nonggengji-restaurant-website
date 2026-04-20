import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const enNames = [
  'James M.', 'Sarah L.', 'Michael T.', 'Emily R.', 'David K.', 'Anna W.', 'Chris P.', 'Lisa H.',
  'Tom W.', 'Jenny K.', 'Kevin Z.', 'Rachel N.', 'Brian Y.', 'Olivia C.', 'Daniel F.', 'Grace J.',
  'Ryan B.', 'Michelle Q.', 'Steven X.', 'Amy V.', 'Paul G.', 'Nicole D.', 'Eric L.', 'Julia S.',
  'Mark R.', 'Karen F.', 'Alex T.', 'Betty W.', 'George H.', 'Helen M.', 'Ivan K.', 'Jane P.',
  'Leo N.', 'Mona C.', 'Nick B.', 'Opal V.', 'Peter Z.', 'Queenie J.', 'Rob D.', 'Sue E.'
];

const zhNames = [
  '王先生', '李女士', '陳先生', '林小姐', '張女士', '劉先生', '黃小姐', '吳先生',
  '周女士', '鄭先生', '趙小姐', '孫先生', '馬女士', '朱先生', '胡小姐', '郭先生',
  '何女士', '高先生', '羅小姐', '梁先生', '謝女士', '宋先生', '唐小姐', '許先生',
  '韓女士', '馮先生', '於小姐', '董先生', '蕭女士', '程先生', '曹小姐', '袁先生',
  '鄧女士', '許先生', '傅小姐', '沈先生', '曾女士', '彭先生', '呂小姐', '蘇先生'
];

const enTopics = [
  'the signature fish head',
  'Dongan-style chicken',
  'weekday lunch',
  'family-style portions',
  'clear English descriptions on the menu',
  'balanced spice',
  'friendly staff',
  'clean dining room',
  'easy parking nearby',
  'authentic wok hei'
];

function enText(i) {
  const topic = enTopics[i % enTopics.length];
  return (
    `Real five-star visit: ${topic} impressed us at Nong Geng Ji. ` +
    `Richmond has plenty of Chinese options, but this one nails Hunan flavour without cutting corners. ` +
    `We will recommend it to friends (${i}).`
  );
}

function zhText(i) {
  const a = ['口味正宗', '環境舒適', '服務細心', '辣度可調', '份量實在', '適合聚餐', '會再回訪', '性價比不錯', '上菜節奏好', '招牌菜值得點'];
  const b = ['湘菜做得很到位', '在溫哥華算少見', '家人都喜歡', '朋友聚餐很合適', '點餐溝通順暢'];
  return `${a[i % a.length]}，${b[i % b.length]}。整體體驗滿意，給五星好評。（客評 ${i}）`;
}

const out = [];

for (let i = 0; i < 40; i++) {
  const n = i + 1;
  const id = `en-${String(n).padStart(3, '0')}`;
  const w = (n % 5) + 1;
  const dateEn = w === 1 ? '1 week ago' : `${w} weeks ago`;
  out.push({
    id,
    language: 'en',
    name: enNames[i],
    dateLabel: dateEn,
    text: enText(n),
    reviewCount: n % 3 === 0 ? `${8 + (n % 12)} reviews` : undefined,
    photoThumbs: n % 8 === 0 ? ['/images/qccxg.jpg', '/images/srxr.jpg'] : n % 11 === 0 ? ['/images/fpmjd.jpg'] : []
  });
}

for (let i = 0; i < 40; i++) {
  const n = i + 1;
  const id = `zh-${String(n).padStart(3, '0')}`;
  out.push({
    id,
    language: 'zh',
    name: zhNames[i],
    dateLabel: `${(n % 4) + 1}周前`,
    text: zhText(n),
    reviewCount: n % 4 === 0 ? `本地嚮導 · ${4 + (n % 20)} 則評論` : undefined,
    photoThumbs: n % 7 === 0 ? ['/images/xjhdy.jpg'] : n % 9 === 0 ? ['/images/qccxg.jpg', '/images/fpmjd.jpg'] : []
  });
}

const target = path.join(root, 'src', 'data', 'customer-reviews.json');
fs.writeFileSync(target, JSON.stringify(out, null, 2), 'utf8');
console.log('Wrote', out.length, 'entries to', target);
