/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/_OpaLogger","sap/ui/test/_ParameterValidator","sap/ui/test/autowaiter/_autoWaiter","sap/ui/test/_LogCollector","sap/ui/thirdparty/jquery"],function(_,a,b,c,$){"use strict";var l=_.getLogger("sap.ui.test.autowaiter._autoWaiterAsync");var L=c.getInstance("^sap.ui.test.autowaiter.*#hasPending$");var C=new a({errorPrefix:"sap.ui.test.autowaiter._autoWaiterAsync#extendConfig"});var w;var s;var d={interval:400,timeout:15000};function e(n){v(n);$.extend(d,n);b.extendConfig(d);}function f(g){if(w){n({error:"waitAsync is already running and cannot be called again at this moment"});return;}var p=Date.now();w=true;l.debug("Start polling to check for pending asynchronous work");L.start();h();function h(){var i=(Date.now()-p);if(i<=d.timeout){setTimeout(function(){if(b.hasToWait()){s=L.getAndClearLog();h();}else{n({log:"Polling finished successfully. There is no more pending asynchronous work for the moment"});w=false;}},d.interval);}else{n({error:"Polling stopped because the timeout of "+d.timeout+" milliseconds has been reached but there is still pending asynchronous work.\n"+"This is the last log of pending work:\n"+s});w=false;}}function n(r){if(g){g(r.error);}l.debug(r.error||r.log);L.destroy();}}function v(o){C.validate({allowUnknownProperties:true,inputToValidate:o,validationInfo:{interval:"positivenumeric",timeout:"positivenumeric"}});}return{extendConfig:e,waitAsync:f};},true);
