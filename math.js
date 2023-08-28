// Cubic equation using the Cardanо Tartaglia's method.

//Input math and readline libraries

const math = require('mathjs'); //To perform the mathematical calculations
const readline = require('readline'); //To read the inputs from the Terminal

const rl = readline.createInterface({ // Creating an interface for reading/writting to the terminal.
  input: process.stdin, // Read input from standard input
  output: process.stdout // Output to standard output
});

//Asynchronous function to execute the main logic of the program and reading the user's input.

async function main() {
  var a = await askNumber('Enter the value for a: ');
  var b = await askNumber('Enter the value for b: ');
  var c = await askNumber('Enter the value for c: ');
  var d = await askNumber('Enter the value for d: '); 

  /*var a = 11;
  var b = -22;
  var c = 19;
  var d = 44; */
  
  function cubiceq() { // This functions is used to resolve the cubic equation.
    
    var q, r, D, shiftedCoef, sri1, sri2, cubicRootR, angleForRoots; // Create all the variables for the code.

    if (a == 0) { // If the leading coefficient 'a' introduced is zero, it's not a cubic equation, it is a quadratic equation.
      console.log("\nThe leading coefficient must be non-zero.\n"); // Display the message via console.
      return; // End of if (a == 0).
    }
    if (d == 0) { // If the constant 'd' introduced is zero, then everything divided by "x" is transformed to quadratic equation.
      console.log("\nA root is 0. Dividing by x is a quadratic equation.\n"); // Display the message via console.
      return; // End of if (d == 0).
    }
    

    // This step to divide all coefficients by 'a', and simplifies the equation.
    b = b / a;
    c = c / a;
    d = d / a;

    q = (3*c - (Math.pow(b, 2))) / 9; // Intermediate value q.
    r = ((9 * c - 2 * (Math.pow(b,2)))*b -(27 * d))/54; // Intermediate value r.

    D = Math.pow(q,3) + Math.pow(r,2); // Discriminant part using the intermediate values.
    shiftedCoef = b / 3; // divide b by 3. It is shifted because the value is updated during the code.

    if (D > 0) { // If D is greater than 0, calculate real and imaginary solutions.
      sri1 = r + Math.sqrt(D); // Calculate value of sri1(solution real-imaginary 1).
      sri1 = ((sri1 < 0) ? -Math.pow(-sri1, (1 / 3)) : Math.pow(sri1, (1 / 3))); // if "sri1" is negative, the expression after "?" is executed. If this condition is true, the expression before the colon : is executed; else, the expression after the colon : is executed.
      sri2 = r - Math.sqrt(D); // Calculate value of sri2(solution real-imaginary 2).
      sri2 = ((sri2 < 0) ? -Math.pow(-sri2, (1 / 3)) : Math.pow(sri2, (1 / 3))); // The same as per sri1.
      
      const sol1r = (-shiftedCoef + sri1 + sri2).toFixed(7); // Calculate and format the real root 1. sol1r (solution 1 for the real part).
      shiftedCoef = shiftedCoef + (sri1 + sri2) / 2; // Update "shiftedCoef" for the real part.
      const sol2r = (-shiftedCoef).toFixed(7); // Calculate and format the real root 2. sol2r (solution 2 for the real part). The "toFixed(7)" stands for the number of decimals.
      shiftedCoef = Math.sqrt(3) * (-sri2 + sri1) / 2; // Calculate and update "shiftedCoef" for the imaginary part.
      const sol2i = shiftedCoef.toFixed(7); // Calculate and format the imaginary root 1. sol2i (solution 2 for the imaginary part)
      const sol3i = (-shiftedCoef).toFixed(7); // Calculate and format the imaginary root 2. sol2i (solution 3 for the imaginary part)
      
      console.log(`\nX\u2081: ${sol1r}`); // Print real root 1.
      console.log(`X\u2082: ${sol2r} + ${sol2i}i`); // Print real root 2 + imaginary root 2.
      console.log(`X\u2083: ${sol2r} + ${sol3i}i\n`); // Print real root 2 + imaginary root 3.
      return; // Exit the current function.

    } else if (D == 0) { // If D is equal to 0, calculate real solutions. 

      cubicRootR = ((r < 0) ? -Math.pow(-r, (1 / 3)) : Math.pow(r, (1 / 3))); // Checks if the "r" is negative, then "-Math.pow(-r, (1 / 3))" is calculated, else the other part of the ":".
      const sol1r = (-shiftedCoef + 2 * cubicRootR).toFixed(7); // Calculate and format the real root 1.
      const sol2r = (-(cubicRootR + shiftedCoef)).toFixed(7); // Calculate and format the real root 2.
      console.log(`\nX\u2081: ${sol1r}`); // Print real root 1.
      console.log(`X\u2082: ${sol2r}`); // Print real root 2.
      console.log(`X\u2083: ${sol2r}\n`); // Print real root 2, as they are the same.
      return;

    } else { // If D is less than 0, calculate real solutions. 
      
      q = -q; // Change q to negative form. 
      angleForRoots = Math.acos(r / Math.sqrt(Math.pow(q,3))); // The calculation of the three real roots is somewhat simplified if the solutions are rewritten using the following trigonometric formulas.
      cubicRootR = 2 * Math.sqrt(q); // add value to cubicRootR by multiplying square root of q by 2.
      const sol1r = (-shiftedCoef + cubicRootR * Math.cos(angleForRoots / 3)).toFixed(7); // Calculation for the first sol1r.
      const sol2r = (-shiftedCoef + cubicRootR * Math.cos((angleForRoots + 2 * Math.PI) / 3)).toFixed(7); // Calculation for the second sol1r.
      const sol3r = (-shiftedCoef + cubicRootR * Math.cos((angleForRoots + 4 * Math.PI) / 3)).toFixed(7); // Calculation for the third sol1r.
      
      console.log(`\nX\u2081: ${sol1r}`); // Print real root 1.
      console.log(`X\u2082: ${sol2r}`); // Print real root 2.
      console.log(`X\u2083: ${sol3r}\n`); // Print real root 3.
      return;
    }
  }

  await cubiceq(); // It is used to wait the completion of the "cubiceq()" function, as it is asynchronous, including function askNumber below.
  rl.close(); // Closing the readline.
}

function askNumber(question) { // Function named askNumber with "question" as parameter.
  return new Promise(resolve => {  // Return a new named "Promise" that wraps the async. operation with parameter "resolve"
    rl.question(question, answer => { // rl (read line) 
      const num = parseFloat(answer);
      if (isNaN(num)) {  // If the entered information in the Terminal is not a number, then displays the below console.log.
        console.log('Please enter a valid number.');
        resolve(askNumber(question));
      } else { // else, perform the calculation.
        resolve(num);
      }
    });
  });
}

main();