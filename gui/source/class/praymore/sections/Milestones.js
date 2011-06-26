

qx.Class.define ("praymore.sections.Milestones",
{
	extend: qx.ui.groupbox.GroupBox,

	construct: function () {
		this.base (arguments);

		var grid = new qx.ui.layout.Grid;
		this.setLayout (grid);
		this.add (new qx.ui.basic.Label ("Milestones"), {row: 0, column: 0});
	},

	members: {
		dispatch: function () { return this; },
		getName: function () { return "Milestones"; },
		getHash: function () { return "milestones"; }
	},

	statics: {
		getName: function () { return "Milestones"; },
		getHash: function () { return "milestones"; }
	}
});
