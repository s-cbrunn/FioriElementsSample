/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/InvisibleRenderer","sap/ui/Device"],function(c,I,D){'use strict';var P=c.Priority;var N={apiVersion:2};N.render=function(r,a){if(!a.getVisible()){I.render(r,a,a.TagName);return false;}var t=a.getTruncate(),b=a.getAuthorName(),d=a.getDatetime(),e=a._getAuthorAvatar(),p=a.getPriority(),i=a.getUnread(),C=a.getId(),f=C+'-invisibleFooterText',A='';if(a.getTitle()){A+=' '+C+'-title';}if(a.getDescription()){A+=' '+C+'-descr';}A+=' '+f;r.openStart('li',a).class('sapMLIB').class('sapMNLIB').class('sapMNLI');if(i){r.class('sapMNLIUnread');}if(!e){r.class('sapMNLINoAvatar');}r.attr('tabindex','0');r.accessibilityState(a,{role:"option",labelledby:{value:A}});r.openEnd();r.renderControl(a.getProcessingMessage());r.openStart('div').class('sapMNLIMain').openEnd();r.openStart('div').attr('aria-hidden','true').class('sapMNLIItem').class('sapMNLIItemAC').openEnd();if(a._shouldRenderOverflowToolbar()){r.openStart('div').class('sapMNLIItem').class('sapMNLIActions').openEnd();r.renderControl(a._getOverflowToolbar());r.close('div');}if(a._shouldRenderCloseButton()){r.openStart('div').class('sapMNLIItem').class('sapMNLICloseBtn').openEnd();r.renderControl(a._getCloseButton());r.close('div');}r.close('div');r.openStart('div').class('sapMNLIContent').openEnd();r.openStart('div').class('sapMNLITitle').openEnd();if(p!==P.None){r.openStart('div').class('sapMNLIBPriority').class('sapMNLIBPriority'+p).openEnd();r.renderControl(a._getPriorityIcon());r.close('div');}r.openStart('div',C+'-title').class('sapMNLITitleText');if(t){r.class('sapMNLIItemTextLineClamp');}r.openEnd();r.text(a.getTitle());r.close('div');r.close('div');r.openStart('div',C+'-descr').class('sapMNLIDescription');if(!a.getDescription()){r.class('sapMNLIDescriptionNoText');}if(t){r.class('sapMNLIItemTextLineClamp');}r.openEnd();r.text(a.getDescription());r.close('div');r.openStart('div').class('sapMNLIFooter').openEnd();r.openStart('div').class('sapMNLIFooterItem').openEnd();r.text(b);r.close('div');if(b&&d){r.openStart('div').class('sapMNLIFooterItem').class('sapMNLIFooterBullet').openEnd();r.text('·');r.close('div');}r.openStart('div').class('sapMNLIFooterItem').openEnd();r.text(d);r.close('div');if(!a.getHideShowMoreButton()){r.openStart('div').class('sapMNLIShowMore').attr('aria-hidden','true').openEnd();r.renderControl(a._getShowMoreButton());r.close('div');}r.renderControl(a._getFooterInvisibleText());r.close('div');r.close('div');r.openStart('div').class('sapMNLIImage').openEnd();if(e){r.renderControl(e);}r.close('div');r.close('div');r.close('li');};return N;},true);
