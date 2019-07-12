# coding: utf-8

import json

all = {}

with open('內容.txt','r', encoding='UTF-8') as f:
    title = ""
    content = ""
    for i in f.readlines():
        print(i)
        if '%' in i:
            if title != "":
                all[title] = '<p>'+content+'</p>'
                title = ""
                content = ""
            title = i.replace('%','').strip()
        else:
            content += i.strip()+"<br>"

with open('內容.json', 'w', encoding='utf-8') as json_file:
  json.dump(all, json_file, ensure_ascii=False)

