/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(L){"use strict";var B=function(o){o=o||{};if(!B.isSupported()){throw Error("Beacon API is not supported");}if(typeof o.url!=="string"){throw Error("Beacon url must be valid");}this._nMaxBufferLength=o.maxBufferLength||10;this._aBuffer=[];this._sUrl=o.url;document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden"){this.send();}}.bind(this));window.addEventListener("beforeunload",function(){this.send();}.bind(this));};B.isSupported=function(){return"navigator"in window&&"sendBeacon"in window.navigator&&"Blob"in window;};B.prototype.append=function(k,v){this._aBuffer.push({key:k,value:v});if(this.getBufferLength()===this._nMaxBufferLength){this.send();}};B.prototype.getBufferLength=function(){return this._aBuffer.length;};B.prototype.send=function(){if(this.getBufferLength()){var b=this._aBuffer.reduce(function(r,e){r+="&"+e.key+"="+e.value;return r;},"sap-fesr-only=1");var o=new Blob([b],{type:"application/x-www-form-urlencoded;charset=UTF-8"});window.navigator.sendBeacon(this._sUrl,o);this.clear();}};B.prototype.clear=function(){this._aBuffer=[];};return B;});
