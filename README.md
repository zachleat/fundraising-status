# fundraising-status

A web component to show the current status of a fundraiser, including goal amount and current value.

## Installation

You can install via `npm` ([`@zachleat/fundraising-status`](https://www.npmjs.com/package/@zachleat/fundraising-status)) or download the `fundraising-status.js` JavaScript file manually.

```shell
npm install @zachleat/fundraising-status --save
```

Add `fundraising-status.js` to your site’s JavaScript assets.

## Usage

```html
<!-- supply values -->
<fundraising-status min="0" max="200" value="100"></fundraising-status>

<!-- specify Intl.NumberFormat currency -->
<fundraising-status min="0" max="200" value="100" currency="USD"></fundraising-status>

<!-- change accent color -->
<fundraising-status style="--fs-color: blue"></fundraising-status>

<!-- scales with font-size -->
<fundraising-status style="font-size: 2em"></fundraising-status>
```