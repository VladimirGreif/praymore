
qx.Class.define ("praymore.sections.EditUser",
{
	extend: praymore.sections.BasePage,

	construct: function (uid) {
		this.base (arguments);

		var usr = {};
		if (uid) {
			var resp = praymore.Util.get ("api/userInfo?uid=" + uid);
			if ("error" in resp) {
				window.location.href = "#users";
				return;
			}
			usr = resp.ok;
		}

		this._grid.setColumnFlex (0, 0);
		this._grid.setColumnFlex (1, 0);

		var usrTxt = new qx.ui.basic.Label ("Username:");
		var usrFld = new qx.ui.form.TextField;
		usrFld.set ({tabIndex: 1, value: usr.name || ""});
		usrTxt.setBuddy (usrFld);
		this._add (usrTxt, {row: 1, column: 0});
		this._add (usrFld, {row: 1, column: 1});
		this.addListener ("appear", function () {usrFld.focus ()});

		var pwdTxt = new qx.ui.basic.Label ("Password:");
		var pwdFld = new qx.ui.form.PasswordField;
		pwdFld.set ({tabIndex: 2, value: usr.pwd || ""});
		pwdTxt.setBuddy (pwdFld);
		this._add (pwdTxt, {row: 2, column: 0});
		this._add (pwdFld, {row: 2, column: 1});
	},

	members: {
		dispatch: function () { return this; }
	},

	statics: {
		getName: function () { return "User Info"; },
		getHash: function () { return "edit"; }
	}
});


