const args: string[] = process.argv.slice(2);

const digitArray: number[] = args.map((argument: string) => {
    const nb = parseFloat(argument); 
    if (!isNaN(nb) && Number.isInteger(nb) && nb < 10) {
        return nb;
    } else {
        console.error("Arguments must be digits");
        process.exit();
    }
})

function increment(digitArray: number[]) {
    let add = 1;
    const resultArray: number[] = []
    digitArray.reverse().forEach(digit => {
        let result = digit + add;
        if (result > 9) {
            add = 1;
            result = 0;
        } else {
            add = 0;
        }
        resultArray.unshift(result);
    })
    
    if (resultArray[0] === 0) {
        resultArray.unshift(1);
    }

    return resultArray;
}

console.log(`Arg => ${digitArray.join("")}`)
console.log(`Result => ${increment(digitArray).join("")}`)