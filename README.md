Как установить бота?
=
1. создать папку - config
2. создать в ней файл - config.js
3. вставить в файл следующее:
```js
const config = {
  guildID: 'айди сервера',
  prefix: 'какой нибудь префикс, например !',
  owner: 'айди владельца бота',
  token: 'токен дискорд-бота, под которым нужно запускаться'
}

module.exports = config
```
как пример:
```js
const config = {
  guildID: '530841187372892180',
  prefix: 'v.',
  owner: '405044179182419980',
  token: 'uigfhreuikfhnduerjdf.fukjdgsfbu.gftiufdgfburdjhnduriedsjkdn'
}

module.exports = config
```
затем прописать:
```shell script
npm install
```
всё готово к работе. запустить бота можно командой
```shell script
node .
```
если всё прошло успешно, в консоли появится `Ready!`