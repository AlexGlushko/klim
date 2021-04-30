let button = document.getElementById('submit');
let result = document.getElementById('result');

button.addEventListener('click', function(event) {
    event.preventDefault();

    const needRound = parseFloat(document.getElementById('total').value);
    const total = parseFloat(needRound.toFixed(3));
    const count = Math.round(parseInt(document.getElementById('count').value));

    if (isNaN(total)) {
        if (confirm('T(total) дожен быть целым или дробным')) {window.location.reload();}
    }
    if (isNaN(count)) {
        if (confirm('Кол-во ходок должно быть дожен быть целым или дробным')) {window.location.reload();}
    }

    // console.log(total, count);

    const min = 26.500;
    const max = 27.500;
    let counter = [];

    for (let i = 1; i < count; i++) {
        counter.push(parseFloat((Math.random() * (min-max) + max).toFixed(3)));
        // console.log(parseFloat((Math.random() * (min-max) + max).toFixed(3)));
    }

    let arraySum = counter.reduce(function (a,b) {
        return a + b;
    })
    let overCount = total-arraySum;
    // console.log('Total in array: ',arraySum);
    // console.log('Over Count: ', overCount);

    let multiplier = overCount / count;

     let recalculated = counter.map(function (value) {
         if (overCount > 0) {
             let newValue;
             if ((max - value) > multiplier) {
                 overCount = overCount - multiplier;
                 newValue = value + multiplier;
                 if ((max - newValue) > multiplier){
                     newValue += multiplier
                 }
                 return parseFloat(newValue.toFixed(3));
             } else if ((value - min) >= multiplier) {
                 overCount = overCount - multiplier;
                 newValue = value - multiplier;
                 return parseFloat(newValue.toFixed(3));
             } else {
                 return parseFloat(value.toFixed(3));
             }
         }
     })
    let newSummary = recalculated.reduce(function (a, b) {
        return a + b;
    })
    // console.log('Recalculated summary: ', newSummary);
    // console.log('Over Count: ', overCount);
    // console.table(recalculated);

    let json = JSON.stringify(recalculated);
     console.log(json);

    function generateTableHead(table) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        let th = document.createElement("th");
        let text = document.createTextNode('List');
        th.appendChild(text);
        row.appendChild(th);
    }
    function generateTable(table, data) {
        for (let element of data) {
            let row = table.insertRow();

                let cell = row.insertCell();
                let text = document.createTextNode(element);
                cell.appendChild(text);

        }
    }
    let table = document.querySelector("table");
    generateTableHead(table);
    generateTable(table, recalculated);


});

// if (value < max) {
//     if (overCount > 0) {
//         let over = max - value;
//         overCount = overCount-over;
//         return value + over;
//     } else if (overCount < 0) {
//
//     } else {
//         return value;
//     }
// }