export default class ChartLogic {

	constructor (data, chartType) {
		this.data = data;
		this.type = chartType;
//    "esriFieldTypeOID", "esriFieldTypeGUID", "esriFieldTypeGlobalID",
// #      "esriFieldTypeSingle", "esriFieldTypeInteger", "esriFieldTypeSmallInteger",
// #      "esriFieldTypeDouble", "esriFieldTypeDate", "esriFieldTypeBlob", "esriFieldTypeRaster",
// #      "esriFieldTypeGeometry"
	}

  static dataTypes() {
    return {
      "esriFieldTypeInteger": "numeric",
      "esriFieldTypeDouble": "numeric",
      "esriFieldTypeString": "string",
      "unknown": "unknown"
    }
  }

  // TODO: clean this up by using map/reduce functions
  //  it's like a 'zipper/fold' but with transformations
	static options(fields, inputs) { 
    var fieldMap = {};
    // Reverse index the fields by type
    for(field of fields) {
      var dataType = this.dataTypes()[field.type] !== undefined ? this.dataTypes()[field.type] : "unknown"
      fieldMap[dataType] = fieldMap[dataType] || [] // TODO: better way to set default?
      fieldMap[dataType].push(field)
    }

    // map the inputs to fields
    var opts = new Map();
    for(input of inputs) {
      opts.set(input.name, opts.get(input.name) || [])
      for(type of input.type) {
        opts.set(input.name, opts.get(input.name).concat(fieldMap[type]));
      }
    }
    return opts;
	}

	/** 
	  * Runs a test suite to verify logic
	  */
	static _test() {
		fields = [
		    {
		        "alias": "OBJECTID",
		        "defaultValue": null,
		        "domain": null,
		        "editable": false,
		        "name": "OBJECTID",
		        "nullable": false,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeOID"
		    },
		    {
		        "alias": "GEOID",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "length": 11,
		        "name": "GEOID",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeString"
		    },
		    {
		        "alias": "STUSAB",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "length": 2,
		        "name": "STUSAB",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeString"
		    },
		    {
		        "alias": "STATE",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "length": 2,
		        "name": "STATE",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeString"
		    },
		    {
		        "alias": "COUNTY",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "length": 3,
		        "name": "COUNTY",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeString"
		    },
		    {
		        "alias": "TRACT",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "length": 6,
		        "name": "TRACT",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeString"
		    },
		    {
		        "alias": "EACODE",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "length": 3,
		        "name": "EACODE",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeString"
		    },
		    {
		        "alias": "EANAME",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "length": 53,
		        "name": "EANAME",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeString"
		    },
		    {
		        "alias": "AREALAND",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "name": "AREALAND",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeDouble"
		    },
		    {
		        "alias": "AREASQMI",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "name": "AREASQMI",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeDouble"
		    },
		    {
		        "alias": "POPDENSITY",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "name": "POPDENSITY",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeDouble"
		    },
		    {
		        "alias": "HUDENSITY",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "name": "HUDENSITY",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeDouble"
		    },
		    {
		        "alias": "NAME",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "length": 20,
		        "name": "NAME",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeString"
		    },
		    {
		        "alias": "P001001",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "name": "P001001",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeInteger"
		    },
		    {
		        "alias": "H001001",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "name": "H001001",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeInteger"
		    },
		    {
		        "alias": "UNPD_BAL_SUM",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "name": "UNPD_BAL_SUM",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeInteger"
		    },
		    {
		        "alias": "IIF_CNT",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "name": "IIF_CNT",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeInteger"
		    },
		    {
		        "alias": "ORIG_MRTG_AMT_SUM",
		        "defaultValue": null,
		        "domain": null,
		        "editable": true,
		        "name": "ORIG_MRTG_AMT_SUM",
		        "nullable": true,
		        "sqlType": "sqlTypeOther",
		        "type": "esriFieldTypeInteger"
		    }
		]
		response = ChartLogic.options(fields, [{ "name": "x", "type": [ "numeric", "string" ], "required": false }, { "name": "y", "type": [ "string" ], "required": true }]);
    console.log("Response", response)
	}

}