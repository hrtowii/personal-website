---
title: Theming CAML files on iOS
date: 2023-04-06
---
## Introduction

In iOS 11, Apple totally revamped the Control Center to become more modular and clean. Ever since then, it was thought that theming the icon modules were almost impossible, as they were written in a weird file format: CAML. Workarounds for this through jailbreak tweaks were made by creating entirely separate icon modules that contained just static pngs (flipswitch/flipconvert). This is fine, but the only exception to this are the sliders. It was mostly thought to be impossible to theme those by the theming community until now.

## Wtf is CAML?

Huge thanks to iOSCreatix for his medium post. Read this article if you want to understand more. His maize repository on Github ([https://github.com/andrewwiik/Maize/tree/master/Modules](https://github.com/andrewwiik/Maize/tree/master/Modules))  also contains many examples of CAML files that I used to understand it.

Essentially, CAML is a xml kind of file that describes how a particular CC module is drawn, and uses CoreGraphics/CoreAnimation. Although the API for CAML is private, CoreAnimation documentation is public on Apple’s website here: [https://developer.apple.com/documentation/quartzcore](https://developer.apple.com/documentation/quartzcore)

## Using CAML to theme icons?

Some icons use assets from the [`Assets.car`](http://Assets.car) in their directory, but most animated icons use CAShapeLayers. The most interesting property of this is `path`, which is a CGPath. CGPaths are something similar to SVGs, so they can be scaled up or down without losing quality. There are two ways of theming this, one of which i’ve tried and failed: Replacing CAShapeLayer with a regular CALayer and adding a normal PNG, or converting your image into a CGPath that can be drawn.

## Using normal images

[https://developer.apple.com/documentation/quartzcore/calayer/1410773-contents](https://developer.apple.com/documentation/quartzcore/calayer/1410773-contents)

CALayer has a property <contents> that accepts an image and places it on the CC slider. It would have been perfect for my use case until I tried it and… it looked horrible.

&#x200B;

https://preview.redd.it/w6b8fxeto7sa1.png?width=1125&format=png&auto=webp&s=41d01f92867384c2baff243f0cba16a32115a85c

This isn’t an issue if you’re using a solid square png or something. But most of the time you aren’t, which brings me to the second method:

## Converting images to CGPaths

If you look at the medium post from above, you may have seen something interesting in the CAShapeLayer:

https://preview.redd.it/qsd0fvkln7sa1.png?width=1660&format=png&auto=webp&s=92fddf6e06c7f591eccd8ab3ab92ce228fa0765b

The `path` property draws an image on the layer using CGPath. Sounds similar to SVGs. How do you convert a PNG to something that can be converted to CGPath? Well firstly, you’d need to convert it to a SVG image first. Use [https://photopea.com](https://photopea.com) to do so. Find an app (Paintcode) or ([http://svg-converter.kyome.io/](http://svg-converter.kyome.io/)) that converts SVG images into UIBezierPaths for Apple. These have a property that prints the CGPath of the image:

https://preview.redd.it/tt6aehqnn7sa1.png?width=1660&format=png&auto=webp&s=f88b37ad9411d6a0c604fe0690c5491fc603abe0

I couldn’t figure out how to do this with normal swift without creating an xcode app project. I’m not a swift dev :sadge:. Paste the UIBezierPath code generated by your app, remove context, then print the path’s `.cgPath` to find the string needed to draw your desired image. Note that you may need multiple CAShapeLayers if you want different opacities for different parts of the image. Now, you can copy any image that you’d like and convert it into a CC module. Pretty cool. But there’s obviously more to this than just having a static image on your sliders. How they are animated is by using LKState/CAState. I still do not fully understand them, but the Medium post i linked above does a fairly good job at explaining them.

## Examples

&#x200B;

https://preview.redd.it/lxkfr46rn7sa1.png?width=1660&format=png&auto=webp&s=e165eff6ba8c7db616da7e15d77718cef9ae982b

&#x200B;

https://preview.redd.it/e5chcfssn7sa1.png?width=1660&format=png&auto=webp&s=68150268afbd2dc210859b57eef135227bb2e74e

I hope that this post has brought more insight to the CAML format and how they can be used by you to theme any Control Center module with a jailbreak/MacDirtyCow (MDC probably won’t work with animations, as the modified file needs to be smaller or the same size as the original).