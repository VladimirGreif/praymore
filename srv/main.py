#! /usr/bin/env python
# -*- coding: utf-8 -*-

import os
from uuid import uuid1
import json
import pymongo
import cherrypy
from cherrypy import expose


db = pymongo.Connection ('localhost').praymore

# FIXME: escape input strings (as decorator?)
# FIXME: json.dumps decorator
# FIXME: checkSession decorator
# TODO: apply decorators to whole class

class Api:
	@expose
	def index (self):
		return "Api"


	@expose
	def register (self, usr, pwd):
		if db.users.find_one ({'name': usr}):
			return json.dumps ({"error": "Username already registered."})
		else:
			s = uuid1 ().get_hex ()
			db.users.save ({'name': usr, 'pwd': pwd, 'sess': s})
			cherrypy.response.cookie["session"] = s
			return json.dumps ({"ok": True})


	@expose
	def login (self, usr, pwd):
		usr = db.users.find_one ({'name': usr, 'pwd': pwd})
		if usr:
			sess = uuid1 ().get_hex () 
			db.users.update ({'name': usr}, {'$set': {'sess': sess}})
			cherrypy.response.cookie["session"] = sess
			return json.dumps ({"ok": True})
		else:
			return json.dumps ({"error": "Invalid username or password."})


	@expose
	def userInfo (self):
		s = cherrypy.request.cookie.get ('session')
		usr = db.users.find_one ({"sess": s})
		if usr:
			return json.dumps (usr)
		else:
			return json.dumps ({"loginRequired": True})


	@expose
	def addNewUser (self):
		cookies = cherrypy.request.cookie
		session = cookies.get ("session")
		if session:
			return json.dumps ({"ok": True})
		else:
			cherrypy.response.cookie["session"] = "new session value"
			return json.dumps ({"loginRequired": True})
			

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
