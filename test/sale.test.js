import supertest from 'supertest';
import { app } from '../src/application/main.js';
import { prismaClient } from '../src/application/database.js';
import bcrypt from 'bcrypt';

describe("Pengujian service untuk Sale", () => {
    let product;
    let user;

    beforeEach(async () => {
        const hashedPassword = await bcrypt.hash("test", 10);
        user = await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                password: hashedPassword
            }
        });

        product = await prismaClient.product.create({
            data: {
                name: "test",
                price: 100,
                image: "fasdffsdfs",
                categoryId: 1,
            }
        });
    });

    afterEach(async () => {
        await prismaClient.sale.deleteMany({
            where: {
                username: user.username,
            }
        });

        await prismaClient.product.deleteMany({
            where: {
                name: "test",
            }
        });

        await prismaClient.user.deleteMany({
            where: {
                username: user.username,
            }
        });
    });

    describe("Menambahkan sale", () => {
        test("seharusnya berhasil membuat sale dengan input yang valid", async () => {
            const saleData = {
                username: user.username,
                totalAmount: 50000,
                paymentMethod: "cash",
                saleItems: [
                    {
                        productId: product.id,
                        quantity: 2,
                        price: 25000,
                        totalPrice: 50000
                    }
                ]
            };

            const response = await supertest(app)
                .post('/api/sale/create-sale')
                .send(saleData);

            expect(response.status).toBe(200);
        });

        test("seharusnya gagal membuat penjualan jika input tidak valid", async () => {
            const invalidSaleData = {
                username: "",
                totalAmount: -50000,
                paymentMethod: "crypto",
                saleItems: []
            };

            const response = await supertest(app)
                .post('/api/sale/create-sale')
                .send(invalidSaleData);

            expect(response.status).toBe(400);
        });
    });

    describe("Menampilkan data sale", () => {
        test("seharusnya mengembalikan daftar penjualan", async () => {
            const response = await supertest(app)
                .get('/api/sale');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe("success");
        });
    });
});
