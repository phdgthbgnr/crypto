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

// Events :  transitionend

// callback : e.elapsedTime / e.propertyName

manageEvents.versionTransEvents = {
	transEvents: {
		WebkitTransition: 'webkittransition',
		MozTransition: 'moztransition',
		OTransition: 'otransition',
		transition: 'transition'
	},
	nameEvents: {
		transitionend: {
			webkittransition: 'webkitTransitionEnd',
			oanimation: 'oTransitionEnd ',
			moztransition: 'mozTransitionEnd',
			transition: 'transitionend'
		}
	},
	currentTransEvents: {},
	init: function() {
		var el = document.createElement('bootstrap');
		var evtname = '';
		//console.log(objToString(el.style));

		for (var name in this.transEvents) {
			if (el.style[name] !== undefined) {
				evtname = this.transEvents[name];
			}
		}
		this.currentTransEvents = {
			transitionend: this.nameEvents['transitionend'][evtname]
		};
	}
};

manageEvents.listenertransAdd = function(id, evt, callback, capture) {
	var evta;
	//console.log(this.versionTransEvents.currentTransEvents);
	for (var name in this.versionTransEvents.currentTransEvents) {
		if (name == evt) evta = this.versionTransEvents.currentTransEvents[name];
	}
	if (evta === undefined) {
		console.log('%c' + evt + ' / evenement inconnu pour le navigateur !', 'color:#00b41c;font-weight:bold');
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

manageEvents.versionTransEvents.init();
