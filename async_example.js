function rootObj() {
	var asyncCallback =  null;
	var syncCallback =  null;

    Object.defineProperty(this, 'asyncCallback', {
        get: function() { return asyncCallback; },
        set: function(x) {
            if (typeof(x) == 'function') { asyncCallback = x; }
            else { console.error("Callback must be a Function."); }
        }
    });

    Object.defineProperty(this, 'syncCallback', {
        get: function() { return syncCallback; },
        set: function(x) {
            if (typeof(x) == 'function') { syncCallback = x; }
            else { console.error("Callback must be a Function."); }
        }
    });

	this.state = 'stopped';

	this.wakeup = function() {
		console.log("Hey, wake up!");
		changeState('running');
		console.log("Event updated.");
	}

	function changeState(ste) {
		this.state = ste;
        if (asyncCallback) {
            setTimeout(function() { asyncCallback(ste); }, 0);
        }
        if (syncCallback) {
            syncCallback(ste);
        }
	}

}

var obj = new rootObj();

obj.asyncCallback = function(state) {
	console.log("Async state:", state);
	var i = 0;
	while (i < 1000000000) {i++;} // block the function
};

obj.syncCallback = function(state) {
	console.log("Sync state:", state);
	var i = 0;
	while (i < 1000000000) {i++;} // block the function
};

obj.wakeup();