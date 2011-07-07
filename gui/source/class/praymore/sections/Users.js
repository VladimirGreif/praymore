
qx.Class.define ("praymore.sections.Users",
{
	extend: praymore.sections.BasePage,

	construct: function () {
		this.base (arguments);

		var addBtn = new qx.ui.form.Button ("Add new user","praymore/Plus16.png");
		addBtn.addListener ("execute", function () {
			window.location.hash = "#users/new";
		});
		addBtn.setAllowGrowX (false);
		addBtn.setAllowGrowY (false);
		addBtn.setAlignY ("middle");
		this._header.add (addBtn);
		this._header.add (new qx.ui.core.Spacer (15));

		this.addListener ("appear", this.__onAppear, this);
		this._grid.setSpacing (30);
		this._grid.setColumnAlign (0, "center", "middle");
		this._grid.setColumnAlign (1, "center", "middle");
	},

	members: {
		__onAppear: function () {
			
			var users = praymore.Util.get("api/users");
			if ("error" in users) {
				return;
			}
			users = users.ok;

			var len = users.length;
			for (var i = 0; i < len; ++i) {
				var r = Math.floor (i/2) + 1;
				var c = i%2;
				var old = this._grid.getCellWidget (r, c);
				old && this._remove (old);
				var usr = new praymore.widgets.UserWidget (users[i]);
				this._add (usr, {row: r, column: c});
			}
		},

		dispatch: function (hash) {
			var m = hash.match (/(\w*)\/*(.*)/);
			this.debug (m);
			if (m && m[1] == "new") {
				return new praymore.sections.EditUser;
			} else if (m && m[1] == "edit" && m[2]) {
				return new praymore.sections.EditUser (m[2]);
			} else {
				return this;
			}
		}
	},

	statics: {
		getName: function () { return "Users"; },
		getHash: function () { return "users"; }
	}
});
