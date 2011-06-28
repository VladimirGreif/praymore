
qx.Class.define ("praymore.sections.Projects",
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
	},

	members: {
		dispatch: function () { return this; }
	},

	statics: {
		getName: function () { return "Projects"; },
		getHash: function () { return "projects"; }
	}
});
