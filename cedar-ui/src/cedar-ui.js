import log from './logger.js'; // decorator
import template from './decorators/template.js';
import bindEvents from './decorators/bindEvents.js';
import watchAttributes from './decorators/watchAttributes.js';
import ChartLogic from './chartLogic.js';

// because Chrome doesn't support enumerators for querySelectorAll
// https://jakearchibald.com/2014/iterators-gonna-iterate/#nodelist-iteration
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

@template(`
  <label>Data URL</label><input id="data-url" value="http://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Education_WebMercator/MapServer/5"/><br/>
  <label>Chart Type</label><input id="chart-type" /><br/>
  <ul id="chart-types"></ul>
  <div id="chart-options"></div>
  <button id="chart-run">Create Chart</button>
  <div id="chart"></div>
`)
@bindEvents({
  'keypress@input': 'handleInput',
  'focus@input': 'handleInput',
  'input@input': 'handleInput',
  'click@input': 'handleInput',
  'blur@input': function (e) {
    this.list.innerHTML = '';
  }
})
@watchAttributes({
  limit: function(newValue, oldValue) {
    console.log('limit changed');
  }
})
class CedarUi extends HTMLElement {
  createdCallback () {
    var self = this;
    this.cedar = new Cedar();
    this.suggestions = this.cedar.chartTypes;

    this.list = this.querySelectorAll('ul#chart-types')[0];
    this.chartType = this.querySelectorAll('input#chart-type')[0];
    this.dataUrl = this.querySelectorAll('input#data-url')[0];
    this.chartOptions = this.querySelectorAll('div#chart-options')[0];
    this.chartRun = this.querySelectorAll('#chart-run')[0];
    this.chartRun.onclick = function() { self.buildChart(self); }


    ChartLogic._test()
  }

  attachedCallback () {
    // called whenever an element is added to the DOM
  }

  detachedCallback () {
    // called whenever an element is removed from the DOM
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    // called whenever an attribute changes on an element
  }

  buildChart (el) {
    console.log("el", el)
    var mappings = {};
    for(var input of el.querySelectorAll('.chart-input')) {
      mappings[input.dataset.input] = {"field": input.value, "label": input.value};
    }

    chart = new Cedar({"type": el.chartType.value});
    chart.dataset = {
      "url": this.dataUrl.value,
      "mappings": mappings
    };
    console.log("Mappings", chart);
    chart.show({elementId: "#chart"});

  }

  handleInput (e) {
    var self = this;
    // NO, don't do this!
    Cedar.getJson(self.dataUrl.value + "?f=json", function(err,data){ 
      if(self.cedar.chartTypes.indexOf(self.chartType.value) < 0) {
        return;
      }
      Cedar.getJson(self.cedar._getSpecificationUrl(self.chartType.value), function(err,spec) {
        var inputs = ChartLogic.options(data.fields, spec.inputs);
        self.chartOptions.innerHTML = "";

        // Build the Select UI
        for(var input of inputs) {
          var labelEl = document.createElement('label');
          labelEl.innerHTML = input[0];
          self.chartOptions.appendChild(labelEl);
          var selectEl = document.createElement('select');
          selectEl.setAttribute("class", "chart-input");
          selectEl.dataset.input = input[0];
          input[1].forEach(function(param) {
            var option = document.createElement('option');
            option.setAttribute("value", param.name);
            option.innerHTML = param.alias;
            selectEl.appendChild(option);         
          })
          self.chartOptions.appendChild(selectEl);
        }
        
      });
      
    });

    console.log('handle input', e);
    var filter = new RegExp(this.chartType.value, 'i');
    this.list.innerHTML = this.suggestions
                              .filter((suggestion) => { return filter.test(suggestion); })
                              .map((item) => { return `<li>${item}</li>`; })
                              .slice(0, parseFloat(this.getAttribute('limit') || Infinity))
                              .join('');
  }
}

document.registerElement('cedar-ui', CedarUi);
