let button = document.getElementById('submit');
let result = document.getElementById('result');

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

    // console.log(total, count);

    const min = 26.00;
    const max = 28.00;
    let counter = [];

    for (let i = 0; i < count; i++) {
        counter.push(parseFloat((Math.random() * (min-max) + max).toFixed(2)));
        console.log(parseFloat((Math.random() * (min-max) + max).toFixed(2)));
    }

    let arraySum = counter.reduce(function (a,b) {
        return a + b;
    })
    let overCount = arraySum - total;

    // if (total-arraySum > 0) {
    //     overCount = total-arraySum;
    // } else if (total-arraySum < 0) {
    //     overCount = (total-arraySum) * -1
    // }

    console.log('Total in array: ',arraySum);
    console.log('Over Count: ', overCount);
    let multiplier = overCount / count;

     let recalculated = counter.map(function (value) {


            // console.log('Multiplier: ', multiplier);

            if (overCount > 0){
                if (value > (min + multiplier)) {
                    overCount = overCount - multiplier;
                    // console.log('Over Count: ', parseFloat(overCount).toFixed(2));
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
            }


     })

    let newSummary = recalculated.reduce(function (a, b) {
        return a + b;
    })
    console.log('Recalculated summary: ', newSummary);
    console.log('Over Count: ', overCount);
    console.table(recalculated);


    function generateTableHead(table) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        let th = document.createElement("th");
        let text = document.createTextNode('Сгенерированные значения');
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

    let printOverCount = document.getElementById('overCount');
    printOverCount.innerText = parseFloat(overCount).toFixed(2);

    let printSummary = document.getElementById('Summary');
    printSummary.innerText = parseFloat(newSummary).toFixed(3);
});

