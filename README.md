# Claritas Web Framework _lite_ (cwf-lite)

A very lightweight but modern css framework.

[Documentation](https://davidbrooksio.github.io/cwf-lite-docs/)

## Status

![Current version](https://badgen.net/badge/Version/1.0.92/green)
![CSS size](https://badgen.net/badge/CSS%20size/342.16%20kB/yellow)
![CSS gzip size](https://badgen.net/badge/CSS%20gzip%20size/24.04%20kB/green)

## Quick start

For best results install via `npm` or `yarn`:

```
yarn add cwf-lite --dev
```

```
npm install cwf-lite -D
```

Once installed, import the source css file from `node_modules/cwf-lite/dist/index.css` into your projects css file:

```
@import "cwf-lite/dist/index.css";
```

## Customisation

**cwf-lite** uses css variables with defaults, this means that it will work out for the box (but won't look very good). However, should you wish to change a css property you can update the variable in your project css. There are three main ways of doing this:

###### In the `:root`

```
:root {
  --card-background-color: red;
}
```

###### In the css selector

```
.card {
  --card-background-color: red;
}
```

###### Overriding the variable in the css selector (not recommended)

```
.card {
  background-color: red;
}
```
