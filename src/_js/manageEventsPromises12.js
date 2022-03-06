manageEvents = typeof manageEvents !== undefined ? manageEvents : {};

try {
	if (typeof Q === 'function') {
		manageEvents = typeof manageEvents !== undefined ? manageEvents : {};

		manageEvents.promises = Q;

		manageEvents.promises.request = false;

		// HTMLHttpRequest --------------------------------------------------------------------------------------------------------------------------

		manageEvents.promises.httpRequest = function(path, method, data, timeout, contentype, responsetype, accept) {
			//console.log('request : ' + this.request);
			var deferred = this.defer();
			var responsetype = responsetype;

			// console.log('request', this.request)
			if (this.request) {
				deferred.reject();
				this.request.abort();
				return deferred.promise;
			} else {
				this.request = new XMLHttpRequest(); // ActiveX blah blah
				this.request.open(method, path, true);
				if (responsetype) this.request.responseType = responsetype;
				this.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				// this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				if (contentype) this.request.setRequestHeader('Content-type', contentype);
				if (accept) this.request.setRequestHeader('Accept', accept);
				this.request.onprogress = function(e) {
					deferred.notify(e.loaded / e.total);
				};

				this.request.onreadystatechange = function() {
					if (this.readyState === 4) {
						if (this.status === 200) {
							if (responsetype == 'arraybuffer') {
								deferred.resolve(this);
							} else {
								deferred.resolve(this.responseText);
							}
							manageEvents.promises.request = false; // detruit la requete lorsqu'elle aboutie
						} else {
							deferred.reject('HTTP ' + this.status + ' for ' + path);
						}
					}
				};

				timeout &&
					setTimeout(function() {
						deferred.reject('timeout expired');
						manageEvents.promises.request = false;
					}, timeout);
				this.request.send(data);
				return deferred.promise;
			}
		};

		// FIN HTMLHttpRequest -----------------------------------------------------------------------------------------------------------------------

		manageEvents.promises.selectionne = function(id) {
			var deferred = this.defer();
			var elem = manageEvents.$dc(id);
			var _targ = 0;
			//console.log(_targ);
			elem.onchange = function(e) {
				//console.log(_targ);
				e = e || window.event;
				var _target = e.target || e.srcElement;
				_targ = _target.value;
				//console.log(_target.value);
				//deferred.resolve(_target.value);  // exécuté UNE seule fois
				deferred.notify(_target.value);
			};
			return deferred.promise;
		};

		manageEvents.promises.animation = function(id) {
			var deferred = this.defer();
			var elem = manageEvents.$dc(id);
		};

		manageEvents.promises.aborting = function() {
			var deferred = this.defer();
			if (this.request) {
				deferred.reject();
				this.request.abort();
				return deferred.promise;
			}
			return deferred.promise;
		};
	} else {
		throw 'Q promises introuvable !';
	}
} catch (err) {
	console.log('Erreur : ' + err);
}
