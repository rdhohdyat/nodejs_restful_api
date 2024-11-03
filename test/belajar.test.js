import {sum} from "./math.js";

describe("Pengujian function penjumlahan", () => {
    test("seharusnya 1 + 1 = 2", () => {
        const hasil = sum(1, 1);
        expect(hasil).toBe(2);
    });

    test("seharusnya 2 + 3 = 5", () => {
        const hasil = sum(2, 3);
        expect(hasil).toBe(5);
    });

    test("seharusnya -2 + -3 = -5", () => {
        const hasil = sum(-2, -3);
        expect(hasil).toBe(-5);
    });

    test("seharusnya 5 + -3 = 2", () => {
        const hasil = sum(5, -3);
        expect(hasil).toBe(2);
    });

    test("seharusnya 5 + 0 = 5", () => {
        const hasil = sum(5, 0);
        expect(hasil).toBe(5);
    });
})