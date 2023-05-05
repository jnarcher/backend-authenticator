from flask import Flask, request
from flask_cors import CORS
import flask
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello, world!"

@app.route("/users", methods=["GET", "POST"])
def users():
    print("users endpoint reached...")

    if request.method == "GET":
        with open("users.json", "r") as f:
            data = json.load(f)
            return flask.jsonify(data)

    if request.method == "POST":
        received_data = request.get_json()
        print(f"Received data: {received_data}")
        if received_data["type"] == "login":
            with open("users.json") as f:
                print("Successfully opened users.json")
                users = json.load(f)
            
                is_login_success = False

                return_data = { "type": "login" }

                for user in users:
                    print("Checking: ", user["username"], user["password"])
                    if user["username"] == received_data["username"]:
                        if user["password"] == received_data["password"]:
                            is_login_success = True 
                            print("Login Success!")
                            break

                if is_login_success:
                    return_data["status"] = "success"
                else:
                    return_data["status"] = "failed"

                return flask.Response(response=json.dumps(return_data), status=201)

        elif received_data["type"] == "signup":
            users = []
            with open("users.json") as f:
                print("Successfully opened users.json")
                users = json.load(f)
                
            is_signup_success = True;

            return_data = { "type" : "signup" }

            for user in users:
                if user["username"] == received_data["username"]:
                    is_signup_success = False;
                    return_data["error"] = "username not available"
                    break

            if (is_signup_success):
                users.append({
                    "username": received_data["username"],
                    "password": received_data["password"],
                })

                return_data["status"] = "success"
                
                with open("users.json", "w") as f:
                    json.dump(users, f, indent=2, separators=(',',': '))
            else:
                return_data["status"] = "failed"


            return flask.Response(response=json.dumps(return_data), status=201)


def isValidPassword():
    # TODO: check if signup pass is valid
    return True

if __name__ == "__main__":
    app.run("Localhost", 6969) 
