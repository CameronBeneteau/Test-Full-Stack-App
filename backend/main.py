from flask import Flask, jsonify, make_response, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:3000",
    "https://test-full-stack-app-frontend.onrender.com" # Not required but adding for clarity
]}})

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Test api endpoint"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
