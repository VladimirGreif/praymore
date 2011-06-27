

qx.Class.define ("praymore.sections.Dashboard",
{
	extend: praymore.sections.BasePage,

	construct: function () {
		this.base (arguments);

		this._setLayout (new qx.ui.layout.VBox);

		var headerLayout = new qx.ui.layout.HBox;
		var header = new qx.ui.container.Composite (headerLayout);
		header.add (new qx.ui.core.Spacer (15));
		header.add (
			new qx.ui.basic.Label ().set (
				{rich: true
				,value: "<h2 style='color:#777;'>Dashboard</h2>"}));
		header.add (new qx.ui.core.Spacer, {flex: 1});
		var btn = new qx.ui.form.Button ("Add new");
		btn.addListener ("execute", function () {
			var r = praymore.Util.get ("api/addNewUser");
			this.debug (qx.util.Json.stringify (r));
		});
		btn.setAllowGrowX (false);
		btn.setAllowGrowY (false);
		btn.setAlignY ("middle");
		header.add (btn);
		header.add (new qx.ui.core.Spacer (15));
		this._add (header);

		var grid = new qx.ui.layout.Grid (5,5);
		var body = new qx.ui.container.Composite (grid);
		this._add (body);

		body.add (
			new qx.ui.basic.Label ().set (
				{rich: true
				,value: "<a href=\"#milestones\">Milestones</a>"}),
			{row: 0, column: 0});
	},

	members: {
		dispatch: function () { return this; }
	},

	statics: {
		getName: function () { return "Dashboard"; }, // TODO: translate
		getHash: function () { return "dashboard"; }
	}
});
