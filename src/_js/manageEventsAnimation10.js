/*
function objToString (obj) {
    var str = '';
    for (var p in obj) {
        //if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        //}
    }
    return str;
}
*/

manageEvents = typeof manageEvents !== undefined ? manageEvents : {};

// Events :  animationstart / animationend / animationiteration

// standard : animationstart, animationiteration, animationend
// Firefox : animationstart, animationiteration, animationend
// webkit : webkitAnimationStart, webkitAnimationIteration, webkitAnimationEnd
// opera : oAnimationStart, oAnimationIteration, oAnimationEnd
// opera ? : oanimationstart, oanimationiteration, oanimationend
// IE10 : MSAnimationStart, MSAnimationIteration, MSAnimationEnd

manageEvents.versionAnimEvents = {
	animEvents: {
		WebkitAnimation: 'webkitanimation',
		MozAnimation: 'animation',
		OAnimation: 'oanimation',
		oanimation: 'oanimation',
		msAnimation: 'msanimation',
		animation: 'animation'
	},
	nameEvents: {
		animationstart: {
			webkitanimation: 'webkitAnimationStart',
			oanimation: 'oAnimationStart oanimationstart',
			msanimation: 'MSAnimationStart',
			animation: 'animationstart'
		},
		animationend: {
			webkitanimation: 'webkitAnimationEnd',
			oanimation: 'oAnimationEnd oanimationend',
			msanimation: 'MSAnimationEnd',
			animation: 'animationend'
		},
		animationiteration: {
			webkitanimation: 'webkitAnimationIteration',
			oanimation: 'oAnimationIteration oanimationiteration',
			msanimation: 'MSAnimationIteration',
			animation: 'animationiteration'
		}
	},
	currentAnimEvents: {},
	init: function() {
		var el = document.createElement('bootstrap');
		var evtname = '';
		//console.log(objToString(el.style));
		for (var name in this.animEvents) {
			//var lowername = this.animEvents[name];
			if (el.style[name] !== undefined) {
				evtname = this.animEvents[name];
			}
		}
		this.currentAnimEvents = {
			animationstart: this.nameEvents['animationstart'][evtname],
			animationend: this.nameEvents['animationend'][evtname],
			animationiteration: this.nameEvents['animationiteration'][evtname]
		};

		//console.log(this.currentAnimEvents);
		//console.log(Object.keys(this.currentAnimEvents).length);
	}
};

manageEvents.listenerAnimAdd = function(id, evt, callback, capture) {
	var evta;
	for (var name in this.versionAnimEvents.currentAnimEvents) {
		if (name == evt) evta = this.versionAnimEvents.currentAnimEvents[name];
	}
	if (evta === undefined) {
		console.log(evt + ' / evenement inconnu pour le navigateur !');
		return;
	}
	try {
		this.$dc(id).addEventListener =
			this.$dc(id).addEventListener ||
			function(e, f) {
				manageEvents.$dc(id).attachEvent('on' + e, f);
			};
		this.$dc(id).addEventListener(
			evta,
			function _events(e) {
				manageEvents.myevents._addEvt({ id: id, evt: evta, event: arguments.callee });
				manageEvents.listen(e, this, callback, capture);
			},
			false
		);
		this.$dc(id).removeEventListener =
			this.$dc(id).removeEventListener ||
			function(e, f) {
				manageEvents.$dc(id).detachEvent('on' + e, f);
			};
	} catch (e) {
		console.log('%cERREUR : id "' + id + '" introuvable', 'color:#ff4e00;font-weight:bold');
		console.log(e);
		console.log('%c---------------------------', 'color:#ff4e00');
	}
};

manageEvents.versionAnimEvents.init();
