import {app} from "../src/application/main.js";
import { prismaClient } from "../src/application/database.js";
import supertest from "supertest";
import bcrypt from "bcrypt";

describe('POST /api/users/register', function () {
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        });
    });

    it('Berhasil mendaftarkan user baru', async () => {
        const result = await supertest(app)
            .post('/api/users/register')
            .send({
                username: "test",
                password: 'rahasia',
                role : "admin",
                name: 'Ridho hidayat'
            });

        console.log(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('Ridho hidayat');
        expect(result.body.data.password).toBeUndefined();
    });

    it('Gagal mendaftarkan akun ketika inputan kosong', async () => {
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

    it('Gagal mendaftarkan akun sudah terdaftar', async () => {
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

describe('POST /api/users/login', function () {
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

    it("Berhasil melakukan login", async () => {
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

    it("Gagal melakukan login saat inputan tidak valid", async () => {
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

describe('GET /api/users', function () {
    it('Berhasil mendapatkan daftar user', async () => {
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