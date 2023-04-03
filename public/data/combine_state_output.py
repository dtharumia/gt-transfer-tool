import pandas as pd
import os
import sys


# get path from command line argument
folder_path = sys.argv[1]


def combine_json():
    # get all json files in data folder
    path = os.path.join(sys.path[0], f"output/{folder_path}")
    df = pd.DataFrame()

    # go through all the subfolders and get all the json files
    files = []
    for r, d, f in os.walk(path):
        for file in f:
            if ".json" in file:
                files.append(os.path.join(r, file))
    dfs = []
    # combine all json files into one df
    for file in files:
        df = pd.read_json(os.path.join(path, file), orient="records")
    
        dfs.append(df)
    
    df = pd.concat(dfs, ignore_index=True)

    # replace id with index
    df.drop("id", axis=1, inplace=True)
    df.insert(0, "id", range(0, 0 + len(df)))

    df["id"] = df["id"].astype(str)
    df["gt_ch"] = df["gt_ch"].astype(str)

    # save combined df as json
    df.to_json(
        os.path.join(sys.path[0], f"output/{folder_path}/{folder_path}_combined.json"),
        orient="records",
    )


if __name__ == "__main__":
    combine_json()
