from flask import Flask, render_template, request, redirect, send_from_directory, session
from flask_session import Session
import os
import json

template_folder = os.path.abspath('.')
app = Flask(__name__, template_folder=template_folder)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

ECO_COOKING = "eco_cooking"
GREEN_LIVING = "green_living"
ECO_ACTIVITIES = "eco_activities"
ECO_TOURISM = "eco_tourism"

userFile = "data/users.json"

chats = {}
chats[ECO_COOKING] = {
    "name": "Eco Cooking",
    "messageFile": "data/eco_cooking.json"
}

chats[GREEN_LIVING] = {
    "name": "Green Living",
    "messageFile": "data/green_living.json"
}

chats[ECO_ACTIVITIES] = {
    "name": "Eco Activities",
    "messageFile": "data/eco_activities.json"
}

chats[ECO_TOURISM] = {
    "name": "Eco Tourism",
    "messageFile": "data/eco_tourism.json"
}

users = {}
chatMessages = {}
for chatId in chats.keys():
    chatMessages[chatId] = []


def is_logged():
    return "email" in session and session["email"] is not None


def get_logged_user_mame():
    if is_logged():
        return users[session["email"]]["userName"]

    return ""


try:
    with open(userFile, encoding="utf-8") as fp:
        users = json.load(fp)
except:
    users = {}


def initial_msg_load(chat_id):
    try:
        with open(chats[chat_id]["messageFile"], encoding="utf-8") as fp:
            return json.load(fp)
    except:
        return []


for chatId in chats.keys():
    chatMessages[chatId] = initial_msg_load(chatId)


def add_user(userName, email, password):
    users[email] = {'userName': userName, 'password': password}
    with open(userFile, "w", encoding="utf-8") as fp:
        json.dump(users, fp, indent=4)


"""
@app.route('/')
def index():
    return render_template('index.html')
"""


def load_msg_internal(chat_id):
    if not is_logged():
        return '{"messages":[]}'

    messages = chatMessages[chat_id]
    return """
    {
        "messages": """ + json.dumps(messages) + """
    }
    """


def save_message_internal(chatId):
    if not is_logged():
        return '{"response": "user is not logged"}'

    msg = request.get_json()

    message = msg["message"]
    if message is None:
        return '{"response": "invalid message"}'
    message = message.strip()
    if len(message) == 0:
        return '{"response": "invalid message"}'

    chatMessages[chatId].append({"userName": get_logged_user_mame(), "message": msg["message"]})
    with open(chats[chatId]["messageFile"], "w", encoding="utf-8") as fp:
        json.dump(chatMessages[chatId], fp, indent=4)

    return '{"response": "success"}'


@app.route('/load_msg_living')
def load_msg_living():
    return load_msg_internal(GREEN_LIVING)


@app.route('/load_msg_cooking')
def load_msg_cooking():
    return load_msg_internal(ECO_COOKING)


@app.route('/load_msg_activities')
def load_msg_activities():
    return load_msg_internal(ECO_ACTIVITIES)


@app.route('/load_msg_tourism')
def load_msg_tourism():
    return load_msg_internal(ECO_TOURISM)


@app.route('/add_msg_living', methods=['POST'])
def save_msg_living():
    return save_message_internal(GREEN_LIVING)


@app.route('/add_msg_cooking', methods=['POST'])
def save_msg_cooking():
    return save_message_internal(ECO_COOKING)


@app.route('/add_msg_activities', methods=['POST'])
def save_msg_activities():
    return save_message_internal(ECO_ACTIVITIES)


@app.route('/add_msg_tourism', methods=['POST'])
def save_msg_tourism():
    return save_message_internal(ECO_TOURISM)


@app.route('/register', methods=['POST'])
def register():
    userName = request.form["userName"]
    email = request.form["email"]
    password = request.form["password"]
    add_user(userName, email, password)
    return redirect("/HTML/login.html")


@app.route('/login', methods=['POST'])
def login():
    email = request.form["email"]
    password = request.form["password"]

    if email in users:
        if password == users[email]['password']:
            session["email"] = email
            return redirect("/HTML/mainpage.html")

    return redirect("/HTML/login.html?error=1")


@app.route("/logout")
def logout():
    session["email"] = None
    return redirect("/HTML/mainpage.html")


@app.route("/")
def main():
    return redirect("/HTML/mainpage.html")
    # return render_template('mainpage.html')


@app.route('/<path:path>')
def send_file(path):
    if path.endswith("login.html") or path.endswith("register.html"):
        return send_from_directory('./', path)

    if path.endswith(".html"):
        if is_logged():
            return send_from_directory('./', path)
        else:
            return redirect("/HTML/login.html")

    return send_from_directory('./', path)

"""
if __name__ == '__main__':
    app.run()
"""

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

