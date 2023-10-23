// import { sum } from '../src/index';




describe("Number operations", () => {
    test("sum of 2 and 3 = 5 ", () => {
        let a = 2;
        let b = 3;
    
        expect(a + b).toBe(5);
    })
    
    test("sum of 4 and 5 is not 10", () => {
        let a = 4;
        let b = 5;
    
        expect(a + b).not.toBe(10);
    })
})


describe("Testing Undefined", () => {
    
    test("should be undefined", () => {
        let a = undefined;

        expect(a).toBeUndefined();
        expect(a).not.toBeTruthy();
        expect(a).toBeFalsy();
        expect(a).not.toBeDefined();
    })

    test("Number comparision", () => {
        let a = 10;
        let b = 10;

        expect(a).toBe(b);
        expect(a).not.toBeGreaterThan(b);
        expect(a).not.toBeLessThan(b);
        expect(a).toBeLessThanOrEqual(b);
    })
    

    test("String testing", () => {
        let a = "Hello World";

        expect(a).not.toBeUndefined();
        expect(a).toBeTruthy();
        expect(a).toBeDefined();
        expect(a).toMatch(/world/i);
    })

    const shoppingList = ["paper-towel", "toilet-paper", "sanitizer", "masks"]

    test("Array testing", () => {
        expect(shoppingList).toContain("sanitizer");
        expect(shoppingList).not.toContain("soap");
        
    })
})


describe("Testing with the reference equality", () => {
    const user = {
        name: "sk"
    }
    user['age'] = 23;

    test("should return user with age equals to 23" , () => {
        expect(user).toEqual({
            name: "sk",
            age: 23
        })
    })

    test("should return a user with name and age as a key", () => {
        expect(user).toEqual({
            name: expect.any(String),
            age: expect.any(Number)
        })
    })


    // testing array equality

    test("Array equality", () => {
        const users = ["Clement", "Sarah", "July"];
        
        users.push("Sundaram");

        const userObjectInArray = [
            {
                user: "Clement",
                age: 23,
            },
            {
                user: "Sarah",
                age: 25,
            },
            {
                user: "sundaram",
                age: 21,
            },
            {
                user: "Aman",
                age: 21,
            },
        ]

        userObjectInArray.push({
            user: "Phil",
            age: 56
        })

        expect(userObjectInArray).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    user: expect.any(String),
                    age: expect.any(Number)
                })
            ])
        )

        expect(users).toEqual(["Clement", "Sarah", "July", "Sundaram"])
        expect(users).toEqual(expect.arrayContaining(["Sarah"]))
    })
})



describe("Testing function", () => {

    const sum = (a, b) => a + b;

    test("sum fn return should be a number", () => {
        expect(sum(4, 5)).toBe(expect.any(Number));
    })

    test("sum of 2 and 3 should be 5", () => {
        expect(sum(2, 3)).toBe(5);
    })
})