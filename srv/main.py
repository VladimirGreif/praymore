#! /usr/bin/env python
# -*- coding: utf-8 -*-

import os
import cherrypy
from cherrypy import expose



class Api:
	@expose
	def index (self):
		return "Api"

	@expose
	def addNewUser (self):
		cookies = cherrypy.request.cookie
		session = cookies.get ("session")
		if session:
			return '{"Ok": "True"}'
		else:
			cherrypy.response.cookie["session"] = "new session value"
			return '{"loginRequired": "True"}'
			

class Main:
	api = Api ()
	@expose
	def index (self):
		return """
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>praymore</title>
  <script type="text/javascript" src="script/praymore.js"></script>
</head>
<body></body>
</html>
"""

config = {
	"/script":
		{"tools.staticdir.on": True
		,"tools.staticdir.dir": os.getcwd() + "/../gui/source/script"
		},
	"/source":
		{"tools.staticdir.on": True
		,"tools.staticdir.dir": os.getcwd() + "/../gui/source"
		},
	"/opt":
		{"tools.staticdir.on": True
		,"tools.staticdir.dir": "/opt"
		}
	} 

root = Main ()
cherrypy.quickstart (root, "/", config)
