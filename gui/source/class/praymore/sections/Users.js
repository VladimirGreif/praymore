
qx.Class.define ("praymore.sections.Users",
{
	extend: praymore.sections.BasePage,

	construct: function () {
		this.base (arguments);

		var addBtn = new qx.ui.form.Button ("Add new");
		addBtn.setAllowGrowX (false);
		addBtn.setAllowGrowY (false);
		addBtn.setAlignY ("middle");
		this._header.add (addBtn);
		this._header.add (new qx.ui.core.Spacer (15));

		var usrs = new praymore.widgets.UserWidget;
		this._add (usrs, {row: 2, column: 1});
		
		usrs.setUserName ("Vladimir");
	},

	members: {
		dispatch: function () { return this; }
	},

	statics: {
		getName: function () { return "Users"; },
		getHash: function () { return "users"; }
	}
});
