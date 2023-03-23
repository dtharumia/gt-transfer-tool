import pandas as pd

def search_fields():
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
    df.to_json("search_fields.json", orient="records")

def all_data():
    df = pd.read_csv('all_data.csv')
    df = df.astype({
        "id": "string",
    })
    df.to_json("all_data.jsonl", orient="records", lines=True)
    df.to_json("all_data.json", orient="records")

if __name__ == "__main__":
    search_fields()
    all_data()
