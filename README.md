# Next Export Optimize Images with \<picture> tag

This is an example demo of how to use \<picture> tag with with [next-export-optimize-images](https://github.com/dc7290/next-export-optimize-images/)

## Getting Started

`npm run build` to create static export  
`npm run start` to start http-server

## Config

A forked version of [knemerzitski/next-export-optimize-images](https://github.com/knemerzitski/next-export-optimize-images/tree/prepare) is used. It adds a new configuration option and exports loader used by package images component.

```js
const config = {
  generateFormats: ['jpg'],
};
```

## Pseudocode

`unstable_getImgProps` from `next/image` is used to generate srcset for each format. 


Pseudocode of [PictureImage.tsx](/src/components/PictureImage.tsx)

```jsx
const allFormats = [srcFormat, ...config.generateFormats];

const imageData = allFormats.map(format => ({
  src: `${srcWithoutExtension}.${format}`,
  mime: `image/${format.replace('jpeg', 'jpg')}`,
}));

const sources = imageData.slice(0, -1);
const fallback = imageData.slice(-1)[0];

return (
  <picture>
    {sources.map({ src, mime } => {
      const { props: { srcSet } } = unstable_getImgProps({
        loader: exportableLoader,
        src,
      })
      return <source type={mime} srcSet={srcSet} />;
    })}
    <Image src={fallback.src} />
  </picture>
);
```
