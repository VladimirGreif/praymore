
qx.Class.define ("praymore.sections.RegisterUser",
{
	extend: qx.ui.core.Widget,

	construct: function () {
		this.base (arguments);

		this.setAppearance ("groupbox/frame");

		var grid = new qx.ui.layout.Grid (20, 5);
		this._setLayout (grid);
		grid.setColumnFlex (0, 1);
		grid.setColumnFlex (1, 1);
		this.setAllowGrowX (false);
		this.setAllowGrowY (false);
		this.setAlignY ("middle");
		this.setAlignX ("center");

		var usrTxt = new qx.ui.basic.Label ("Username:");
		var usrFld = new qx.ui.form.TextField;
		usrFld.set ({tabIndex: 1});
		usrTxt.setBuddy (usrFld);
		this._add (usrTxt, {row: 0, column: 0});
		this._add (usrFld, {row: 0, column: 1});
		this.addListener ("appear", function () {usrFld.focus ()});
		this.__usr = usrFld;

		var pwdTxt = new qx.ui.basic.Label ("Password:");
		var pwdFld = new qx.ui.form.PasswordField;
		pwdFld.set ({tabIndex: 2});
		pwdTxt.setBuddy (pwdFld);
		this._add (pwdTxt, {row: 1, column: 0});
		this._add (pwdFld, {row: 1, column: 1});
		this.__pwd = pwdFld;

		var pwdTxt = new qx.ui.basic.Label ("Repeat password:");
		var pwdFld = new qx.ui.form.PasswordField;
		pwdFld.set ({tabIndex: 3});
		pwdTxt.setBuddy (pwdFld);
		this._add (pwdTxt, {row: 2, column: 0});
		this._add (pwdFld, {row: 2, column: 1});
		this.__pwd1 = pwdFld1;

		var errTxt = new qx.ui.basic.Label ("");
		this._add (errTxt, {row: 3, column: 0, colSpan: 2});
		this.__err = errTxt;

		var btn = new qx.ui.form.Button ("Register");
		btn.set ({tabIndex: 4});
		btn.addListener ("execute", this.__doRegister, this);
		this._add (btn, {row: 4, column: 0});
	
		this._add (
			new qx.ui.basic.Label ().set (
				{rich: true
				,value: "<a href=\"#login\">Back to login</a>"}),
			{row: 4, column: 1});
	},

	members: {
		__usr: null,
		__pwd: null,
		__pwd1: null,
		__err: null,
		__doRegister: function () {
			var usr = this.__usr.getValue ();
			var pwd = this.__pwd.getValue ();
			var pwd1 = this.__pwd.getValue ();
			if (usr && pwd && pwd1) {
				if (pwd == pwd1) {
					var res = praymore.Util.get ("api/register?usr=" + usr + "&pwd=" + pwd);
					if ("error" in res) {
						this.__err.setValue (res.error);
					} else {
						window.location.hash = "#dashboard";
					}
				} else {
					this.__err.setValue ("Passwords are not equal.");
				}
			} else {
				this.__err.setValue ("Please, fill all fields.");
			}
		},

		dispatch: function (hash) {
			return this;
		},

		getName: function () { return "Register"; },
		getHash: function () { return "register"; }
	},

	statics: {
		getName: function () { return "Register"; },
		getHash: function () { return "register"; }
	}
});
