import pandas as pd
import os
import sys


# get path from command line argument
folder_path = sys.argv[1]

def combine_json():
    # get all json files in data folder
    path = os.path.join(sys.path[0], f'output/{folder_path}')
    files = [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f)) and f.endswith('.json')]

    # combine all json files into one df
    df = pd.DataFrame()
    for file in files:
        df = df.append(pd.read_json(os.path.join(path, file), orient='records'), ignore_index=True)

    # replace id with index
    df.drop('id', axis=1, inplace=True)
    df.insert(0, 'id', range(0, 0 + len(df)))

    # save combined df as json
    df.to_json(os.path.join(sys.path[0], f'output/{folder_path}/{folder_path}_combined.json'), orient='records')

if __name__ == '__main__':
    combine_json()