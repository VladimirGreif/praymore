

qx.Class.define ("praymore.MainMenu",
{
	extend: qx.ui.toolbar.ToolBar,

	construct: function (sections) {
		this.base (arguments);

		this.addSpacer ();

		this.__sections = {};
		var grp = new qx.ui.form.RadioGroup;
		var len = sections.length;
		for (var i = 0; i < len; ++i) {
			var s = sections[i];
			var btn = new qx.ui.toolbar.RadioButton (s.getName ());
			this.add (btn);
			grp.add (btn)
			btn.setUserData ("hash", s.getHash ());
			this.__sections[s.getHash ()] = btn;
		}

		grp.addListener ("changeSelection", function (e) {
			window.location.hash = e.getData ()[0].getUserData ("hash");
		}); 

		this.addSpacer ();

		var userMenu = new qx.ui.menu.Menu ();
		userMenu.add (new qx.ui.menu.Button ("Настройки"));
		userMenu.add (new qx.ui.menu.Button ("Выйти"));
		userMenu.setShadow (this.setShadow(new qx.ui.decoration.Single(2,"solid","silver")));

		var userBtn = new qx.ui.toolbar.MenuButton ("username", null, userMenu)
		this.add (userBtn);
	},

	members: {
		__sections: null,
		setSection: function (hash) {
			this.__sections[hash].execute ();
		}
	}
});

