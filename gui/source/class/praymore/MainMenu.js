

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
			var h = s.getHash ();
			btn.setUserData ("hash", h);
			this.__sections[h] = btn;
		}

		grp.addListener ("changeSelection", function (e) {
			window.location.hash = e.getData ()[0].getUserData ("hash");
		}); 

		this.addSpacer ();

		var userMenu = new qx.ui.menu.Menu;
		var m1 = new qx.ui.menu.Button ("Настройки");
		userMenu.add (m1);
		var m2 = new qx.ui.menu.Button ("Выйти");
		m2.addListener ("execute", this.__logout, this);
		userMenu.add (m2);

		var userBtn = new qx.ui.toolbar.MenuButton ("username", null, userMenu)
		this.add (userBtn);
		this.__userMenuBtn = userBtn;
		
		this.addListener ("appear", this.refresh, this);
	},


	members: {
		__userMenuBtn: null,
		__sections: null,

		__logout: function () {
			praymore.Util.get ("api/logout");
			qx.bom.Cookie.del ("session");
			window.location.hash = "#login";	
		},

		refresh: function () {
			// FIXME: когда обновлять инфо о юзере?
			var usr = praymore.Util.get ("api/userInfo");
			if (usr && "ok" in usr) {
				this.__userMenuBtn.setLabel (usr.ok.name);
			}
			// FIXME: handle error somehow
		},

		setSection: function (hash) {
			var btn = this.__sections[hash];
			btn && btn.execute ();
		}
	}
});

