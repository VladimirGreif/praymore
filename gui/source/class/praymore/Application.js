
/* ************************************************************************

#asset(praymore/*)

************************************************************************ */

qx.Class.define ("praymore.Application",
{
	extend: qx.application.Standalone,

	members: {
		main: function () {
			this.base (arguments);

			// Enable logging in debug variant
			if (qx.core.Environment.get ("qx.debug")) {
				qx.log.appender.Native;
				qx.log.appender.Console;
			}
			
			var doc = this.getRoot ();
			doc.setNativeContextMenu (true);
			
			var mainForm = new praymore.MainForm;
			var scroll = new qx.ui.container.Scroll;
			scroll.add (mainForm);
			this.getScroll = function () { return scroll; };
			doc.add (scroll, {edge: 0});

			window.onhashchange = function () {
				mainForm.dispatch (location.hash);
 			};
			window.onhashchange ();
		},

		getScroll: null
	}
});
