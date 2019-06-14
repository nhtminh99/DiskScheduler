// apply algorithms
function applyFCFS() {
  console.log(">> FCFS chosen");
  chooseFCFS();
  console.log(blocks);
  console.log("Counter: " + blocks.length);
  timeline = [];
  for (let i = 0; i < blocks.length; i++) {
    timeline.push(i);
  }
  myChart.data.datasets[0].data = blocks;
  myChart.data.datasets[1].data = [];
  myChart.data.labels = timeline;
  myChart.update();

  document.getElementById("cylinderSeekResult").value = calculateCylinderSeek(
    blocks
  );
}

function applySSTF() {
  console.log(">> SSTF chosen");
  chooseSSTF();
  let newBlocksList = SSTF(blocks);
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

  document.getElementById("cylinderSeekResult").value = calculateCylinderSeek(
    newBlocksList
  );
}

function applySCAN() {
  console.log(">> SCAN chosen");
  chooseSCAN();
  let scanupList = scan_up(blocks, rangeSelector);
  let scandownList = scan_down(blocks);
  console.log(scandownList);
  console.log("Counter: " + scanupList.length);
  timeline = [];

  let timeLength =
    scanupList.length > scandownList.length
      ? scanupList.length
      : scandownList.length;
  for (let i = 0; i < timeLength; i++) {
    timeline.push(i);
  }
  myChart.data.datasets[0].data = scanupList;
  myChart.data.datasets[1].data = scandownList;
  myChart.data.labels = timeline;
  myChart.update();

  document.getElementById(
    "cylinderSeekResult"
  ).value = `${calculateCylinderSeek(
    scanupList
  )} UP and ${calculateCylinderSeek(scandownList)} DOWN`;
}

function applyCSCAN() {
  console.log(">> CSCAN chosen");
  chooseCSCAN();
  let cscanupList = cscan_up(blocks, rangeSelector);
  let cscandownList = cscan_down(blocks, rangeSelector);
  console.log(cscandownList);
  console.log("Counter: " + cscanupList.length);
  timeline = [];

  let timeLength =
    cscanupList.length > cscandownList.length
      ? cscanupList.length
      : cscandownList.length;
  for (let i = 0; i < timeLength; i++) {
    timeline.push(i);
  }
  myChart.data.datasets[0].data = cscanupList;
  myChart.data.datasets[1].data = cscandownList;
  myChart.data.labels = timeline;
  myChart.update();

  document.getElementById(
    "cylinderSeekResult"
  ).value = `${calculateCylinderSeek(
    cscanupList
  )} UP and ${calculateCylinderSeek(cscandownList)} DOWN`;
}

function applyLOOK() {
  console.log(">> LOOK chosen");
  chooseLOOK();
  let lookupList = look_up(blocks);
  let lookdownList = look_down(blocks);
  console.log(lookdownList);
  console.log("Counter: " + lookupList.length);
  timeline = [];

  let timeLength =
    lookupList.length > lookdownList.length
      ? lookupList.length
      : lookdownList.length;
  for (let i = 0; i < timeLength; i++) {
    timeline.push(i);
  }
  myChart.data.datasets[0].data = lookupList;
  myChart.data.datasets[1].data = lookdownList;
  myChart.data.labels = timeline;
  myChart.update();

  document.getElementById(
    "cylinderSeekResult"
  ).value = `${calculateCylinderSeek(
    lookupList
  )} UP and ${calculateCylinderSeek(lookdownList)} DOWN`;
}

function applyCLOOK() {
  console.log(">> CLOOK chosen");
  chooseCLOOK();
  let clookupList = CLook_up(blocks);
  let clookdownList = CLook_down(blocks);
  console.log(clookdownList);
  console.log("Counter: " + clookupList.length);
  timeline = [];

  let timeLength =
    clookupList.length > clookdownList.length
      ? clookupList.length
      : clookdownList.length;
  for (let i = 0; i < timeLength; i++) {
    timeline.push(i);
  }
  myChart.data.datasets[0].data = clookupList;
  myChart.data.datasets[1].data = clookdownList;
  myChart.data.labels = timeline;
  myChart.update();

  document.getElementById(
    "cylinderSeekResult"
  ).value = `${calculateCylinderSeek(
    clookupList
  )} UP and ${calculateCylinderSeek(clookdownList)} DOWN`;
}

// implementation
function SSTF(array) {
  let InputArraySize = array.length;
  let temp = new Array();
  temp = array.slice(0);
  let StarterPoint = temp[0];
  let OutputArray = [StarterPoint];
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
  while (index < InputArraySize && index >= 0) {
    if (index === InputArraySize - 1 && dau >= -1) {
      temp.splice(dau + 1, InputArraySize - dau - 1);
      OutputArray = OutputArray.concat(temp.reverse());
      break;
    } else if (cuoi <= InputArraySize && index === 0) {
      temp.splice(0, cuoi);
      OutputArray = OutputArray.concat(temp);
      break;
    }
    a = temp[cuoi] - temp[index];
    b = temp[index] - temp[dau];
    if (a > b) {
      OutputArray[dem] = temp[dau];
      dem++;
      index = dau;
      dau--;
    } else {
      OutputArray[dem] = temp[cuoi];
      dem++;
      index = cuoi;
      cuoi++;
    }
  }
  OutputArray = [...new Set(OutputArray)]
  return OutputArray;
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
  OutputArray = temp.splice(index, InputArraySize - index);
  OutputArray = OutputArray.concat(temp.reverse()); 
  OutputArray = [...new Set(OutputArray)];
  return OutputArray;
}

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
  OutputArray = temp.splice(index, InputArraySize - index);
  OutputArray = OutputArray.concat(temp.reverse()); 
  OutputArray = [...new Set(OutputArray)];
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
  OutputArray = [...new Set(OutputArray)];
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
  OutputArray = [...new Set(OutputArray)];
  return OutputArray;
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
  OutputArray = [...new Set(OutputArray)];
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
  OutputArray = [...new Set(OutputArray)];
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

  let OutputArray = temp.splice(index, InputArraySize - index + 1);
  OutputArray = OutputArray.concat(temp);
  OutputArray = [...new Set(OutputArray)];
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
  let OutputArray = temp.splice(index, InputArraySize - index + 1);
  OutputArray = OutputArray.concat(temp);
  OutputArray = [...new Set(OutputArray)];
  return OutputArray;
}

const calculateCylinderSeek = blocksArray => {
  let totalCylinderSeek = 0;
  for (let index = 0; index < blocksArray.length - 1; index++) {
    totalCylinderSeek += Math.abs(blocksArray[index + 1] - blocksArray[index]);
  }
  return totalCylinderSeek;
};
