
qx.Class.define ("praymore.widgets.ListIteam",
{
	extend : qx.ui.core.Widget,
//	include : qx.ui.decoration.MBackgroundColor,


	construct: function (typeForRender, userName, usersActivity) {
		this.base (arguments);
		this.setWidth(200);
		this.setHeight(20);
		var layout = new qx.ui.layout.Grid(4, 4);
		layout.setColumnFlex(1, 1);
		layout.setSpacingX(10);
		layout.setSpacingY(10);
		layout.setRowAlign(0, "center", "middle");
		layout.setColumnAlign(0, "center", "middle");
		this._setLayout(layout);
		layout.setColumnAlign(1, "center", "middle");
		layout.setColumnAlign(2, "center", "middle");
		this.setUser(userName);
		this._add (new qx.ui.basic.Label (this.getUser()), {row: 2, column: 1});

//		var textarea = new qx.ui.form.TextArea();
//		textarea.setValue(this.getDescription());

//		this.setDescription(usersActivity);
//		this._add (textarea, {row: 0, column: 2, rowSpan: 4});
		this.setDescription(usersActivity);
		this._add (new qx.ui.basic.Label (this.getDescription()), {row: 2, column: 2});
		//this.setDecorator(new qx.ui.decoration.Single(1,"solid","red"));
		var image;
		
		if (typeForRender == "redFlag"){			
			this.setType("redFlag");
			image = new qx.ui.basic.Image("praymore/flag_red.png");
		}else if (typeForRender == "greenFlag"){
			this.setType("greenFlag");
			image = new qx.ui.basic.Image("praymore/flag_green.png");
		}else if (typeForRender == "Earth"){
			this.setType("Earth");
			image = new qx.ui.basic.Image("praymore/test.png");
		}

		this._add (image, {row: 0, column: 0, rowSpan: 4});
		//this.renderSeparator(
		//		new qx.ui.decoration.Single(1,"solid","gray"),
 		//		{top: 0 , left: 0, width: 400, height: 50});
		
		this.setBackgroundColor("white");
		this.setShadow (this.setShadow(new qx.ui.decoration.Single(2,"solid","silver")));
	},

	members: {

	},
	properties : {
		type : { check : [ "redFlag", "greenFlag", "Earth" ],
		init : "redFlag" },
		user : { init: "default"},
		description : {init : "your activity"}
	}

});
