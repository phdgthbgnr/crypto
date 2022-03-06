/* eslint-disable no-console */
/* eslint-disable no-extend-native */
/* eslint-disable func-names */
/* eslint-disable max-params */
/* eslint-disable object-shorthand */
/* eslint-disable sort-keys */
/* eslint-disable no-implicit-globals */
var manageEvents = {
	myevents: [],
	$dc: function(id) {
		var elem = null;
		if (document.getElementById(id) !== null) elem = document.getElementById(id);
		if (elem == null) console.log('%cERREUR : id "' + id + '" introuvable', 'color:#ff1d00;font-weight:bold');

		return elem;
	},
	listenClass: function(cls, evt, callback, capture) {
		var sel = '.' + cls;
		var nodes = document.querySelectorAll(sel);
		if (nodes.length == 0) return null;
		for (var i = 0; i < nodes.length; i++) {
			this.listenerAdd(nodes[i], evt, callback, capture);
		}
	},
	// c et t = current et total images chargées pour manageEventsImageLoader
	// e = event
	// trgt = target where the eventis applied
	// target = current target (where click is fired)
	// si capture == true : evenement est capture et n'est plus passé
	listen: function(e, trgt, callback, capture, c, t) {
		// c et t = current et total images chargées pour manageEventsImageLoader
		var ev = e || window.event;
		// possibilite : capture = {passive:true}
		if (capture === true) {
			if (ev.preventDefault) {
				ev.preventDefault();
				ev.stopPropagation();
			} else {
				ev.returnValue = false;
				ev.cancelBubble = true;
			}
		}
		var target = ev.target || ev.srcElement;
		if (callback) callback(ev, trgt, target, c, t);
	},
	listenerAdd: function(id, evt, callback, capture, c, t) {
		var elem =
			id !== window &&
			id !== document &&
			(id != '[object DocumentFragment]' &&
				id != '[object HTMLImageElement]' &&
				Object.prototype.toString.call(id) != '[object HTMLAnchorElement]' &&
				Object.prototype.toString.call(id) != '[object HTMLLIElement]' &&
				Object.prototype.toString.call(id) != '[object HTMLInputElement]' &&
				Object.prototype.toString.call(id) != '[object HTMLButtonElement]')
				? this.$dc(id)
				: id;
		try {
			elem.addEventListener =
				elem.addEventListener ||
				function(e, f) {
					elem.attachEvent('on' + e, f);
				};
			// manageEvents.myevents._addEvt({id:id, evt:evt, event:callback});
			elem.addEventListener(
				evt,
				function _events(e) {
					manageEvents.myevents._addEvt({id: id, evt: evt, event: arguments.callee});
					// manageEvents.myevents._addEvt({id:id, evt:evt, event:callback});
					manageEvents.listen(e, this, callback, capture, c, t);
				},
				capture
			);
			elem.removeEventListener =
				elem.removeEventListener ||
				function(e, f) {
					elem.detachEvent('on' + e, f);
				};
		} catch (e) {
			console.log('%cERREUR : id "' + id + '" introuvable', 'color:#ff4e00;font-weight:bold');
			console.log(e);
			console.log('%c---------------------------', 'color:#ff4e00');
		}
	},
	listenerRemove: function(id, evt, cpt) {
		var curEvt = this.myevents._remEvt({id: id, evt: evt});
		var elem = id !== window && id !== document ? this.$dc(id) : id;
		if (curEvt) {
			try {
				if (cpt == true) {
					elem.removeEventListener(evt, curEvt, true);
				} else {
					elem.removeEventListener(evt, curEvt, false);
				}
				// eslint-disable-next-line no-undefined
				if (cpt === undefined) elem.removeEventListener(evt, curEvt);
			} catch (e) {
				console.log('%cERREUR : id "' + id + '" introuvable', 'color:#ff4e00');
				console.log(e);
				console.log('%c---------------------------', 'color:#ff4e00');
			}
		}
	},
	forceRemove: function(id, evt, func, cpt) {
		var elem = id !== window && id !== document ? this.$dc(id) : id;
		try {
			if (cpt == true) {
				elem.removeEventListener(evt, func, true);
			} else {
				elem.removeEventListener(evt, func, false);
			}
			// eslint-disable-next-line no-undefined
			if (cpt === undefined) elem.removeEventListener(evt, func);
		} catch (e) {
			console.log('%cERREUR : id "' + id + '" introuvable', 'color:#ff4e00');
			console.log(e);
			console.log('%c---------------------------', 'color:#ff4e00');
		}
	},
	addAclass: function(id, classe) {
		var node = typeof id === 'object' ? id : this.$dc(id);
		if (node) node.classList ? node.classList.add(classe) : node.className += ' ' + classe;
	},
	removeAclass: function(id, classe) {
		var node = typeof id === 'object' ? id : this.$dc(id);
		// if (typeof this.$dc(id).classList.remove === 'function'){
		if (node) {
			if (node.classList) {
				node.classList.remove(classe);
			} else {
				node.className = node.className.replace(' ' + classe, '').replace(classe, '');
			}
		}
	},
	hasAclass: function(id, cls) {
		var ret = false;
		var node = typeof id === 'object' ? id : this.$dc(id);
		if (node) ret = (' ' + node.className + ' ').indexOf(' ' + cls + ' ') > -1;

		return ret;
	}
};

if (!Array.prototype._addEvt) {
	Array.prototype._addEvt = function(o) {
		var res = false;
		for (var t in this) {
			if (this[t].id == o.id && this[t].evt == o.evt) res = true;
		}
		if (!res) this.push(o);
	};
}

if (!Array.prototype._remEvt) {
	Array.prototype._remEvt = function(o) {
		var res = false;
		var index = this._searchEvt(o);
		if (index != -1) {
			res = this[index];
			this.splice(index, 1);
		}
		if (typeof res === 'object') {
			return res.event;
		} else {
			return false;
		}
	};
}

if (!Array.prototype._searchEvt) {
	Array.prototype._searchEvt = function(what, i) {
		var ii = i || 0;
		var L = this.length;
		while (ii < L) {
			if (this[ii].id === what.id && this[ii].evt === what.evt) return ii;
			++ii;
		}

		return -1;
	};
}
