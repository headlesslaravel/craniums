## @craniums/vue

Headless Laravel Vue components and mixins

### Install

Within your resources/js/app.js file:

```js
import Cranium from '@craniums/vue';
```
```js
createApp({
    ...
})
    .mixin({ methods: { route } })
    .use(InertiaPlugin)
    .use(Cranium) <---
    .mount(el);
```
