
qx.Class.define ("praymore.sections.BasePage",
{
	type: "abstract",
	extend: qx.ui.core.Widget,

	construct: function () {
		this.base (arguments);

		this.setAppearance ("groupbox/frame");

		var grid = new qx.ui.layout.Grid;
		grid.setColumnFlex (0, 1);
		this._setLayout (grid);

		var header = new qx.ui.container.Composite (
			new qx.ui.layout.HBox);
		header.add (new qx.ui.core.Spacer (15));
		header.add (praymore.Util.h2 (this.getName ()));
		header.add (new qx.ui.core.Spacer, {flex: 1});
		this._add (header, {row: 0, column: 0, colSpan: 5});	
	
		this._grid = grid;
		this._header = header;
	},

	members: {
		_grid: null,
		_header: null,

		getName: function () { return this.constructor.getName (); },
		// FIXME: autogenerate from class name
		getHash: function () { return this.constructor.getHash (); }
	}
});
