# typescript-minify

minify typescript

## Install

```
$ npm install typescript-minify
```


## Usage
```js
let minify = require('typescript-minify');
let source = path.join(process.cwd(), 'src');
let modules = 'module.json';

minify.ts_minify(source , modules);
```

module.json
```json
{
  "file": [
    "test.ts"
  ]
}

```

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)