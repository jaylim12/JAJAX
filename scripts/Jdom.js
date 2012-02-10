/**
 * @file Jdom.js
 * @author Jay Lim
 *
 */
 
var JDOM;
if ( !JDOM )
	JDOM = {};

(function () {
	"use strict";
	
	if(!window.$&&typeof window.$!=='function') {
		window.$=function (query) {
			return document.querySelectorAll(query);
		}
	}
	
	function check(id) {
		if($(id)) return true;
		throw new Error('No such id!');
	}
	
	function create ( tag, obj ) {
		if ( tag && typeof tag === 'object' && tag.tagName && 
			 obj && typeof obj === 'object' ) {
			if(!obj.length) obj = [].concat(obj);
			[].forEach.call(obj,function(ob) {
				if ( ob['element'] && typeof ob['element'] === 'string' ) {
					var elem = document.createElement(ob['element']);
					if ( ob['attribute'] && typeof ob['attribute'] === 'object' ) {
						var attr = ob['attribute'];
						for ( var key in attr ) {
							if ( attr.hasOwnProperty(key) ) {
								if(typeof attr[key] === "boolean") elem.setAttribute(key);
								else elem.setAttribute(key, attr[key]);
							}
						}
					}
					if ( ob['value'] && typeof ob['value'] === 'string' )
						elem.appendChild(document.createTextNode(ob['value']));
					if ( ob['child'] && typeof ob['child'] === 'object' )
						create(elem,ob['child']);
					tag.appendChild(elem);
				}
			});
			return true;
		}
		return false;
	}
	
	if ( !JDOM.hasClassName && typeof JDOM.hasClassName !== 'function' ) {
		JDOM.hasClassName = function ( id, name ) {
			try {
				check(id);
			} catch (err) {
				return false;
			}
			return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test($(id).className);
		}
	}
	
	if ( !JDOM.addClassName && typeof JDOM.addClassName !== 'function' ) {
		JDOM.addClassName = function ( id, name ) {
			if ( !JDOM.hasClassName(id, name) )
				$(id).className = $(id).className ? [$(id).className, name].join(' ') : name;
		}
	}
	
	if ( !JDOM.removeClassName && typeof JDOM.removeClassName !== 'function' ) {
		JDOM.removeClassName = function ( id, name ) {
			if ( JDOM.hasClassName(id, name) ) {
				var c = $(id).className;
				$(id).className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
			}
		}
	}
	
	if ( !JDOM.remove && typeof JDOM.remove !== 'function' ) {
		JDOM.remove = function ( id ) {
			try {
				check(id);
				$(id).parentNode.removeChild($(id));
			}
			catch (err) {
				return false;
			}
			return true;
		}
	}
	
	if ( !JDOM.create && typeof JDOM.create !== 'function' ) {
		JDOM.create = create;
	}
	
}());
