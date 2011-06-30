

qx.Class.define ("praymore.sections.Dashboard",
{
	extend: qx.ui.groupbox.GroupBox,

	construct: function () {
		this.base (arguments);

		var grid = new qx.ui.layout.Grid;
		grid.setSpacingX(10);
		grid.setSpacingY(10);
			// поля слева и справа
			grid.setColumnMinWidth (0, 40);
			grid.setColumnFlex (0, 1);
			grid.setColumnMinWidth (4, 40);
			grid.setColumnFlex (4, 1);
	

		this.setLayout (grid);
		this.add (new qx.ui.basic.Label ("Dashboard"), {row: 0, column: 1});

		this.add (new qx.ui.basic.Label (). set ({
			rich: true,
			value: "<a href=\"#milestones\">Milestones</a>"
		}),
		{row: 1, column: 1});
		var wg = new praymore.widgets.ClientWidget();
		this.add(wg,{row: 5, column: 2});
		grid.setSpacingY(1);
		var rowNum = 6;
		var type = ["redFlag", "greenFlag", "Earth"];
		var usr = ["Max", "Vlad", "Ilia","Igor","Alex"];
		for (var i = 0; i<10 ; ++i){
			rowNum = rowNum + 1;
			var nnum;
			if (Math.ceil(i/3)<3){
				nnum = Math.ceil(i/3);
			}
			else {nnum = 3- Math.ceil(i/3) }
			var nnumU;
			if (i<5){
				nnumU = i;
			}
			else {nnumU = 9 - i }

			//this.debug(Math.ceil(i/3));
			this.add(new praymore.widgets.ListIteam(type[nnum],usr[nnumU], "I've done something"),{row: rowNum, column: 1});

			//this.add(new praymore.widgets.ClientWidget(),{row: 7 + i, column: 25});
			
		}
		this.setShadow (this.setShadow(new qx.ui.decoration.Single(2,"solid","silver")));
		//this.setBackgroundColor("gray");
		rowNum = rowNum + 1;
		this.add(this.createTable(),{row: rowNum, column: 1});
	},

	members: {
		__list : null,
		getName: function () { return "Dashboard"; },
		getHash: function () { return "#dashboard"; },
		
		createTable : function(){
		      // Create the initial data
		      var rowData = [];

		      for (var row = 0; row < 50; row++) {
			var image = "praymore/test.png";
			//var type = "greenFlag";
			//var myType = new praymore.widgets.ListIteam(type);		
			rowData.push([row, Math.random() * 10000 , image , true]);
		      } 
		      // table model
		      var tableModel = new qx.ui.table.model.Simple();
		      tableModel.setColumns([ "Статистика", "", "", "" ]);
		      tableModel.setData(rowData);
		      tableModel.setColumnEditable(0, true);
		      tableModel.setColumnEditable(1, false);
		      tableModel.setColumnEditable(2, false);
		      tableModel.setColumnSortable(3, true);

		      // table
		      var table = new qx.ui.table.Table(tableModel);

		      table.set({
			width: 400,
			height: 400,
			rowHeight: 50,
			
			decorator : null
		      });
						


		      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

		      var tcm = table.getTableColumnModel();

		      // Display a checkbox in column 3
		      tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());

			// Display a checkbox in column 3
		      tcm.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Image(32,32));

		      // use a different header renderer
		      tcm.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Icon("icon/16/apps/office-calendar.png", "A date"));

		      return table;
		    }
	}


});
