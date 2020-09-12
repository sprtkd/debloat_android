def stringdiff(a, b):
    counter=0
    u=zip(a,b)
    for i,j in u:
        if i != j:
            counter+=1
    return counter