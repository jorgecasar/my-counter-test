import { describe } from '@asdgf/core';
import { assert, html } from '@open-wc/testing';
import { fixture, fixtureCleanup } from '@open-wc/testing-helpers/pure';

export const runTests = (MyCounter) => {
  describe('My Counter', ({ it, afterEach }) => {
		afterEach(fixtureCleanup);
		it('<my-counter> is an instance of MyCounter', async () => {
			const element = document.createElement('my-counter');
			assert.instanceOf(element, MyCounter);
		});

		it('has by default property value of 0', async () => {
			const el = await fixture(html`<my-counter></my-counter>`);
			assert.deepEqual(el.count, 0);
		});

		it('could be initilized by attribute', async () => {
			const el = await fixture(html`<my-counter count="5"></my-counter>`);
			assert.deepEqual(el.getAttribute('count'), '5');
			assert.deepEqual(el.count, 5);
		});

		it('attribute reflects property changes', async () => {
			const el = await fixture(html`<my-counter></my-counter>`);
			el.count = 5;
			assert.equal(el.getAttribute('count'), '5');
		});

		it('property is of type Number', async () => {
			const el = await fixture(html`<my-counter></my-counter>`);
			assert.isNumber(el.count);
		});

		it('property reflects attribute changes', async () => {
			const el = await fixture(html`<my-counter></my-counter>`);
			assert.equal(el.count, 5);
		});

		it('inc() adds one to the counter', async () => {
			const el = await fixture(html`<my-counter></my-counter>`);
			el.inc();
			assert.equal(el.count, 1);
		});

		it('dec() reduce by one the counter', async () => {
			const el = await fixture(html`<my-counter></my-counter>`);
			el.dec();
			assert.equal(el.count, -1);
		});

		it('dispatch an event on count changed', async () => {
			const el = await fixture(html`<my-counter></my-counter>`);
			setTimeout(() => el.inc());
			let { detail } = await oneEvent(el, 'count-changed');
			assert.equal(detail, 1);
			setTimeout(() => el.dec());
			({ detail } = await oneEvent(el, 'count-changed'));
			assert.equal(detail, 0);
		});

		it('Shadow DOM is an instance of ShadowRoot', async () => {
			const el = await fixture(html`<my-counter></my-counter>`);
			assert.instanceOf(el.shadowRoot, ShadowRoot);
		});

		it('Shadow DOM is open', async () => {
			const el = await fixture(html`<my-counter></my-counter>`);
			assert.equal(el.shadowRoot.mode, 'open');
		});
	});
	executeTests().then(console.log);

	/**
	 * Returns a test report
	 */
	executeTests().then(console.log);
};
