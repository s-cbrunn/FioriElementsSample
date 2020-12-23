/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./IconPool','./library',"sap/base/security/encodeCSS"],function(I,l,e){"use strict";var a=l.IconColor;var b={apiVersion:2};b.render=function(r,c){var i=I.getIconInfo(c.getSrc(),undefined,"mixed"),w=c.getWidth(),h=c.getHeight(),C=c.getColor(),B=c.getBackgroundColor(),s=c.getSize(),t=c._getOutputTitle(i),L,o,A,d=false;if(i instanceof Promise){i.then(c.invalidate.bind(c));}else if(i){d=true;L=c.getAriaLabelledBy();A=c._getAccessibilityAttributes(i);o=c.getAggregation("_invisibleText");}r.openStart("span",c);r.class("sapUiIcon");if(d){r.accessibilityState(c,A);r.attr("data-sap-ui-icon-content",i.content);r.style("font-family","'"+e(i.fontFamily)+"'");if(!i.suppressMirroring){r.class("sapUiIconMirrorInRTL");}}if(t){r.attr("title",t);}if(c.hasListeners("press")){r.class("sapUiIconPointer");if(!c.getNoTabStop()){r.attr("tabindex","0");}}r.style("width",w);r.style("height",h);r.style("line-height",h);r.style("font-size",s);if(C&&!(C in a)){r.style("color",C);}if(B&&!(B in a)){r.style("background-color",B);}r.openEnd();if(L&&L.length&&o){r.renderControl(o);}r.close("span");};return b;},true);
