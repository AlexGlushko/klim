let button = document.getElementById('submit');
let buttonClear = document.getElementById('clear');

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

    console.log('Total in array: ',arraySum);
    console.log('Over Count: ', overCount);
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
            }
     })

    let newSummary = recalculated.reduce(function (a, b) {
        return a + b;
    })
    // console.log('Recalculated summary: ', newSummary);
    // console.log('Over Count: ', overCount);
    // console.table(recalculated);


    function generateTable(result, data) {
        let el = document.createElement('table')
        el.className = 'table table-hover';
        result.append(el);
        let thead = el.createTHead();
        let row = thead.insertRow();
        let th = document.createElement("th");
        let text = document.createTextNode('Сгенерированные значения');
        th.appendChild(text);
        row.appendChild(th);
        let tbody = el.createTBody()

        for (let element of data) {
            let row = tbody.insertRow();
            let cell = row.insertCell();
            let text = document.createTextNode(element);
            cell.appendChild(text);
        }
    }
    let result = document.getElementById("result");
    console.log(result);
    // generateTableHead(table);
    generateTable(result, recalculated);

    let printOverCount = document.getElementById('overCount');
    printOverCount.innerText = parseFloat(overCount).toFixed(2);

    let printSummary = document.getElementById('Summary');
    printSummary.innerText = parseFloat(newSummary).toFixed(3);
});

