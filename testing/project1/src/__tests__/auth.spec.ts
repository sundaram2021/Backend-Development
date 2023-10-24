import supertest from "supertest"
import { app } from "../index"


describe("Auth", () => {

    describe("get auth route", () => {

        describe("given the userId doesnot exist", () => {
                
            it("should return a 403", async() => {
                const id = "auth-123"
                    
                await supertest(app).get(`/users/${id}`).expect(403);
            })
        })
    })

    describe("get auth route", () => {

        describe("given that user info is correct", () => {

            it("should return a 200", async() => {
                const id = "6536b8affaba194f3b78af7f"
                    
                await supertest(app).get(`/users`).expect(200);
            })
        })
    })
})