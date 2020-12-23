//@ui5-bundle sap/tnt/library-preload.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/tnt/InfoLabel',["./library","sap/ui/core/library","sap/ui/core/Control","sap/ui/core/Core","./InfoLabelRenderer"],function(l,C,a,b,I){"use strict";var R=l.RenderMode;var T=C.TextDirection;
var c=a.extend("sap.tnt.InfoLabel",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.tnt",properties:{text:{type:"string",defaultValue:"",bindable:"bindable"},renderMode:{type:"sap.tnt.RenderMode",defaultValue:R.Loose,group:"Appearance"},colorScheme:{type:"int",group:"Misc",defaultValue:7},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},displayOnly:{type:"boolean",group:"Appearance",defaultValue:false},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""}}}});
c.prototype.init=function(){if(b.getConfiguration().getAccessibility()&&!I._sAriaText){var r=b.getLibraryResourceBundle("sap.tnt");I._sAriaText=r.getText("INFOLABEL_DEFAULT");I._sAriaTextEmpty=r.getText("INFOLABEL_EMPTY");}};
c.prototype.getFormDoNotAdjustWidth=function(){return true;};
return c;});
sap.ui.predefine('sap/tnt/InfoLabelRenderer',["./library","sap/ui/core/library","sap/base/Log","sap/ui/core/IconPool"],function(l,c,L,I){"use strict";var R=l.RenderMode;var T=c.TextDirection;var a={apiVersion:2};
a.render=function(r,C){var i=C.getColorScheme(),t=C.getText(),s=C.getTextDirection(),w=C.getWidth(),b=C.getTooltip(),o=C.getIcon();if(i<1||i>10){i=7;L.warning("sap.tnt.InfoLabel: colorScheme value is set to the default value of 7. Provided value should be between 1 and 10");}r.openStart("div",C).class("sapTntInfoLabel");if(C.getRenderMode()===R.Narrow){r.class("sapTntInfoLabelRenderModeNarrow");}if(C.getDisplayOnly()){r.class("sapTntInfoLabelDisplayOnly");}if(t===""){r.class("sapTntInfoLabelNoText");}if(w){r.style("width",w);}if(o){r.class("sapTntInfoLabelWithIcon");}if(b){r.attr("title",b);}r.class("backgroundColor"+i).openEnd();r.openStart("span").class("sapTntInfoLabelInner");if(s!==T.Inherit){r.attr("dir",s.toLowerCase());}r.openEnd();if(o){if(t&&o){r.icon(o,[],{title:""});}else{r.icon(o);}}r.openStart("span").class("sapTntInfoLabelText").openEnd();r.text(t);r.close("span");r.close("span");if(a._sAriaText){r.openStart("span").class("sapUiPseudoInvisibleText").openEnd();if(t){r.text(a._sAriaText);}else if(!o){r.text(a._sAriaTextEmpty);}else{if(b){r.text(b+" "+a._sAriaText);}else if(I.getIconInfo(C.getIcon()).text){r.text(I.getIconInfo(C.getIcon()).text+" "+a._sAriaText);}else{r.text(I.getIconInfo(C.getIcon()).name+" "+a._sAriaText);}}r.close("span");}r.close("div");};
return a;},true);
sap.ui.predefine('sap/tnt/NavigationList',["sap/ui/thirdparty/jquery",'./library','sap/ui/core/Element','sap/ui/core/Control','sap/m/Popover','sap/ui/core/delegate/ItemNavigation','sap/ui/core/InvisibleText',"./NavigationListRenderer","sap/base/Log"],function(q,l,E,C,P,I,a,N,L){"use strict";
var b=C.extend("sap.tnt.NavigationList",{metadata:{library:"sap.tnt",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension"},expanded:{type:"boolean",group:"Misc",defaultValue:true},selectedKey:{type:"string",group:"Data"}},defaultAggregation:"items",aggregations:{items:{type:"sap.tnt.NavigationListItem",multiple:true,singularName:"item"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},selectedItem:{type:"sap.tnt.NavigationListItem",multiple:false}},events:{itemSelect:{parameters:{item:{type:"sap.ui.core.Item"}}}}}});
b.prototype.init=function(){this._itemNavigation=new I();this._itemNavigation.setCycling(false);this.addEventDelegate(this._itemNavigation);this._itemNavigation.setPageSize(10);this._itemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});if(sap.ui.getCore().getConfiguration().getAccessibility()&&!b._sAriaPopupLabelId){b._sAriaPopupLabelId=new a({text:''}).toStatic().getId();}};
b.prototype.onBeforeRendering=function(){var s=this.getSelectedKey();this.setSelectedKey(s);};
b.prototype.onAfterRendering=function(){this._itemNavigation.setRootDomRef(this.getDomRef());this._itemNavigation.setItemDomRefs(this._getDomRefs());};
b.prototype._updateNavItems=function(){this._itemNavigation.setItemDomRefs(this._getDomRefs());};
b.prototype._getDomRefs=function(){var d=[],c=this.getItems(),e=this.getExpanded();for(var i=0;i<c.length;i++){if(e){q.merge(d,c[i]._getDomRefs());}else{d.push(c[i].getDomRef());}}return d;};
b.prototype._adaptPopoverPositionParams=function(){if(this.getShowArrow()){this._marginLeft=10;this._marginRight=10;this._marginBottom=10;this._arrowOffset=8;this._offsets=["0 -8","8 0","0 8","-8 0"];this._myPositions=["center bottom","begin top","center top","end top"];this._atPositions=["center top","end top","center bottom","begin top"];}else{this._marginTop=0;this._marginLeft=0;this._marginRight=0;this._marginBottom=0;this._arrowOffset=0;this._offsets=["0 0","0 0","0 0","0 0"];this._myPositions=["begin bottom","begin top","begin top","end top"];this._atPositions=["begin top","end top","begin bottom","begin top"];}};
b.prototype.exit=function(){if(this._itemNavigation){this._itemNavigation.destroy();}};
b.prototype._selectItem=function(p){this.fireItemSelect(p);var i=p.item;this.setSelectedItem(i,true);};
b.prototype._findItemByKey=function(s){var g=this.getItems(),c,d,e,i,j;for(i=0;i<g.length;i++){c=g[i];if(c._getUniqueKey()===s){return c;}d=c.getItems();for(j=0;j<d.length;j++){e=d[j];if(e._getUniqueKey()===s){return e;}}}return null;};
b.prototype.setSelectedKey=function(s){var i=this._findItemByKey(s);this.setSelectedItem(i,true);this.setProperty('selectedKey',s,true);return this;};
b.prototype.getSelectedItem=function(){var s=this.getAssociation('selectedItem');if(!s){return null;}return sap.ui.getCore().byId(s);};
b.prototype.setSelectedItem=function(s){var n,c,i;if(this._selectedItem){this._selectedItem._unselect();}if(!s){this._selectedItem=null;}i=s instanceof E&&s.isA("sap.tnt.NavigationListItem");if(typeof s!=='string'&&!i){L.warning('Type of selectedItem association should be string or instance of sap.tnt.NavigationListItem. New value was not set.');this.setAssociation('selectedItem',null,true);return this;}this.setAssociation('selectedItem',s,true);if(typeof s==='string'){n=sap.ui.getCore().byId(s);}else{n=s;}c=n?n._getUniqueKey():'';this.setProperty('selectedKey',c,true);if(n){n._select();this._selectedItem=n;return this;}L.warning('Type of selectedItem association should be a valid NavigationListItem object or ID. New value was not set.');return this;};
b.prototype._openPopover=function(s,c){var t=this;var d=c.getSelectedItem();if(d&&c.isGroupSelected){d=null;}var p=this._popover=new P({showHeader:false,horizontalScrolling:false,verticalScrolling:true,initialFocus:d,afterClose:function(){if(t._popover){t._popover.destroy();t._popover=null;}},content:c,ariaLabelledBy:[b._sAriaPopupLabelId]}).addStyleClass('sapContrast sapContrastPlus');p._adaptPositionParams=this._adaptPopoverPositionParams;p.openBy(s);};
b.prototype._closePopover=function(){if(this._popover){this._popover.close();}};
return b;});
sap.ui.predefine('sap/tnt/NavigationListItem',["./library",'sap/ui/core/Core',"sap/ui/core/Item",'sap/ui/core/Icon','./NavigationList','sap/ui/core/InvisibleText','sap/ui/core/Renderer','sap/ui/core/IconPool',"sap/ui/events/KeyCodes","sap/ui/core/library","sap/ui/dom/jquery/Aria"],function(l,C,I,a,N,b,R,c,K,d){"use strict";var T=d.TextAlign;var e=d.TextDirection;
var f=I.extend("sap.tnt.NavigationListItem",{metadata:{library:"sap.tnt",properties:{icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:''},expanded:{type:"boolean",group:"Misc",defaultValue:true},hasExpander:{type:"boolean",group:"Misc",defaultValue:true},visible:{type:"boolean",group:"Appearance",defaultValue:true},href:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},target:{type:"string",group:"Behavior",defaultValue:null}},defaultAggregation:"items",aggregations:{items:{type:"sap.tnt.NavigationListItem",multiple:true,singularName:"item"},_expandIconControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{select:{parameters:{item:{type:"sap.ui.core.Item"}}}},designtime:"sap/tnt/designtime/NavigationListItem.designtime"}});
f.expandIcon='sap-icon://navigation-right-arrow';f.collapseIcon='sap-icon://navigation-down-arrow';
f._getInvisibleText=function(){return this._invisibleText||(this._invisibleText=new b().toStatic());};
f.prototype.init=function(){this._resourceBundle=C.getLibraryResourceBundle("sap.ui.core");this._resourceBundleMLib=C.getLibraryResourceBundle("sap.m");this._resourceBundleTNTLib=C.getLibraryResourceBundle("sap.tnt");};
f.prototype._getUniqueKey=function(){var k=this.getKey();if(k){return k;}return this.getId();};
f.prototype._getExpandIconControl=function(){var g=this.getAggregation('_expandIconControl');if(!g){var h=this.getExpanded();g=new a({src:h?f.collapseIcon:f.expandIcon,visible:this.getItems().length>0&&this.getHasExpander(),useIconTooltip:false,tooltip:this._getExpandIconTooltip(!h)}).addStyleClass('sapTntNavLIExpandIcon');this.setAggregation("_expandIconControl",g,true);}return g;};
f.prototype._getExpandIconTooltip=function(g){if(!this.getEnabled()){return'';}var t=g?'Icon.expand':'Icon.collapse';return this._resourceBundle.getText(t);};
f.prototype.getLevel=function(){var g=0;var p=this.getParent();if(p.getMetadata().getName()=='sap.tnt.NavigationListItem'){return p.getLevel()+1;}return g;};
f.prototype.getNavigationList=function(){var p=this.getParent();while(p&&p.getMetadata().getName()!='sap.tnt.NavigationList'){p=p.getParent();}return p;};
f.prototype._isListExpanded=function(){var n=this.getNavigationList();return n.getExpanded()||n.hasStyleClass("sapTntNavLIPopup");};
f.prototype.createPopupList=function(){var n=[],g=this.getNavigationList(),s=g.getSelectedItem(),p,h,j,k=this.getItems();for(var i=0;i<k.length;i++){h=k[i];if(h.getVisible()){j=new f({key:h.getId(),text:h.getText(),textDirection:h.getTextDirection(),enabled:h.getEnabled(),href:h.getHref(),target:h.getTarget()});n.push(j);if(s===h){p=j;}}}var m=new f({expanded:true,hasExpander:false,key:this.getId(),text:this.getText(),enabled:this.getEnabled(),textDirection:this.getTextDirection(),href:this.getHref(),target:this.getTarget(),items:n});var o=new N({itemSelect:this.onPopupItemSelect.bind(this),items:[m]}).addStyleClass('sapTntNavLIPopup');if(s==this){p=m;o.isGroupSelected=true;}o.setSelectedItem(p);return o;};
f.prototype.onPopupItemSelect=function(g){var i=g.getParameter('item');i=C.byId(i.getKey());i._selectItem(g);};
f.prototype._selectItem=function(g){var p={item:this},n=this.getNavigationList();this.fireSelect(p);n._selectItem(p);this._openUrl();};
f.prototype._openUrl=function(){var h=this.getHref();if(h){window.open(h,this.getTarget()||'_self');}};
f.prototype.onkeydown=function(g){if(g.isMarked('subItem')){return;}g.setMarked('subItem');if(this.getLevel()>0){return;}var i=C.getConfiguration().getRTL();if((g.shiftKey&&g.which==189)||g.which==K.NUMPAD_MINUS||(g.which==K.ARROW_RIGHT&&i)||(g.which==K.ARROW_LEFT&&!i)){if(this.collapse()){g.preventDefault();g.stopPropagation();}}else if(g.which==K.NUMPAD_PLUS||(g.shiftKey&&g.which==K.PLUS)||g.which==K.ARROW_LEFT&&i||g.which==K.ARROW_RIGHT&&!i){if(this.expand()){g.preventDefault();g.stopPropagation();}}};
f.prototype.expand=function(g){if(this.getExpanded()||!this.getHasExpander()||this.getItems().length==0||this.getLevel()>0){return;}this.setProperty('expanded',true,true);this.$().find('.sapTntNavLIGroup').attr('aria-expanded',true);var h=this._getExpandIconControl();h.setSrc(f.collapseIcon);h.setTooltip(this._getExpandIconTooltip(false));var $=this.$().find('.sapTntNavLIGroupItems');$.stop(true,true).slideDown(g||'fast',function(){$.toggleClass('sapTntNavLIHiddenGroupItems');});this.getNavigationList()._updateNavItems();return true;};
f.prototype.collapse=function(g){if(!this.getExpanded()||!this.getHasExpander()||this.getItems().length==0||this.getLevel()>0){return;}this.setProperty('expanded',false,true);this.$().find('.sapTntNavLIGroup').attr('aria-expanded',false);var h=this._getExpandIconControl();h.setSrc(f.expandIcon);h.setTooltip(this._getExpandIconTooltip(true));var $=this.$().find('.sapTntNavLIGroupItems');$.stop(true,true).slideUp(g||'fast',function(){$.toggleClass('sapTntNavLIHiddenGroupItems');});this.getNavigationList()._updateNavItems();return true;};
f.prototype.ontap=function(g){var n=this.getNavigationList(),s=C.byId(g.target.id),h=this.getLevel(),p,i;if(g.isMarked('subItem')){return;}g.setMarked('subItem');if(!this.getEnabled()){return;}if(h===1){p=this.getParent();if(this.getEnabled()&&p.getEnabled()){this._selectItem(g);}return;}if(n.getExpanded()||!this.getItems().length){if(!s||s.getMetadata().getName()!=='sap.ui.core.Icon'||!s.$().hasClass('sapTntNavLIExpandIcon')){this._selectItem(g);return;}g.preventDefault();if(this.getExpanded()){this.collapse();}else{this.expand();}}else{i=this.createPopupList();n._openPopover(this,i);}};
f.prototype.onsapenter=f.prototype.ontap;f.prototype.onsapspace=f.prototype.ontap;
f.prototype.render=function(r,g){if(!this.getVisible()){return;}if(this.getLevel()===0){this.renderFirstLevelNavItem(r,g);}else{this.renderSecondLevelNavItem(r,g);}};
f.prototype.renderGroupItem=function(r,g){var i=this._isListExpanded(),h=this.getExpanded(),j=this._getVisibleItems(this),k=j.length,t=this.getText(),m=this.getHref(),n=this.getTarget(),o,p={level:'1',role:'treeitem',selected:false,roledescription:this._resourceBundleTNTLib.getText("NAVIGATION_LIST_ITEM_ROLE_DESCRIPTION_TREE_ITEM")};r.openStart("div");r.class("sapTntNavLIItem");r.class("sapTntNavLIGroup");if(g._selectedItem===this){p.selected=true;r.class("sapTntNavLIItemSelected");}if(!this.getEnabled()){r.class("sapTntNavLIItemDisabled");}if(!i&&this._hasSelectedChild(g._selectedItem)){r.class("sapTntNavLIItemSelected");}if(i){o=this.getTooltip_AsString()||t;if(o){r.attr("title",o);}if(this.getEnabled()){r.attr("tabindex","-1");}if(k>0){p.expanded=h;}r.accessibilityState(p);}r.openEnd();r.openStart('a',this.getId()+'-a');r.attr('tabindex','-1');if(m){r.attr('href',m);}if(n){r.attr('target',n);}r.openEnd();this._renderIcon(r);if(g.getExpanded()){var q=this._getExpandIconControl();q.setVisible(this.getItems().length>0&&this.getHasExpander());q.setSrc(this.getExpanded()?f.collapseIcon:f.expandIcon);q.setTooltip(this._getExpandIconTooltip(!this.getExpanded()));this._renderText(r);r.renderControl(q);}r.close("a");r.close("div");};
f.prototype.renderFirstLevelNavItem=function(r,g){var h,j=this._getVisibleItems(this),k=j.length,m=this.getExpanded(),n=this._isListExpanded(),t,o={role:'menuitemradio',checked:false,roledescription:this._resourceBundleTNTLib.getText("NAVIGATION_LIST_ITEM_ROLE_DESCRIPTION_MENUITEM")};r.openStart("li",this);if(!n){if(this.getEnabled()){r.attr('tabindex','-1');}t=this.getTooltip_AsString()||this.getText();if(t){r.attr("title",t);}if(k>0){if(this.getEnabled()){r.class("sapTnTNavLINotExpandedTriangle");}o.haspopup="tree";}if(g._selectedItem===this){o.checked=true;}r.accessibilityState(o);}else{r.attr('aria-hidden','true');}r.openEnd();this.renderGroupItem(r,g);if(n){r.openStart('ul');r.attr('aria-hidden','true');r.attr('role','group');r.class("sapTntNavLIGroupItems");if(!m){r.class("sapTntNavLIHiddenGroupItems");}r.openEnd();for(var i=0;i<k;i++){h=j[i];h.render(r,g,i,k);}r.close("ul");}r.close("li");};
f.prototype.renderSecondLevelNavItem=function(r,g){var h=this.getParent(),i=this.getHref(),t=this.getTarget(),j={role:'treeitem',level:'2',selected:false,roledescription:this._resourceBundleTNTLib.getText("NAVIGATION_LIST_ITEM_ROLE_DESCRIPTION_TREE_ITEM")};r.openStart('li',this);r.class("sapTntNavLIItem");r.class("sapTntNavLIGroupItem");if(g._selectedItem===this){j.selected=true;r.class("sapTntNavLIItemSelected");}if(!this.getEnabled()||!h.getEnabled()){r.class("sapTntNavLIItemDisabled");}else{r.attr('tabindex','-1');}var k=this.getText();var m=this.getTooltip_AsString()||k;if(m){r.attr("title",m);}r.accessibilityState(j);r.openEnd();r.openStart('a',this.getId()+'-a');r.attr('tabindex','-1');if(i){r.attr('href',i);}if(t){r.attr('target',t);}r.openEnd();this._renderText(r);r.close('a');r.close('li');};
f.prototype._renderIcon=function(r){var i=this.getIcon(),g=c.getIconInfo(i);if(i){r.openStart('span');r.class("sapUiIcon");r.class("sapTntNavLIGroupIcon");r.attr("aria-hidden",true);if(g&&!g.suppressMirroring){r.class("sapUiIconMirrorInRTL");}if(g){r.attr("data-sap-ui-icon-content",g.content);r.style("font-family","'"+g.fontFamily+"'");}r.openEnd();r.close('span');}else{r.openStart('span');r.class('sapUiIcon');r.class('sapTntNavLIGroupIcon');r.attr('aria-hidden',true);r.openEnd();r.close('span');}};
f.prototype._renderText=function(r){r.openStart('span');r.class("sapMText");r.class("sapTntNavLIText");r.class("sapMTextNoWrap");var t=this.getTextDirection();if(t!==e.Inherit){r.attr("dir",t.toLowerCase());}var g=R.getTextAlign(T.Begin,t);if(g){r.style("text-align",g);}r.openEnd();r.text(this.getText());r.close('span');};
f.prototype._unselect=function(){var $=this.$(),n=this.getNavigationList();if(!n){return;}if(this._isListExpanded()){if(this.getLevel()===0){$=$.find('.sapTntNavLIGroup');}$.attr('aria-selected',false);}else{$.attr('aria-checked',false);$=$.find('.sapTntNavLIGroup');if(this.getParent().isA("sap.tnt.NavigationListItem")){this.getParent().$().find('.sapTntNavLIGroup').removeClass('sapTntNavLIItemSelected');}}$.removeClass('sapTntNavLIItemSelected');};
f.prototype._select=function(){var $=this.$(),n=this.getNavigationList();if(!n){return;}if(this._isListExpanded()){if(this.getLevel()===0){$=$.find('.sapTntNavLIGroup');}$.attr('aria-selected',true);}else{$.attr('aria-checked',true);$=$.find('.sapTntNavLIGroup');if(this.getParent().isA("sap.tnt.NavigationListItem")){this.getParent().$().find('.sapTntNavLIGroup').addClass('sapTntNavLIItemSelected');}n._closePopover();}$.addClass('sapTntNavLIItemSelected');};
f.prototype._getDomRefs=function(){var g=[];if(!this.getEnabled()){return g;}var $=this.$();g.push($.find('.sapTntNavLIGroup')[0]);if(this.getExpanded()){var s=$.find('.sapTntNavLIGroupItem');for(var i=0;i<s.length;i++){g.push(s[i]);}}return g;};
f.prototype._getVisibleItems=function(g){var v=[];var i=g.getItems();var h;for(var j=0;j<i.length;j++){h=i[j];if(h.getVisible()){v.push(h);}}return v;};
f.prototype.onclick=function(g){if(this.getHref()){g.preventDefault();}};
f.prototype.onmousedown=function(g){if(this.getHref()){g.preventDefault();}};
f.prototype.onfocusin=function(g){if(g.srcControl!==this){return;}this._updateAccessibilityText();};
f.prototype._updateAccessibilityText=function(){var i=f._getInvisibleText(),n=this.getNavigationList(),g=this._resourceBundleMLib,h=n.getExpanded()?g.getText("ACC_CTR_TYPE_TREEITEM"):'',$=this._getAccessibilityItem(),p=this._getAccessibilityPosition(),j=g.getText("LIST_ITEM_POSITION",[p.index,p.size]),s=n._selectedItem===this?g.getText("LIST_ITEM_SELECTED"):'',k=n.getExpanded()?this.getText():"",t=h+" "+j+" "+s+" "+k;i.setText(t);$.addAriaLabelledBy(i.getId());};
f.prototype._getAccessibilityPosition=function(){var p=this.getParent(),v=this._getVisibleItems(p),s=v.length,i=v.indexOf(this)+1;return{index:i,size:s};};
f.prototype._getAccessibilityItem=function(){var $=this.$(),n=this.getNavigationList(),i=n.getExpanded();if(i&&this.getLevel()===0){$=$.find('.sapTntNavLIGroup');}return $;};
f.prototype._hasSelectedChild=function(s){var g=this.getItems(),i;for(i=0;i<g.length;i++){if(g[i]===s){return true;}}return false;};
return f;});
sap.ui.predefine('sap/tnt/NavigationListRenderer',["sap/ui/core/Core"],function(C){"use strict";var N={apiVersion:2};var r=C.getLibraryResourceBundle("sap.tnt");
N.render=function(a,c){var b,g=c.getItems(),e=c.getExpanded(),v=[],h=false;g.forEach(function(d){if(d.getVisible()){v.push(d);if(d.getIcon()){h=true;}}});a.openStart("ul",c);var w=c.getWidth();if(w&&e){a.style("width",w);}a.class("sapTntNavLI");if(!e){a.class("sapTntNavLICollapsed");}if(!h){a.class("sapTntNavLINoIcons");}b=!e&&!c.hasStyleClass("sapTntNavLIPopup")?'menubar':'tree';a.attr("role",b);if(b==='menubar'){a.attr("aria-orientation","vertical");a.attr("aria-roledescription",r.getText("NAVIGATION_LIST_ITEM_ROLE_DESCRIPTION_MENUBAR"));}else{a.attr("aria-roledescription",r.getText("NAVIGATION_LIST_ITEM_ROLE_DESCRIPTION_TREE"));}a.openEnd();v.forEach(function(d){d.render(a,c);});a.close("ul");};
return N;},true);
sap.ui.predefine('sap/tnt/SideNavigation',['./library','sap/ui/core/Control','sap/ui/core/ResizeHandler','sap/ui/core/Icon','sap/ui/core/delegate/ScrollEnablement',"./SideNavigationRenderer"],function(l,C,R,I,S,a){'use strict';
var b=C.extend('sap.tnt.SideNavigation',{metadata:{library:'sap.tnt',properties:{expanded:{type:'boolean',group:'Misc',defaultValue:true},selectedKey:{type:"string",group:"Data"}},defaultAggregation:"item",aggregations:{item:{type:'sap.tnt.NavigationList',multiple:false,bindable:"bindable"},fixedItem:{type:'sap.tnt.NavigationList',multiple:false},footer:{type:'sap.tnt.NavigationList',multiple:false},_topArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_bottomArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.tnt.NavigationListItem",multiple:false}},events:{itemSelect:{parameters:{item:{type:'sap.ui.core.Item'}}}}}});
b.prototype.init=function(){this._scroller=new S(this,this.getId()+"-Flexible-Content",{horizontal:false,vertical:true});this.data('sap-ui-fastnavgroup','true',true);};
b.prototype.setAggregation=function(c,o){if(o&&o.attachItemSelect){o.attachItemSelect(this._itemSelectionHandler.bind(this));}return C.prototype.setAggregation.apply(this,arguments);};
b.prototype.setExpanded=function(i){if(this.getExpanded()===i){return this;}var t=this,$=this.$(),c=t.getAggregation('item'),f=t.getAggregation('fixedItem'),w;if(!this.getDomRef()){this.setProperty('expanded',i);if(c){c.setExpanded(i);}if(f){f.setExpanded(i);}return this;}this.setProperty('expanded',i,true);if(t._hasActiveAnimation){t._finishAnimation(!i);$.stop();}if(i){$.toggleClass('sapTntSideNavigationNotExpanded',!i);if(c){c.setExpanded(i);}if(f){f.setExpanded(i);}}else{this._scroller.setVertical(false);}t._hasActiveAnimation=true;w=i?'15rem':'3rem';$.animate({width:w},{duration:300,complete:function(){var i=t.getExpanded();t._finishAnimation(i);}});return this;};
b.prototype._finishAnimation=function(i){if(!this._hasActiveAnimation||!this.getDomRef()){return;}this.$().toggleClass('sapTntSideNavigationNotExpandedWidth',!i);if(!i){this.$().toggleClass('sapTntSideNavigationNotExpanded',!i);if(this.getAggregation('item')){this.getAggregation('item').setExpanded(i);}if(this.getAggregation('fixedItem')){this.getAggregation('fixedItem').setExpanded(i);}this._scroller.setVertical(true);}this.$().css('width','');this._hasActiveAnimation=false;setTimeout(this._toggleArrows.bind(this),0);};
b.prototype.onBeforeRendering=function(){var s=this.getSelectedItem(),c=this.getSelectedKey();if(c){this.setSelectedKey(c);}else if(s){this.setSelectedItem(s);}this._deregisterControl();};
b.prototype.onAfterRendering=function(){this._ResizeHandler=R.register(this.getDomRef(),this._toggleArrows.bind(this));this._toggleArrows();};
b.prototype.setSelectedKey=function(s){var c,n=this.getItem(),f=this.getFixedItem();if(s&&n){c=n._findItemByKey(s);if(!c&&f){c=f._findItemByKey(s);}}if(c){this.setSelectedItem(c);}this.setProperty('selectedKey',s,true);return this;};
b.prototype.setSelectedItem=function(s){var n=this.getAggregation('item');var f=this.getAggregation('fixedItem');var c;var d;if(!s){if(n.setSelectedItem){n.setSelectedItem(null);}if(f.setSelectedItem){f.setSelectedItem(null);}}if(typeof s==='string'){c=sap.ui.getCore().byId(s);}else{c=s;}d=c?c._getUniqueKey():'';this.setProperty('selectedKey',d,true);var e=c&&c.getNavigationList&&c.getNavigationList()===n;var g=c&&c.getNavigationList&&c.getNavigationList()===f;if(e){n.setSelectedItem(c);if(f){f.setSelectedKey(null);}}if(g){f.setSelectedItem(c);if(n){n.setSelectedKey(null);}}return C.prototype.setAssociation.call(this,'selectedItem',c,true);};
b.prototype.exit=function(){if(this._scroller){this._scroller.destroy();this._scroller=null;}this._deregisterControl();};
b.prototype._itemSelectionHandler=function(e){var i=e.getParameter('item');this.setSelectedItem(i);this.fireItemSelect({item:i});};
b.prototype._deregisterControl=function(){if(this._ResizeHandler){R.deregister(this._ResizeHandler);this._ResizeHandler=null;}};
b.prototype._getTopArrowControl=function(){var i=this.getAggregation('_topArrowControl');var t=this;if(!i){i=new I({src:'sap-icon://navigation-up-arrow',noTabStop:true,useIconTooltip:false,tooltip:'',press:this._arrowPress.bind(t)}).addStyleClass('sapTntSideNavigationScrollIcon sapTntSideNavigationScrollIconUp');this.setAggregation("_topArrowControl",i,true);}return i;};
b.prototype._getBottomArrowControl=function(){var i=this.getAggregation('_bottomArrowControl');var t=this;if(!i){i=new I({src:'sap-icon://navigation-down-arrow',noTabStop:true,useIconTooltip:false,tooltip:'',press:this._arrowPress.bind(t)}).addStyleClass('sapTntSideNavigationScrollIcon sapTntSideNavigationScrollIconDown');this.setAggregation("_bottomArrowControl",i,true);}return i;};
b.prototype._toggleArrows=function(){var d=this.getDomRef();if(!d){return;}var s=this.$('Flexible')[0];var c=this.$('Flexible-Content')[0];var i=this.getExpanded();if(this._hasActiveAnimation){d.querySelector('.sapTntSideNavigationScrollIconUp').style.display='none';d.querySelector('.sapTntSideNavigationScrollIconDown').style.display='none';return;}if((c.offsetHeight>s.offsetHeight)&&!i){d.querySelector('.sapTntSideNavigationScrollIconUp').style.display='block';d.querySelector('.sapTntSideNavigationScrollIconDown').style.display='block';d.querySelector('.sapTntSideNavigationScrollIconDown').classList.remove('sapTntSideNavigationScrollIconDisabled');}else{d.querySelector('.sapTntSideNavigationScrollIconUp').style.display='none';d.querySelector('.sapTntSideNavigationScrollIconDown').style.display='none';}};
b.prototype._arrowPress=function(e){e.preventDefault();var s=e.getSource().getDomRef();var i=s.classList.contains('sapTntSideNavigationScrollIconDown')?true:false;var $=this.$('Flexible');var c=i?40:-40;$[0].scrollTop+=c;};
return b;});
sap.ui.predefine('sap/tnt/SideNavigationRenderer',["sap/ui/core/Core"],function(C){"use strict";var S={apiVersion:2};var r=C.getLibraryResourceBundle("sap.tnt");
S.render=function(a,c){this.startSideNavigation(a,c);this.renderArrowUp(a,c);this.renderItem(a,c);this.renderArrowDown(a,c);this.renderFixedItem(a,c);this.renderFooter(a,c);this.endSideNavigation(a,c);};
S.startSideNavigation=function(a,c){var i=c.getAggregation('item');var f=c.getAggregation('fixedItem');var b=c.getExpanded();a.openStart('div',c);a.attr("role",'navigation');a.attr('aria-roledescription',r.getText("SIDENAVIGATION_ROLE_DESCRIPTION"));a.class('sapTntSideNavigation');a.class("sapContrast");a.class("sapContrastPlus");if(!b){a.class('sapTntSideNavigationNotExpanded');a.class('sapTntSideNavigationNotExpandedWidth');}if(!b&&i){i.setExpanded(false);}if(!b&&f){f.setExpanded(false);}a.openEnd();};
S.endSideNavigation=function(a,c){a.close('div');};
S.renderArrowUp=function(a,c){a.renderControl(c._getTopArrowControl());};
S.renderArrowDown=function(a,c){a.renderControl(c._getBottomArrowControl());};
S.renderItem=function(a,c){var i=c.getAggregation('item');a.openStart('div',c.getId()+'-Flexible');a.attr('tabindex','-1');a.class('sapTntSideNavigationFlexible');a.class('sapTntSideNavigationVerticalScrolling');a.openEnd();a.openStart('div',c.getId()+'-Flexible-Content');a.class('sapTntSideNavigationFlexibleContent');a.openEnd();a.renderControl(i);a.close('div');a.close('div');};
S.renderFixedItem=function(a,c){var f=c.getAggregation('fixedItem');if(f===null){return;}if(f.getExpanded()===false){f.setExpanded(false);}a.openStart('div');a.attr('role','separator');a.attr('aria-roledescription',r.getText("SIDENAVIGATION_ROLE_DESCRIPTION_SEPARATOR"));a.attr('aria-orientation','horizontal');a.class('sapTntSideNavigationSeparator');a.openEnd();a.close('div');a.openStart('div');a.class('sapTntSideNavigationFixed');a.openEnd();a.renderControl(f);a.close('div');};
S.renderFooter=function(a,c){if(c.getAggregation('footer')){a.openStart('footer');a.class('sapTntSideNavigationFooter');a.openEnd();a.renderControl(c.getAggregation('footer'));a.close('footer');}};
return S;},true);
sap.ui.predefine('sap/tnt/ToolHeader',["./library","sap/m/OverflowToolbar","sap/m/OverflowToolbarAssociativePopover","./ToolHeaderRenderer","sap/ui/Device","sap/m/library"],function(l,O,a,T,D,m){"use strict";var P=m.PlacementType;
var b=O.extend("sap.tnt.ToolHeader",{metadata:{interfaces:["sap.tnt.IToolHeader"],library:"sap.tnt",properties:{},aggregations:{}}});
b.prototype.init=function(){O.prototype.init.apply(this,arguments);this.addStyleClass("sapTntToolHeader sapContrast sapContrastPlus");};
b.prototype._getPopover=function(){var p=this.getAggregation("_popover");if(!p){p=new a(this.getId()+"-popover",{showHeader:false,showArrow:D.system.phone?false:true,modal:false,horizontalScrolling:D.system.phone?false:true,contentWidth:D.system.phone?"100%":"auto"}).addStyleClass("sapTntToolHeaderPopover sapContrast sapContrastPlus");if(D.system.phone){p.attachBeforeOpen(this._shiftPopupShadow,this);p.attachAfterOpen(this._shiftPopupShadow,this);}p.attachAfterClose(this._popOverClosedHandler,this);this.setAggregation("_popover",p,true);}return p;};
b.prototype._getBestActionSheetPlacement=function(){return P.Bottom;};
return b;});
sap.ui.predefine('sap/tnt/ToolHeaderRenderer',["sap/ui/core/Renderer","sap/m/OverflowToolbarRenderer","sap/m/BarInPageEnabler"],function(R,O,B){"use strict";var T=R.extend(O);T.apiVersion=2;
T.renderBarContent=function(r,t){var o=false,i;t._getVisibleContent().forEach(function(c){i=c.isA("sap.tnt.ToolHeaderUtilitySeparator");if(!o&&i&&t._getOverflowButtonNeeded()){T.renderOverflowButton(r,t);o=true;}B.addChildClassTo(c,t);r.renderControl(c);});if(!o&&t._getOverflowButtonNeeded()){T.renderOverflowButton(r,t);}};
return T;},true);
sap.ui.predefine('sap/tnt/ToolHeaderUtilitySeparator',['./library','sap/ui/core/Control'],function(l,C){"use strict";
var T=C.extend("sap.tnt.ToolHeaderUtilitySeparator",{
metadata:{library:"sap.tnt",properties:{}},
renderer:{apiVersion:2,render:function(){}}
});
return T;});
sap.ui.predefine('sap/tnt/ToolPage',["./library","sap/ui/core/Control","sap/ui/Device","sap/ui/core/ResizeHandler","./ToolPageRenderer"],function(l,C,D,R,T){"use strict";
var a=C.extend("sap.tnt.ToolPage",{metadata:{library:"sap.tnt",properties:{sideExpanded:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{header:{type:"sap.tnt.IToolHeader",multiple:false},sideContent:{type:"sap.tnt.SideNavigation",multiple:false},mainContents:{type:"sap.ui.core.Control",multiple:true,singularName:"mainContent"}},events:{}}});
a.prototype.exit=function(){this._deregisterControl();};
a.prototype.onBeforeRendering=function(){this._deregisterControl();};
a.prototype.onAfterRendering=function(){this._ResizeHandler=R.register(this.getDomRef(),this._mediaQueryHandler.bind(this));this._updateLastMediaQuery();};
a.prototype.toggleSideContentMode=function(){return this.setSideExpanded(!this.getSideExpanded());};
a.prototype.setSideExpanded=function(s){this.setProperty("sideExpanded",s,true);var S=this.getSideContent();if(S){var n=D.system.phone?true:s;S.setExpanded(n);}else{return this;}var d=this.getDomRef();if(!d){return this;}if(s){d.querySelector(".sapTntToolPageContentWrapper").classList.remove("sapTntToolPageAsideCollapsed");}else{d.querySelector(".sapTntToolPageContentWrapper").classList.add("sapTntToolPageAsideCollapsed");}return this;};
a.prototype._deregisterControl=function(){if(this._ResizeHandler){R.deregister(this._ResizeHandler);this._ResizeHandler=null;}};
a.prototype._mediaQueryHandler=function(){var s=this.getSideContent();if(s===null){return;}this._currentMediaQuery=this._getDeviceAsString();if(this._getLastMediaQuery()===this._currentMediaQuery){return;}switch(this._currentMediaQuery){case"Combi":this.setSideExpanded(true);break;case"Tablet":this.setSideExpanded(false);break;case"Phone":this.setSideExpanded(false);s.setExpanded(true);break;default:this.setSideExpanded(true);}this._updateLastMediaQuery();};
a.prototype._getLastMediaQuery=function(){return this._lastMediaQuery;};
a.prototype._updateLastMediaQuery=function(){this._lastMediaQuery=this._getDeviceAsString();return this;};
a.prototype._getDeviceAsString=function(){if(D.system.combi){return"Combi";}if(D.system.phone){return"Phone";}if(D.system.tablet){return"Tablet";}return"Desktop";};
return a;},true);
sap.ui.predefine('sap/tnt/ToolPageRenderer',["sap/ui/Device"],function(D){"use strict";var T={apiVersion:2};
T.render=function(r,c){var h=c.getHeader();r.openStart("div",c).class("sapTntToolPage");if(h){r.class("sapTntToolPageWithHeader");}r.openEnd();if(h){r.openStart("header").openEnd();r.openStart("div",c.getId()+"-header").class("sapTntToolPageHeader").openEnd();r.renderControl(h);r.close("div");r.close("header");}this.renderContentWrapper(r,c);r.close("div");};
T.renderContentWrapper=function(r,c){r.openStart("div").class("sapTntToolPageContentWrapper");if(!D.system.desktop||!c.getSideExpanded()){r.class("sapTntToolPageAsideCollapsed");}r.openEnd();this.renderAsideContent(r,c);this.renderMainContent(r,c);r.close("div");};
T.renderAsideContent=function(r,c){var s=c.getSideContent();if(!s){return;}r.openStart("aside",c.getId()+"-aside").class("sapTntToolPageAside").openEnd();r.openStart("div").class("sapTntToolPageAsideContent").openEnd();var S=c.getSideExpanded();if(s&&s.getExpanded()!==S){s.setExpanded(S);}if(!D.system.desktop){c.setSideExpanded(false);}r.renderControl(s);r.close("div");r.close("aside");};
T.renderMainContent=function(r,c){var m=c.getMainContents();if(!m){return;}r.openStart("div",c.getId()+"-main").class("sapTntToolPageMain").openEnd();r.openStart("div").class("sapTntToolPageMainContent").openEnd();r.openStart("div").class("sapTntToolPageMainContentWrapper").openEnd();m.forEach(r.renderControl,r);r.close("div");r.close("div");r.close("div");};
return T;},true);
sap.ui.predefine('sap/tnt/flexibility/NavigationListItem.flexibility',["sap/ui/fl/changeHandler/BaseRename"],function(B){"use strict";return{"hideControl":"default","rename":B.createRenameChangeHandler({propertyName:"text",translationTextType:"XBUT"}),"unhideControl":"default"};});
sap.ui.predefine('sap/tnt/library',["sap/ui/core/library","sap/m/library"],function(){"use strict";sap.ui.getCore().initLibrary({name:"sap.tnt",version:"1.84.3",dependencies:["sap.ui.core","sap.m"],designtime:"sap/tnt/designtime/library.designtime",types:["sap.tnt.RenderMode"],interfaces:["sap.tnt.IToolHeader"],controls:["sap.tnt.NavigationList","sap.tnt.ToolHeaderUtilitySeparator","sap.tnt.ToolHeader","sap.tnt.SideNavigation","sap.tnt.ToolPage","sap.tnt.InfoLabel"],elements:["sap.tnt.NavigationListItem"],extensions:{flChangeHandlers:{"sap.tnt.NavigationListItem":"sap/tnt/flexibility/NavigationListItem"}}});sap.tnt.RenderMode={Narrow:"Narrow",Loose:"Loose"};return sap.tnt;});
sap.ui.require.preload({
	"sap/tnt/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"sap.tnt","type":"library","embeds":[],"applicationVersion":{"version":"1.84.3"},"title":"SAPUI5 library with responsive controls.","description":"SAPUI5 library with responsive controls.","ach":"CA-UI5-CTR","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.84","libs":{"sap.ui.core":{"minVersion":"1.84.3"},"sap.m":{"minVersion":"1.84.3"}}},"library":{"i18n":{"bundleUrl":"messagebundle.properties","supportedLocales":["","ar","bg","ca","cs","da","de","el","en","en-GB","en-US-sappsd","en-US-saprigi","en-US-saptrc","es","es-MX","et","fi","fr","hi","hr","hu","it","iw","ja","kk","ko","lt","lv","ms","nl","no","pl","pt","rigi","ro","ru","sh","sk","sl","sv","th","tr","uk","vi","zh-CN","zh-TW"]},"content":{"controls":["sap.tnt.NavigationList","sap.tnt.ToolHeaderUtilitySeparator","sap.tnt.ToolHeader","sap.tnt.SideNavigation","sap.tnt.ToolPage","sap.tnt.InfoLabel"],"elements":["sap.tnt.NavigationListItem"],"types":["sap.tnt.RenderMode"],"interfaces":["sap.tnt.IToolHeader"]}}}}'
},"sap/tnt/library-preload"
);
//# sourceMappingURL=library-preload.js.map