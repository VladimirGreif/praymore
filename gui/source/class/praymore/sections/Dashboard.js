

qx.Class.define ("praymore.sections.Dashboard",
{
	extend: praymore.sections.BasePage,

	construct: function () {
		this.base (arguments);

		var btn = new qx.ui.form.Button ("Add new");
		btn.addListener ("execute", function () {
			var r = praymore.Util.get ("api/addNewUser");
			this.debug (qx.util.Json.stringify (r));
		});
		btn.setAllowGrowX (false);
		btn.setAllowGrowY (false);
		btn.setAlignY ("middle");
		this._header.add (btn);
		this._header.add (new qx.ui.core.Spacer (15));

		this._add (
			new qx.ui.basic.Label ().set (
				{rich: true
				,value: "<a href=\"#milestones\">Milestones</a>"}),
			{row: 1, column: 0});
	},

	members: {
		dispatch: function () { return this; }
	},

	statics: {
		getName: function () { return "Dashboard"; }, // TODO: translate
		getHash: function () { return "dashboard"; }
	}
});
