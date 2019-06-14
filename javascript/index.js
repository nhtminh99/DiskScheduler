// --> Initialize Chart <--
let ctx                 = document.getElementById("myChart");
let blocks          = [];
let timeline            = [];
let rangeSelector = parseInt(document.getElementById("blocks-range").value) - 1;

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
        data: blocks
      },
      {
        label: "Down direction",
        backgroundColor: "#DC143C",
        borderColor: "#DC143C",
        pointRadius: 6,
        hoverRadius: 9,
        lineTension: 0,
        fill: false,
        data: blocks
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
            max: 999,
            min: 0,
            callback: function (value) {
              for (let i = 0; i < blocks.length; i++) {
                if (
                    blocks[i] === value ||
                    value === rangeSelector ||
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

