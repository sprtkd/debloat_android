from get_image import search_mobile

def stringdiff(a, b):
    counter=0
    u=zip(a,b)
    for i,j in u:
        if i != j:
            counter+=1
    return counter

def app_dtls_obj_parser(data):
    dict_det = {}
    other_data = []
    lines = data.splitlines()
    last_obj = 'dummy'
    for line in lines:
        spaces = len(line) - len(line.lstrip())
        if spaces == 0:
            dict_det[last_obj] = other_data
            other_data = []
            last_obj = line
        else:
            other_data.append(line)
    dict_det[last_obj] = other_data
    return dict_det

def device_details_parser(data):
    datalist = data.split()
    product = None
    model = None
    for i in datalist:
        if 'product:' in i:
            product = i[len('product:'):]
        if 'model:' in i:
            model = i[len('model:'):]
    try:
        img = search_mobile(model)
    except:
        img = None

    dataret = {'id': datalist[0],
    'product': product,
    'model': model,
    'imgurl': img
    }
    return dataret

def uninstall_msg_parser(msg):
    if msg.startswith('Success'):
        return True
    else:
        return False

