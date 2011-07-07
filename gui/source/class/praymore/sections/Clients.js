
qx.Class.define ("praymore.sections.Clients",
{
	extend: praymore.sections.BasePage,

	construct: function () {
		this.base (arguments);

		var addBtn = new qx.ui.form.Button ("Add new","praymore/Plus16.png");
		addBtn.setAllowGrowX (false);
		addBtn.setAllowGrowY (false);
		addBtn.setAlignY ("middle");
		this._header.add (addBtn);
		this._header.add (new qx.ui.core.Spacer (15));
	},

	members: {
		dispatch: function () { return this; }
	},

	statics: {
		getName: function () { return "Clients"; },
		getHash: function () { return "clients"; }
	}
});
