import $ from 'jquery';

class PieChart {
  constructor(node) {
    this.$node = $(node);
    this.$container = this.$node.find('.js-pie-chart__content');
    this.$legend = this.$node.find('.js-pie-chart__legend');
    this.$chartLegend = this.$node.find('.js-pie-chart__legend-list');
    this.$chartLegendItem = this.$node.find('.js-pie-chart__legend-list-item');
    this.impressions = this.$node.data().data;

    this._addDonutChart();
  }

  _addDonutChart() {
    const { impressions } = this;

    const radius = 58;
    const centerX = 60;
    const centerY = 60;

    const $donutChart = $(document.createElementNS('http://www.w3.org/2000/svg', 'svg')).attr({
      class: 'chart',
      width: '100%',
      height: '100%',
      viewBox: '0 0 120 120',
    });
    const $donutHole = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle')).attr({
      class: 'chart__hole',
      cx: centerX,
      cy: centerY,
      r: radius,
      fill: '#fff',
    });

    $donutChart.append($donutHole);

    let currentCount = 0;
    const keys = Object.keys(impressions);

    const sumOfImpressions = keys.reduce((sum, key) => sum + impressions[key], 0);
    const $sumOfImpressionsDisplay = PieChart._createTextDisplay(sumOfImpressions);

    keys.forEach((key) => {
      let color = 'primary-grad';
      let label = 'Великолепно';

      switch (key) {
        case 'great':
          color = 'yellow-grad';
          label = 'Великолепно';
          break;
        case 'good':
          color = 'secondary-grad';
          label = 'Хорошо';
          break;
        case 'satisfactory':
          color = 'primary-grad';
          label = 'Удовлетворительно';
          break;
        case 'disappointed':
          color = 'black-grad';
          label = 'Разочарован';
          break;
        default:
          break;
      }

      currentCount += impressions[key];

      const circumference = 2 * radius * Math.PI;
      const segmentPercent = currentCount / sumOfImpressions;
      const segmentVal = (impressions[key] / sumOfImpressions) * circumference;

      if (impressions[key] !== 0) {
        const $donutSegment = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle')).attr({
          class: 'chart__segment',
          cx: centerX,
          cy: centerY,
          r: radius,
          fill: 'transparent',
          stroke: `url(#${color})`,
          'stroke-width': 4,
          'stroke-dasharray': `${segmentVal - 2} ${circumference - segmentVal + 2}`,
          'stroke-dashoffset': `${(segmentPercent + 0.25) * circumference - 1}`,
        });

        $donutChart.append($donutSegment);
      }

      this.$chartLegendItem
        .filter(`.js-pie-chart__legend-list-item_color_${color}`)
        .html(label);
    });

    const $primeryGradient = PieChart._createGradient('primary-grad', '#BC9CFF', '#8BA4F9');
    const $secondaryGradient = PieChart._createGradient('secondary-grad', '#6FCF97', '#66D2EA');
    const $yellowGradient = PieChart._createGradient('yellow-grad', '#FFE39C', '#FFBA9C');
    const $blackGradient = PieChart._createGradient('black-grad', '#919191', '#3D4975');

    $donutChart
      .append($sumOfImpressionsDisplay)
      .append($primeryGradient)
      .append($secondaryGradient)
      .append($yellowGradient)
      .append($blackGradient);

    this.$container.append($donutChart);
  }

  static _createTextDisplay(num) {
    const $textDisplay = $(document.createElementNS('http://www.w3.org/2000/svg', 'g')).attr({ class: 'chart__sum-of-impress' });

    const $numLabel = $(document.createElementNS('http://www.w3.org/2000/svg', 'text')).attr({
      class: 'chart__num-label',
      'text-anchor': 'middle',
      x: '50%',
      y: '49%',
    }).html(num);

    const $textLabel = $(document.createElementNS('http://www.w3.org/2000/svg', 'text')).attr({
      class: 'chart__text-label',
      'text-anchor': 'middle',
      x: '50%',
      y: '64%',
    }).html('голосов');

    $textDisplay
      .append($numLabel)
      .append($textLabel);

    return $textDisplay;
  }

  static _createGradient(id, color1, color2) {
    const $linearGradiend = $(document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')).attr({
      id,
      x1: 60,
      y1: 0,
      x2: 60,
      y2: 120,
      gradientUnits: 'userSpaceOnUse',
    });

    const $stop1 = $(document.createElementNS('http://www.w3.org/2000/svg', 'stop')).attr({ 'stop-color': color1 });
    const $stop2 = $(document.createElementNS('http://www.w3.org/2000/svg', 'stop')).attr({ offset: 1, 'stop-color': color2 });

    $linearGradiend
      .append($stop1)
      .append($stop2);

    return $linearGradiend;
  }
}

$('.js-pie-chart__chart').each(function addPieChart() {
  const pieChart = new PieChart(this);

  return pieChart;
});
