import fs from 'fs';

const head = fs.readFileSync('src/fragments/head.html');
const foot = fs.readFileSync('src/fragments/foot.html');
const $chat = fs.readFileSync('src/fragments/chat.html');

const defaultContext = {
  activeNav: 'home',
};

export default function render(body, context) {
  let content = head + body + foot;

  const $ctx = { ...defaultContext, ...context };
  console.log($ctx);

  const tags = content.match(/{{.*?}}/g);

  tags.forEach((tag) => {
    const cont = tag.match(/(?<={{ *?)\S.*?(?= *?}})/)
    // eslint-disable-next-line no-eval
    // TODO: Find alternative, this is very unsafe
    content = content.replace(tag, eval(cont[0]));
  });

  return content;
}
