let button = document.getElementById('submit');
let buttonClear = document.getElementById('clear');
let result = {};
const fileSelector = document.getElementById('fileInput');

fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    // console.log(fileList);

    const reader = new FileReader();
    reader.readAsText(fileList[0]);

    reader.onload = function() {

         result['pairs'] = reader.result.match(/^(\d+\.\d+)[	|\S|\W|  |](\d+)$/gm).map(function (value) {
            let matchedArray = value.match(/^(\d+\.\d+)[	|\S|\W|  |](\d+)$/);
            return {total: matchedArray[1], count: matchedArray[2]};
        })

        result.pairs.forEach(function (element) {
            let total = parseFloat(element.total);
            let count = parseInt(element.count);
            calculatePairValues(total, count);
        })

    };

    reader.onerror = function() {
        console.log(reader.error);
    };



    // console.log(result.pairs)
});



buttonClear.addEventListener('click', function (event) {
    let element = document.querySelector('thead');
    element.remove();
});

button.addEventListener('click', function(event) {
    event.preventDefault();

    const needRound = parseFloat(document.getElementById('total').value);
    const total = parseFloat(needRound.toFixed(2));
    const count = Math.round(parseInt(document.getElementById('count').value));

    if (isNaN(total)) {
        if (confirm('T(total) дожен быть целым или дробным')) {window.location.reload();}
    }
    if (isNaN(count)) {
        if (confirm('Кол-во ходок должно быть дожен быть целым или дробным')) {window.location.reload();}
    }

    calculatePairValues(total, count);
});

function calculatePairValues(total, count) {

    const min = 26.00;
    const max = 28.00;
    let counter = [];

    for (let i = 0; i < count; i++) {
        counter.push(parseFloat((Math.random() * (min-max) + max).toFixed(2)));
    }

    let arraySum = counter.reduce(function (a,b) {
        return a + b;
    })
    let overCount = arraySum - total;

    // console.log('Total in array: ',arraySum);
    // console.log('Over Count: ', overCount);
    let multiplier = overCount / count;

    let recalculated = counter.map(function (value) {

        if (overCount > 0){
            if (value > (min + multiplier)) {
                overCount = overCount - multiplier;
                return parseFloat((value - multiplier).toFixed(2));
            } else {
                return value;
            }
        } else if (overCount < 0) {
            if (value < (max - (multiplier * -1 ))) {
                overCount = overCount + (multiplier * -1 );
                return parseFloat((value + (multiplier * -1 )).toFixed(2));
            } else {
                return value;
            }
        } else if (overCount === 0) {
            return value;
        }
    })

    let newSummary = recalculated.reduce(function (a, b) {
        return a + b;
    })
    // console.log('Recalculated summary: ', newSummary);
    // console.log('Over Count: ', overCount);


    let multiplier1 = overCount / count;

    // console.log(multiplier1)
    let recAgain = recalculated.map(function (value) {
            if (overCount > 0){
                if (value > (min + multiplier1)) {
                    overCount = overCount - multiplier1;
                    return parseFloat((value - multiplier1).toFixed(2));
                } else {
                    return value;
                }
            } else if (overCount < 0) {
                if (value < (max - (multiplier1 * -1 ))) {
                    overCount = overCount + (multiplier1 * -1 );
                    return parseFloat((value + (multiplier1 * -1 )).toFixed(2));
                } else {
                    return value;
                }
            } else if (overCount === 0) {
                return value;
            }
        })


    let newSummary2 = recAgain.reduce(function (a, b) {
        return a + b;
    })


    // console.log('Again recalc summary: ', newSummary2);
    // // console.table(recAgain);
    // console.log('Over Count: ', newSummary2 -total);

    let shift = newSummary2 - total;

    if (shift < 0) {
        let shiftRevert = shift * -1;
        recAgain.findIndex(function (element, index) {
            if (element <= 27.3) {
                let newValue = parseFloat(element+shiftRevert).toFixed(2);
                return recAgain.splice(index,1, parseFloat(newValue))
            }
        })
    }

    if (shift > 0) {
        recAgain.findIndex(function (element, index) {
            if (element >= 26.7) {
                let newValue = parseFloat(element - shift).toFixed(2);
                return recAgain.splice(index,1, parseFloat(newValue))
            }
        })
    }


    let newSummary3 = recAgain.reduce(function (a, b) {
        return a + b;
    })
    // console.table(recAgain);
    function generateTable(result, data) {
        let el = document.createElement('table')
        el.className = 'table table-hover table-bordered';
        result.append(el);
        // let thead = el.createTHead();
        // let row = thead.insertRow();
        // let th = document.createElement("th");
        // let text = document.createTextNode('Сгенерированные значения');
        // th.appendChild(text);
        // row.appendChild(th);
        let tbody = el.createTBody()

        for (let element of data) {
            let row = tbody.insertRow();
            let cell = row.insertCell();
            // let cell2 = row.insertCell();
            let text = document.createTextNode(element);
            // let text2 = document.createTextNode(data.length);
            cell.appendChild(text);
            // cell2.appendChild(text2);
        }
    }


    function generateHelperTable(helper, data) {
        let el = document.createElement('table')
        el.className = 'table table-hover table-bordered';
        helper.append(el);
        let tbody = el.createTBody()
        let row;

        for (let element of data) {
            row = tbody.insertRow();

            let cell2 = row.insertCell();
            let text2 = document.createTextNode(data.length);
            cell2.appendChild(text2);
        }

        let cell3 = row.insertCell();
        let text3 = document.createTextNode('Т, нач.   ' + total);
        cell3.appendChild(text3);

        let cell4 = row.insertCell();
        let text4 = document.createTextNode(' Т, генер   ' +  parseFloat(newSummary3).toFixed(2));
        cell4.appendChild(text4);

        let cell5 = row.insertCell();
        let text5 = document.createTextNode(' Т, погреш.   ' +  (( parseFloat(newSummary3).toFixed(3)) - total).toFixed(2));
        cell5.appendChild(text5);



    }


    let result = document.getElementById("result");
    let helper = document.getElementById("helper");
    // console.log(result);
    // generateTableHead(table);

    generateTable(result, recAgain);
    generateHelperTable(helper, recAgain);



    let printOverCount = document.getElementById('overCount');
    printOverCount.innerText = parseFloat(total-newSummary3).toFixed(2);

    let printSummary = document.getElementById('Summary');
    printSummary.innerText = parseFloat(newSummary3).toFixed(2);
}