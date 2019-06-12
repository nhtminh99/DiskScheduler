// apply
function applyFCFS() {
  console.log(">> FCFS chosen");
  chooseFCFS();
  console.log(blocksList);
  console.log("Counter: " + blocksList.length);
  timeline = [];
  for (let i = 0; i < blocksList.length; i++) {
    timeline.push(i);
  }
  myChart.data.datasets[0].data = blocksList;
  myChart.data.datasets[1].data = [];
  myChart.data.labels = timeline;
  myChart.update();
}

function applySSTF() {
  console.log(">> SSTF chosen");
  chooseSSTF();
  let newBlocksList = SSTF(blocksList);
  console.log(newBlocksList);
  console.log("Counter: " + newBlocksList.length);
  timeline = [];
  for (let i = 0; i < newBlocksList.length; i++) {
    timeline.push(i);
  }
  myChart.data.datasets[0].data = newBlocksList;
  myChart.data.datasets[1].data = [];
  myChart.data.labels = timeline;
  myChart.update();
}

// TODO: bug here, it returns an undefined variable
function applySCANUP() {
  console.log(">> SCAN chosen");
  chooseSCAN();
  let scanupList = scan_up(blocksList,blocksRangeSelector);
  let scandownList = scan_down(blocksList);
  console.log(scanupList);
  console.log("Counter: " + scanupList.length);
  timeline = [];
  // TODO: có thể có trường hợp UP dài hơn DOWN và ngược lại
  let timeLength = scanupList.length > scandownList.length ? scanupList.length : scandownList.length;
  for (let i = 0; i < timeLength; i++) {
    timeline.push(i);
  }
  myChart.data.datasets[0].data = scanupList;
  myChart.data.datasets[1].data = scandownList;
  myChart.data.labels = timeline;
  myChart.update();
}

function applyCSCANUP() {
  console.log(">> CSCAN chosen");
  chooseCSCAN();
  let cscanupList = cscan_up(blocksList, blocksRangeSelector);
  let cscandownList = cscan_down(blocksList, blocksRangeSelector);
  console.log(cscanupList);
  console.log("Counter: " + cscanupList.length);
  timeline = [];
  // TODO: có thể có trường hợp UP dài hơn DOWN và ngược lại
  let timeLength = cscanupList.length > cscandownList.length ? cscanupList.length : cscandownList.length;
  for (let i = 0; i < timeLength; i++) {
    timeline.push(i);
  }
  myChart.data.datasets[0].data = cscanupList;
  myChart.data.datasets[1].data = cscandownList;
  myChart.data.labels = timeline;
  myChart.update();
}

function applyLOOKUP() {
  console.log(">> LOOK chosen");
  chooseLOOK();
  let lookupList = look_up(blocksList);
  let lookdownList = look_down(blocksList);
  console.log(lookupList);
  console.log("Counter: " + lookupList.length);
  timeline = [];
  // TODO: có thể có trường hợp UP dài hơn DOWN và ngược lại
  let timeLength = lookupList.length > lookdownList.length ? lookupList.length : lookdownList.length;
  for (let i = 0; i < timeLength; i++) {
    timeline.push(i);
  }
  myChart.data.datasets[0].data = lookupList;
  myChart.data.datasets[1].data = lookdownList;
  myChart.data.labels = timeline;
  myChart.update();
}

function applyCLOOKUP() {
  console.log(">> CLOOK chosen");
  chooseCLOOK();
  let clookupList = CLook_up(blocksList);
  let clookdownList = CLook_down(blocksList);
  console.log(clookupList);
  console.log("Counter: " + clookupList.length);
  timeline = [];
  // TODO: có thể có trường hợp UP dài hơn DOWN và ngược lại
  let timeLength = clookupList.length > clookdownList.length ? clookupList.length : clookdownList.length;
  for (let i = 0; i < timeLength; i++) {
    timeline.push(i);
  }
  myChart.data.datasets[0].data = clookupList;
  myChart.data.datasets[1].data = clookdownList;
  myChart.data.labels = timeline;
  myChart.update();
}

// implementation
function SSTF(array) {
    let InputArraySize = array.length;
    let temp = new Array();
    temp = array.slice(0);
    let StarterPoint = temp[0];
    let outputArray = [StarterPoint];
    let a, b;
  
    temp.sort(function(a, b) {
      return a - b;
    });
    let index = temp.indexOf(StarterPoint);
    if (index == -1) {
      return [];
    }
    let cuoi = index + 1,
        dau = index - 1;
    let dem = 1;
    while (index <= InputArraySize - 1 && index >= 0) 
    {
      if (index === InputArraySize - 1 && dau >= 0) {
        temp.splice(dau + 1, InputArraySize - dau - 1);
        outputArray = outputArray.concat(temp);
        break;
      } else if (cuoi <= InputArraySize - 1 && index === 0) {
        temp.splice(0, cuoi);
        outputArray = outputArray.concat(temp);
        break;
      }
      a = temp[cuoi] - temp[index];
      b = temp[index] - temp[dau];
      if (a > b) {
        outputArray[dem] = temp[dau];
        dem++;
        index--;
        dau--;
      } else {
        outputArray[dem] = temp[cuoi];
        dem++;
        index++;
        cuoi++;
      }  
    }
    return outputArray;
}

