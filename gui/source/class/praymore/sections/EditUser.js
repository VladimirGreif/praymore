
qx.Class.define ("praymore.sections.EditUser",
{
	extend: praymore.sections.BasePage,

	construct: function (uid) {
		this.base (arguments);

		this._add (new qx.ui.basic.Label (uid), {row: 1, column: 0});
	},

	members: {
		dispatch: function () { return this; }
	},

	statics: {
		getName: function () { return "Edit User"; },
		getHash: function () { return "edituser"; }
	}
});


