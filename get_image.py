from bs4 import BeautifulSoup
import requests
import re
import urllib.request as urllib2
import os
import argparse
import sys
import json

BING_URL = "https://www.bing.com/images/search?q="

def get_soup(url,header):
    return BeautifulSoup(urllib2.urlopen(urllib2.Request(url,headers=header)),'html.parser')

def search(query):
    query= query.split()
    query='+'.join(query)
    url= BING_URL + query + "&FORM=HDRSC2"
    header={'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"}
    soup = get_soup(url,header)
    image_result_raw = soup.find("a",{"class":"iusc"})

    m = json.loads(image_result_raw["m"])
    return m["turl"]

def search_mobile(query):
    query = query + "+mobile"
    return search(query)
