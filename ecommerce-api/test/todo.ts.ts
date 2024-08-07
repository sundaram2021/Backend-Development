import request from "supertest";
import {app} from "../src/index";

describe("API Endpoints Tests", (): void => {
  describe("GET ROUTES", (): void => {
    test("GET / sample GET route", async (): Promise<void> => {
      const res = await request(app).get("/");

      expect(res.body).toEqual({
        msg: "It's workin'!",
      });
    });

    test("GET route for all items", async (): Promise<void> => {
      const res = await request(app).get("/users");

      expect(res.body.docs.length).toEqual(3);
    });

    test("GET route for single item", async (): Promise<void> => {
      const id = '66a12810f350503d1d9808dc'
      const res = await request(app).get(`/users/${id}`);

      expect(res.body.result[0].username).toEqual('name1');
    });
  })
})