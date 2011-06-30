
/* ************************************************************************

#asset(praymore/*)

************************************************************************ */

qx.Class.define ("praymore.Application",
{
	extend: qx.application.Standalone,

	members:
	{
		main: function ()
		{
			this.base (arguments);

			// Enable logging in debug variant
			if (qx.core.Environment.get ("qx.debug"))
			{
				qx.log.appender.Native;
				qx.log.appender.Console;
			}
			
			var doc = this.getRoot ();
			doc.setNativeContextMenu (true);

			this.__scroll = new qx.ui.container.Scroll;
			doc.add (this.__scroll, {edge: 0});
			
			var grid = new qx.ui.layout.Grid;
			var view = new qx.ui.container.Composite (grid);
			this.__scroll.add (view);

			// поля слева и справа
			grid.setColumnMinWidth (0, 40);
			grid.setColumnFlex (0, 1);
			grid.setColumnMinWidth (2, 40);
			grid.setColumnFlex (2, 1);

			var sect = [
				new praymore.sections.Dashboard,
				new praymore.sections.Milestones,
				new praymore.sections.Users
			];

			var menu = new praymore.MainMenu (sect);
			view.add (menu, {row: 0, column: 0, colSpan: 3});

			this.sections = {};
			var len = sect.length;
			for (var i = 0; i < len; ++i) {
				var s = sect[i];
				this.sections[s.getHash ()] = s;
			}

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
			view.add (info, {row: 3, column: 0, colSpan: 3});

			this.__view = view;
			this.__grid = grid;
			this.__menu = menu;

			var app = this;
			window.onhashchange = function () { app.onHashChange (app); };
			window.onhashchange ();
		},


		__view: null,
		__grid: null,
		__menu: null,
		__scroll: null,
		sections: null,
		getScroll: function () { return this.__scroll; },


		setSection: function (s) {
			var old = this.__grid.getCellWidget (2, 1);
			if (old != null) {
				this.__view.remove (old);
			}
			this.__view.add (s, {row: 2, column: 1});
		},

		setMenu: function (hash) {
			this.__menu.setSection (hash);
		},



		onHashChange: function (app) {
			var hash = location.hash;
			var s = app.sections[hash];
			if (s == undefined) {
				location.hash = "#dashboard";
			}
			else {
				app.setSection (s);
				app.setMenu (hash);
				window.document.title = "Praymore -- " + s.getName ();
			}
		}
	}
});
