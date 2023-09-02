"use client"

import Image, { ImageProps, unstable_getImgProps as getImgProps } from "next/image";

import * as config from '@/../export-images.config';

import { StaticImageData, StaticImport, StaticRequire } from "next/dist/shared/lib/get-img-props";
import React, { forwardRef } from "react";

const { exportableLoader } = require('next-export-optimize-images/dist/components/image');

function PictureImage({ src, ...restProps }: ImageProps, forwardedRef: React.ForwardedRef<HTMLImageElement>) {
  if (config.generateFormats?.length) {
    const srcStr = getImageSrcString(src);
    const lastDot = srcStr.lastIndexOf('.');

    if (lastDot !== -1) {
      const srcWithoutExtension = srcStr.slice(0, lastDot);
      const srcFormat = srcStr.slice(lastDot + 1);

      const allFormats = [...new Set([srcFormat, ...config.generateFormats])];

      const imageData = allFormats.map(format => ({
        src: getReplacedImageSrc(src, `${srcWithoutExtension}.${format}`),
        mime: `image/${format.replace('jpeg', 'jpg')}`,
      }));

      const sources = imageData.slice(0, -1);
      const fallback = imageData.slice(-1)[0];

      return (
        <picture>
          {sources.map(({ src, mime }, index) => {
            const { props: { srcSet } } = getImgProps({
              ...restProps,
              loader: restProps.loader ?? exportableLoader,
              src,
            })
            return <source key={index} type={mime} srcSet={srcSet} />;
          })}
          <Image ref={forwardedRef} {...restProps} src={fallback.src} alt={restProps.alt} />
        </picture>
      );
    }
  }

  return <Image ref={forwardedRef} {...restProps} src={src} alt={restProps.alt} />
}

export default forwardRef(PictureImage);

function getImageSrcString(imgSrc: string | StaticImport) {
  if (typeof imgSrc === 'string') {
    return imgSrc;
  }
  if ((imgSrc as StaticRequire).default !== undefined) {
    return (imgSrc as StaticRequire).default.src;
  }
  return (imgSrc as StaticImageData).src;
}

function getReplacedImageSrc(imgSrc: string | StaticImport, newSrc: string) {
  if (typeof imgSrc === 'string') {
    return newSrc;
  }
  if ((imgSrc as StaticRequire).default !== undefined) {
    return {
      ...imgSrc,
      default: {
        ...(imgSrc as StaticRequire).default,
        src: newSrc,
      }
    }
  }
  return {
    ...imgSrc,
    src: newSrc
  }
}
