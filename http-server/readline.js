const readline = require("readline");

const linedetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const args = process.argv;
const num1 = parseInt(args[2]);
const num2 = parseInt(args[3]);
console.log(`The sum is: ${num1 + num2}`);

linedetail.question("Enter your name: ", (ans) => {
  console.log(`Hi ${ans}`);
  linedetail.close();
});
