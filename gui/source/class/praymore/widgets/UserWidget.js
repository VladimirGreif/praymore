

qx.Class.define ("praymore.widgets.UserWidget",
{
	extend : qx.ui.core.Widget,
	construct: function () {
		this.base (arguments);
		this.setWidth(400);
		this.setHeight(100);
		var layout = new qx.ui.layout.Grid(4, 4);
		layout.setColumnFlex(1, 1);
		layout.setSpacingX(5);
		layout.setSpacingY(10);
		layout.setColumnAlign(0, "center", "middle");
		
		this._setLayout(layout);
		
		var flow = new qx.ui.layout.Flow();

		flow.setAlignX( "center" );

		flow.setAlignY( "middle" );
		var view = new qx.ui.container.Composite (flow);
		view.add (this.image);
		view.setWidth(100);
		view.setHeight(100);
		view.setDecorator(new qx.ui.decoration.Single(1,"solid","silver"));
		this._add (view, {row: 0, column: 0, rowSpan: 4});
		

		this.setDecorator(new qx.ui.decoration.Single(1,"solid","red"));

		this.setTextColor("blue");
		
		var fn = new qx.bom.Font(20,["Verdana", "sans-serif"]);

		this.setFont(fn);
		this._add (new qx.ui.basic.Label (this.getUserName()).set({Width: 100,Height: 25}), {row: 0, column: 1});
		fn.setSize(14);
		var lb = new qx.ui.basic.Label ("Working with "+ 2 + " projects");
		lb.setTextColor("black");
		this._add (lb, {row: 2, column: 1,colSpan: 3});
		this._add (this.projectProgress, {row: 3, column: 1, colSpan: 3});

		this.projectProgress.setValue(50);

	//	this.projectProgress.setLayout(new qx.ui.layout.HBox(5));
//		lb.setTextColor("red");
		var lbp = new qx.ui.basic.Label (50 + "%");
		lbp.setTextColor("red");
		this.projectProgress.addAt(lbp);
		this.projectProgress.setValue(50-8);
		lbp.setMarginLeft(-40);

		
	},

	members: {
		image : new qx.ui.basic.Image("praymore/noImage.png"),
//		userName : new qx.ui.basic.Label ("Default").set({Width: 100,Height: 25})
		projectProgress : new qx.ui.indicator.ProgressBar(0, 100),
		
		setImage : function (path) {
			this.image.setSource(path);			
		}
	},

	properties : {
		userName : {init : "Default"},
		numberProject : { init: 0},
		percentage : {init : 0}
	}

});
