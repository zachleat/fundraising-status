class FundraisingStatus extends HTMLElement {
	static tagName = "fundraising-status";

	static css = `
:host {
	display: flex;
	flex-wrap: nowrap;
	white-space: nowrap;
	align-items: center;
	gap: .25em;
}
progress {
	flex-grow: 1;
	accent-color: var(--fs-color);
	width: 100%;
}
`;

	static register(tagName) {
		if(!("customElements" in globalThis)) {
			return;
		}
		customElements.define(tagName || this.tagName, this);
	}

	get currency() {
		return this.getAttribute("currency") || "USD";
	}

	formatPrice(num, locale) {
		if(!("NumberFormat" in Intl)) {
			return num;
		}

		let localized = new Intl.NumberFormat(locale || navigator.language, {
			style: "currency",
			currency: this.currency,
			currencyDisplay: "symbol",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});

		return localized.format(num);
	}

	connectedCallback() {
		if (!("replaceSync" in CSSStyleSheet.prototype) || this.shadowRoot) {
			return;
		}

		let min = this.getAttribute("min") || 0;
		let max = this.getAttribute("max") || 1;
		let value = this.getAttribute("value") || 0;

		this.attachShadow({ mode: "open" });

		let sheet = new CSSStyleSheet();
		sheet.replaceSync(FundraisingStatus.css);
		this.shadowRoot.adoptedStyleSheets = [sheet];

		this.render({
			min,
			max,
			value,
		});
	}

	async render({min, max, value}) {
		this.shadowRoot.innerHTML = `<slot></slot>
	<progress min="${min}" max="${max}" value="${value}"></progress>
	<code>${this.formatPrice(value)}</code>
	<code>/${this.formatPrice(max)}</code>
	${!this.hasAttribute("hide-currency") ? `<code>${this.currency}</code>` : ""}`;
	}
}

FundraisingStatus.register();