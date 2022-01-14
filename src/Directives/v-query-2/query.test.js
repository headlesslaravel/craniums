/**
 * @jest-environment jsdom
 */

import Query from './query';

test('using data-children to remove children from payload on change', () => {
    let payload = {country: 1, state:2, city:3}
    let element = {dataset: {children: ' state, city '}}
    let vQuery = new Query(() => {});
    vQuery.removeChildren(element, payload)
    expect(Object.keys(payload).length).toBe(1)
    expect(payload.country).toBe(1)
});