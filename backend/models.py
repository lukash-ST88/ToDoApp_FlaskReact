from .app import db
import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(255))


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(100))
    text = db.Column(db.Text())
    is_done = db.Column(db.Boolean(), default=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    edited = db.Column(db.Boolean(), default=False)

    def __init__(self, username, email, text):
        self.username = username
        self.email = email
        self.text = text

    def __str__(self):
        return f'<{self.username} - {self.email}>'



