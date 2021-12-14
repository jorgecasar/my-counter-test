import { describe, executeTests } from "@asdgf/core";
import { assert, html } from "@open-wc/testing";
import { fixture, fixtureCleanup, oneEvent } from "@open-wc/testing-helpers/pure";

export const runTests = (MyCounter) => {
  describe("My Counter", ({ it, afterEach }) => {
    afterEach(fixtureCleanup);

		describe("constructor", ({ it }) => {
			it("<my-counter> is an instance of MyCounter", async () => {
				const el = document.createElement("my-counter");
				assert.instanceOf(el, MyCounter);
			});

			it("could be initialized by attribute", async () => {
				const el = await fixture(html`<my-counter count="5"></my-counter>`);
				assert.deepEqual(el.getAttribute("count"), "5");
			});
		});

		describe("attribute count", ({ it }) => {
			it("reflects property changes", async () => {
				const el = await fixture(html`<my-counter></my-counter>`);
				el.count = 5;
				assert.equal(el.getAttribute("count"), "5");
			});
		});

		describe("property count", ({ it }) => {
			it("is a Number", async () => {
				const el = await fixture(html`<my-counter></my-counter>`);
				assert.isNumber(el.count);
			});

			it("has default value of 0", async () => {
				const el = await fixture(html`<my-counter></my-counter>`);
				assert.deepEqual(el.count, 0);
			});

			it("property reflects attribute changes", async () => {
				const el = await fixture(html`<my-counter></my-counter>`);
				el.setAttribute("count", "5");
				assert.equal(el.count, 5);
			});
		});

		describe("method increment (inc)", ({ it }) => {
			it("adds one to the counter", async () => {
				const el = await fixture(html`<my-counter></my-counter>`);
				el.inc();
				assert.equal(el.count, 1);
			});
		});

		describe("method decrement (dec)", ({ it }) => {
			it("reduce by one the counter", async () => {
				const el = await fixture(html`<my-counter></my-counter>`);
				el.dec();
				assert.equal(el.count, -1);
			});
		});

		describe("events", ({ it }) => {
			it("dispatch an event on count changed", async () => {
				const el = await fixture(html`<my-counter></my-counter>`);
				setTimeout(() => el.inc());
				let { detail } = await oneEvent(el, "count-changed");
				assert.equal(detail, 1);
				setTimeout(() => el.dec());
				({ detail } = await oneEvent(el, "count-changed"));
				assert.equal(detail, 0);
			});
		});

		describe("shadow DOM", ({ it }) => {
			it("is an instance of ShadowRoot", async () => {
				const el = await fixture(html`<my-counter></my-counter>`);
				assert.instanceOf(el.shadowRoot, ShadowRoot);
			});

			it("is open", async () => {
				const el = await fixture(html`<my-counter></my-counter>`);
				assert.equal(el.shadowRoot.mode, "open");
			});
		});
  });

  /**
   * Returns a test report
   */
  return executeTests();
};
