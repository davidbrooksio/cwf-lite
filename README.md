# Claritas Web Framework *lite* (cwf-lite)
## Quick start
For best resultsinstall via `npm` or `yarn`:
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
cwf-lite uses css variables with defaults, this means that it will work out for the box (but won't look very good). However, should you wish to change a css property your can update the variable in your project css. There are three main ways of doing this:
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
