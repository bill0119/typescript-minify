# cp-folder

minify typescript

## Install

```
$ npm install typescript-minify
```


## Usage

```js
let build = require('typescript-minify');
let root = path.join(process.cwd(), 'src');
let modules = 'module.json';

build.ts_minify(root , modules);
```

```json
{
  "file": [
    "test.ts"
  ]
}

```

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)