// FIRST NEW: oogKleur to UpperCase with arrow function
let surveyAnswers = data // requires data from data.js
console.log("Survey Answers are:", surveyAnswers)

const columnName = "oogKleur"
const hexBrown = "663300"
const hexBlue = "0099FF"
const hexGreen = "009900"
const rgbCode = "(139,69,19)"

// Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
let componentToHex = (c) => {
    let hex = c.toString(16); // Kijk naar de cijfers die worden meegegeven, en deel deze per keer door 16 
    return hex.length == 1 ? "0" + hex : hex; // Als hex.length is 1 zet een "0" neer.. anders is het de value van let hex (hex / 16)
}

let rgbToHex = (r, g, b) => {
    return componentToHex(r) + componentToHex(g) + componentToHex(b); // Zet alle gedeelde cijfers achter elkaar.. dit maakt de hexcode
} 

// Arrow function eye colors
const replaceAll = surveyAnswers.map(answer => answer[columnName]
    .replace("#", "")
    .replace(" ", "")
    .toUpperCase()
    .replace("BRUIN", hexBrown)
    // Replace blue and lightblue for 1 hex
    .replace("BLAUW", hexBlue)
    .replace("LICHT", "")
    .replace("GROEN", hexGreen)
    // Replace RGB for hex
    .replace("RGB", "")
    .replace(".", ",")
    .replace(rgbCode, (rgbToHex(139,69,19))) // geef deze cijfers mee aan rgbToHex.. 139 = r, 69 = g, 19 = b
    .replace("", "#")
);

let showBrown = replaceAll.filter(answer => answer === "#" + hexBrown);
let showBlue = replaceAll.filter(answer => answer === "#" + hexBlue);

let bestColor = () => (showBlue.length >= showBrown.length) ? "'Blue' (#0099FF) is more common" : "'Brown' (#663300) is more common";

console.log(replaceAll)
console.log("'Brown' (#663300) colors are:", showBrown)
console.log("'Blue' (#0099FF) colors are:", showBlue)
console.log(bestColor())

// Write everything in a table (kinda working)
const theloop = document.getElementById("loopie")
const holder = theloop;

const makeTable = () => {
    for(var i = 0; i < replaceAll.length; i++){ 
        holder.innerHTML += "<p style='background-color:" + replaceAll[i] + "'>" + replaceAll[i] + "</p>";
    }
}

makeTable();

// Change all background-colors (not working)
// const colorChange = () => {
//     for(var v = 0; v < replaceAll.length; v++){ 
//         document.getElementsByTagName("td").style.color = replaceAll[v];
//     }
// }

// colorChange();

// IF ELSE BLUE
// const replaceBlue = surveyAnswers.filter(answer => {
//     if(answer[columnName].includes("BLUE")){
//         console.log('Er staat blauw in!')
//     } else {
//         console.log('Er staat geen blauw in!')
//     }
// })

// Regular function
// const replaceToUpperCase = surveyAnswers.map(function(answer){
//     return answer[columnName].toLowerCase();
// })

// FIRST OLD (WORKS)
// let surveyAnswers = data // requires data from data.js
// console.log("Survey Answers are:", surveyAnswers)

// const columnName = "oogKleur"
// const specificAnswer = surveyAnswers.map(answer => answer[columnName].toUpperCase())

// console.log("Eye colors: ", specificAnswer)

// SECOND: filter the data with only oogKleur using a function
// const surveyAnswers = data
// const columnName = "oogKleur"

// let lijstAntwoorden = getAnswersForQuestion(surveyAnswers, columnName)

// console.log("lijstAntwoorden: ", lijstAntwoorden)

// // returns all answers for a specific question in an Array
// function getAnswersForQuestion(answers, question){ 
// 	if (answers.length < 1){
// 		console.error("Array must have items in it")
// 		return
// 	}
// 	let answersForQuestion = []
// 	for (answer of answers){
// 		answersForQuestion.push(answer[question])
// 	}
// 	return answersForQuestion //array van antwoorden voor een specifieke vraag
// }

// Bron: https://github.com/Razpudding/selecting-data-json/blob/main/index.js