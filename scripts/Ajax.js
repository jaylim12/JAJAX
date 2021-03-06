/**
 * @file Ajax.js
 * @author Jay Lim
 *
 */

var AJAX;
if(!AJAX) AJAX = {};
(function () {
	"use strict";
	
	var xmlhttp;
	var onready=function(text) { alert(text); };
	
	Element.prototype.hasClassName = function(name) {
		return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
	};

	Element.prototype.addClassName = function(name) {
		if(!this.hasClassName(name)) {
			this.className = this.className ? [this.className, name].join(' ') : name;
		}
	};

	Element.prototype.removeClassName = function(name) {
		if(this.hasClassName(name)) {
			var c = this.className;
			this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
		}
	};
	
	if(!window.$&&typeof window.$!=='function') {
		window.$=function(query) {
			return document.querySelectorAll(query);
		}
	}
	
	function ajaxRequest() {
		if(window.XMLHttpRequest) return new XMLHttpRequest();
		else if(window.ActiveXObject) {
			var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
			for(var i=0;i<activexmodes.length;++i) {
				try {
					return new ActiveXObject(activexmodes[i]);
				}
				catch(e) { }
			}
		}
		return false;
	}
	xmlhttp=ajaxRequest();
	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState==4&&xmlhttp.status==200) {
			onready(xmlhttp.responseText);
			return true;
		}
		return false;
	}
	
	if(typeof AJAX.call!=='function') {
		AJAX.call = (function() {
			if(!xmlhttp) throw new Error('Ajax not supported!');
			return function(url,param,func) {
				if(func&&typeof func==='function') onready=func;
				xmlhttp.open((param?'POST':'GET'),url,true);
				if(param) xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send(param);
			};
		}());
	}
}());
