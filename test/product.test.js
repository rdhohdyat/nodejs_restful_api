import {app} from "../src/application/main.js";
import { prismaClient } from "../src/application/database.js";
import supertest from "supertest";

describe("Pengujian Service untuk Produk", () => {

    beforeEach(async () => {
        await prismaClient.product.deleteMany();
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    describe("Mengambil data produk", () => {
        test("seharusnya mengembalikan array kosong jika tidak ada produk", async () => {
            const response = await supertest(app).
            get('/api/product');
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual([]);
        });

        test("seharusnya mengembalikan daftar produk", async () => {

            await prismaClient.product.create({
                data: {
                    name: "Produk 1",
                    description: "Deskripsi Produk 1",
                    image: "https://example.com/image1.jpg",
                    price: 10000,
                    categoryId: 1
                }
            });

            const response = await supertest(app).get('/api/product');
            expect(response.status).toBe(200);

            expect(response.body.data.length).toBe(1);
            expect(response.body.data[0]).toHaveProperty('name', 'Produk 1');
        });
    });

    describe("Menambahkan produk", () => {
        test("seharusnya berhasil membuat produk dengan input yang valid", async () => {
            const productData = {
                name: "Produk Valid",
                description: "Deskripsi Produk Valid",
                image: "https://example.com/image.jpg",
                price: 25000,
                categoryId: 1
            };

            const response = await supertest(app)
                .post('/api/product/create-product')
                .send(productData);

            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('name', 'Produk Valid');
            expect(response.body.data).toHaveProperty('price', 25000);
        });

        test("seharusnya gagal membuat produk jika input tidak valid", async () => {
            const response = await supertest(app)
                .post('/api/product/create-product')
                .send({
                    name: "",
                    description: "",
                    image: "",
                    price: 0,
                    categoryId: 0
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined()
        });
    });

    describe("Update produk", () => {
        test("seharusnya berhasil memperbarui produk", async () => {
            const product = await prismaClient.product.create({
                data: {
                    name: "Produk Lama",
                    description: "Deskripsi Lama",
                    image: "https://example.com/oldimage.jpg",
                    price: 15000,
                    categoryId: 1
                }
            });

            const response = await supertest(app)
                .put(`/api/product/update-product/${product.id}`) // Uniform route structure
                .send({
                    name: "Produk Baru",
                    description: "Deskripsi Baru",
                    image: "https://example.com/newimage.jpg",
                    price: 30000,
                    categoryId: 2
                });

            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('name', 'Produk Baru');
            expect(response.body.data).toHaveProperty('price', 30000);
        });

        test("seharusnya gagal memperbarui jika produk tidak ditemukan", async () => {
            const response = await supertest(app)
                .put('/api/product/update-product/9999')
                .send({
                    name: "Produk Baru",
                    description: "Deskripsi Baru",
                    image: "https://example.com/newimage.jpg",
                    price: 30000,
                    categoryId: 2
                });

            expect(response.status).toBe(400);
        });
    });

    describe("Hapus produk", () => {
        test("seharusnya berhasil menghapus produk", async () => {
            const product = await prismaClient.product.create({
                data: {
                    name: "Produk Hapus",
                    description: "Deskripsi Produk Hapus",
                    image: "https://example.com/deleteimage.jpg",
                    price: 5000,
                    categoryId: 1
                }
            });

            const response = await supertest(app)
                .delete(`/api/product/delete-product/${product.id}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("delete product is successfully");

            const deletedProduct = await prismaClient.product.findUnique({
                where: { id: Number(product.id) }
            });
            expect(deletedProduct).toBeNull();
        });

        test("seharusnya gagal menghapus produk jika produk tidak ditemukan", async () => {
            const response = await supertest(app)
                .delete('/api/product/delete-product/9999');

            expect(response.status).toBe(400);
        });
    });

    describe("Detail produk", () => {
        test("seharusnya mengembalikan detail produk jika produk ditemukan", async () => {

            const product = await prismaClient.product.create({
                data: {
                    name: "Detail Produk",
                    description: "Deskripsi Detail",
                    image: "https://example.com/detailimage.jpg",
                    price: 12000,
                    categoryId: 1
                }
            });

            const response = await supertest(app)
                .get(`/api/product/detail/${product.id}`);

            expect(response.status).toBe(200);
        });

        test("seharusnya mengembalikan error jika produk tidak ditemukan", async () => {
            const response = await supertest(app)
                .get('/api/product/detail/9999');

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("product is not found");
        });
    });
});
