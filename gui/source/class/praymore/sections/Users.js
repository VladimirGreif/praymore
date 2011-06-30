
qx.Class.define ("praymore.sections.Users",
{
	extend: qx.ui.groupbox.GroupBox,

	construct: function () {
		this.base (arguments);

		var grid = new qx.ui.layout.Grid;
		this.setLayout (grid);
		this.add (new qx.ui.basic.Label ("Users"), {row: 0, column: 0});

		var usrs = new praymore.widgets.UserWidget();
		this.add(usrs,{row: 2, column: 1});
		
		usrs.setUserName("Vladimir");

	},

	members: {
		getName: function () { return "Users"; },
		getHash: function () { return "#users"; }
	}
});
