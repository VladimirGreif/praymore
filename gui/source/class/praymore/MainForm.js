
qx.Class.define ("praymore.MainForm",
{
	extend: qx.ui.core.Widget,

	construct: function () {
		this.base (arguments);

		this.__initPages ();

		var grid = new qx.ui.layout.Grid;
		this.__grid = grid;
		this._setLayout (grid);

		// поля слева и справа
		grid.setColumnMinWidth (0, 40);
		grid.setColumnFlex (0, 1);
		grid.setColumnMinWidth (2, 40);
	 	grid.setColumnFlex (2, 1);

		this.__menu = new praymore.MainMenu (
			[ praymore.sections.Dashboard
			, praymore.sections.Milestones
			]);
		this._add (this.__menu, {row: 0, column: 0, colSpan: 3});

		// строчка с навигацией
		grid.setRowMinHeight (1, 40);

		// здесь будет основное поле с данными (строка 2, колонка 1)
		grid.setRowFlex (2, 1);
		grid.setColumnFlex (1, 10);
		grid.setColumnMinWidth (1, 400);

		// footer
		grid.setRowHeight (3, 20);
		grid.setRowAlign (3, "center", "middle");
		var info = new qx.ui.basic.Label ("bla-bla-bla");
		this._add (info, {row: 3, column: 0, colSpan: 3});
	},


	members: {
		setBody: function (w) { this.__setCell (2, 1, w); },
		setNavi: function (w) { this.__setCell (1, 1, w); },

		dispatch: function (hash) {
			var m = (hash || "#dashboard").match (/#(\w*)\/*(.*)/);

			m[1] == "login"
				? this.__menu.exclude ()
				:	this.__menu.show ();

			var page = this.__pages[m[1]];
			if (page) {
				var pg = page ().dispatch (m[2]);
				if (!pg) {
					// FIXME: if null, set default page
				}
				this.setBody (pg);
				this.__menu.setSection (pg.getHash ()); 
				window.document.title	= pg.getName ();
				// TODO: update menu
				// TODO: update navigation
			}		
		},

		
		__initPages: function () {
			var pages = this.__pages = {};
			var lazyAdd = function (cls) {
				var h = cls.getHash ();
				pages[h] = function () {
					var val = new cls;
					pages[h] = function () { return val; }
					return val;
				}
			};
//			lazyAdd (praymore.sections.Login);
			lazyAdd (praymore.sections.Dashboard);
			lazyAdd (praymore.sections.Milestones);
		},

		__pages: null,
		__grid: null,
		__menu: null,

		__setCell: function (r, c, widget) {
			var old = this.__grid.getCellWidget (r, c);
			if (old != null) {
				this._remove (old);
			}
			this._add (widget, {row: r, column: c});
		}
	}
});
