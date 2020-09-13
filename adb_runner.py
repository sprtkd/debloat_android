from subprocess import PIPE, run
from utils import *

DEVICES_LIST = "adb devices -l"
ADB = "adb"
LIST_DEVICE_OUT = 'List of devices attached'
ADB_SHELL_LIST_PACKAGES = "adb shell pm list packages"
ADB_LIST_PACKAGE_START = "package:"
ADB_SHELL_PACKAGE_DETAILS_PREPEND = "adb shell dumpsys package "

COMMAND_PREPEND = "platform-tools/"

def runcommand(command):
    result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True, shell=True, cwd=COMMAND_PREPEND)
    return result.stdout, result.stderr

def check_adb():
    _, err = runcommand(ADB)
    if len(err) > 0:
        return False
    else:
        return True


def get_device_id():
    out, err = runcommand(DEVICES_LIST)
    if len(err) > 0:
        return None
    out_lines = out.splitlines()
    out_lines = [x for x in out_lines if x.strip()]
    if len(out_lines) != 2:
        return None
    if stringdiff(out_lines[0], LIST_DEVICE_OUT) > 2:
        return None
    return device_details_parser(out_lines[1])

def get_app_list(filter_str = None):
    out, err = runcommand(ADB_SHELL_LIST_PACKAGES)
    if len(err) > 0:
        return None
    out_lines = out.splitlines()
    out_lines = [x for x in out_lines if x.strip()]
    out_lines = [x[len(ADB_LIST_PACKAGE_START):] if x.startswith(ADB_LIST_PACKAGE_START) else None for x in out_lines]
    if filter_str != None:
        out_lines = list(filter(lambda x: filter_str in x, out_lines))
    return out_lines

def get_app_details(app_name, checkPresent = True):
    if(checkPresent):
        applist = get_app_list(app_name)
        if (applist == None) or app_name not in applist:
            return None
    out, err = runcommand(ADB_SHELL_PACKAGE_DETAILS_PREPEND + app_name)
    if len(err) > 0:
        return None
    return app_dtls_obj_parser(out)
    