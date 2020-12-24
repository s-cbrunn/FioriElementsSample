sap.ui.define([
	"sap/ui/core/mvc/XMLView"
], function (XMLView) {
	"use strict";

	XMLView.create({
		viewName: "de.fiori.elements.samples.view.App"
	}).then(function (oView) {
		oView.placeAt("content");
	});

});