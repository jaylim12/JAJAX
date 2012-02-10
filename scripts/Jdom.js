/**
 * @file Jdom.js
 * @author Jay Lim
 *
 */
 
var JDOM;
if(!JDOM) JDOM={};

(function () {
	"use strict";
	
	if(!window.$&&typeof window.$!=='function') {
		window.$=function (query) {
			return document.querySelectorAll(query);
		}
	}
	
	function create(tag,obj) {
		if(tag&&typeof tag==='object'&&tag.tagName&&obj&&typeof obj==='object') {
			if(!obj.length) obj=[].concat(obj);
			[].forEach.call(obj,function(ob) {
				if(ob['element']&&typeof ob['element']==='string') {
					var elem=document.createElement(ob['element']);
					if(ob['attribute']&&typeof ob['attribute']==='object') {
						var attr=ob['attribute'];
						for(var key in attr) {
							if(attr.hasOwnProperty(key)) {
								if(typeof attr[key]==="boolean") elem.setAttribute(key);
								else elem.setAttribute(key,attr[key]);
							}
						}
					}
					if(ob['value']&&typeof ob['value']==='string')
						elem.appendChild(document.createTextNode(ob['value']));
					if(ob['child']&&typeof ob['child']==='object')
						create(elem,ob['child']);
					tag.appendChild(elem);
				}
			});
			return true;
		}
		return false;
	}
	
	if(!JDOM.create&&typeof JDOM.create!=='function') JDOM.create = create;
}());
