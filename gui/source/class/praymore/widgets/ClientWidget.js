
qx.Class.define ("praymore.widgets.ClientWidget",
{
	extend : qx.ui.core.Widget,
	construct: function (usr) {
		this.base (arguments);
		this.setWidth(200);
		this.setHeight(50);
		this.setAllowGrowX (false);
		this.setAllowGrowY (false);

		var layout = new qx.ui.layout.Grid(4, 4);
		layout.setColumnFlex(1, 1);
		layout.setSpacingX(5);
		layout.setSpacingY(10);
		this._setLayout(layout);
		
		
		this.setDecorator(new qx.ui.decoration.Single(1,"solid","white"));

//		this.setAppearance("groupbox/frame");
		this.setTextColor("red");
		
		var fn = new qx.bom.Font(14,["Verdana", "sans-serif"]);
		
//		fn.setColor("green");
		this.setFont(fn);
		this._add (new qx.ui.basic.Label ("Test Client"), {row: 1, column: 1});
		this.setTextColor("green");
		fn.setBold(true);
		fn.setSize(10);
//		fn.setColor("red");
		this.setFont(fn);

		this._add (new qx.ui.basic.Label ("Description"), {row: 2, column: 1});
		fn.setItalic(true);
		fn.setSize(8);
//		fn.setColor("blue");
		this.setTextColor("blue");
		this.setFont(fn);
//		this._add (this.getuser("Test Property"), {row: 3, column: 1});
		
		this._add (new qx.ui.basic.Label (usr.name), {row: 3, column: 1});

		this.setShadow(new qx.ui.decoration.Single(1,"solid","gray"));

		var image = new qx.ui.basic.Image("praymore/test.png");
		this._add (image, {row: 0, column: 0, rowSpan: 4});

	},

	members: {

	},

	properties : {
		type : { check : [ "redFlag", "greenFlag", "Earth" ],
		init : "redFlag" },
		user : { init: "User First"},
		description : {init : "your activity"}
	}

});
