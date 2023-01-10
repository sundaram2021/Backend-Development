process.stdout.write("Hello ----------> \n\n")

const questions = [
    "what is your name?",
    "what would you prefer rather doing?",
    "what is your preffered programming language"
];
const answers = [];

function ask(i=0){
    process.stdout.write(`\n\n\n ${questions[i]}`)
    process.stdout.write(` > `)
}

ask();

process.stdin.on("data", function (data) {
    answers.push(data.toString().trim())

    if(answers.length < questions.length){
        ask(answers.length)
    } else {
        process.exit();
    }
})

process.on("exit", function(){
    process.stdout.write("\n\n\n");
    process.stdout.write(`Your name is : ${answers[1]}\nYou can do ${answers[1]} after finishing\nYour Preffered language is : ${answers[2]}`)
})


