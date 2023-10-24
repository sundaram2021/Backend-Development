import supertest from "supertest"
import { app } from "../index"


describe("Todo", () => {

    describe("get todo route", () => {

        describe("given the todo does not exist", () => {

            it("should return a 404", async() => {
                const id = "todo12312323"
                
                await supertest(app).get(`/todos/${id}`).expect(404);
            })
        })
    })
})