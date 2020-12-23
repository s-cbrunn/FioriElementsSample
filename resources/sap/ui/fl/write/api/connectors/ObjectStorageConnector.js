/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/connectors/BaseConnector","sap/ui/fl/initial/_internal/StorageUtils","sap/ui/fl/apply/_internal/connectors/ObjectStorageUtils"],function(m,B,S,O){"use strict";function l(p){var f=[];return O.forEachObjectInStorage(p,function(F){f.push(F.changeDefinition);}).then(function(){return f;});}function s(p,c){var d=true;if(p.selectorIds){if(c.selector){d=p.selectorIds.indexOf(c.selector.id)>-1;}else{d=false;}}if(d&&p.changeTypes){d=p.changeTypes.indexOf(c.changeType)>-1;}return d;}function a(f,c){if(!f.creation){var n=Date.now()+c;f.creation=new Date(n).toISOString();}return f;}var b=m({},B,{storage:undefined,layers:["ALL"],loadFlexData:function(p){return l({storage:this.storage,reference:p.reference}).then(function(f){var g=S.getGroupedFlexObjects(f);return S.filterAndSortResponses(g);});},write:function(p){var P=p.flexObjects.map(function(f,i){var k=O.createFlexObjectKey(f);f=a(f,++i);var F=this.storage._itemsStoredAsObjects?f:JSON.stringify(f);return this.storage.setItem(k,F);}.bind(this));return Promise.all(P).then(function(){});},update:function(p){var f=p.flexObject;var k=O.createFlexObjectKey(p.flexObject);var F=this.storage._itemsStoredAsObjects?f:JSON.stringify(f);var v=this.storage.setItem(k,F);return Promise.resolve(v);},reset:function(p){return O.forEachObjectInStorage({storage:this.storage,reference:p.reference,layer:p.layer},function(f){if(s(p,f.changeDefinition)){return Promise.resolve(this.storage.removeItem(f.key)).then(function(){return{fileName:f.changeDefinition&&f.changeDefinition.fileName};});}}.bind(this)).then(function(r){return{response:r.filter(function(c){return!!c;})};});},remove:function(p){var k=O.createFlexObjectKey(p.flexObject);this.storage.removeItem(k);var r=this.storage.removeItem(k);return Promise.resolve(r);},loadFeatures:function(){return Promise.resolve({isKeyUser:true,isVariantSharingEnabled:true});},getFlexInfo:function(p){p.storage=this.storage;return O.getAllFlexObjects(p).then(function(f){return{isResetEnabled:f.length>0};});}});return b;});
