from .models import Task

def sort_tasks_by_params(params):
    if params['sort'] == 'username':
        if params['order'] == 'desc':
            return Task.username.desc()
        else:
            return Task.username
    elif params['sort'] == 'email':
        if params['order'] == 'desc':
            return Task.email.desc()
        else:
            return Task.email
    elif params['sort'] == 'is_done':
        if params['order'] == 'desc':
            return Task.is_done.desc()
        else:
            return Task.is_done
    else:
        return None
