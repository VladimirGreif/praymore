

qx.Class.define ("praymore.sections.Dashboard",
{
	extend: praymore.sections.BasePage,

	construct: function () {
		this.base (arguments);
	},

	members: {
		dispatch: function () { return this; }
	},

	statics: {
		getName: function () { return "Dashboard"; }, // TODO: translate
		getHash: function () { return "dashboard"; }
	}
});
