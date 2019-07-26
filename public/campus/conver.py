# coding: utf-8

import json

all = {}

with open('新知MAP.txt','r', encoding='UTF-8') as f:
    title = ""
    content = ""
    for i in f.readlines():
        if '$' == i[0]:
            print(i)
            if title != "":
                all[title] = '<p>'+content+'</p>'
                title = ""
                content = ""
            title = i.replace('$','').strip()
        elif title!="":
            content += i.strip()+"<br>"

with open('內容.json', 'w', encoding='utf-8') as json_file:
  json.dump(all, json_file, ensure_ascii=False)

