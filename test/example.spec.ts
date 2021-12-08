import test from "japa";

test.group("Exemplo", () => {
    test('assert sum', (assert) => {
        assert.equal(2 + 2, 4);
    })
});