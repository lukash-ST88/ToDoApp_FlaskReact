from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from .config import POSTGRES_HOST, POSTGRES_NAME, POSTGRES_PASS, POSTGRES_PORT, POSTGRES_USER, SECRET_KEY







app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASS}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_NAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["JWT_SECRET_KEY"] = SECRET_KEY

cors = CORS(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)



@app.cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()







if __name__ == '__main__':
    app.run(debug=True)
 


