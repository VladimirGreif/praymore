
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

			// поля
			grid.setColumnMinWidth (0, 40);
			grid.setColumnFlex (0, 1);
			grid.setColumnMinWidth (2, 40);
			grid.setColumnFlex (2, 1);

			// строчка с навигацией
			grid.setRowMinHeight (1, 40);
			var sections = [ // TODO: сделать ленивое создание страниц (через замыкания)
				{name: "Dashboard", page: new praymore.sections.Dashboard},
				{name: "Milestones", page: new praymore.sections.Milestones},
				{name: "Projects"}
			];
			var menu = new praymore.MainMenu (sections);
			menu.addListener ("sectionChanged", function (e) {
				view.remove (grid.getCellWidget (2, 1));
				view.add (e.getData ().page, {row: 2, column: 1});
			});
			view.add (menu, {row: 0, column: 0, colSpan: 3});

			// здесь будет основное поле с данными (строка 2, колонка 1)
			grid.setRowFlex (2, 1);
			grid.setColumnFlex (1, 10);
			grid.setColumnMinWidth (1, 400);
//			grid.setColumnMaxWidth (1, 600);
			view.add (sections[0].page, {row: 2, column: 1});
			
			// footer
			grid.setRowHeight (3, 20);
			grid.setRowAlign (3, "center", "middle");
			var info = new qx.ui.basic.Label ("bla-bla-bla");
			view.add (info, {row: 3, column: 0, colSpan: 3});
		},


		__scroll: null,
		getScroll: function () { return this.__scroll; }
	}
});
