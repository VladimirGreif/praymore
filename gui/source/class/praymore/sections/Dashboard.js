

qx.Class.define ("praymore.sections.Dashboard",
{
	extend: qx.ui.groupbox.GroupBox,

	construct: function () {
		this.base (arguments);

		var grid = new qx.ui.layout.Grid;
		this.setLayout (grid);
		this.add (new qx.ui.basic.Label ("Dashboard"), {row: 0, column: 0});
	}
});
