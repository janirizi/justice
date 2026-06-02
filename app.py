from flask import *;import sqlite3,os
app=Flask(__name__);app.secret_key='secret'
def db(): 
 c=sqlite3.connect("app.db");return c
@app.route("/",methods=["GET","POST"])
def login():
 if request.method=="POST":
  if request.form['u']=="admin" and request.form['p']=="admin123": session['u']='admin'; return redirect('/dashboard')
 return render_template("login.html")
@app.route("/dashboard") 
def d(): return render_template("dashboard.html")
@app.route("/cases",methods=["GET","POST"])
def cases():
 c=db(); c.execute("create table if not exists cases(id integer primary key,name text)")
 if request.method=="POST": c.execute("insert into cases(name) values(?)",(request.form['name'],)); c.commit()
 rows=c.execute("select * from cases").fetchall()
 return render_template("cases.html",rows=rows)
@app.route("/upload",methods=["GET","POST"])
def up():
 if request.method=="POST":
  f=request.files['file']; f.save('uploads/'+f.filename); open('logs/audit.txt','a').write(f.filename+"\n")
 return render_template("upload.html")
@app.route("/health") 
def h(): return {"status":"ok"}
if __name__=="__main__": app.run(debug=True)
