// --> Initialize Chart <--
let ctx                 = document.getElementById("myChart");
let blocksList          = [];
let timeline            = [];
let blocksRangeSelector = parseInt(document.getElementById("blocks-range").value);

let myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: timeline,
    datasets: [
      {
        label: "Up direction",
        backgroundColor: "#1E90FF",
        borderColor: "#1E90FF",
        pointRadius: 6,
        hoverRadius: 9,
        lineTension: 0,
        fill: false,
        data: blocksList
      },
      {
        label: "Down direction",
        backgroundColor: "#DC143C",
        borderColor: "#DC143C",
        pointRadius: 6,
        hoverRadius: 9,
        lineTension: 0,
        fill: false,
        data: blocksList
      }
    ]
  },
  options: {
    tooltips: {
      callbacks: {
        title: function () { }
      },
      backgroundColor: "rgba(0, 0, 0, 0)",
      bodyFontColor: "#0F52BA",
      bodyFontSize: 27,
      displayColors: false
    },
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            max: 1000,
            min: 0,
            callback: function (value) {
              for (let i = 0; i < blocksList.length; i++) {
                if (
                    blocksList[i] === value ||
                    value === blocksRangeSelector ||
                    value === 0
                ) {
                  return value;
                }
              }
            }
          }
        }
      ]
    }
  }
});

