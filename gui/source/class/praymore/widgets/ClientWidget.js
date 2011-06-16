

qx.Class.define ("praymore.widgets.ClientWidget",
{
	extend : qx.ui.core.Widget,
	construct: function () {
		this.base (arguments);
		this.setWidth(200);
		this.setHeight(50);
		var layout = new qx.ui.layout.Grid(4, 4);
		layout.setColumnFlex(1, 1);
		layout.setSpacingX(5);
		layout.setSpacingY(10);
		this._setLayout(layout);
		this._add (new qx.ui.basic.Label ("Test Client"), {row: 1, column: 1});
		
		this.setDecorator(new qx.ui.decoration.Single(1,"solid","red"));

//		this.setAppearance("groupbox/frame");
//		this.setTextColor("red");
		
		var fn = new qx.bom.Font(14,["Verdana", "sans-serif"]);
		

		this.setFont(fn);

		fn.setBold(true);

		fn.setColor("green");

		fn.setSize(10);
		
		this._add (new qx.ui.basic.Label ("Description"), {row: 2, column: 1});
		fn.setItalic(true);
		fn.setSize(8);fn.setColor("red");
		this._add (new qx.ui.basic.Label ("Test Client"), {row: 3, column: 1});
		


		var image = new qx.ui.basic.Image("praymore/test.png");
		this._add (image, {row: 0, column: 0, rowSpan: 4});

	},

	members: {

	}

});
