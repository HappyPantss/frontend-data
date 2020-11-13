# frontend-data
![RDW Pie Chart](https://i.imgur.com/QPOQOLO.gif)

This is the repository for frontend-data CMD 2020/2021.

Code example from: https://www.youtube.com/watch?v=lnXf1mpFGb8&t=78s&ab_channel=FrontendTips<br>
VizHub version (UP TO DATE): https://vizhub.com/HappyPantss/673013ca00df472da1a3dfa7a6b55aaf?edit=files&file=index.html

# Debrief
In this course we will make a data visualization for the 'De Volkskrant' newspaper. We got some data to explore. The data is about parking and cars. I have to choose a topic which I think would make a great visualization. These datasets were given by RDW and are opensource. The RDW is a organization that takes care of the registration of motorized vehicles and driving licenses in the Netherlands.

Datasets with information like parking area's, payment method area's and places where tickets can be bought, can be found. 

The first thing we have to do is clean the data, so clean up all the empty spaces for example. After that we have to visualize it using JavaScript and a library (D3) to make something nice.

# Research questions
How are Park and Ride parking spaces have been added in the past few years?

I want to know why Park and Ride spaces are developed, why **you** should use them, and more.

For more information, click [here](https://github.com/HappyPantss/functional-programming/wiki/Research#questions).

## API
To get the data I want, I use the API from RDW called `https://opendata.rdw.nl/resource/6wzd-evwu.json`

The data I want to use, is the startdataarea, because this tells me when the Park & Ride location is build. In the code below I count all the years and set them in a seperate array.<br>
```javascript
// Thanks to @Razpudding / Laurens
  let aantalPerJaarArray = [];
  locationArray.forEach((jaar) => {
    // if the array includes a empty value, change it to 0
    // else make a new array with all the years + number of values
    if (aantalPerJaarArray.find((item) => item.year == jaar) == undefined) {
      aantalPerJaarArray.push({
        year: jaar,
        value: 0,
      });
    }
    // Count for every found item 1 to the value
    aantalPerJaarArray.find((item) => item.year == jaar).value += 1;
  });
  
	makePieChart(aantalPerJaarArray);
```

The array that will come out of this will look something like this:<br>
![Data array](https://i.imgur.com/zIDsMzu.png)

## Most interesting Functional Patterns
To find more about my most interesting Functional Patters, click [here](https://github.com/HappyPantss/frontend-data/wiki/Transforming#functional-programming-in-my-code).

# Installation
**Clone the repository:**<br>
`https://github.com/HappyPantss/functional-programming.git`

**Install NPM:**<br>
`npm install`

# Usage
**Start the local HTTP server on port 8000:**<br>
`npm run start` or `py -m http.server`

**Visit the local website in your browser with:**<br>
`http://localhost:8000/`

# Sources
## Data
RDW. (2020, 13 november). Open Data Parkeren: GEBRUIKSDOEL | Open Data | RDW. https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-GEBRUIKSDOEL/qidm-7mkf<br>

## Code
RDW. (z.d.). Open Data Parkeren. Geraadpleegd 19 oktober 2020, van [https://opendata.rdw.nl/browse?category=Parkeren&provenance=official](https://opendata.rdw.nl/browse?category=Parkeren&provenance=official)<br>
Curran Kelleher. (2018, 23 augustus). Data Visualization 2018 Course Overview. YouTube. https://www.youtube.com/watch?v=4e3NF8ez95w&list=PL9yYRbwpkykvOXrZumtZWbuaXWHvjD8gi&ab_channel=CurranKelleher<br>
4.0 Color Scales - Ordinal. (z.d.). bl.ocks.org. Geraadpleegd op 13 november 2020, van https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9<br>
FrontendTips. (2020, 12 augustus). Pie chart using d3 library #d3js. YouTube. https://www.youtube.com/watch?v=lnXf1mpFGb8&t=621s&ab_channel=FrontendTips<br>

## Code
RGB to hex and hex to RGB. (2011, 11 april). Stack Overflow. [https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)

# With help from:
[Jordy Fronik - joordy](https://github.com/joordy)<br>
[Laurens - razpudding](https://github.com/razpudding)<br>
[Danny de Vries - dandevri](https://github.com/dandevri)<br>
[Robert Spier - roberrrt-s](https://github.com/roberrrt-s)<br>
[Gijs Laarman - gijslaarman](https://github.com/gijslaarman)
