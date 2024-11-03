import {app} from "../src/application/main.js";
import { prismaClient } from "../src/application/database.js";
import supertest from "supertest";
import bcrypt from "bcrypt";

describe("Pengujian service untuk user", function () {
    describe('Registrasi user', function () {
        afterEach(async () => {
            await prismaClient.user.deleteMany({
                where: {
                    username: "test"
                }
            });
        });

        test('Berhasil mendaftarkan user baru', async () => {
            const result = await supertest(app)
                .post('/api/users/register')
                .send({
                    username: "test",
                    password: 'rahasia',
                    role : "admin",
                    name: 'Ridho hidayat'
                });


            expect(result.status).toBe(200);
            expect(result.body.data.username).toBe('test');
            expect(result.body.data.name).toBe('Ridho hidayat');
            expect(result.body.data.password).toBeUndefined();
        });

        test('Gagal mendaftarkan akun ketika inputan kosong', async () => {
            const result = await supertest(app)
                .post('/api/users/register')
                .send({
                    username: '',
                    password: '',
                    role : '',
                    name: ''
                });

            console.log(result.body);

            expect(result.status).toBe(400);
            expect(result.body.error).toBeDefined();
        });

        test('Gagal mendaftarkan akun sudah terdaftar', async () => {
            let result = await supertest(app)
                .post('/api/users/register')
                .send({
                    username: "test",
                    password: 'rahasia',
                    role : "admin",
                    name: 'Ridho hidayat'
                });

            expect(result.status).toBe(200);
            expect(result.body.data.username).toBe('test');
            expect(result.body.data.name).toBe('Ridho hidayat');
            expect(result.body.data.password).toBeUndefined();

            result = await supertest(app)
                .post('/api/users/register')
                .send({
                    username: "test",
                    password: 'rahasia',
                    role : "admin",
                    name: 'Ridho hidayat'
                });

            console.log(result.body);

            expect(result.status).toBe(400);
            expect(result.body.error).toBeDefined();
        });
    });

    describe('Login user', function () {
        beforeEach(async () => {
            await prismaClient.user.create({
                data: {
                    username: "test",
                    password: await bcrypt.hash("rahasia", 10),
                    role : "admin",
                    name: "test",
                    token: "test"
                }
            })
        })

        afterEach(async () => {
            await prismaClient.user.deleteMany({
                where: {
                    username: "test"
                }
            });
        });

        test("Berhasil melakukan login", async () => {
            const result = await supertest(app)
                .post('/api/users/login')
                .send({
                    username: "test",
                    password : "rahasia",
                    role : "admin",
                })

            console.log(result.body);

            expect(result.status).toBe(200);
            expect(result.body.data.token).toBeDefined();
            expect(result.body.data.token).not.toBe("test");
        })

        test("Gagal melakukan login saat inputan tidak valid", async () => {
            const result = await supertest(app)
                .post('/api/users/login')
                .send({
                    username: "",
                    password : "",
                    role : "",
                })


            expect(result.status).toBe(400);
            expect(result.body.error).toBeDefined();
        })
    })

    describe('Mengambil data user', function () {
        test('Berhasil mendapatkan daftar user', async () => {
            const result = await supertest(app)
                .get('/api/users')
                .expect(200);

            expect(Array.isArray(result.body.data)).toBe(true);
            expect(result.body.data.length).toBeGreaterThan(0);
            expect(result.body.data[0]).toHaveProperty('username');
            expect(result.body.data[0]).toHaveProperty('name');
            expect(result.body.data[0]).toHaveProperty('role');
        });
    })
})
