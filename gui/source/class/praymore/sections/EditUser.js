
qx.Class.define ("praymore.sections.EditUser",
{
	extend: praymore.sections.BasePage,

	construct: function () {
		this.base (arguments);


	},

	members: {
		dispatch: function () { return this; }
	},

	statics: {
		getName: function () { return "Edit User"; },
		getHash: function () { return "edituser"; }
	}
});


