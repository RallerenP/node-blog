import fs from 'fs';

const head = fs.readFileSync('src/fragments/head.html');
const foot = fs.readFileSync('src/fragments/foot.html');

export default function render(body) {
  return head + body + foot;
}
