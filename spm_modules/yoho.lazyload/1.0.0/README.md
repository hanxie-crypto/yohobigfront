# yoho.lazyload [![spm version](http://spm.yoho.cn/badge/yoho.lazyload)](http://spm.yoho.cn/package/yoho.lazyload)

---

yoho lazyload

## Install

```
$ spm install yoho.lazyload --save
```

## Usage
lazyload对原代码做了一层封装，默认配置参数：

    {
        effect : 'fadeIn',
        effect_speed: 10,
        placeholder: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///93d3f///yH5BAEAAAMALAAAAAABAAEAAAICVAEAOw==',
        skip_invisible: false
    }

```js
var Lazyload = require('yoho.lazyload');
// use Lazyload
//接受2个参数，为指定的$imgs添加lazyload并可配置需要的参数（需要的时候覆盖默认参数项）；若图片参数不传则为$('img.lazy')添加lazyload效果
lazyLoad([$imgs, configs]);

//如果你想用原来的方法加载lazyload
require('yoho.lazylaod/lib/jquery.lazyload');
```
