
qx.Class.define ("praymore.sections.Login",
{
	extend: praymore.sections.BasePage,

	construct: function () {
		this.base (arguments);

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

		var errTxt = new qx.ui.basic.Label ("");
		this._add (errTxt, {row: 2, column: 0, colSpan: 3});
		this.__err = errTxt;

		var btn = new qx.ui.form.Button ("Ok");
		btn.set ({tabIndex: 3});
		btn.addListener ("execute", this.__doLogin, this);
		this._add (btn, {row: 3, column: 0});
	
		this._add (
			new qx.ui.basic.Label ().set (
				{rich: true
				,value: "<a href=\"#register\">Register new?</a>"}),
			{row: 3, column: 1});
	},

	members: {
		__usr: null,
		__pwd: null,
		__err: null,
		__doLogin: function () {
			var usr = this.__usr.getValue ();
			var pwd = this.__pwd.getValue ();
			if (usr && pwd) {
				var res = praymore.Util.get ("api/login?usr=" + usr + "&pwd=" + pwd);
				if ("error" in res) {
					this.__err.setValue (res.error);
				} else {
					window.location.hash = "#dashboard"; // FIXME: backlink
				}
			}
		},

		dispatch: function (hash) {
			return this;
		}
	},

	statics: {
		getName: function () { return "Login"; },
		getHash: function () { return "login"; }
	}
});
