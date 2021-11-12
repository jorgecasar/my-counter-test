import { html, render } from "lit-html";

export class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;

    this.attachShadow({ mode: "open" });

    this.update();
  }

  inc() {
    this.count++;
    this.update();
  }

  dec() {
    this.count--;
    this.update();
  }

  template() {
    return html`
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
          width: 64px;
          height: 64px;
          border: none;
          border-radius: 10px;
          background-color: seagreen;
          color: white;
        }
      </style>
      <button @click="${this.dec}">-</button>
      <span>${this.count}</span>
      <button @click="${this.inc}">+</button>
    `;
  }

  update() {
    render(this.template(), this.shadowRoot, { eventContext: this });
  }
}

customElements.define("my-counter", MyCounter);
