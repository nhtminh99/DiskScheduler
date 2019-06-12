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
    // TODO: check side effects
    // add new block to blockList
    let blockListText = document.getElementById("blocks-list").value;
    let newBlock = fillter(blockListText);
    if (newBlock === false)
    {
        window.alert("Array string is not valid");
        return false;
    }
    // update block range
    blocksRangeSelector = parseInt(document.getElementById("blocks-range").value);
    for (let index = 0; index < blocksList.length; index++) {
        if (blocksList[index] > blocksRangeSelector) {
            window.alert(blocksRangeSelector + " is not valid. Please try again");
            return false;
        }
    }
    myChart.options.scales.yAxes[0].ticks.max = blocksRangeSelector;
    for (let block in newBlock)
    {
        if (newBlock[block] > blocksRangeSelector)
        {
            window.alert(newBlock + " is not valid. Please try again");
            return false;
        }
    }
    blocksList = newBlock;
    // update chart depends on what algorithm is chosen
    if (document.getElementById("FCFS").classList.contains("active")) {
        applyFCFS();
    } else if (document.getElementById("CSCAN").classList.contains("active")) {
        applyCSCANUP();
    } else if (document.getElementById("LOOK").classList.contains("active")) {
        applyLOOKUP();
    } else if (document.getElementById("SSTF").classList.contains("active")) {
        applySSTF();
    } else if (document.getElementById("SCAN").classList.contains("active")) {
        applySCANUP();
    } else if (document.getElementById("CLOOK").classList.contains("active")) {
        applyCLOOKUP();
    }
    // re-update chart
    myChart.update();
    return true;
}

function printArray(array) {
    for (let i in array) {
        console.log(array[i]);
    }
}

function checkInput(string) {
    for (let i = 0; i < string.length; i++) {
        if (isNaN(string[i]) === true) {
            return false;
        }
    }
    return true;
}

function fillter(string) {
    if (!checkInput(string)) {
        console.log("Input is invalid");
        return false;
    } else {
        let array = string.split(" ");
        for (let i = 0; i < array.length; i++) {
            if (array[i] === "") {
                array.splice(i, 1);
                i--;
            }
            array[i] = Number(array[i]);
        }
        return array;
    }
}