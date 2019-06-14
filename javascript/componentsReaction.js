function turnOffAllActive() {
    document.getElementById("FCFS").classList.remove("active");
    document.getElementById("SSTF").classList.remove("active");
    document.getElementById("SCAN").classList.remove("active");
    document.getElementById("CSCAN").classList.remove("active");
    document.getElementById("LOOK").classList.remove("active");
    document.getElementById("CLOOK").classList.remove("active");
}

// --> Navigation <--
function chooseFCFS() {
    turnOffAllActive();
    document.getElementById("FCFS").classList.add("active");
}

function chooseSSTF() {
    turnOffAllActive();
    document.getElementById("SSTF").classList.add("active");
}

function chooseSCAN() {
    turnOffAllActive();
    document.getElementById("SCAN").classList.add("active");
}

function chooseCSCAN() {
    turnOffAllActive();
    document.getElementById("CSCAN").classList.add("active");
}

function chooseLOOK() {
    turnOffAllActive();
    document.getElementById("LOOK").classList.add("active");
}

function chooseCLOOK() {
    turnOffAllActive();
    document.getElementById("CLOOK").classList.add("active");
}

// --> button 'Add block' clicked <--
function updateChart() {
    // update block range
    let newRangeSelector = parseInt(document.getElementById("blocks-range").value) - 1;
    let newBlocks = convertTextToNumericArray(document.getElementById("blocks-list").value);
    if (newBlocks === false)
    {
        window.alert("List of blocks is not valid");
        return false;
    }
    for (let block of newBlocks)
    {
        if (block > newRangeSelector)
        {
            window.alert(`Range of ${newRangeSelector} is conflict with blocks list`);
            return false;
        }
    }
    rangeSelector = newRangeSelector;
    blocks = newBlocks;
    myChart.options.scales.yAxes[0].ticks.max = rangeSelector;

    // update chart depends on what algorithm is chosen
    if (document.getElementById("FCFS").classList.contains("active")) {
        applyFCFS();
    } else if (document.getElementById("CSCAN").classList.contains("active")) {
        applyCSCAN();
    } else if (document.getElementById("LOOK").classList.contains("active")) {
        applyLOOK();
    } else if (document.getElementById("SSTF").classList.contains("active")) {
        applySSTF();
    } else if (document.getElementById("SCAN").classList.contains("active")) {
        applySCAN();
    } else if (document.getElementById("CLOOK").classList.contains("active")) {
        applyCLOOK();
    }
    // re-update chart
    myChart.update();
    return true;
}

function isNumbersOnly(string) {
    for (let char of string) {
        if (isNaN(char)) {
            return false;
        }
    }
    return true;
}

function convertTextToNumericArray(string) {
    if (!isNumbersOnly(string)) {
        return false;
    }
    else {
        let array = string.split(" ");
        for (let index = 0; index < array.length; index++) {
            if (array[index] === "") {
                array.splice(index, 1);
                index--;
            }
            array[index] = Number(array[index]);
        }
        return array;
    }
}