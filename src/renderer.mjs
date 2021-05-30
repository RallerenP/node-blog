import fs from 'fs';

const head = fs.readFileSync('src/fragments/head.html');
const foot = fs.readFileSync('src/fragments/foot.html');
const chat = fs.readFileSync('src/fragments/chat.html');

export default function render(body) {
  const content = head + body + foot;
  return content.replace('{{ $chat }}', chat);
}
