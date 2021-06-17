// Base temp in Réaumur, blame Imri https://en.wikipedia.org/wiki/Conversion_of_scales_of_temperature
let responseiveness = 300;

// The different temperature scales
let temps = ["celsius", "freedom", "kelvin", "rankine", "delisle", "newton", "reaumur", "romer"]

// Conversion functions
let funcs = {
    fromCelsius: t => t * (4 / 5),
    toCelsius: t => t * (5 / 4),
    fromFreedom: t => (t - 32) * (4 / 9),
    toFreedom: t => t * (9 / 4) + 32,
    fromKelvin: t => (t - 273.15) * (4 / 5),
    toKelvin: t => t * (5 / 4) + 273.15,
    fromRankine: t => (t - 491.67) * (4 / 9),
    toRankine: t => t * (9 / 4) + 491.67,
    fromDelisle: t => 80 - t * (8 / 15),
    toDelisle: t => (80 - t) * (15 / 8),
    fromNewton: t => t * (80 / 33),
    toNewton: t => t * (33 / 80),
    toReaumur: t => t,
    fromReaumur: t => t,
    fromRomer: t => (t - 7.5) * (32 / 21),
    toRomer: t => t * (21 / 32) + 7.5
}

// Create an object for the different input elements and propagate it
let inputs = {}
for (let i in temps) {
    temp = temps[i]
    inputs[temp] = document.getElementById(temp)
}

// Function to propagate inputs with values upon new temperature to convert
const propagate = t => { // temp is in Réaumur
    for (let i in temps) {
        temp = temps[i]
        inputs[temp].value = round(funcs["to" + capFirst(temp)](t), 2)
    }
}

// Generic rounding
const round = (n, p) => Math.round(n * Math.pow(10, p)) / Math.pow(10, p)

// Capitalize first letter in string
const capFirst = str => str.charAt(0).toUpperCase() + str.slice(1)

// Add event listener to all the inputs
for (let i in inputs) {
    let input = inputs[i]
    input.addEventListener("input", evt => {
        let check = evt.target.value
        setTimeout(() => {
            if (evt.target.value != check) return
            propagate(funcs["from" + capFirst(evt.target.id)](evt.target.value))
        }, responseiveness)

    })
}

propagate(0)