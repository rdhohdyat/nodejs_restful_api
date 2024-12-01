import {sum} from "./math.js";

describe("Pengujian function penjumlahan", () => {
    test("seharusnya 1 + 1 = 2", () => {
        const hasil = sum(1, 1);
        expect(hasil).toBe(2);
    });

    test("seharusnya -1 + -1 = -2", () => {
        expect(sum(-1,-1)).toBe(-2)
    })
})