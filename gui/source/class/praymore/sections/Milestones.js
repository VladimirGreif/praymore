

qx.Class.define ("praymore.sections.Milestones",
{
	extend: praymore.sections.BasePage,

	construct: function () {
		this.base (arguments);
	},

	members: {
		dispatch: function () { return this; }
	},

	statics: {
		getName: function () { return "Milestones"; },
		getHash: function () { return "milestones"; }
	}
});
