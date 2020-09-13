import adb_runner as adb

from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/adb/*": {"origins": "*"}})
api = Api(app)

class ADBStatus(Resource):
    def get(self):
        return {'data': adb.check_adb()}

class ADBDeviceList(Resource):
    def get(self):
        return {'data': adb.get_device_id()}

class ADBPackageList(Resource):
    def get(self):
        return {'data': adb.get_app_list()}

api.add_resource(ADBStatus, '/adb/status')
api.add_resource(ADBDeviceList, '/adb/devices')
api.add_resource(ADBPackageList, '/adb/packages')

if __name__ == '__main__':
    app.run(debug=True)