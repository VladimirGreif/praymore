#! /usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
from uuid import uuid1
import json
from datetime import datetime
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
			db.users.save ({'name': usr, 'pwd': pwd})
			return self.login (usr, pwd)


	@expose
	def login (self, usr, pwd):
		usr = db.users.find_one ({'name': usr, 'pwd': pwd})
		if usr:
			sess = uuid1 ().get_hex () 
			db.sessions.save ({'usr': usr["_id"], 's': sess, 'tm': datetime.now ()})
			cherrypy.response.cookie["session"] = sess
			return json.dumps ({"ok": True})
		else:
			return json.dumps ({"error": "Invalid username or password."})


	@expose
	def logout (self):
		s = cherrypy.request.cookie.get ('session')
		if s:
			db.sessions.remove ({"s": s.value})
		return json.dumps ({"ok": True})


	def _loggedUser (self):
		s = cherrypy.request.cookie.get ('session')
		if s:
			sess = db.sessions.find_one ({"s": s.value})
			if sess:
				return db.users.find_one ({"_id": sess["usr"]})

	@expose
	def loggedUser (self):
		usr = self._loggedUser ()
		if usr:
			usr["_id"] = str (usr["_id"])
			return json.dumps ({"ok": usr})
		return json.dumps ({"loginRequired": True})


	@expose
	def userInfo (self, uid):
		if not self._loggedUser ():
			return json.dumps ({"loginRequired": True})

		try:
			oid = pymongo.objectid.ObjectId (uid)
			usr = db.users.find_one ({"_id": oid })
			if usr:
				usr["_id"] = str (usr["_id"])
				return json.dumps ({"ok": usr})
		except:
			pass

		return json.dumps ({"error": "invalid user id"}) 


	@expose
	def users (self):
		if not self._loggedUser ():
			return json.dumps ({"loginRequired": True})
		users = list (db.users.find ({}, {"name":1}))
		for u in users:
			u["_id"] = str(u["_id"])
		return json.dumps ({"ok": users})		


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
  <script type="text/javascript" src="source/script/praymore.js"></script>
</head>
<body></body>
</html>
"""


if len (sys.argv) > 1 and sys.argv[1] == "debug":
	config = {
		"/":
			{"tools.staticdir.on": True
			,"tools.staticdir.dir": os.getcwd() + "/../gui/"
			},
		"/opt":
			{"tools.staticdir.on": True
			,"tools.staticdir.dir": "/opt"
			}
		}
	cherrypy.quickstart (Main (), "/", config)
else:
	sys.stdout = sys.stderr

	cherrypy.config.update (
		{"environment": "embedded"
		,"log.error_file": "/home/praymore.formalmethods.ru/site.log"
		});

	config = {
		"/":
			{"tools.staticdir.on": True
			,"tools.staticdir.dir":
			"/home/praymore.formalmethods.ru/gui/build/"
			},
	}

	application = cherrypy.Application (Main (), "/", config)

