import pandas as pd

df = pd.read_csv('search_fields.csv')

df = df.astype({
    "id": "string",
})

df = df.astype({
    "primary": "string"
})

df = df.astype({
    "secondary": "string"
})

df = df.astype({
    "type": "string"
})

df.to_json("search_fields.jsonl", orient="records", lines=True)