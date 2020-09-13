from bs4 import BeautifulSoup
import requests
import re
import urllib.request as urllib2
import os
import argparse
import sys
import json

def get_soup(url,header):
    return BeautifulSoup(urllib2.urlopen(urllib2.Request(url,headers=header)),'html.parser')

def search(query):
    query= query.split()
    query='+'.join(query)
    url="https://www.google.co.in/search?q="+query+"&source=lnms&tbm=isch"
    header={'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"}
    soup = get_soup(url,header)
    all_images = soup.find_all("img",{"class":"rg_i"})
    print(all_images[0]['src'])

search('redmi note 4')