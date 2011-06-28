
qx.Class.define ("praymore.Util",
{
	statics: {
		get: function (url) {
			// TODO: reuse object?
			// TODO: handle timeouts
			// TODO: url args as hash
			var r = new qx.io.HttpRequest (url);
			r.setAsync (false);
			r.send ();
			if (r.getStatusCode () != 200) {
				qx.log.Logger.error (url + " -- " + r.getStatusCode ());
			}

			try {
				var v = qx.util.Json.parse (r.getResponseText ());
				if ("loginRequired" in v) {
					qx.log.Logger.debug ("login required");
					var hash = window.location.hash;
					window.location.hash = "#login" + hash.replace ("#", "/"); // FIXME: 
					return {loginRequired: true};
				} else {
					return v;
				}
			}  catch (e) {
				return {error: "invalid response from server"}
			}
		}
	}
});
