from unittest import result
import pandas as pd
import json

df = pd.read_csv('data_updated.csv')
resultDict = {}
for i in range(0, len(df)):
    try:
        resultDict[df.iloc[i]['gt_class']]
    except:
        resultDict[df.iloc[i]['gt_class']] = {
            
        }
for i in range(0, len(df)):
    try:
        resultDict[df.iloc[i]['gt_class']][int(df.iloc[i]['id'])]
    except:
        resultDict[df.iloc[i]['gt_class']][int(df.iloc[i]['id'])] = {
            
        }



for i in range(0, len(df)):
     resultDict[df.iloc[i]['gt_class']][int(df.iloc[i]['id'])] = {
        "state": df.iloc[i]['state'],
        "term": df.iloc[i]['term'],
        "t_school": df.iloc[i]['t_school'],
        "t_class": df.iloc[i]['t_class'],
        "t_title": df.iloc[i]['t_title'],
        "t_level": df.iloc[i]['t_level'],
        "t_mingrade": df.iloc[i]['t_mingrade'],
        "gt_title": df.iloc[i]['gt_title'],
        "gt_ch": str(df.iloc[i]['gt_ch']),
    }
# print(resultDict)

with open('new/data2.json', 'w', encoding='utf-8') as f:
    json.dump(resultDict, f, ensure_ascii=False, indent=4)