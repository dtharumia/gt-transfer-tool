import pandas as pd

df = pd.read_csv('all_data_translated.csv')

df = df.astype({
    "id": "string",
})

df = df.astype({
    "gt_ch": "string"
})

df = df.drop(
    columns="gt_title_translated"
)

df.to_json("all_data_translated.jsonl", orient="records", lines=True)