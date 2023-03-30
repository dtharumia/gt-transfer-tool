import json
import os
import sys
import typesense
from dotenv import load_dotenv
import pandas as pd
import requests

curr_dir = os.path.dirname(os.path.realpath(__file__))
sys.path.insert(1, os.path.abspath(os.path.join(curr_dir, os.pardir)))
load_dotenv()

TYPESENSE_ADMIN_API_KEY = sys.argv[4]
TYPESENSE_HOST = sys.argv[5]
TYPESENSE_PORT = sys.argv[6]
TYPESENSE_PROTOCOL = sys.argv[7]

client = typesense.Client(
    {
        "api_key": TYPESENSE_ADMIN_API_KEY,
        "nodes": [
            {
                "host": TYPESENSE_HOST,
                "port": TYPESENSE_PORT,
                "protocol": TYPESENSE_PROTOCOL,
            }
        ],
        "connection_timeout_seconds": 2,
    }
)


def searches(collection, test):
    try:
        client.collections[collection].delete()
    except Exception as e:
        pass

    create_response = client.collections.create(
        {
            "name": collection,
            "fields": [
                {"name": "primary", "type": "string", "sort": True},
                {"name": "secondary", "type": "string", "optional": True},
                {"name": "type", "type": "string"},
            ],
        }
    )

    print(create_response, flush=True)

    if test:
        search_data = pd.read_json(
            os.path.join(
                sys.path[0], "output/all_data_test/all_data_test_search_fields.json"
            ),
            orient="records",
        )
    else:
        search_data = pd.read_json(
            os.path.join(sys.path[0], "output/all_data/all_data_search_fields.json"),
            orient="records",
        )

    search_data["id"] = search_data["id"].astype(str)

    search_data.to_json(
        os.path.join(sys.path[0], "search_data.jsonl"), orient="records", lines=True
    )

    with open(os.path.join(sys.path[0], "search_data.jsonl")) as jsonl_file:
        print(
            client.collections[collection].documents.import_(
                jsonl_file.read(), {"action": "create"}
            ),
            flush=True,
        )

    os.remove(os.path.join(sys.path[0], "search_data.jsonl"))


def transfers(collection, test):
    try:
        client.collections[collection].delete()
    except Exception as e:
        pass

    create_response = client.collections.create(
        {
            "name": collection,
            "fields": [
                {"index": True, "name": "gt_ch", "type": "string"},
                {
                    "index": True,
                    "sort": True,
                    "infix": False,
                    "name": "transfer_class",
                    "type": "string",
                },
                {"index": True, "name": "transfer_level", "type": "string"},
                {"index": True, "name": "transfer_mingrade", "type": "string"},
                {"index": True, "name": "transfer_title", "type": "string"},
                {"index": True, "name": "term", "type": "string"},
                {"facet": True, "index": True, "name": "gt_title", "type": "string"},
                {
                    "facet": True,
                    "index": True,
                    "sort": True,
                    "name": "transfer_school",
                    "type": "string",
                },
                {"index": True, "sort": True, "name": "transfer_state", "type": "string"},
                {
                    "facet": True,
                    "index": True,
                    "name": "gt_class",
                    "sort": True,
                    "type": "string",
                },
            ],
        }
    )

    print(create_response, flush=True)

    if test:
        all_data_combined = pd.read_json(
            os.path.join(
                sys.path[0], "output/all_data_test/all_data_test_combined.json"
            ),
            orient="records",
        )
    else:
        all_data_combined = pd.read_json(
            os.path.join(sys.path[0], "output/all_data/all_data_combined.json"),
            orient="records",
        )

    all_data_combined["id"] = all_data_combined["id"].astype(str)
    all_data_combined["gt_ch"] = all_data_combined["gt_ch"].astype(str)
    all_data_combined["transfer_mingrade"] = all_data_combined[
        "transfer_mingrade"
    ].astype(str)

    all_data_combined.to_json(
        os.path.join(sys.path[0], "all_data_combined.jsonl"),
        orient="records",
        lines=True,
    )
    # need to use REST API to import data because of the size of the data
    url = "https://teq6fdvwgrz84jm0p-1.a1.typesense.net/collections/transfers/documents/import?action=create"
    headers = {
        "X-TYPESENSE-API-KEY": "{0}".format(TYPESENSE_ADMIN_API_KEY)
    }
    with open(os.path.join(sys.path[0], "all_data_combined.jsonl"), "r") as f:
        payload = f.read()

    response = requests.post(url, headers=headers, data=payload)
    print(response)
    print(response.raise_for_status())

    os.remove(os.path.join(sys.path[0], "all_data_combined.jsonl"))


if __name__ == "__main__":
    # if first command line argument is searches, then run the searches script
    if sys.argv[1] == "searches":
        print("running searches", flush=True)
        print(sys.argv[2], sys.argv[3], flush=True)
        searches(sys.argv[2], int(sys.argv[3]))
    # if first command line argument is transfers, then run the transfers script
    elif sys.argv[1] == "transfers":
        print("running transfers", flush=True)
        transfers(sys.argv[2], int(sys.argv[3]))
