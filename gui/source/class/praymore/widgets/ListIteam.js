
qx.Class.define ("praymore.widgets.ListIteam",
{
	extend : qx.ui.core.Widget,
//	include : qx.ui.decoration.MBackgroundColor,


	construct: function () {
		this.base (arguments);
		this.setWidth(400);
		this.setHeight(50);
		var layout = new qx.ui.layout.Grid(4, 4);
		layout.setColumnFlex(1, 1);
		layout.setSpacingX(10);
		layout.setSpacingY(10);
		//layout.setRowAlign(0, "center", "middle");
		layout.setColumnAlign(0, "center", "middle");
		this._setLayout(layout);
		this._add (new qx.ui.basic.Label ("Test Iteam"), {row: 0, column: 1});
		//this.setDecorator(new qx.ui.decoration.Single(1,"solid","red"));
		var image = new qx.ui.basic.Image("praymore/test.png");
		this._add (image, {row: 0, column: 0, rowSpan: 4});
		this.renderSeparator(
				new qx.ui.decoration.Single(1,"solid","gray"),
 				{top: 0 , left: 0, width: 400, height: 50});
		this.setBackgroundColor("white");
	},

	members: {

	}

});
