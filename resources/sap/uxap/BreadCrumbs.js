/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Link","sap/m/Select","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ItemNavigation","sap/ui/core/Item","sap/ui/core/Icon","sap/ui/Device","./library","sap/ui/core/InvisibleText","./BreadCrumbsRenderer","sap/ui/thirdparty/jquery"],function(L,S,C,R,I,a,b,D,l,c,B,q){"use strict";var d=C.extend("sap.uxap.BreadCrumbs",{metadata:{library:"sap.uxap",properties:{showCurrentLocation:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"links",aggregations:{links:{type:"sap.m.Link",multiple:true,singularName:"link"},currentLocation:{type:"sap.m.Text",multiple:false},_tubeIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_overflowSelect:{type:"sap.m.Select",multiple:false,visibility:"hidden"}}}});d.PAGEUP_AND_PAGEDOWN_JUMP_SIZE=5;d.prototype.init=function(){this._iREMSize=parseInt(q("body").css("font-size"));this._iContainerMaxHeight=this._iREMSize*2;};d.prototype.onBeforeRendering=function(){this._bOnPhone=D.system.phone;this._resetControl();};d.prototype.onAfterRendering=function(){this._handleInitialModeSelection();};d.prototype._handleInitialModeSelection=function(){if(this._bOnPhone){this._setSelectVisible(true);return this;}this._configureKeyboardHandling();if(!this._iContainerHeight){this._iContainerHeight=this.$().outerHeight();}if(this._iContainerHeight>this._iContainerMaxHeight){this._toggleOverflowMode(true);return this;}this._sResizeListenerId=R.register(this,this._handleScreenResize.bind(this));return this;};d.prototype._toggleOverflowMode=function(u){if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);}this._setSelectVisible(u);this._setBreadcrumbsVisible(!u);this._sResizeListenerId=R.register(this,this._handleScreenResize.bind(this));return this;};d.prototype._getTubeIcon=function(){if(!this.getAggregation("_tubeIcon")){this.setAggregation("_tubeIcon",new b({"src":"sap-icon://slim-arrow-right","color":"#bfbfbf","size":"1rem","useIconTooltip":false}).addStyleClass("sapUxAPTubeIcon"));}return this.getAggregation("_tubeIcon");};d.prototype._getOverflowSelect=function(){var o,s;if(!this.getAggregation("_overflowSelect")){s=this.getLinks().reverse()||[];s.unshift(this.getCurrentLocation());o=new S({items:s.map(this._createSelectItem),autoAdjustWidth:true});o.attachChange(this._overflowSelectChangeHandler);this.setAggregation("_overflowSelect",o);}return this.getAggregation("_overflowSelect");};d.prototype._createSelectItem=function(i){return new a({key:i.getId(),text:i.getText()});};d.prototype._overflowSelectChangeHandler=function(e){var s=e.getParameter("selectedItem").getKey(),o=sap.ui.getCore().byId(s),f,g;if(o instanceof L){f=o.getHref();o.firePress();if(f){g=o.getTarget();if(g){window.open(f,g);}else{window.location.href=f;}}}return this;};d.prototype._handleScreenResize=function(e){var s=this._shouldOverflow(),u=this._getUsingOverflowSelect();if(s&&!u){this._toggleOverflowMode(true);}else if(!s&&u){this._toggleOverflowMode(false);}return this;};d.prototype._shouldOverflow=function(){var $=this._getBreadcrumbsAsJQueryObject(),s,u=this._getUsingOverflowSelect();if(u){this._setBreadcrumbsVisible(true);}$.addClass("sapUxAPInvisible");s=$.outerHeight()>this._iContainerMaxHeight;$.removeClass("sapUxAPInvisible");if(u){this._setBreadcrumbsVisible(false);}return s;};d.prototype._getBreadcrumbsAsJQueryObject=function(){if(!this._$breadcrumbs){this._$breadcurmbs=this.$("breadcrumbs");}return this._$breadcurmbs;};d.prototype._getOverflowSelectAsJQueryObject=function(){if(!this._$select){this._$select=this.$("select");}return this._$select;};d.prototype._setBreadcrumbsVisible=function(v){var $=this.$(),e=this._getBreadcrumbsAsJQueryObject(),f="sapUxAPFullWidth",s="sapUiHidden";if(v){e.removeClass(s);$.removeClass(f);}else{e.addClass(s);$.addClass(f);}return $;};d.prototype._setSelectVisible=function(v){var $=this._getOverflowSelectAsJQueryObject(),s="sapUiHidden";if(v){$.removeClass(s);}else{$.addClass(s);}return this;};d.prototype._resetControl=function(){this._iContainerHeight=null;this._$select=null;this._$breadcrumbs=null;this.setAggregation("_overflowSelect",null,true);if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);}return this;};d.prototype._getAriaLabelledBy=function(){if(!this._oAriaLabelledBy){d.prototype._oAriaLabelledBy=new c({text:sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("BREADCRUMB_TRAIL_LABEL")}).toStatic();}return this._oAriaLabelledBy;};d.prototype._getItemNavigation=function(){if(!this._ItemNavigation){this._ItemNavigation=new I();}return this._ItemNavigation;};d.prototype._getItemsToNavigate=function(){var i=this.getLinks(),o=this.getCurrentLocation(),s=this.getShowCurrentLocation();if(s&&o){i.push(o);}return i;};d.prototype._configureKeyboardHandling=function(){var i=this._getItemNavigation(),h=this._getBreadcrumbsAsJQueryObject()[0],s=-1,e=this._getItemsToNavigate(),n=[];e.forEach(function(o){o.$().attr("tabindex","-1");n.push(o.getDomRef());});this.addDelegate(i);i.setCycling(false);i.setRootDomRef(h);i.setItemDomRefs(n);i.setSelectedIndex(s);this._getBreadcrumbsAsJQueryObject().attr("tabindex","-1");e[0].$().attr("tabindex","0");return this;};d.prototype.onsappageup=function(e){this._handlePageKeys(e,false);};d.prototype.onsappagedown=function(e){this._handlePageKeys(e,true);};d.prototype._handlePageKeys=function(e,m){var n,f=this._getItemsToNavigate(),E=0,i=m?f.length-1:0;e.preventDefault();f.some(function(o,g){if(o.getId()===e.target.id){E=g;return true;}});if(m){n=E+d.PAGEUP_AND_PAGEDOWN_JUMP_SIZE;}else{n=E-d.PAGEUP_AND_PAGEDOWN_JUMP_SIZE;}if(n&&f[n]){f[n].focus();}else if(f[i]){f[i].focus();}};d.prototype._getUsingOverflowSelect=function(){return!this._getOverflowSelectAsJQueryObject().hasClass("sapUiHidden");};d.prototype.exit=function(){if(this._ItemNavigation){this.removeDelegate(this._ItemNavigation);this._ItemNavigation.destroy();this._ItemNavigation=null;}this._resetControl();};return d;});
