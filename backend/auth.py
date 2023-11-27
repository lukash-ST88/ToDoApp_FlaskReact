from .app import app
from flask import jsonify, request
from .models import User
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, JWTManager

jwt = JWTManager(app)


@app.route('/api/login/', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    print(username, password)
   
    user = User.query.filter_by(username=username).one()
    print(check_password_hash(user.password, password))
    try:
        if check_password_hash(user.password, password):
            access_token = create_access_token(identity=username)
            return {"access_token":access_token}
        else:
            return {'error': "password doesn't match"}
    except:
        return {'error': "username doesn't match"}

@app.route("/api/logout/", methods=["POST", 'GET'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response  
