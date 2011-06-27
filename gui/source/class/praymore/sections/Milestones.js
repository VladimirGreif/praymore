

qx.Class.define ("praymore.sections.Milestones",
{
	extend: praymore.sections.BasePage,

	construct: function () {
		this.base (arguments);

		var grid = new qx.ui.layout.Grid;
		this._setLayout (grid);
		this._add (new qx.ui.basic.Label ("Milestones"), {row: 0, column: 0});
	},

	members: {
		dispatch: function () { return this; }
	},

	statics: {
		getName: function () { return "Milestones"; },
		getHash: function () { return "milestones"; }
	}
});
