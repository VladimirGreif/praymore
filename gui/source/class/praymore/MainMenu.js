

qx.Class.define ("praymore.MainMenu",
{
	extend: qx.ui.toolbar.ToolBar,

	construct: function (sections) {
		this.base (arguments);

		this.addSpacer ();

		var grp = new qx.ui.form.RadioGroup;
		for (var i in sections) {
			var btn = new qx.ui.toolbar.RadioButton (sections[i].name);
			this.add (btn);
			grp.add (btn)
			sections[i].btn = btn; // FIXME: циклические ссылки
			btn.setUserData ("xxx", sections[i]);
		}
		grp.addListener ("changeSelection", function (e) {
			var pg = e.getData ()[0].getUserData ("xxx");
			this.fireDataEvent ("sectionChanged", pg);
			this.debug (pg.name);
		}, this); 

		this.addSpacer ();

		var userMenu = new qx.ui.menu.Menu ();
		userMenu.add (new qx.ui.menu.Button ("Настройки"));
		userMenu.add (new qx.ui.menu.Button ("Выйти"));

		var userBtn = new qx.ui.toolbar.MenuButton ("username", null, userMenu)
		this.add (userBtn);
	},

	events: {
		sectionChanged: "qx.event.type.Data"
	}
});

