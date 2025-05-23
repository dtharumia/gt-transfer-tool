import os
import sys
import time

import pandas as pd
from chromedriver_py import binary_path  # this will get you the path variable
from selenium import webdriver
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

svc = Service(executable_path=binary_path)

chrome_options = Options()
options = [
    "--headless",
    "--disable-gpu",
    "--window-size=1920,1200",
    "--ignore-certificate-errors",
    "--disable-extensions",
    "--no-sandbox",
    "--disable-dev-shm-usage",
]
for option in options:
    chrome_options.add_argument(option)

driver = webdriver.Chrome(service=svc, options=chrome_options)
wait = WebDriverWait(driver, 10)  # 10 seconds timeout

df = pd.DataFrame(
    columns=[
        "transfer_state",
        "term",
        "transfer_school",
        "transfer_class",
        "transfer_title",
        "transfer_level",
        "transfer_mingrade",
        "gt_class",
        "gt_title",
        "gt_ch",
    ]
)

# get selected state from first command line argument
selected_state_number = int(sys.argv[1])


def wait_and_click(xpath):
    element = wait.until(EC.element_to_be_clickable((By.XPATH, xpath)))
    element.click()
    return element


def wait_and_find(xpath):
    return wait.until(EC.presence_of_element_located((By.XPATH, xpath)))


def get_schools():
    # Wait for the school options to be present
    wait.until(EC.presence_of_element_located((By.XPATH, "//option")))
    # Get all school options
    return driver.find_elements(By.XPATH, "//option")


def scrape_transfer_table():
    driver.get("https://oscar.gatech.edu/pls/bprod/wwsktrna.P_find_location")

    # school in US
    wait_and_click("//input[@value='Yes']")

    transfer_state = ""
    term = ""
    transfer_school = ""
    transfer_class = ""
    transfer_title = ""
    transfer_level = ""
    transfer_mingrade = ""
    gt_class = ""
    gt_title = ""
    gt_ch = ""

    # goes through selected_state
    for count_state in range(selected_state_number, selected_state_number + 1):
        state = wait_and_find("//option[" + str(count_state) + "]")
        transfer_state = state.text
        print("Transfer State: " + transfer_state, flush=True)
        state.click()
        wait_and_click('//input[@value="Get State"]')

        # Get initial list of schools
        schools = get_schools()
        num_schools = len(schools)

        # goes through all schools
        for count_school in range(1, num_schools + 1):
            try:
                # Re-find the school element each time to avoid stale elements
                school = wait_and_find("//option[" + str(count_school) + "]")
                transfer_school = school.text
                print(
                    f"Processing school {count_school}/{num_schools}: {transfer_school}",
                    flush=True,
                )

                school.click()
                wait_and_click('//input[@value="Get School"]')

                # goes through all subjects
                subjects = wait.until(
                    EC.presence_of_all_elements_located(
                        (By.XPATH, "//select[@name='sel_subj']//option")
                    )
                )
                for count_subject in range(1, len(subjects) + 1):
                    try:
                        subject = wait_and_find(
                            '//select[@name="sel_subj"]//option['
                            + str(count_subject)
                            + "]"
                        )
                        subject.click()
                        try:
                            wait_and_click(
                                '//select[@name="levl_in"]//option[@value="US"]'
                            )
                        except:
                            f = open("error.txt", "a")
                            f.write(transfer_school + "\n")
                            f.close()
                            break
                        term_sem = wait_and_find('//option[@value="202308"]')
                        term_sem.click()
                        term = term_sem.text
                        wait_and_click('//input[@value="Get Courses"]')

                        # goes through all courses
                        rows = wait.until(
                            EC.presence_of_all_elements_located(
                                (By.XPATH, '//table[@class="datadisplaytable"]//tr')
                            )
                        )
                        for row in range(3, len(rows) + 1):
                            row_text = wait_and_find(
                                '//table[@class="datadisplaytable"]//tr['
                                + str(row)
                                + "]"
                            ).text
                            if row_text != "  ----- No Equivalent Course(s) -----":
                                try:
                                    gt_class = wait_and_find(
                                        '//table[@class="datadisplaytable"]//tr['
                                        + str(row)
                                        + "]//td[8]"
                                    ).text
                                    gt_title = wait_and_find(
                                        '//table[@class="datadisplaytable"]//tr['
                                        + str(row)
                                        + "]//td[9]"
                                    ).text
                                    gt_ch = wait_and_find(
                                        '//table[@class="datadisplaytable"]//tr['
                                        + str(row)
                                        + "]//td[10]"
                                    ).text
                                    transfer_class = wait_and_find(
                                        '//table[@class="datadisplaytable"]//tr['
                                        + str(row)
                                        + "]//td[1]"
                                    ).text
                                    transfer_title = wait_and_find(
                                        '//table[@class="datadisplaytable"]//tr['
                                        + str(row)
                                        + "]//td[2]"
                                    ).text
                                    transfer_level = wait_and_find(
                                        '//table[@class="datadisplaytable"]//tr['
                                        + str(row)
                                        + "]//td[3]"
                                    ).text
                                    transfer_mingrade = wait_and_find(
                                        '//table[@class="datadisplaytable"]//tr['
                                        + str(row)
                                        + "]//td[5]"
                                    ).text
                                    df.loc[(len(df.index))] = [
                                        transfer_state,
                                        term,
                                        transfer_school,
                                        transfer_class,
                                        transfer_title,
                                        transfer_level,
                                        transfer_mingrade,
                                        gt_class,
                                        gt_title,
                                        gt_ch,
                                    ]
                                except:
                                    gt_class = wait_and_find(
                                        '//table[@class="datadisplaytable"]//tr['
                                        + str(row)
                                        + "]//td[2]"
                                    ).text
                                    gt_title = wait_and_find(
                                        '//table[@class="datadisplaytable"]//tr['
                                        + str(row)
                                        + "]//td[3]"
                                    ).text
                                    gt_ch = wait_and_find(
                                        '//table[@class="datadisplaytable"]//tr['
                                        + str(row)
                                        + "]//td[4]"
                                    ).text
                                    df.loc[(len(df.index))] = [
                                        transfer_state,
                                        term,
                                        transfer_school,
                                        transfer_class,
                                        transfer_title,
                                        transfer_level,
                                        transfer_mingrade,
                                        gt_class,
                                        gt_title,
                                        gt_ch,
                                    ]
                            else:
                                break

                        # print last row of df
                        print(df.tail(1), flush=True)
                        time.sleep(1)

                        wait_and_click(
                            '//input[@value="Search Another Subject/Level/Term"]'
                        )
                    except Exception as e:
                        print(
                            f"Error processing subject {count_subject}: {str(e)}",
                            flush=True,
                        )
                        continue

                wait_and_click('//input[@value="Search Another School"]')
            except Exception as e:
                print(f"Error processing school {count_school}: {str(e)}", flush=True)
                continue

        wait_and_click('//input[@value="Search Another State"]')

    df.insert(0, "id", range(0, 0 + len(df)))
    df["id"] = df["id"].astype(str)
    df["gt_ch"] = df["gt_ch"].astype(str)

    df.to_json(
        os.path.join(sys.path[0], f"output/all_data/{selected_state_number}.json"),
        orient="records",
    )


if __name__ == "__main__":
    scrape_transfer_table()
