from unittest import result
import pandas as pd
import json

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

df = pd.read_csv('data.csv')
resultDict = {}

cred = credentials.Certificate(
    "/Users/dharshan/Downloads/gt-transfer-tool-firebase-adminsdk-amge6-0e114a629d.json")

firebase_admin.initialize_app(cred)
db = firestore.client()

transfers_ref = db.collection(u'transfers')

for i in range(0, len(df)):

    transfers_ref.document(str(i)).set({
        "state": df.iloc[i]['state'],
        "term": df.iloc[i]['term'],
        "t_school": df.iloc[i]['t_school'],
        "t_class": df.iloc[i]['t_class'],
        "t_title": df.iloc[i]['t_title'],
        "t_level": df.iloc[i]['t_level'],
        "t_mingrade": df.iloc[i]['t_mingrade'],
        "gt_class": df.iloc[i]['gt_class'],
        "gt_title": df.iloc[i]['gt_title'],
        "gt_ch": str(df.iloc[i]['gt_ch'])
    })

    print(i)
