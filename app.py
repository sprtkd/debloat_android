import adb_runner as adb

from flask import Flask
from flask_restful import reqparse, Resource, Api
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

class ADBActionPackage(Resource):
    PACKAGE_HEADER = "Package-Name"
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(self.PACKAGE_HEADER, type=str, location='headers', required=True)
    def get(self):
        data = self.reqparse.parse_args()
        package_name = data[self.PACKAGE_HEADER]
        return {'data': adb.get_app_details(package_name)}
    def delete(self):
        data = self.reqparse.parse_args()
        package_name = data[self.PACKAGE_HEADER]
        return {'data': adb.uninstall_app(package_name)}
        

api.add_resource(ADBStatus, '/adb/status')
api.add_resource(ADBDeviceList, '/adb/devices')
api.add_resource(ADBPackageList, '/adb/packages')
api.add_resource(ADBActionPackage, '/adb/package/action')

if __name__ == '__main__':
    app.run(debug=True)