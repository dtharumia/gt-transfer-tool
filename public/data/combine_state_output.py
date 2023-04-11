import pandas as pd
import os
import sys


# get path from command line argument
folder_path = sys.argv[1]


def combine_json():
    # get all json files in data folder
    path = os.path.join(sys.path[0], f"output/{folder_path}")
    # delete combined json if it already exists
    if os.path.exists(os.path.join(path, f"{folder_path}_combined.json")):
        os.remove(os.path.join(path, f"{folder_path}_combined.json"))
    # delete search fields json if it already exists
    if os.path.exists(os.path.join(path, f"{folder_path}_search_fields.json")):
        os.remove(os.path.join(path, f"{folder_path}_search_fields.json"))    

    df = pd.DataFrame()

    # go through all the subfolders and get all the json files
    files = []
    for r, d, f in os.walk(path):
        for file in f:
            if ".json" in file:
                files.append(os.path.join(r, file))

    # combine all json files into one df
    dfs = []

    for file in files:
        df = pd.read_json(os.path.join(path, file), orient="records")
    
        # Append the dataframe to the list
        dfs.append(df)
    
    # Concatenate all dataframes in the list
    df = pd.concat(dfs, ignore_index=True)

    # sort by "transfer_state", "transfer_school", "transfer_class"
    df.sort_values(
        by=["transfer_state", "transfer_school", "transfer_class"], inplace=True
    )

    # replace id with index
    df.drop("id", axis=1, inplace=True)
    df.insert(0, "id", range(0, 0 + len(df)))

    df["id"] = df["id"].astype(str)
    df["gt_ch"] = df["gt_ch"].astype(str)

    # for all columns, replace multiple spaces with one space
    df.replace(to_replace=r"\s+", value=" ", regex=True, inplace=True)

    # save combined df as json
    df.to_json(
        os.path.join(sys.path[0], f"output/{folder_path}/{folder_path}_combined.json"),
        orient="records",
    )

if __name__ == "__main__":
    combine_json()