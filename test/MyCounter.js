const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      font-size: 200%;
    }

    span {
      width: 4rem;
      display: inline-block;
      text-align: center;
    }

    button {
      width: 4rem;
      height: 4rem;
      border: none;
      border-radius: 10px;
      background-color: seagreen;
      color: white;
    }
  </style>
  <button id="dec">-</button>
  <span id="count"></span>
  <button id="inc">+</button>`;

export class MyCounter extends HTMLElement {

	static get observedAttributes() {
		return ['count'];
	}

  constructor() {
    super();
		this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		this.incBtn = this.shadowRoot.getElementById('inc');
		this.decBtn = this.shadowRoot.getElementById('dec');
		this.countEl = this.shadowRoot.getElementById('count');
  }

	connectedCallback() {
    this.incBtn.addEventListener('click', this.inc);
		this.incBtn.addEventListener('click', this.dec);
		if (!this.hasAttribute('value')) {
			this.setAttribute('value', 0);
		}
  }

	disconnectedCallback() {
		this.incBtn.removeEventListener('click', this.inc);
		this.decBtn.removeEventListener('click', this.dec);
	}

	attributeChangedCallback() {
		this.update();
	}


	get count() {
		return Number(this.getAttribute('count')) || 0;
	}

	set count(value) {
		this.setAttribute('count', value);
		const event = new CustomEvent('count-changed', { detail: value });
		this.dispatchEvent(event);
	}

  inc() {
    this.count += 1;
    this.update();
  }

  dec() {
    this.count -= 1;
    this.update();
  }

  update() {
		this.countEl.textContent = this.count;
  }
}

customElements.define("my-counter", MyCounter);
