import '../../main.scss';
import './pie-chart.scss';
import data from './data.json';

class PieChart {
  constructor(node) {
    this.$node = $(node);
    this.$container = this.$node.find('.pie_chart__content');
    this.data = data.impressions;

    this._init()
  }

  _init() {
    this._addDonutChart()
  }

  _addDonutChart() {
    const { data } = this;

    const radius = 58;

    const donutChart = $(document.createElementNS("http://www.w3.org/2000/svg", "svg")).attr({
      class: 'chart',
      width: '100%',
      height: '100%',
      viewBox: '0 0 120 120'
    })
    const donutHole = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
      class: 'chart__hole',
      cx: 60,
      cy: 60,
      r: radius,
      fill: '#fff'
    })

    donutChart.append(donutHole);

    let sumOfImpressions = 0

    for (const key in data) {
      sumOfImpressions += data[key]
    }

    const sumOfImpressionsDisplay = this._createTextDisplay(sumOfImpressions);


    let currentCount = 0

    for (const key in data) {
      let color = 'primary_grad'

      switch (key) {
        case 'Great':
          color = 'yellow_grad';
          break;
        case 'Good':
          color = 'secondary_grad';
          break;
        case 'Satisfactory':
          color = 'primary_grad';
          break;
        case 'disappointed':
          color = 'black_grad';
          break;
        default:
          break;
      }

      currentCount += data[key];

      const circumference = 2 * radius * Math.PI;
      const segmentPercent = currentCount / sumOfImpressions;
      const segmentVal = data[key] / sumOfImpressions * circumference;

      const donutSegment = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
        class: 'chart__segment',
        cx: 60,
        cy: 60,
        r: radius,
        fill: 'transparent',
        stroke: `url(#${color})`,
        'stroke-width': 4,
        'stroke-dasharray': `${segmentVal} ${circumference - segmentVal}`,
        'stroke-dashoffset': `${(segmentPercent + 0.25) * circumference}`
      })

      donutChart.append(donutSegment)
    }

    const primeryGradient = this._createGradient('primary_grad', '#BC9CFF', '#8BA4F9');
    const secondaryGradient = this._createGradient('secondary_grad', '#6FCF97', '#66D2EA');
    const yellowGradient = this._createGradient('yellow_grad', '#FFE39C', '#FFBA9C');
    const blackGradient = this._createGradient('black_grad', '#919191', '#3D4975');

    donutChart
      .append(sumOfImpressionsDisplay)
      .append(primeryGradient)
      .append(secondaryGradient)
      .append(yellowGradient)
      .append(blackGradient)

    this.$container.append(donutChart)
  }

  _createTextDisplay(num) {
    const textDisplay = 
      $(document.createElementNS("http://www.w3.org/2000/svg", 'g')).attr({ class: 'chart__sum_of_impress' });
    
    const numLabel = $(document.createElementNS("http://www.w3.org/2000/svg", 'text')).attr({
      class: 'chart__num_label',
      'text-anchor': 'middle',
      x: '50%',
      y: '49%'
    }).html(num);

    const textLabel = $(document.createElementNS("http://www.w3.org/2000/svg", 'text')).attr({
      class: 'chart__text_label',
      'text-anchor': 'middle',
      x: '50%',
      y: '64%'
    }).html('голосов');

    textDisplay
      .append(numLabel)
      .append(textLabel);

    return textDisplay;
  }

  _createGradient(id, color1, color2) {
    const linearGradiend = $(document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")).attr({
      id: id,
      x1: 60,
      y1: 0,
      x2: 60,
      y2: 120,
      gradientUnits: 'userSpaceOnUse'
    })

    const stop1 = $(document.createElementNS("http://www.w3.org/2000/svg", "stop")).attr({'stop-color': color1})
    const stop2 = $(document.createElementNS("http://www.w3.org/2000/svg", "stop")).attr({'offset': 1, 'stop-color': color2})

    linearGradiend
      .append(stop1)
      .append(stop2)

    return linearGradiend
  }

}

$('.js_pie_chart').each(function() {
  new PieChart(this)
})