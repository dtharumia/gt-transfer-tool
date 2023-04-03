import pandas as pd
import os
import sys

folder_path = sys.argv[1]


def format_search_fields():

    df = pd.read_json(
        os.path.join(sys.path[0], f"output/{folder_path}/{folder_path}_combined.json"),
        orient="records",
    )

    # get unique_states and include transfer_state as type
    unique_states = df["transfer_state"].unique()
    df_states = pd.DataFrame(unique_states, columns=["primary"])
    df_states["secondary"] = ""
    df_states["type"] = "transfer_state"

    # get unique_gt_class and include gt_class as type
    unique_gt_class = df["gt_class"].unique()
    df_gt_class = pd.DataFrame(unique_gt_class, columns=["primary"])
    df_gt_class["secondary"] = ""
    df_gt_class["type"] = "gt_class"

    # get unique_schools and include transfer_school as type
    unique_schools = df["transfer_school"].unique()
    df_schools = pd.DataFrame(unique_schools, columns=["primary"])
    df_schools["secondary"] = ""
    df_schools["type"] = "transfer_school"

    # find corresponding state for each school
    for index, row in df_schools.iterrows():
        df_schools.at[index, "secondary"] = df.loc[
            df["transfer_school"] == row["primary"], "transfer_state"
        ].iloc[0]

    # group into one df with id, primary, secondary, and type
    df_search = pd.concat([df_states, df_gt_class, df_schools], ignore_index=True)
    df_search.insert(0, "id", range(0, 0 + len(df_search)))
    df_search["id"] = df_search["id"].astype(str)
    df_search.to_json(
        os.path.join(
            sys.path[0], f"output/{folder_path}/{folder_path}_search_fields.json"
        ),
        orient="records",
    )


if __name__ == "__main__":
    format_search_fields()