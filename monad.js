// A monad that represents Nothing
function Nothing(func) {
    return Nothing;
}

// A monad that represents just one thing
function Just(value) {
    return function (func) {
        return func(value);
    }
}

// Decrements a value by 1 and returns a Monad with its result
function decrement(value) {
    return Just(value - 1);
}

// Logs a value and returns an identity Monad
function log(value) {
    console.log(value);
    return Just(value);
}

// Creates a function that divides a value
// and returns a Monad with the result. It
// returns the `Nothing` Monad if a divide 
// by zero occured 
function divideBy(divisor) {
    return function (value) {
        if (divisor === 0) {
            return Nothing;
        }
    
        return Just(Math.floor(value / divisor));
    }
}

// Returns a function that adds a number
// to another number
function add(number) {
    return function(value) {
        return Just(value + number);
    }
}

function successMonad() {
    console.log('\nSuccess monad: ');
    Just(10)(decrement)(divideBy(5))(add(7))(log);
}

function successMonad2() {
    console.log('\nSuccess monad: ');
    // returns a function which takes a funciton and calls 10 on it
    const f1 = Just(10)
    f1((arg) => {
        console.log(arg)
    })
}


function failureMonad() {
    console.log('\nFailure monad: ');
    // This monad wont print anything because the divideBy 0 with abort the chain
    Just(10)(decrement)(divideBy(0))(add(7))(log);
}

function execute(monad) {
    // Uncomment to see how these work
    // successMonad();
    // failureMonad();
    return evenMonad(monad);
}
function checkValue(val)  {
     if (val % 2 !== 0) {
            return Nothing;
    }
    else {
        return Just(val)
    };
}

function evenMonad(monad) {
    // Update this monad to filter out odd numbers. 
    // If the number after decrementing by 1, dividing by 3, and adding 8 is odd
    // then the monad should return Nothing. If its even, then it should return the
    // result

    console.log('Filtering monad starting with a ');
    monad(log)
    
    console.log('Final value: ')
    const temp =  monad(decrement)(divideBy(3))(add(8))(log)
    console.log(temp(checkValue))
    return temp(checkValue)
}


