

qx.Class.define ("praymore.sections.Dashboard",
{
	extend: qx.ui.groupbox.GroupBox,

	construct: function () {
		this.base (arguments);

		var grid = new qx.ui.layout.Grid;
		this.setLayout (grid);
		this.add (new qx.ui.basic.Label ("Dashboard"), {row: 0, column: 0});

		this.add (new qx.ui.basic.Label (). set ({
			rich: true,
			value: "<a href=\"#milestones\">Milestones</a>"
		}),
		{row: 1, column: 0});
	},

	members: {
		getName: function () { return "Dashboard"; },
		getHash: function () { return "#dashboard"; }
	}

});
