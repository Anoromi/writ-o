export type NormalElement = keyof Omit<JSX.IntrinsicElements, SVGS>;

export type SVGS =
  | "svg"
  | "animate"
  | "animateMotion"
  | "animateTransform"
  | "circle"
  | "clipPath"
  | "defs"
  | "desc"
  | "ellipse"
  | "feBlend"
  | "feColorMatrix"
  | "feComponentTransfer"
  | "feComposite"
  | "feConvolveMatrix"
  | "feDiffuseLighting"
  | "feDisplacementMap"
  | "feDistantLight"
  | "feDropShadow"
  | "feFlood"
  | "feFuncA"
  | "feFuncB"
  | "feFuncG"
  | "feFuncR"
  | "feGaussianBlur"
  | "feImage"
  | "feMerge"
  | "feMergeNode"
  | "feMorphology"
  | "feOffset"
  | "fePointLight"
  | "feSpecularLighting"
  | "feSpotLight"
  | "feTile"
  | "feTurbulence"
  | "filter"
  | "foreignObject"
  | "g"
  | "image"
  | "line"
  | "linearGradient"
  | "marker"
  | "mask"
  | "metadata"
  | "mpath"
  | "path"
  | "pattern"
  | "polygon"
  | "polyline"
  | "radialGradient"
  | "rect"
  | "stop"
  | "switch"
  | "symbol"
  | "text"
  | "textPath"
  | "tspan"
  | "use"
  | "view";