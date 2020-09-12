from subprocess import PIPE, run

def runcommand(command):
    result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True, shell=True)
    return result.stdout, result.stderr

def stringdiff(a, b):
    counter=0
    u=zip(a,b)
    for i,j in u:
        if i != j:
            counter+=1
    return counter

DEVICES_LIST = "adb devices"
ADB = "adb"
LIST_DEVICE_OUT = 'List of devices attached'
ADB_SHELL_LIST_PACKAGES = "adb shell pm list packages"
ADB_LIST_PACKAGE_START = "package:"

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
    return out_lines[1]

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



print(get_app_list('lfeh'))