const argument: string = process.argv.slice(2)[0];
const argumentNumber: number = parseFloat(argument);

if (isNaN(argumentNumber)) {
    console.error(`${argument} is not a number`);
    process.exit();
}

function fizzbuzz(value: number) {
    let result = "";

    value % 3 === 0 ? result += "Fizz" : null; 
    value % 5 === 0 ? result += "Buzz" : null;

    console.log(result || value);
}


fizzbuzz(argumentNumber);