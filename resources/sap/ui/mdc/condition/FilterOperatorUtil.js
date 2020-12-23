/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(['sap/ui/model/FilterOperator','sap/ui/model/Filter','sap/ui/model/ValidateException','sap/base/Log','sap/base/util/merge','sap/ui/mdc/enum/FieldDisplay','./Operator','./RangeOperator','sap/ui/mdc/enum/BaseType','sap/ui/mdc/enum/ConditionValidated','sap/ui/core/date/UniversalDateUtils'],function(M,F,V,L,m,a,O,R,B,C,U){"use strict";var b={_mOperators:{equal:new O({name:"EQ",filterOperator:M.EQ,tokenParse:"^=([^=].*)$",tokenFormat:"{1} ({0})",valueTypes:[O.ValueType.Self,null],displayFormats:{DescriptionValue:"{1} ({0})",ValueDescription:"{0} ({1})",Description:"{1}",Value:"{0}"},format:function(c,t,d){d=d||a.DescriptionValue;var e=this.valueTypes.length;var v=c.values;var T=(c&&c.validated===C.Validated)||v.length===2?"":"=";var s=T+this.displayFormats[d];if(!v[1]){s=T+this.displayFormats["Value"];e=1;}for(var i=0;i<e;i++){var r,f=v[i];if(f===null||f===undefined){f="";}if(i==0&&t&&(typeof t.formatValue==="function")){r=t.formatValue(f,"string");}else{r=f;}s=r==null?null:s.replace(new RegExp("\\$"+i+"|"+i+"\\$"+"|"+"\\{"+i+"\\}","g"),r);}return s;},parse:function(t,T,d,D){d=d||a.DescriptionValue;var r=O.prototype.parse.apply(this,[t,T,d,D]);if(D&&(!r||r[0]===null||r[0]===undefined)&&d!==a.Value){d=a.Value;r=O.prototype.parse.apply(this,[t,T,d,D]);}if(r&&(r[1]===null||r[1]===undefined)&&d===a.Value){r=[r[0]];}return r;},getValues:function(t,d,D){var c=t.match(this.tokenParseRegExp);var v;if(c||(D&&t)){var s;var T=this.displayFormats[d];var k=T.indexOf("{0}");var i=T.indexOf("{1}");var K;var e;if(c){s=c[1];}else if(D){s=t;}if(k>=0&&i>=0){if(s.lastIndexOf("(")>0&&(s.lastIndexOf(")")===s.length-1||s.lastIndexOf(")")===-1)){var E=s.length;if(s[E-1]===")"){E--;}var f=s.substring(0,s.lastIndexOf("("));if(f[f.length-1]===" "){f=f.substring(0,f.length-1);}var g=s.substring(s.lastIndexOf("(")+1,E);if(k<i){K=f;e=g;}else{K=g;e=f;}}else if(k<i){K=s;}else{e=s;}}else if(k>=0){K=s;}else{e=s;}v=[K];if(i>=0){v.push(e);}}return v;},isEmpty:function(c,t){var i=false;var v=c.values[0];if((v===null||v===undefined||v==="")&&!c.values[1]){i=true;}return i;},getCheckValue:function(c){return{value:c.values[0]};},checkValidated:function(c){if(c.values.length===2&&c.values[0]!==undefined&&c.values[1]!==null&&c.values[1]!==undefined){c.validated=C.Validated;}else{c.validated=C.NotValidated;}},validateInput:true}),between:new O({name:"BT",filterOperator:M.BT,tokenParse:"^([^!].*)\\.\\.\\.(.+)$",tokenFormat:"{0}...{1}",valueTypes:[O.ValueType.Self,O.ValueType.Self],validate:function(v,t){if(v.length<2){throw new V("Between must have two values");}if(v[0]===v[1]){throw new V("Between must have two different values");}O.prototype.validate.apply(this,[v,t]);}}),betweenExclBoundaries:new O({name:"BTEX",filterOperator:M.BT,tokenParse:"^([^!].*)\\.\\.(.+)$",tokenFormat:"{0}..{1}",valueTypes:[O.ValueType.Self,O.ValueType.Self],getModelFilter:function(c,f,t){return new F({filters:[new F(f,M.GT,c.values[0]),new F(f,M.LT,c.values[1])],and:true});},validate:function(v,t){if(v.length<2){throw new V("Between must have two values");}if(v[0]===v[1]){throw new V("Between must have two different values");}O.prototype.validate.apply(this,[v,t]);}}),notBetween:new O({name:"NOTBT",filterOperator:M.NB,tokenParse:"^!(.+)\\.\\.\\.(.+)$",tokenFormat:"!({0}...{1})",valueTypes:[O.ValueType.Self,O.ValueType.Self],exclude:true,validate:function(v,t){if(v.length<2){throw new V("NotBetween must have two values");}if(v[0]===v[1]){throw new V("NotBetween must have two different values");}O.prototype.validate.apply(this,[v,t]);}}),notBetweenExclBoundaries:new O({name:"NOTBTEX",filterOperator:M.NB,tokenParse:"^!(.+)\\.\\.(.+)$",tokenFormat:"!({0}..{1})",valueTypes:[O.ValueType.Self,O.ValueType.Self],exclude:true,getModelFilter:function(c,f,t){return new F({filters:[new F(f,M.LE,c.values[0]),new F(f,M.GE,c.values[1])],and:false});},validate:function(v,t){if(v.length<2){throw new V("NotBetween must have two values");}if(v[0]===v[1]){throw new V("NotBetween must have two different values");}O.prototype.validate.apply(this,[v,t]);}}),lowerThan:new O({name:"LT",filterOperator:M.LT,tokenParse:"^<([^=].*)$",tokenFormat:"<{0}",valueTypes:[O.ValueType.Self]}),notLowerThan:new O({name:"NOTLT",filterOperator:M.GE,tokenParse:"^!<([^=].*)$",tokenFormat:"!(<{0})",valueTypes:[O.ValueType.Self],exclude:true}),greaterThan:new O({name:"GT",filterOperator:M.GT,tokenParse:"^>([^=].*)$",tokenFormat:">{0}",valueTypes:[O.ValueType.Self]}),notGreaterThan:new O({name:"NOTGT",filterOperator:M.LE,tokenParse:"^!>([^=].*)$",tokenFormat:"!(>{0})",valueTypes:[O.ValueType.Self],exclude:true}),lessEqual:new O({name:"LE",filterOperator:M.LE,tokenParse:"^<=(.+)$",tokenFormat:"<={0}",valueTypes:[O.ValueType.Self]}),notLessEqual:new O({name:"NOTLE",filterOperator:M.GT,tokenParse:"^!<=(.+)$",tokenFormat:"!(<={0})",valueTypes:[O.ValueType.Self],exclude:true}),greaterEqual:new O({name:"GE",filterOperator:M.GE,tokenParse:"^>=(.+)$",tokenFormat:">={0}",valueTypes:[O.ValueType.Self]}),notGreaterEqual:new O({name:"NOTGE",filterOperator:M.LT,tokenParse:"^!>=(.+)$",tokenFormat:"!(>={0})",valueTypes:[O.ValueType.Self],exclude:true}),startsWith:new O({name:"StartsWith",filterOperator:M.StartsWith,tokenParse:"^([^!\\*]+.*)\\*$",tokenFormat:"{0}*",valueTypes:[O.ValueType.Self]}),notStartsWith:new O({name:"NotStartsWith",filterOperator:M.NotStartsWith,tokenParse:"^!([^\\*].*)\\*$",tokenFormat:"!({0}*)",valueTypes:[O.ValueType.Self],exclude:true}),endsWith:new O({name:"EndsWith",filterOperator:M.EndsWith,tokenParse:"^\\*(.*[^\\*])$",tokenFormat:"*{0}",valueTypes:[O.ValueType.Self]}),notEndsWith:new O({name:"NotEndsWith",filterOperator:M.NotEndsWith,tokenParse:"^!\\*(.*[^\\*])$",tokenFormat:"!(*{0})",valueTypes:[O.ValueType.Self],exclude:true}),contains:new O({name:"Contains",filterOperator:M.Contains,tokenParse:"^\\*(.*)\\*$",tokenFormat:"*{0}*",valueTypes:[O.ValueType.Self]}),notContains:new O({name:"NotContains",filterOperator:M.NotContains,tokenParse:"^!\\*(.*)\\*$",tokenFormat:"!(*{0}*)",valueTypes:[O.ValueType.Self],exclude:true}),notEqual:new O({name:"NE",filterOperator:M.NE,tokenParse:"^!=(.+)$",tokenFormat:"!(={0})",valueTypes:[O.ValueType.Self],exclude:true}),empty:new O({name:"Empty",filterOperator:M.EQ,tokenParse:"^<#tokenText#>$",tokenFormat:"<#tokenText#>",valueTypes:[],getModelFilter:function(c,f,t){var i=false;if(t){var r=t.parseValue("","string");try{t.validateValue(r);i=r===null;}catch(e){i=false;}}if(i){return new F({filters:[new F(f,M.EQ,""),new F(f,M.EQ,null)],and:false});}else{return new F(f,this.filterOperator,"");}}}),notEmpty:new O({name:"NotEmpty",filterOperator:M.NE,tokenParse:"^!<#tokenText#>$",tokenFormat:"!(<#tokenText#>)",valueTypes:[],exclude:true,getModelFilter:function(c,f,t){return new F({path:f,operator:this.filterOperator,value1:""});}}),yesterday:new R({name:"YESTERDAY",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.yesterday();},formatRange:function(r,d){return d.formatValue(r[0],"string");}}),today:new R({name:"TODAY",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.today();},formatRange:function(r,d){return d.formatValue(r[0],"string");}}),tomorrow:new R({name:"TOMORROW",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.tomorrow();},formatRange:function(r,d){return d.formatValue(r[0],"string");}}),lastDays:new R({name:"LASTDAYS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(d){return U.ranges.lastDays(d);}}),todayXYDays:new R({name:"TODAYXYDAYS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}},{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["(\\d+)","(\\d+)"],additionalInfo:"",calcRange:function(x,y){var s=x>=0?U.ranges.lastDays(x)[0]:U.ranges.nextDays(-x)[1];var e=y>=0?U.ranges.nextDays(y)[1]:U.ranges.lastDays(-y)[0];if(s.oDate.getTime()>e.oDate.getTime()){e=[s,s=e][0];}return[U.resetStartTime(s),U.resetEndTime(e)];}}),nextDays:new R({name:"NEXTDAYS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(d){return U.ranges.nextDays(d);}}),lastWeek:new R({name:"LASTWEEK",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.lastWeek();}}),currentWeek:new R({name:"CURRENTWEEK",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.currentWeek();}}),nextWeek:new R({name:"NEXTWEEK",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.nextWeek();}}),lastWeeks:new R({name:"LASTWEEKS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(d){return U.ranges.lastWeeks(d);}}),nextWeeks:new R({name:"NEXTWEEKS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(d){return U.ranges.nextWeeks(d);}}),lastMonth:new R({name:"LASTMONTH",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.lastMonth();}}),currentMonth:new R({name:"CURRENTMONTH",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.currentMonth();}}),nextMonth:new R({name:"NEXTMONTH",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.nextMonth();}}),lastMonths:new R({name:"LASTMONTHS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(d){return U.ranges.lastMonths(d);}}),nextMonths:new R({name:"NEXTMONTHS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(d){return U.ranges.nextMonths(d);}}),lastQuarter:new R({name:"LASTQUARTER",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.lastQuarter();}}),currentQuarter:new R({name:"CURRENTQUARTER",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.currentQuarter();}}),nextQuarter:new R({name:"NEXTQUARTER",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.nextQuarter();}}),lastQuarters:new R({name:"LASTQUARTERS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(d){return U.ranges.lastQuarters(d);}}),nextQuarters:new R({name:"NEXTQUARTERS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(d){return U.ranges.nextQuarters(d);}}),firstQuarter:new R({name:"FIRSTQUARTER",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.quarter(1);}}),secondQuarter:new R({name:"SECONDQUARTER",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.quarter(2);}}),thirdQuarter:new R({name:"THIRDQUARTER",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.quarter(3);}}),fourthQuarter:new R({name:"FOURTHQUARTER",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.quarter(4);}}),lastYear:new R({name:"LASTYEAR",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.lastYear();}}),currentYear:new R({name:"CURRENTYEAR",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.currentYear();}}),nextYear:new R({name:"NEXTYEAR",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.nextYear();}}),lastYears:new R({name:"LASTYEARS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(d){return U.ranges.lastYears(d);}}),nextYears:new R({name:"NEXTYEARS",valueTypes:[{name:"sap.ui.model.type.Integer",formatOptions:{emptyString:null}}],paramTypes:["(\\d+)"],additionalInfo:"",calcRange:function(d){return U.ranges.nextYears(d);}}),yearToDate:new R({name:"YEARTODATE",valueTypes:[O.ValueType.Static],calcRange:function(){return U.ranges.yearToDate();}})},_mDefaultOpsForType:{},addOperator:function(o){b._mOperators[o.name]=o;},setOperatorsForType:function(t,o,d){var c=[];o.forEach(function(e){if(typeof e==="string"){c.push(b.getOperator(e));}else{c.push(e);}});b._mDefaultOpsForType[t]={operators:c};if(d){if(typeof d==="string"){d=b.getOperator(d);}b._mDefaultOpsForType[t].defaultOperator=d;}},getOperatorsForType:function(t){var o=[];for(var i=0;i<b._mDefaultOpsForType[t].operators.length;i++){o.push(b._mDefaultOpsForType[t].operators[i].name);}return o;},getDefaultOperator:function(t){return b._mDefaultOpsForType[t].defaultOperator||b._mOperators.equal;},getMatchingOperators:function(o,v){var c=[];for(var i=0;i<o.length;i++){var d=this.getOperator(o[i]);if(d){c.push(d);}}return _.call(this,c,v);},getOperator:function(o){for(var n in b._mOperators){var c=b._mOperators[n];if(c.name===o){return c;}}return undefined;},getEQOperator:function(){return b._mOperators.equal;},onlyEQ:function(o){if(o.length===1&&o[0]==="EQ"){return true;}else{return false;}},checkConditionsEmpty:function(c){if(!Array.isArray(c)){c=[c];}c.forEach(function(o){var d=this.getOperator(o.operator);if(d){o.isEmpty=d.isEmpty(o);}}.bind(this));},updateConditionsValues:function(c){if(!Array.isArray(c)){c=[c];}for(var i=0;i<c.length;i++){this.updateConditionValues(c[i]);}},updateConditionValues:function(c){var o=this.getOperator(c.operator);if(o&&c.validated!==C.Validated){var v=o.valueTypes.length;if(o.valueTypes.length===2&&o.valueTypes[1]===null&&(c.values.length<2||c.values[1]===null||c.values[1]===undefined)){v=v-1;}if(o.valueTypes[0]==="static"){c.values=[];}else{while(c.values.length!=v){if(c.values.length<v){c.values.push(null);}if(c.values.length>v){c.values=c.values.slice(0,c.values.length-1);}}}}},indexOfCondition:function(c,d){var I=-1;for(var i=0;i<d.length;i++){if(this.compareConditions(c,d[i])){I=i;break;}}return I;},compareConditions:function(c,o){var e=false;if(c.operator===o.operator){var d=this.getOperator(c.operator);if(d){e=d.compareConditions(c,o);}}return e;},compareConditionsArray:function(c,d){var e=false;if(c.length===d.length){e=true;for(var i=0;i<c.length;i++){if(!this.compareConditions(c[i],d[i])){e=false;break;}}}return e;},checkConditionValidated:function(c){var o=this.getOperator(c.operator);if(!c.validated&&o&&o.checkValidated){o.checkValidated(c);}}};b.setOperatorsForType(B.String,[b._mOperators.contains,b._mOperators.equal,b._mOperators.between,b._mOperators.startsWith,b._mOperators.endsWith,b._mOperators.empty,b._mOperators.lessEqual,b._mOperators.lowerThan,b._mOperators.greaterEqual,b._mOperators.greaterThan,b._mOperators.notContains,b._mOperators.notEqual,b._mOperators.notBetween,b._mOperators.notStartsWith,b._mOperators.notEndsWith,b._mOperators.notEmpty,b._mOperators.notLessEqual,b._mOperators.notLowerThan,b._mOperators.notGreaterEqual,b._mOperators.notGreaterThan],b._mOperators.equal);b.setOperatorsForType(B.Date,[b._mOperators.equal,b._mOperators.greaterEqual,b._mOperators.lessEqual,b._mOperators.lowerThan,b._mOperators.greaterThan,b._mOperators.between,b._mOperators.notEqual,b._mOperators.notBetween,b._mOperators.notLessEqual,b._mOperators.notLowerThan,b._mOperators.notGreaterEqual,b._mOperators.notGreaterThan,b._mOperators.today,b._mOperators.yesterday,b._mOperators.tomorrow,b._mOperators.todayXYDays,b._mOperators.lastDays,b._mOperators.nextDays,b._mOperators.currentWeek,b._mOperators.lastWeek,b._mOperators.lastWeeks,b._mOperators.nextWeek,b._mOperators.nextWeeks,b._mOperators.currentMonth,b._mOperators.lastMonth,b._mOperators.lastMonths,b._mOperators.nextMonth,b._mOperators.nextMonths,b._mOperators.currentQuarter,b._mOperators.lastQuarter,b._mOperators.lastQuarters,b._mOperators.nextQuarter,b._mOperators.nextQuarters,b._mOperators.firstQuarter,b._mOperators.secondQuarter,b._mOperators.thirdQuarter,b._mOperators.fourthQuarter,b._mOperators.currentYear,b._mOperators.lastYear,b._mOperators.lastYears,b._mOperators.nextYear,b._mOperators.nextYears,b._mOperators.yearToDate]);b.setOperatorsForType(B.DateTime,[b._mOperators.equal,b._mOperators.between,b._mOperators.lessEqual,b._mOperators.lowerThan,b._mOperators.greaterEqual,b._mOperators.greaterThan,b._mOperators.notEqual,b._mOperators.notBetween,b._mOperators.notLessEqual,b._mOperators.notLowerThan,b._mOperators.notGreaterEqual,b._mOperators.notGreaterThan]);b.setOperatorsForType(B.Numeric,[b._mOperators.equal,b._mOperators.between,b._mOperators.lessEqual,b._mOperators.lowerThan,b._mOperators.greaterEqual,b._mOperators.greaterThan,b._mOperators.notEqual,b._mOperators.notBetween,b._mOperators.notLessEqual,b._mOperators.notLowerThan,b._mOperators.notGreaterEqual,b._mOperators.notGreaterThan]);b.setOperatorsForType(B.Time,[b._mOperators.equal,b._mOperators.between,b._mOperators.lessEqual,b._mOperators.lowerThan,b._mOperators.greaterEqual,b._mOperators.greaterThan,b._mOperators.notEqual,b._mOperators.notBetween,b._mOperators.notLessEqual,b._mOperators.notLowerThan,b._mOperators.notGreaterEqual,b._mOperators.notGreaterThan]);b.setOperatorsForType(B.Boolean,[b._mOperators.equal,b._mOperators.notEqual]);function _(o,v){var r=[];for(var i=0;i<o.length;i++){var c=o[i];if(c&&c.test&&c.test(v)){r.push(c);}}return r;}return b;},true);