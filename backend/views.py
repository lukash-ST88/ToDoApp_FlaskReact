from .app import app, db
from .models import Task, User
from flask import request
from .utils import sort_tasks_by_params
from werkzeug.security import generate_password_hash



PER_PAGE = 3

@app.route('/api/', methods=['GET'])
def get_tasks_api():
    page = request.args.get('page', 1, type=int)
    tasks = Task.query.paginate(page=page, per_page=PER_PAGE)
    results = [
        {
            "id": task.id,
            "username": task.username,
            "email": task.email,
            "text": task.text,
            "edited": task.edited,
            "is_done": task.is_done

        } for task in tasks]
    response = {
        "count": tasks.total,
        "previus": tasks.prev_num,
        "next_page": tasks.next_num,
        "results": results
    }
    return (response, 200)

@app.route('/api/sort/', methods=['GET'])
def get_sorted_tasks_api():
    params = request.args.to_dict()
    column_name=sort_tasks_by_params(params)
    page = int(params['page'])
    tasks = Task.query.order_by(column_name).paginate(page=page, per_page=PER_PAGE)
    results = [
        {
            "id": task.id,
            "username": task.username,
            "email": task.email,
            "text": task.text,
            "edited": task.edited,
            "is_done": task.is_done

        } for task in tasks]
    response = {
        "count": tasks.total,
        "previus": tasks.prev_num,
        "next_page": tasks.next_num,
        "results": results
    }
    return (response, 200)


@app.route('/api/add', methods=['POST'])
def add_task_api():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_task = Task(username=data['username'], email=data['email'], text=data['text'])
            db.session.add(new_task)
            db.session.commit()
            return {"message": f"task {new_task} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

@app.route('/api/<int:task_id>', methods=['GET', 'PUT', 'DELETE'])
def get_task_detail_api(task_id):
    task = Task.query.get_or_404(task_id)

    if request.method == 'GET':
        response = {
            "username": task.username,
            "email": task.email,
            "text": task.text
        }
        return {"message": "success", "task": response}

    elif request.method == 'PUT':
        data = request.get_json()
        task.username = data['username']
        task.text = data['text']
        task.email = data['email']
        task.is_done = data['is_done']
        task.edited = True
        db.session.add(task)
        db.session.commit()
        return {"message": f"Task {task.username} successfully updated"}

    elif request.method == 'DELETE':
        db.session.delete(task)
        db.session.commit()
        return {"message": f"Task {task.username} successfully deleted."}

@app.route('/api/signup/', methods=['POST'])
def signup():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            hashed_password = generate_password_hash(data['password'])
            new_user = User(username=data['username'], password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            return {"message": f"task {new_user} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}
        
@app.route('/test/', methods=['GET'])
def test():
    return {'test': 'connect'}
