
qx.Class.define ("praymore.sections.Users",
{
	extend: praymore.sections.BasePage,

	construct: function () {
		this.base (arguments);

		var addBtn = new qx.ui.form.Button ("Add new user","praymore/Plus16.png");
		addBtn.addListener ("execute", function () {
			window.location.hash = "#users/edituser";
		});
		addBtn.setAllowGrowX (false);
		addBtn.setAllowGrowY (false);
		addBtn.setAlignY ("middle");
		this._header.add (addBtn);
		this._header.add (new qx.ui.core.Spacer (15));
/**/
		var usrs = new praymore.widgets.UserWidget;
		this._add (usrs, {row: 2, column: 0});
	
	},

	members: {
		dispatch: function (hash) {
			if (hash == "edituser") {
				return new praymore.sections.EditUser;
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