function scan_up(array, blockrange) {
  let InputArraySize = array.length;
  let StarterPoint = array[0];
  let temp = new Array();
  temp = array.slice(0);
  temp.sort((a, b) => a - b);
  let index = temp.indexOf(StarterPoint);

  if (index > 0) {
    temp[temp.length] = blockrange;
    InputArraySize++;
  }
  arr5 = temp.splice(index, InputArraySize - index); // CAT MANG
  arr5 = arr5.concat(temp.reverse()); // GHEP MANG
  return arr5;
}

function look_up(array) {
  let InputArraySize = array.length;
  let StarterPoint = array[0];
  let temp = new Array();
  temp = array.slice(0);

  temp.sort((a, b) => a - b);
  var index = temp.indexOf(StarterPoint);
  let OutputArray = temp.splice(index, InputArraySize - index);
  OutputArray = OutputArray.concat(temp.reverse());
  return OutputArray;
}

function cscan_up(array, blockrange) {
  let InputArraySize = array.length;
  let StarterPoint = array[0];
  let temp = new Array();
  temp = array.slice(0);
  temp.sort((a, b) => a - b);
  var index = temp.indexOf(StarterPoint);

  if (index > 0) {
    index += 1;
    temp.unshift(0);
    InputArraySize++;
    temp[temp.length] = blockrange;
    InputArraySize++;
  }

  let OutputArray = temp.splice(index, InputArraySize - index);
  OutputArray = OutputArray.concat(temp);
  return OutputArray;
}

function CLook_down(array) {
  let InputArraySize = array.length;
  let StarterPoint = array[0];
  let temp = new Array();
  temp = array.slice(0);
  temp.sort(function(a, b) {
    return b - a;
  });
  var index = temp.indexOf(StarterPoint);
  let arr6 = temp.splice(index, InputArraySize - index + 1);
  arr6 = arr6.concat(temp);
  return arr6;
}
/*let array = [500,100,900];
let newarr = SSTF(array);
console.log(newarr);*/
function scan_down(array) {
  let InputArraySize = array.length;
  let StarterPoint = array[0];
  let temp = new Array();
  temp = array.slice(0);

  temp.sort((a, b) => b - a);
  var index = temp.indexOf(StarterPoint);
  if (index > 0) {
    temp[temp.length] = 0;
    InputArraySize++;
  }

  arr5 = temp.splice(index, InputArraySize - index); // CAT MANG
  arr5 = arr5.concat(temp.reverse()); // GHEP MANG
  return arr5;
}

function look_up(array) {
  let InputArraySize = array.length;
  let StarterPoint = array[0];
  let temp = new Array();
  temp = array.slice(0);

  temp.sort((a, b) => a - b);
  var index = temp.indexOf(StarterPoint);

  let OutputArray = temp.splice(index, InputArraySize - index);
  OutputArray = OutputArray.concat(temp.reverse());
  return OutputArray;
}

function look_down(array) {
  let InputArraySize = array.length;
  let StarterPoint = array[0];
  let temp = new Array();
  temp = array.slice(0);

  temp.sort((a, b) => b - a);
  var index = temp.indexOf(StarterPoint);

  let OutputArray = temp.splice(index, InputArraySize - index);
  OutputArray = OutputArray.concat(temp.reverse());
  return OutputArray;
}

function cscan_down(array, blockrange) {
  let InputArraySize = array.length;
  let StarterPoint = array[0];
  let temp = new Array();
  temp = array.slice(0);

  temp.sort((a, b) => b - a);
  var index = temp.indexOf(StarterPoint);

  if (index > 0) {
    index += 1;
    temp.unshift(blockrange);
    InputArraySize++;
    temp[temp.length] = 0;
    InputArraySize++;
  }

  let OutputArray = temp.splice(index, InputArraySize - index);
  OutputArray = OutputArray.concat(temp);
  return OutputArray;
}

function CLook_up(array) {
  let InputArraySize = array.length;
  let StarterPoint = array[0];
  let temp = new Array();
  temp = array.slice(0);

  temp.sort(function(a, b) {
    return a - b;
  });
  var index = temp.indexOf(StarterPoint);

  let arr6 = temp.splice(index, InputArraySize - index + 1);
  arr6 = arr6.concat(temp);
  return arr6;
}
