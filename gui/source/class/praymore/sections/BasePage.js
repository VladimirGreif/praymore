
qx.Class.define ("praymore.sections.BasePage",
{
	type: "abstract",
	extend: qx.ui.core.Widget,

	construct: function () {
		this.base (arguments);
		this.setAppearance ("groupbox/frame");
	},

	members: {
		getName: function () { return this.constructor.getName (); },
		getHash: function () { return this.constructor.getHash (); }
	}
});
